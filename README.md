# Koshi Developer Portfolio

Developer portfolio for **Koshi Sugawara**, focused on public code, web-development projects, technical skills, and selected commercial experience.

- Live site: https://koshijpn.github.io/
- GitHub: https://github.com/koshijpn
- LinkedIn: https://www.linkedin.com/in/koshi-sugawara
- Commercial services: https://sleeplatelab.com/
- Personal profile: https://koshijpn.com/

## Purpose

This repository is the technical part of the Koshi brand ecosystem. It helps recruiters, collaborators, and prospective clients assess development capability through projects, source code, case studies, and clearly scoped experience. Personal and creative work belongs on `koshijpn.com`; commercial services and estimates belong on SLEEP LATE LAB.

## Tech stack

- Semantic HTML
- CSS and responsive design
- Vanilla JavaScript
- GitHub REST API with a static fallback
- GitHub Pages
- Schema.org structured data
- Google Tag Manager

No framework, package installation, or build step is required.

## Structure

- `index.html` — main portfolio
- `projects.html` and `projects/` — project catalogue and case studies
- `articles/` — technical writing
- `profile.html` — supporting education and credentials
- `js/projects.js` — curated project and skill data
- `js/career.js` — time-sensitive education data
- `js/i18n.js`, `js/i18n-full.js` — translations
- `js/github.js` — public GitHub activity and fallback UI
- `css/style.css` — shared responsive design

## Development

Serve the repository root with any static web server. For example:

```sh
python3 -m http.server 8000
```

Then open `http://localhost:8000/`. Opening the HTML file directly also works, but a local server provides more realistic CSP and API behavior.

## Deployment

GitHub Pages publishes the `main` branch from the repository root. Keep relative URLs and the build-free structure intact.

## Analytics

Google Tag Manager is the single analytics loader. GA4 or other approved tools should be configured in GTM instead of being embedded independently. Stable click events include:

- `project_click`
- `github_click`
- `linkedin_click`
- `commercial_services_click`

## Security

- No API keys or GitHub tokens are required.
- GitHub API requests use public endpoints only.
- External links opened in a new tab use `noopener noreferrer`.
- CSP uses an allowlist and does not permit `unsafe-eval`.
- Report vulnerabilities according to [SECURITY.md](./SECURITY.md).

