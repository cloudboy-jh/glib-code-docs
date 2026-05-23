---
title: Run locally
description: Run glib-code web and server locally with Bun.
---

Requirements:

- Bun
- Git
- pi runtime/CLI
- provider key for agent sessions

Commands:

```bash
bun install
bun run dev
```

Defaults:

- API: `http://127.0.0.1:4273`
- Web: `http://127.0.0.1:5173`

```mermaid
flowchart LR
  Dev["Developer machine"] --> Bun["Bun runtime"]
  Bun --> Web["Web :5173"]
  Bun --> Server["API :4273"]
  Server --> Runtime["pi runtime/CLI"]
  Runtime --> Provider["Provider API"]

  classDef local fill:#89b4fa,stroke:#74c7ec,color:#11111b,stroke-width:2px
  classDef core fill:#cba6f7,stroke:#f5c2e7,color:#11111b,stroke-width:2px
  classDef ext fill:#f9e2af,stroke:#fab387,color:#11111b,stroke-width:2px

  class Dev,Bun local
  class Web,Server,Runtime core
  class Provider ext
```
