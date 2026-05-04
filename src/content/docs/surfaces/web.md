---
title: Web
description: The glib-code web surface for managing agent sessions and review flows.
---

The web surface is the browser UI for managing sessions, reviewing diffs, and promoting accepted work.

## What it owns

- Starting and resuming sessions.
- Showing agent progress.
- Rendering reviewable diffs.
- Capturing accept/reject decisions.
- Calling server APIs for promotion.

```mermaid
flowchart TD
  Browser["Browser"] --> Sessions["Session list"]
  Browser --> Review["Diff review"]
  Review --> Decision{"Accept changes?"}
  Decision -->|Yes| Promote["Promote request"]
  Decision -->|No| Revise["Ask agent to revise"]
  Promote --> Server["glib-code server"]
  Revise --> Server

  classDef ui fill:#89b4fa,stroke:#74c7ec,color:#11111b,stroke-width:2px
  classDef review fill:#f9e2af,stroke:#fab387,color:#11111b,stroke-width:2px
  classDef server fill:#cba6f7,stroke:#f5c2e7,color:#11111b,stroke-width:2px
  classDef safe fill:#a6e3a1,stroke:#94e2d5,color:#11111b,stroke-width:2px

  class Browser,Sessions ui
  class Review,Decision review
  class Server server
  class Promote,Revise safe
```

## Design rule

The web app should make the review gate obvious. If the user cannot tell whether work has been promoted, the UI is wrong.
