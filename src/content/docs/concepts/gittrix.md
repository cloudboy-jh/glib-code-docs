---
title: GitTrix isolation
description: How GitTrix isolation supports safe review-first agent work.
---

GitTrix isolation keeps generated changes reviewable before they are promoted. glib-code can use GitTrix as the storage boundary between ephemeral agent work and durable project history.

## Boundary

```mermaid
flowchart TD
  Baseline["Durable baseline"] --> Session["glib-code session"]
  Session --> Ephemeral["GitTrix ephemeral workspace"]
  Ephemeral --> Agent["Agent commits"]
  Agent --> Diff["Generated diff"]
  Diff --> Promote["Promote accepted changes"]
  Promote --> Durable["Durable repo"]

  classDef durable fill:#a6e3a1,stroke:#94e2d5,color:#11111b,stroke-width:2px
  classDef session fill:#cba6f7,stroke:#f5c2e7,color:#11111b,stroke-width:2px
  classDef ephemeral fill:#89b4fa,stroke:#74c7ec,color:#11111b,stroke-width:2px
  classDef review fill:#f9e2af,stroke:#fab387,color:#11111b,stroke-width:2px

  class Baseline,Durable durable
  class Session session
  class Ephemeral,Agent ephemeral
  class Diff,Promote review
```

## Responsibilities

- glib-code owns the agent workflow and review surface.
- GitTrix owns the storage isolation and promotion mechanics.
- The human owns the final accept/reject decision.

## Why this split works

The agent gets a real workspace to modify, but the durable repo stays protected until promotion.
