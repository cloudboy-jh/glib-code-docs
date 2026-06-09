---
title: Sessions
description: Session listing, detail, diff, promote, and lifecycle endpoints.
---

## Endpoints

- `GET /api/sessions`
- `GET /api/sessions?scope=all`
- `GET /api/sessions/:id?projectPath=...`
- `GET /api/sessions/:id/export?format=...`
- `POST /api/sessions/:id/fork`
- `PATCH /api/sessions/:id`
- `DELETE /api/sessions/:id`
- `GET /api/sessions/:id/diff?projectPath=...`
- `POST /api/sessions/:id/promote?projectPath=...`
- `POST /api/sessions/:id/evict`

Session timeline includes user turns, assistant output, tool calls, errors, and turn lifecycle events.

## State flow

```mermaid
flowchart LR
  Create["Create"] --> Run["Run"]
  Run --> Review["Reviewable"]
  Review --> Promote["Promoted"]
  Review --> Reject["Rejected"]

  classDef start fill:#89b4fa,stroke:#74c7ec,color:#11111b,stroke-width:2px
  classDef active fill:#cba6f7,stroke:#f5c2e7,color:#11111b,stroke-width:2px
  classDef review fill:#f9e2af,stroke:#fab387,color:#11111b,stroke-width:2px
  classDef done fill:#a6e3a1,stroke:#94e2d5,color:#11111b,stroke-width:2px
  classDef bad fill:#f38ba8,stroke:#eba0ac,color:#11111b,stroke-width:2px

  class Create start
  class Run active
  class Review review
  class Promote done
  class Reject bad
```
