# glib-code-docs Spec

**Last updated:** 2026-06-22

The documentation site for [glib-code](https://github.com/cloudboy-jh/glib-code). Built with Astro + Starlight, themed with the in-house **Minimal Dark** / **Minimal Paper** presets, deployed on Cloudflare Pages.

This repo holds **only the docs**. The glib-code app source lives in a separate repo. Content here describes glib-code as it actually ships: a local-first Electron desktop app (Bun/Hono server, Vue 3 web, Electron shell, shared types).

---

## Goals

- Document what glib-code actually is and does — no invented surfaces or endpoints.
- In-house Minimal Dark (dark) + Minimal Paper (light), matching the app's own theme presets.
- Stay concise. Every sidebar link resolves to a real, accurate page.
- Bun for everything (install, dev, build).

## Non-goals

- No public HTTP API reference. The server is internal to the desktop app.
- No "surfaces" taxonomy. Local/desktop/self-host/hosted are runtime *modes*, not products.
- No CMS, auth, or external search beyond Starlight's built-in pagefind.

---

## Stack

- **Runtime / package manager:** Bun 1.x
- **Framework:** Astro + Starlight (`@astrojs/starlight`)
- **Theme:** in-house Minimal Dark / Minimal Paper via `src/styles/custom.css` mapping onto Starlight's native `--sl-color-*` ladder. No third-party Starlight theme plugin.
- **Code blocks:** Expressive Code with `github-dark` + `github-light` Shiki themes.
- **Diagrams:** Mermaid via `src/mermaid/rehype-mermaid.mjs`, themed with neutral Minimal Dark / Minimal Paper palettes injected in `astro.config.mjs`.
- **Deployment:** Cloudflare Pages via `wrangler.toml`.
- **Domain:** glibcode.com

## Theming

- `custom.css` defines the two palettes as `--sl-color-*` overrides under `:root[data-theme='dark']` and `[data-theme='light']`.
- Logo (`glib-docs-appp-logo.png`) is a white-on-transparent wordmark; rendered as-is on dark, `filter: invert(1)` on light.
- Mermaid palettes are fully neutral (grayscale on dark, warm paper on light). Every diagram node is assigned a `classDef` so no node falls through to a default accent color.
- Toggle: Starlight's built-in light/dark switch in the header.

## Content structure

All pages live under `src/content/docs/`. File path = route path.

```txt
src/content/docs/
├── index.md                  # Introduction
├── why.md                    # Why glib-code
├── getting-started.md        # Install / run from source / first session
├── themes.md                 # In-house Minimal Dark / Minimal Paper
└── concepts/
    ├── review-first.md
    ├── sessions.md
    ├── promote.md
    ├── providers.md
    └── sandbox.md
```

Frontmatter convention (every page):

```md
---
title: Page Title
description: One-sentence summary used for SEO + sidebar.
---
```

---

## Local development

```bash
bun install
bun run dev       # local dev server
bun run build     # build to ./dist
bun run preview   # preview the built site
```

## Deployment

Cloudflare Pages via `wrangler.toml`:

- Build command: `bun run build`
- Output directory: `dist`
- Root domain: `glibcode.com`
- Branch deploys: `main` → production, PRs → preview URLs.

## Source of truth

Page content is reconciled against the core repo's `Docs/` (`Architecture.md`, `Backend.md`, `Frontend.md`, `Agent.md`, `Onboarding.md`, `sessions.md`). When the app changes, update those pages to match.
