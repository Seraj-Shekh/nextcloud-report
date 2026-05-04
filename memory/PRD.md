# PRD — Nextcloud Collectives Migration Report

## Original problem statement
Build a simple, attractive, professional documentation website for a Nextcloud Collectives migration field report. Code should look nice and explanation (headings, design) should be cleanly managed.

## Architecture
- **Stack**: React (CRA + CRACO), Tailwind, lucide-react, shadcn design tokens.
- **Pages**: Single page, anchor-based sections (no router).
- **Backend**: Not required (fully static content).

## User personas
- Engineers researching Nextcloud + MinIO migration pitfalls.
- Author sharing findings as a public report.

## Core requirements (static)
- Clean technical-docs aesthetic (Stripe/Vercel-like).
- Sticky top navbar + sticky left-side TOC with scroll-spy.
- Smooth scroll to anchored sections.
- Interactive: copy-to-clipboard on every code block, dark/light mode toggle (persisted in localStorage).
- Distinctive typography: Fraunces (display), IBM Plex Sans (body), IBM Plex Mono (code).
- Responsive layout (sidebar hides below `lg`).

## Implemented (2026-05-04)
- Hero with animated accent badge, stat strip, two CTAs.
- Full content: Overview, Environment, Key observation, 3 Experiments (with sub-cases), Root cause, Final conclusion (pass/break cards), Answer to core question, Practical recommendation (numbered steps), Future considerations.
- Code blocks with traffic-light chrome, safe HTML escaping + token highlighting (sentinel-based to avoid quote collisions), copy-to-clipboard with "Copied" confirmation.
- Pass/fail/partial result rows + callouts (info/warn/danger/success).
- Dark mode via `class` strategy on `<html>`, persisted.
- `data-testid` attributes on all interactive + info elements.

## Backlog (P1/P2)
- P2: Mobile TOC drawer (currently hidden on < lg).
- P2: PDF export / print stylesheet.
- P2: Shareable deep links with anchor badge on hover for H3.
