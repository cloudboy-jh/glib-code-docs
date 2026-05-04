---
title: GitTrix integration
description: Connect glib-code workflows to GitTrix isolation.
---

GitTrix provides isolated workspaces for review-first agent changes.

## Integration shape

```mermaid
flowchart TD
  Glib["glib-code"] --> Start["Start session"]
  Start --> GitTrix["GitTrix"]
  GitTrix --> Ephemeral["Ephemeral repo"]
  Ephemeral --> Diff["Diff"]
  Diff --> Promote["Promote"]
  Promote --> Durable["Durable repo"]

  classDef glib fill:#cba6f7,stroke:#f5c2e7,color:#11111b,stroke-width:2px
  classDef gittrix fill:#89b4fa,stroke:#74c7ec,color:#11111b,stroke-width:2px
  classDef review fill:#f9e2af,stroke:#fab387,color:#11111b,stroke-width:2px
  classDef durable fill:#a6e3a1,stroke:#94e2d5,color:#11111b,stroke-width:2px

  class Glib,Start glib
  class GitTrix,Ephemeral gittrix
  class Diff,Promote review
  class Durable durable
```

## Contract

- glib-code asks for an isolated session workspace.
- GitTrix provides the ephemeral storage boundary.
- The agent writes inside that boundary.
- glib-code shows the diff for review.
- GitTrix promotes accepted changes to durable storage.

## Result

The agent gets freedom inside the session, while durable project history stays controlled by the human review gate.
