#!/usr/bin/env python3
"""Validate canonical sitemap URLs and submit them to IndexNow."""

from __future__ import annotations

import argparse
from html.parser import HTMLParser
import json
import sys
from typing import Iterable
from urllib.error import HTTPError, URLError
from urllib.parse import urlsplit, urlunsplit
from urllib.request import HTTPRedirectHandler, Request, build_opener, urlopen
import xml.etree.ElementTree as ET


HOST = "koshijpn.github.io"
KEY = "28641a3ab92843c69e8f97375204e93b"
SITEMAP_URL = f"https://{HOST}/sitemap.xml"
KEY_LOCATION = f"https://{HOST}/{KEY}.txt"
INDEXNOW_ENDPOINT = "https://api.indexnow.org/indexnow"
BATCH_SIZE = 10_000
USER_AGENT = "KOSHI-PORTFOLIO-IndexNow/1.0"


class NoRedirect(HTTPRedirectHandler):
    def redirect_request(self, req, fp, code, msg, headers, newurl):
        return None


class MetadataParser(HTMLParser):
    def __init__(self) -> None:
        super().__init__()
        self.canonical = ""
        self.noindex = False

    def handle_starttag(self, tag: str, attrs) -> None:
        values = dict(attrs)
        if tag == "link" and "canonical" in values.get("rel", "").lower().split():
            self.canonical = values.get("href", "").strip()
        if tag == "meta" and values.get("name", "").lower() in {"robots", "googlebot", "bingbot"}:
            if "noindex" in values.get("content", "").lower():
                self.noindex = True


def canonicalize(url: str) -> str:
    parts = urlsplit(url.strip())
    return urlunsplit((parts.scheme.lower(), parts.netloc.lower(), parts.path or "/", parts.query, ""))


def allowed_url(url: str) -> bool:
    parts = urlsplit(url)
    return parts.scheme == "https" and parts.netloc == HOST and not parts.fragment


def request(url: str, *, follow_redirects: bool = True):
    req = Request(url, headers={"User-Agent": USER_AGENT, "Accept": "text/html,application/xml,text/plain;q=0.9,*/*;q=0.1"})
    opener = build_opener() if follow_redirects else build_opener(NoRedirect())
    return opener.open(req, timeout=20)


def sitemap_urls() -> list[str]:
    with request(SITEMAP_URL) as response:
        if response.status != 200:
            raise RuntimeError(f"Sitemap returned HTTP {response.status}: {SITEMAP_URL}")
        root = ET.fromstring(response.read())
    urls = []
    for node in root.iter():
        if node.tag.endswith("loc") and node.text:
            url = canonicalize(node.text)
            if allowed_url(url):
                urls.append(url)
            else:
                print(f"Exclude foreign or non-HTTPS URL: {url}", file=sys.stderr)
    return list(dict.fromkeys(urls))


def validate_url(url: str) -> tuple[bool, str]:
    if not allowed_url(url):
        return False, "target host or scheme is not allowed"
    try:
        with request(url, follow_redirects=False) as response:
            status = response.status
            headers = response.headers
            body = response.read()
    except HTTPError as error:
        if 300 <= error.code < 400:
            return False, f"redirect HTTP {error.code}"
        return False, f"HTTP {error.code}"
    except URLError as error:
        return False, f"network error: {error.reason}"
    if status != 200:
        return False, f"HTTP {status}"
    if "noindex" in headers.get("X-Robots-Tag", "").lower():
        return False, "X-Robots-Tag contains noindex"
    content_type = headers.get_content_type()
    if content_type not in {"text/html", "application/xhtml+xml"}:
        return False, f"unexpected content type {content_type}"
    charset = headers.get_content_charset() or "utf-8"
    try:
        text = body.decode(charset, errors="strict")
    except (LookupError, UnicodeDecodeError):
        return False, "response is not valid declared text encoding"
    parser = MetadataParser()
    parser.feed(text)
    if parser.noindex:
        return False, "HTML robots metadata contains noindex"
    if not parser.canonical:
        return False, "canonical link is missing"
    if canonicalize(parser.canonical) != url:
        return False, f"canonical points to {parser.canonical}"
    return True, "canonical HTTP 200 page"


def chunks(items: list[str], size: int) -> Iterable[list[str]]:
    for start in range(0, len(items), size):
        yield items[start:start + size]


def explain_status(status: int) -> str:
    return {
        400: "Bad request: verify the JSON payload and URL formats.",
        403: "Forbidden: verify the key file, key value and keyLocation.",
        422: "Unprocessable entity: one or more URLs do not belong to the host or are invalid.",
        429: "Too many requests: wait before retrying; do not repeatedly submit the full sitemap.",
    }.get(status, "Unexpected IndexNow API response.")


def submit(urls: list[str]) -> bool:
    all_ok = True
    for number, batch in enumerate(chunks(urls, BATCH_SIZE), start=1):
        payload = json.dumps({"host": HOST, "key": KEY, "keyLocation": KEY_LOCATION, "urlList": batch}).encode("utf-8")
        req = Request(INDEXNOW_ENDPOINT, data=payload, method="POST", headers={"Content-Type": "application/json; charset=utf-8", "User-Agent": USER_AGENT})
        try:
            with urlopen(req, timeout=30) as response:
                status = response.status
                response_body = response.read().decode("utf-8", errors="replace").strip()
        except HTTPError as error:
            status = error.code
            response_body = error.read().decode("utf-8", errors="replace").strip()
        except URLError as error:
            print(f"Batch {number}: network error: {error.reason}", file=sys.stderr)
            all_ok = False
            continue
        success = status in {200, 202}
        print(f"Batch {number}: HTTP {status} ({len(batch)} URLs) {'SUCCESS' if success else 'FAILED'}")
        if response_body:
            print(response_body)
        if not success:
            print(explain_status(status), file=sys.stderr)
            all_ok = False
    return all_ok


def main() -> int:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--dry-run", action="store_true", help="validate and print URLs without calling IndexNow")
    parser.add_argument("--url", action="append", help="submit only this canonical URL; may be repeated")
    args = parser.parse_args()

    candidates = [canonicalize(url) for url in args.url] if args.url else sitemap_urls()
    candidates = list(dict.fromkeys(candidates))
    valid_urls = []
    for url in candidates:
        valid, reason = validate_url(url)
        print(f"{'INCLUDE' if valid else 'EXCLUDE'} {url} — {reason}")
        if valid:
            valid_urls.append(url)
    print(f"Validated {len(candidates)} candidate URLs; {len(valid_urls)} eligible.")
    if not valid_urls:
        print("No eligible URLs to submit.", file=sys.stderr)
        return 1
    if args.dry_run:
        print("Dry run only; no IndexNow request was sent.")
        return 0
    return 0 if submit(valid_urls) else 1


if __name__ == "__main__":
    raise SystemExit(main())
