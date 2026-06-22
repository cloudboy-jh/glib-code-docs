---
title: Getting Started
description: Start from project state, run isolated sessions, review diffs, then promote approved files.
---

1. Open or clone a repository.
2. Choose **Diffs** or **Session** entry mode.
3. In Diffs mode, review working tree/commit diffs.
4. Start or continue a session.
5. Let the agent work in isolated GitTrix workspace.
6. Review session-produced diff.
7. Promote approved files back to durable repo.

```mermaid
flowchart LR
  Repo["Open/Clone Repo"] --> Mode{"Choose mode"}
  Mode --> Diffs["Diffs mode"]
  Mode --> Session["Session mode"]
  Diffs --> ReviewBase["Review baseline diffs"]
  Session --> Start["Start/continue session"]
  ReviewBase --> Start
  Start --> Work["Agent writes in GitTrix ephemeral workspace"]
  Work --> Review["Review session diff"]
  Review --> Promote["Promote approved files"]
  Promote --> Durable["Durable repo"]

  classDef surface fill:#3a3a3a,stroke:#b3b3b3,color:#f2f2f2,stroke-width:2px
  classDef core fill:#3a3a3a,stroke:#b3b3b3,color:#f2f2f2,stroke-width:2px
  classDef review fill:#5a5a5a,stroke:#d4d4d4,color:#f2f2f2,stroke-width:2px
  classDef durable fill:#4a5a2a,stroke:#8aaa4a,color:#f2f2f2,stroke-width:2px

  class Repo,Mode,Diffs,Session surface
  class Start,Work core
  class ReviewBase,Review,Promote review
  class Durable durable
```

Use [Review-first loop](/concepts/review-first/) for the core workflow contract.
