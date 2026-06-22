---
title: Getting Started
description: Install glib-code or run it from source, add a provider key, then open a repo and start a review-first session.
---

## Install

Grab the latest installer for your platform from the [releases page](https://github.com/cloudboy-jh/glib-code/releases/latest):

| Platform | File |
| --- | --- |
| Windows | `glib-code-Setup-x.y.z.exe` |
| macOS | `glib-code-x.y.z-arm64.dmg` |
| Linux | `glib-code-x.y.z.AppImage` |

## Run from source

Requirements: **Bun 1.x**, **Git**, the **pi** CLI, and at least one provider API key (OpenAI, Anthropic, or any compatible provider).

```bash
bun install
bun run dev:desktop
```

`dev:desktop` starts the API server, Vite, and Electron together. DevTools open automatically in dev.

- API: `http://127.0.0.1:4273`
- Web: `http://127.0.0.1:5173`

Other entry points:

```bash
bun run dev:server   # API server only
bun run dev:web      # Vite only
bun run dev          # server + web (no Electron), open http://127.0.0.1:5173
```

## First session

```mermaid
flowchart LR
  Open["Open / clone repo"] --> Key["Add provider key"]
  Key --> Start["Start session"]
  Start --> Work["Agent edits sandbox"]
  Work --> Review["Review session diff"]
  Review --> Promote["Promote accepted files"]

  classDef setup fill:#3a3a3a,stroke:#b3b3b3,color:#f2f2f2,stroke-width:2px
  classDef review fill:#5a5a5a,stroke:#d4d4d4,color:#f2f2f2,stroke-width:2px

  class Open,Key,Start,Work setup
  class Review,Promote review
```

1. Open or clone a Git repository from the picker.
2. Add a provider key in **Settings → Models** (you can review diffs without one, but agent sessions need it).
3. Choose **Diff** or **Session** mode when opening the project.
4. Start a session and prompt the agent. It works in an isolated GitTrix workspace — your real checkout stays untouched.
5. Review the full session diff.
6. Promote the files you accept back to durable, optionally committing and pushing.

Provider keys are stored under glib-code's app config (`<configDir>/pi/auth.json`), never in your repo.

See [Review-first loop](/concepts/review-first/) for the full workflow contract.
