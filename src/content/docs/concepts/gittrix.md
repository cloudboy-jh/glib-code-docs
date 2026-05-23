---
title: GitTrix isolation
description: GitTrix provides the durable/ephemeral boundary for safe agent edits.
---

GitTrix provides durable/ephemeral boundary:

- durable: local repo (or configured durable adapter)
- ephemeral: session workspace for agent edits
- promote: controlled copy/commit back to durable

## Durable vs ephemeral boundary

```mermaid
flowchart TD
  Durable["Durable repo"] --> Seed["Seed session workspace"]
  Seed --> Ephemeral["GitTrix ephemeral workspace"]
  Ephemeral --> Agent["Agent edits"]
  Agent --> Diff["Session diff"]
  Diff --> Promote["Controlled promote"]
  Promote --> Durable

  classDef durable fill:#a6e3a1,stroke:#94e2d5,color:#11111b,stroke-width:2px
  classDef session fill:#cba6f7,stroke:#f5c2e7,color:#11111b,stroke-width:2px
  classDef ephemeral fill:#89b4fa,stroke:#74c7ec,color:#11111b,stroke-width:2px
  classDef review fill:#f9e2af,stroke:#fab387,color:#11111b,stroke-width:2px

  class Durable durable
  class Seed session
  class Ephemeral,Agent ephemeral
  class Diff,Promote review
```
