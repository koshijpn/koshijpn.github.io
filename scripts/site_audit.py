#!/usr/bin/env python3
"""Dependency-free checks for this static GitHub Pages site."""

from __future__ import annotations

import sys
from html.parser import HTMLParser
from pathlib import Path
from urllib.parse import unquote, urljoin, urlparse
from xml.etree import ElementTree

ROOT = Path(__file__).resolve().parent.parent
ORIGIN = "https://koshijpn.github.io"
IGNORED_DIRS = {".git", "node_modules", "vendor"}
REQUIRED_SOCIAL = {"og:title", "og:description", "og:url", "og:image", "twitter:card"}


class PageParser(HTMLParser):
    def __init__(self) -> None:
        super().__init__()
        self.title_count = 0
        self.h1_count = 0
        self.html_lang = ""
        self.metas: list[dict[str, str]] = []
        self.links: list[dict[str, str]] = []
        self.refs: list[str] = []
        self.images: list[dict[str, str]] = []
        self.scripts: list[dict[str, str]] = []

    def handle_starttag(self, tag: str, attrs: list[tuple[str, str | None]]) -> None:
        data = {key: value or "" for key, value in attrs}
        if tag == "html":
            self.html_lang = data.get("lang", "")
        elif tag == "title":
            self.title_count += 1
        elif tag == "h1":
            self.h1_count += 1
        elif tag == "meta":
            self.metas.append(data)
        elif tag == "link":
            self.links.append(data)
            if data.get("href"):
                self.refs.append(data["href"])
        elif tag == "script":
            self.scripts.append(data)
            if data.get("src"):
                self.refs.append(data["src"])
        elif tag == "img":
            self.images.append(data)
            if data.get("src"):
                self.refs.append(data["src"])
        elif tag in {"a", "source", "video"}:
            for attribute in ("href", "src", "poster"):
                if data.get(attribute):
                    self.refs.append(data[attribute])


def public_url(path: Path) -> str:
    relative = path.relative_to(ROOT).as_posix()
    if relative == "index.html":
        return f"{ORIGIN}/"
    if relative.endswith("/index.html"):
        return f"{ORIGIN}/{relative[:-10]}"
    return f"{ORIGIN}/{relative}"


def resolve_local(page: Path, reference: str) -> Path | None:
    parsed = urlparse(reference)
    if parsed.scheme in {"mailto", "tel", "data", "javascript"} or reference.startswith("#"):
        return None
    if parsed.netloc and parsed.netloc != urlparse(ORIGIN).netloc:
        return None
    raw_path = unquote(parsed.path)
    if parsed.netloc or raw_path.startswith("/"):
        candidate = ROOT / raw_path.lstrip("/")
    else:
        candidate = page.parent / raw_path
    candidate = candidate.resolve()
    if candidate.is_dir():
        candidate /= "index.html"
    elif not candidate.suffix and not candidate.exists():
        candidate /= "index.html"
    return candidate


def main() -> int:
    errors: list[str] = []
    indexable: set[str] = set()
    pages = sorted(
        path for path in ROOT.rglob("*.html")
        if not any(part in IGNORED_DIRS for part in path.relative_to(ROOT).parts)
    )

    for page in pages:
        parser = PageParser()
        parser.feed(page.read_text(encoding="utf-8"))
        label = page.relative_to(ROOT).as_posix()
        meta = {(item.get("name") or item.get("property", "")).lower(): item.get("content", "") for item in parser.metas}
        canonical = next((item.get("href", "") for item in parser.links if "canonical" in item.get("rel", "").split()), "")
        robots = meta.get("robots", "index,follow").lower()
        noindex = "noindex" in robots

        if parser.title_count != 1:
            errors.append(f"{label}: expected one title, found {parser.title_count}")
        if parser.h1_count != 1:
            errors.append(f"{label}: expected one H1, found {parser.h1_count}")
        if not parser.html_lang:
            errors.append(f"{label}: missing html lang")
        for image in parser.images:
            if "alt" not in image:
                errors.append(f"{label}: image missing alt: {image.get('src', '')}")

        if not noindex:
            indexable.add(public_url(page))
            if not meta.get("description"):
                errors.append(f"{label}: missing meta description")
            if canonical != public_url(page):
                errors.append(f"{label}: canonical mismatch ({canonical or 'missing'})")
            missing_social = sorted(key for key in REQUIRED_SOCIAL if not meta.get(key))
            if missing_social:
                errors.append(f"{label}: missing social metadata: {', '.join(missing_social)}")
            if not any("icon" in item.get("rel", "").split() for item in parser.links):
                errors.append(f"{label}: missing favicon")

        for reference in parser.refs:
            target = resolve_local(page, reference)
            if target is not None and ROOT not in target.parents and target != ROOT:
                errors.append(f"{label}: local reference escapes site root: {reference}")
            elif target is not None and not target.exists():
                errors.append(f"{label}: broken local reference: {reference}")

    sitemap = ElementTree.parse(ROOT / "sitemap.xml")
    namespace = {"sm": "http://www.sitemaps.org/schemas/sitemap/0.9"}
    sitemap_urls = {element.text.strip() for element in sitemap.findall("sm:url/sm:loc", namespace) if element.text}
    if sitemap_urls != indexable:
        for missing in sorted(indexable - sitemap_urls):
            errors.append(f"sitemap.xml: missing indexable URL: {missing}")
        for extra in sorted(sitemap_urls - indexable):
            errors.append(f"sitemap.xml: non-indexable or missing URL: {extra}")

    robots = (ROOT / "robots.txt").read_text(encoding="utf-8")
    expected_sitemap = f"Sitemap: {ORIGIN}/sitemap.xml"
    if expected_sitemap not in robots:
        errors.append(f"robots.txt: missing {expected_sitemap}")

    if errors:
        print("Site audit failed:", file=sys.stderr)
        for error in errors:
            print(f"- {error}", file=sys.stderr)
        return 1
    print(f"Site audit passed: {len(pages)} HTML files, {len(indexable)} indexable URLs.")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
