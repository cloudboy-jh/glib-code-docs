---
title: Promote
description: The explicit, guarded transfer of accepted changes from the ephemeral workspace to your durable repo.
---

**Promote** is the only path from the ephemeral session workspace to your durable repo. It is always explicit — nothing crosses the boundary automatically.

```mermaid
flowchart LR
  Diff["Compute session diff"] --> Select["Select files / hunks"]
  Select --> Guard{"Baseline + dirty checks"}
  Guard -->|clean| Commit["Commit to durable"]
  Guard -->|conflict| Resolve["Structured conflict payload"]
  Commit --> Push["Optional push"]

  classDef review fill:#5a5a5a,stroke:#d4d4d4,color:#f2f2f2,stroke-width:2px
  classDef safe fill:#4a5a2a,stroke:#8aaa4a,color:#f2f2f2,stroke-width:2px
  classDef bad fill:#5a2a2a,stroke:#aa6a6a,color:#f2f2f2,stroke-width:2px

  class Diff,Select,Guard review
  class Commit,Push safe
  class Resolve bad
```

## Flow

1. Compute the session diff (ephemeral workspace vs durable baseline).
2. Select the files to keep — `Commit all` or `Commit selected`.
3. Guards run before any mutation.
4. Commit the accepted payload to durable; optionally push when the branch has an upstream.

## Guards

- **Baseline drift** returns a `409` with a structured conflict payload rather than clobbering durable state.
- **Dirty durable files** that overlap the promote set are blocked, with stash-and-continue offered.
- Protected `.glib/**` paths are rejected from stage/commit/discard operations.

Durable targets can be your **local repo** or a **GitHub** durable adapter. GitHub promote uses app-managed auth first, then `GITHUB_TOKEN` / `GH_TOKEN` / `gh auth token` fallback.
