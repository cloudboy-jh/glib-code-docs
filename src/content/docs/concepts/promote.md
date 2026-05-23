---
title: Promote
description: Explicit transfer from ephemeral session workspace to durable repo.
---

Promote is explicit transfer from ephemeral session workspace to durable repo.

Current flow:

- compute session diff
- select files
- commit promote payload
- optionally push when upstream/backing mode allows

Conflict/dirty protections are enforced before mutation.

## Promote pipeline with safety checks

```mermaid
flowchart TD
  Diff["Compute session diff"] --> Select["Select files"]
  Select --> Checks{"Dirty/conflict checks pass?"}
  Checks -->|Yes| Commit["Commit promote payload"]
  Checks -->|No| Stop["Block mutation"]
  Commit --> Push{"Push allowed?"}
  Push -->|Yes| Remote["Push upstream"]
  Push -->|No| Done["Local promote complete"]

  classDef review fill:#f9e2af,stroke:#fab387,color:#11111b,stroke-width:2px
  classDef gate fill:#cba6f7,stroke:#f5c2e7,color:#11111b,stroke-width:2px
  classDef safe fill:#a6e3a1,stroke:#94e2d5,color:#11111b,stroke-width:2px
  classDef rejected fill:#f38ba8,stroke:#eba0ac,color:#11111b,stroke-width:2px

  class Diff,Select review
  class Checks,Push gate
  class Commit,Remote,Done safe
  class Stop rejected
```
