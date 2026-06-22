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

  classDef client fill:#3a3a3a,stroke:#b3b3b3,color:#f2f2f2,stroke-width:2px
  classDef server fill:#3a3a3a,stroke:#b3b3b3,color:#f2f2f2,stroke-width:2px
  classDef review fill:#5a5a5a,stroke:#d4d4d4,color:#f2f2f2,stroke-width:2px
  classDef safe fill:#4a5a2a,stroke:#8aaa4a,color:#f2f2f2,stroke-width:2px

  class Client client
  class API,Sessions,Providers,Agent server
  class Diff review
  class Promote safe
```
