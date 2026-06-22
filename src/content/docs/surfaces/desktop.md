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

  classDef local fill:#4a5a2a,stroke:#8aaa4a,color:#f2f2f2,stroke-width:2px
  classDef app fill:#3a3a3a,stroke:#b3b3b3,color:#f2f2f2,stroke-width:2px
  classDef core fill:#3a3a3a,stroke:#b3b3b3,color:#f2f2f2,stroke-width:2px
  classDef review fill:#5a5a5a,stroke:#d4d4d4,color:#f2f2f2,stroke-width:2px

  class Local,Promote local
  class Desktop app
  class Server,Session core
  class Diff review
```
