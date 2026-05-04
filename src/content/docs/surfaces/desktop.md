---
title: Desktop
description: The glib-code desktop surface for local project workflows.
---

The desktop surface connects local projects to the review-first glib-code workflow. It is for developers who want agent sessions close to their local workspace without giving the agent unrestricted write access.

## What it should do

- Detect and register local projects.
- Start sessions from a selected workspace.
- Display local-aware review state.
- Promote accepted changes into the local project.
- Keep server/provider settings visible.

```mermaid
flowchart TD
  Local["Local project"] --> Desktop["Desktop app"]
  Desktop --> Server["glib-code server"]
  Server --> Session["Agent session"]
  Session --> Diff["Review diff"]
  Diff --> Promote["Promote locally"]
  Promote --> Local

  classDef local fill:#a6e3a1,stroke:#94e2d5,color:#11111b,stroke-width:2px
  classDef app fill:#89b4fa,stroke:#74c7ec,color:#11111b,stroke-width:2px
  classDef core fill:#cba6f7,stroke:#f5c2e7,color:#11111b,stroke-width:2px
  classDef review fill:#f9e2af,stroke:#fab387,color:#11111b,stroke-width:2px

  class Local,Promote local
  class Desktop app
  class Server,Session core
  class Diff review
```

## Desktop invariant

The desktop app can be close to the filesystem, but the review gate still has to stay in front of promotion.
