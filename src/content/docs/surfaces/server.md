---
title: Server
description: Bun/Hono API for sessions, agent runtime, diff, providers, and promote.
---

Bun/Hono API for sessions, agent runtime, diff, providers, and promote.

## Responsibilities

- session metadata/event persistence
- SSE replay + stream
- agent event normalization
- structured tool result typing (`resultType`, `summary`, `artifact`)
- GitTrix session orchestration

```mermaid
flowchart LR
  Client["Web / Desktop"] --> API["Server API"]
  API --> Sessions["Session store"]
  API --> Providers["Provider/model authority"]
  Providers --> Agent["Agent runtime"]
  Agent --> Diff["Diff store"]
  API --> Promote["Promote service"]

  classDef client fill:#89b4fa,stroke:#74c7ec,color:#11111b,stroke-width:2px
  classDef server fill:#cba6f7,stroke:#f5c2e7,color:#11111b,stroke-width:2px
  classDef review fill:#f9e2af,stroke:#fab387,color:#11111b,stroke-width:2px
  classDef safe fill:#a6e3a1,stroke:#94e2d5,color:#11111b,stroke-width:2px

  class Client client
  class API,Sessions,Providers,Agent server
  class Diff review
  class Promote safe
```
