---
title: Server
description: The glib-code server surface that coordinates sessions, providers, and diffs.
---

The server coordinates session state, provider execution, diff storage, and promotion requests. It is the control plane for the review-first workflow.

## Responsibilities

- Create and track sessions.
- Enforce provider/model authority.
- Dispatch agent work.
- Store session output and diff metadata.
- Validate and execute promotion requests.

```mermaid
flowchart LR
  Client["Web / Desktop"] --> API["Server API"]
  API --> Sessions["Session store"]
  API --> Policy["Provider policy"]
  Policy --> Provider["Provider"]
  Provider --> Agent["Agent runner"]
  Agent --> Diff["Diff store"]
  API --> Promote["Promotion service"]

  classDef client fill:#89b4fa,stroke:#74c7ec,color:#11111b,stroke-width:2px
  classDef server fill:#cba6f7,stroke:#f5c2e7,color:#11111b,stroke-width:2px
  classDef review fill:#f9e2af,stroke:#fab387,color:#11111b,stroke-width:2px
  classDef safe fill:#a6e3a1,stroke:#94e2d5,color:#11111b,stroke-width:2px

  class Client client
  class API,Sessions,Policy,Provider,Agent server
  class Diff review
  class Promote safe
```

## Server invariant

No promotion should run without a session, a diff, and an explicit accept decision.
