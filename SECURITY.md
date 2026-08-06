# Security Policy

## Supported version

The version currently published from the default branch is supported. This is a static GitHub Pages site without authentication, payment processing, or a server-side database.

## Reporting a vulnerability

Please do not disclose a suspected vulnerability in a public issue. If GitHub's private vulnerability reporting form is available for this repository, use it and include the affected URL, reproduction steps, and likely impact. If the form is unavailable, contact the maintainer through the GitHub profile without publishing exploit details.

Please do not include real API keys, passwords, access tokens, or unrelated personal information in a report. Reports will be reviewed as availability permits; verified issues will be addressed in the published site and noted in the advisory when appropriate.

## Scope

In scope: source files and assets served from `koshijpn.github.io`.

Third-party services linked from the site, GitHub itself, and SLEEP LATE LAB are governed by their respective security policies. Commercial inquiries should use the SLEEP LATE LAB contact form, not security reporting.

## Hosting limitations

GitHub Pages controls HTTP response headers. The repository cannot independently configure HSTS or `X-Frame-Options`; those protections depend on GitHub Pages. A restrictive meta Content Security Policy is used as an additional browser-side safeguard where supported; it is not a complete substitute for HTTP response headers. The site also uses a strict referrer policy, no authentication, and no client-side storage of secrets. A standards-based disclosure file is published at `/.well-known/security.txt`.
