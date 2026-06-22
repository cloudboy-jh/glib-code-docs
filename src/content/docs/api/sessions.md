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

  classDef start fill:#3a3a3a,stroke:#b3b3b3,color:#f2f2f2,stroke-width:2px
  classDef active fill:#3a3a3a,stroke:#b3b3b3,color:#f2f2f2,stroke-width:2px
  classDef review fill:#5a5a5a,stroke:#d4d4d4,color:#f2f2f2,stroke-width:2px
  classDef done fill:#4a5a2a,stroke:#8aaa4a,color:#f2f2f2,stroke-width:2px
  classDef bad fill:#5a2a2a,stroke:#aa6a6a,color:#f2f2f2,stroke-width:2px

  class Create start
  class Run active
  class Review review
  class Promote done
  class Reject bad
```
