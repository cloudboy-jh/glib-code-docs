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

  classDef ui fill:#3a3a3a,stroke:#b3b3b3,color:#f2f2f2,stroke-width:2px
  classDef review fill:#5a5a5a,stroke:#d4d4d4,color:#f2f2f2,stroke-width:2px
  classDef server fill:#3a3a3a,stroke:#b3b3b3,color:#f2f2f2,stroke-width:2px
  classDef safe fill:#4a5a2a,stroke:#8aaa4a,color:#f2f2f2,stroke-width:2px

  class User,Web ui
  class Review review
  class Server server
```
