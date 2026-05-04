# glib-code-docs Spec

**Last updated:** 2026-05-04

The documentation site for [glib-code](https://github.com/cloudboy-jh/glib-code). Built with Astro + Starlight, themed with Catppuccin (Mocha for dark, Latte for light), deployed on Cloudflare Pages.

This repo holds **only the docs**. The glib-code app source lives in a separate repo. Content here describes the web, server, and desktop surfaces of glib-code.

---

## Goals

- Mirror the structure and tooling of [gittrix-docs](https://github.com/cloudboy-jh/gittrix-docs).
- Catppuccin Mocha (dark) + Latte (light), with a working theme toggle.
- Cover all three glib-code surfaces: **web**, **server**, **desktop**.
- Simple, low-dep, easy to extend.
- Bun for everything (install, dev, build).

## Non-goals

- No custom Astro components beyond what Starlight ships.
- No CMS, no auth, no search backend beyond Starlight's built-in pagefind.
- No analytics in v1.

---

## Stack

- **Runtime / package manager:** Bun 1.x
- **Framework:** Astro
- **Docs theme:** Starlight (`@astrojs/starlight`)
- **Color theme:** `@catppuccin/starlight`
- **Code blocks:** Expressive Code with `catppuccin-mocha` + `catppuccin-latte` Shiki themes
- **Deployment:** Cloudflare Pages via `wrangler.toml`
- **Domain:** glibcode.com

## Scaffold

```bash
bun create astro@latest -- --template starlight
bun add @catppuccin/starlight
```

## Project layout

```txt
glib-code-docs/
├── public/                     # favicon, static assets
├── src/
│   ├── assets/                 # logos, images referenced from md
│   ├── content/
│   │   └── docs/               # all markdown pages
│   └── content.config.ts
├── astro.config.mjs            # Starlight + Catppuccin config
├── glib-code-logo.png          # light-mode logo
├── glib-code-logo-dark.png     # dark-mode logo
├── package.json
├── bun.lock
├── tsconfig.json
├── wrangler.toml               # Cloudflare Pages config
├── README.md
└── Spec.md                     # this file
```

---

## astro.config.mjs

```js
import { defineConfig } from 'astro/config'
import starlight from '@astrojs/starlight'
import catppuccin from '@catppuccin/starlight'

export default defineConfig({
  site: 'https://glibcode.com',
  integrations: [
    starlight({
      title: 'glib-code',
      logo: {
        light: './glib-code-logo.png',
        dark: './glib-code-logo-dark.png',
        alt: 'glib-code',
        replacesTitle: true,
      },
      favicon: '/favicon.svg',
      social: [
        { icon: 'github', label: 'GitHub', href: 'https://github.com/cloudboy-jh/glib-code' },
      ],
      expressiveCode: {
        themes: ['catppuccin-mocha', 'catppuccin-latte'],
      },
      plugins: [
        catppuccin({
          dark: { flavor: 'mocha', accent: 'mauve' },
          light: { flavor: 'latte', accent: 'mauve' },
        }),
      ],
      sidebar: [
        { label: 'Introduction', link: '/' },
        { label: 'Why glib-code', link: '/why/' },
        { label: 'Getting Started', link: '/guides/getting-started/' },
        {
          label: 'Concepts',
          items: [
            { label: 'Review-first loop', link: '/concepts/review-first/' },
            { label: 'Sessions', link: '/concepts/sessions/' },
            { label: 'Promote', link: '/concepts/promote/' },
            { label: 'Provider/model authority', link: '/concepts/providers/' },
            { label: 'GitTrix isolation', link: '/concepts/gittrix/' },
          ],
        },
        {
          label: 'Surfaces',
          items: [
            { label: 'Web', link: '/surfaces/web/' },
            { label: 'Server', link: '/surfaces/server/' },
            { label: 'Desktop', link: '/surfaces/desktop/' },
          ],
        },
        {
          label: 'API Reference',
          items: [
            { label: 'Providers', link: '/api/providers/' },
            { label: 'Agent', link: '/api/agent/' },
            { label: 'Sessions', link: '/api/sessions/' },
            { label: 'Diff', link: '/api/diff/' },
          ],
        },
        {
          label: 'Guides',
          items: [
            { label: 'Run locally', link: '/guides/run-locally/' },
            { label: 'GitTrix integration', link: '/guides/gittrix-integration/' },
          ],
        },
      ],
    }),
  ],
})
```

## Theming

- **Plugin:** `@catppuccin/starlight` themes the chrome (sidebar, headers, links, background).
- **Code blocks:** `expressiveCode.themes` set both Mocha and Latte. Expressive Code auto-switches with the page theme using CSS variables — no duplicate HTML.
- **Accent:** `mauve` for both modes, matching the glib-code logo wordmark.
- **Toggle:** Starlight's built-in light/dark/auto toggle in the header. No custom code needed.

## Content structure

All pages live under `src/content/docs/`. File path = route path.

```txt
src/content/docs/
├── index.md                        # Introduction
├── why.md                          # Why glib-code
├── concepts/
│   ├── review-first.md
│   ├── sessions.md
│   ├── promote.md
│   ├── providers.md
│   └── gittrix.md
├── surfaces/
│   ├── web.md
│   ├── server.md
│   └── desktop.md
├── api/
│   ├── providers.md
│   ├── agent.md
│   ├── sessions.md
│   └── diff.md
└── guides/
    ├── getting-started.md
    ├── run-locally.md
    └── gittrix-integration.md
```

Frontmatter convention (every page):

```md
---
title: Page Title
description: One-sentence summary used for SEO + sidebar.
---
```

## Logos

- `glib-code-logo.png` — dark wordmark for light mode.
- `glib-code-logo-dark.png` — light wordmark for dark mode.
- Same lavender/mauve treatment seen in the project picker UI.
- `replacesTitle: true` so the logo replaces the text title in the header.

---

## Local development

### Requirements

- Bun 1.x

### Install

```bash
bun install
```

### Run

```bash
bun run dev       # local dev server at :4321
bun run build     # build to ./dist
bun run preview   # preview the built site locally
bun run astro     # invoke the Astro CLI (e.g. bun run astro check)
```

## Deployment

Cloudflare Pages via `wrangler.toml`, matching gittrix-docs:

- Build command: `bun run build`
- Output directory: `dist`
- Root domain: `glibcode.com`
- Branch deploys: `main` → production, PRs → preview URLs.

---

## Build order

1. Scaffold with `bun create astro@latest -- --template starlight`.
2. `bun add @catppuccin/starlight`.
3. Drop in glib-code logos (light + dark).
4. Wire `astro.config.mjs` per the block above.
5. Stub all pages listed under "Content structure" with frontmatter only — empty body is fine, sidebar will still render.
6. Fill in `index.md` (Introduction) and `why.md` first — these are the landing surfaces.
7. Fill in the three surface pages: `surfaces/web.md`, `surfaces/server.md`, `surfaces/desktop.md`.
8. Fill in the four API reference pages from the glib-code spec's API tables.
9. Fill in concepts.
10. Fill in guides.
11. Add `wrangler.toml`, deploy to Cloudflare Pages, point `glibcode.com` at it.

## Out of scope (v1)

- Versioned docs (no `/v1/`, `/v2/` routes yet).
- i18n.
- Custom React/Vue components inside MDX.
- Algolia or other external search.
- Mermaid diagrams (can add via `astro-mermaid` later if needed).

## Open questions

- Logo: reuse the lavender wordmark from the desktop screenshot, or commission a tighter docs-specific mark?
- Accent color: `mauve` matches the wordmark, but `lavender` or `pink` could also work — easy to swap later.
- Search: Starlight's built-in pagefind covers v1; revisit if content grows past ~50 pages.