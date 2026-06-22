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

  classDef local fill:#3a3a3a,stroke:#b3b3b3,color:#f2f2f2,stroke-width:2px
  classDef core fill:#3a3a3a,stroke:#b3b3b3,color:#f2f2f2,stroke-width:2px
  classDef ext fill:#5a5a5a,stroke:#d4d4d4,color:#f2f2f2,stroke-width:2px

  class Dev,Bun local
  class Web,Server,Runtime core
  class Provider ext
```
