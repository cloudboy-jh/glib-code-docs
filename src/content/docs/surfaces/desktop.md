---
title: Desktop
description: Electron shell wrapping web/server workflow with native integrations.
---

Electron shell wrapping web/server workflow with native integrations (for example, folder picker).

## Focus

- local project selection
- native filesystem affordances
- same review-first/promotion workflow as web

```mermaid
flowchart TD
  Local["Local project"] --> Desktop["Desktop"]
  Desktop --> Server["Server"]
  Server --> Session["Agent session"]
  Session --> Diff["Review diff"]
  Diff --> Promote["Promote approved files"]
  Promote --> Local

  classDef local fill:#a6e3a1,stroke:#94e2d5,color:#11111b,stroke-width:2px
  classDef app fill:#89b4fa,stroke:#74c7ec,color:#11111b,stroke-width:2px
  classDef core fill:#cba6f7,stroke:#f5c2e7,color:#11111b,stroke-width:2px
  classDef review fill:#f9e2af,stroke:#fab387,color:#11111b,stroke-width:2px

  class Local,Promote local
  class Desktop app
  class Server,Session core
  class Diff review
```
