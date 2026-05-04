---
title: Sessions
description: How glib-code groups agent activity, context, and generated changes.
---

A session is the unit of agent work in glib-code. It ties together the prompt, selected provider/model, workspace boundary, generated changes, review state, and promotion result.

## Lifecycle

```mermaid
stateDiagram-v2
  [*] --> Created
  Created --> Running: start agent
  Running --> Reviewable: diff ready
  Reviewable --> Promoted: accepted
  Reviewable --> Running: revise
  Reviewable --> Rejected: discard
  Promoted --> [*]
  Rejected --> [*]

  classDef created fill:#89b4fa,stroke:#74c7ec,color:#11111b,stroke-width:2px
  classDef active fill:#cba6f7,stroke:#f5c2e7,color:#11111b,stroke-width:2px
  classDef review fill:#f9e2af,stroke:#fab387,color:#11111b,stroke-width:2px
  classDef done fill:#a6e3a1,stroke:#94e2d5,color:#11111b,stroke-width:2px
  classDef bad fill:#f38ba8,stroke:#eba0ac,color:#11111b,stroke-width:2px

  class Created created
  class Running active
  class Reviewable review
  class Promoted done
  class Rejected bad
```

## What belongs in a session

- The user task and current prompt trail.
- Provider/model authority for the run.
- Project identity and baseline reference.
- Generated file changes.
- Review status.
- Promotion metadata.

## Why sessions matter

Sessions make generated work auditable. Instead of asking “what did the agent just do to my repo,” you can inspect one bounded unit of work and decide what happens next.
