---
title: Review-first loop
description: Start from real repo state, run in isolation, review the diff, then promote accepted output.
---

The review-first loop is glib-code's core contract. The agent produces a **proposal**, not a direct mutation. You review it, then promote only what you accept.

```mermaid
flowchart LR
  State["Real repo state"] --> Isolate["Run agent in isolation"]
  Isolate --> Diff["Review session diff"]
  Diff --> Decision{"Accept?"}
  Decision -->|Yes| Promote["Promote selected files"]
  Decision -->|No| Drop["Revise or discard"]
  Promote --> Clean["Durable repo stays clean"]

  classDef core fill:#3a3a3a,stroke:#b3b3b3,color:#f2f2f2,stroke-width:2px
  classDef review fill:#5a5a5a,stroke:#d4d4d4,color:#f2f2f2,stroke-width:2px
  classDef safe fill:#4a5a2a,stroke:#8aaa4a,color:#f2f2f2,stroke-width:2px
  classDef discard fill:#4a4a4a,stroke:#a6a6a6,color:#f2f2f2,stroke-width:2px

  class State,Isolate core
  class Diff,Decision review
  class Promote,Clean safe
  class Drop discard
```

1. **Start from real repo state.** Browse working-tree and commit diffs before prompting — no provider key needed for this.
2. **Run the agent in isolation.** Edits land in an ephemeral GitTrix workspace, never your durable checkout.
3. **Review the diff.** The full session diff shows exactly what changed, file by file.
4. **Promote accepted output.** Commit only the files you keep; optionally push.
5. **Durable history stays clean.** Bad generations are cheap to discard; good ones are easy to promote.
