---
title: Web
description: Vue/Vite surface for project picker, diff workbench, sessions, and promote UI.
---

Vue/Vite app for project picker, diff workbench, sessions, and promote UI.

## Key UX points

- mode selection on project open (Diffs vs Session)
- inline mode cards in recent projects
- typed tool-call rendering in timeline
- diff rendering through Pierre (`@pierre/diffs`)
- in-app destructive confirmations (session delete)

```mermaid
flowchart LR
  User["Developer"] --> Web["Web"]
  Web --> Server["Server"]
  Server --> Web
  Web --> Review["Diff review + promote UI"]

  classDef ui fill:#89b4fa,stroke:#74c7ec,color:#11111b,stroke-width:2px
  classDef review fill:#f9e2af,stroke:#fab387,color:#11111b,stroke-width:2px
  classDef server fill:#cba6f7,stroke:#f5c2e7,color:#11111b,stroke-width:2px
  classDef safe fill:#a6e3a1,stroke:#94e2d5,color:#11111b,stroke-width:2px

  class User,Web ui
  class Review review
  class Server server
```
