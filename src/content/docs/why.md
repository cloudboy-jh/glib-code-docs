---
title: Why glib-code
description: glib-code is review-first by design, not prompt-first and review-later.
---

Most agent tools are prompt-first and review-later.

glib-code is review-first by design:

- inspect real diffs before and after agent work
- keep agent writes isolated from durable repo
- require explicit promotion of accepted changes
- keep provider/model choice explicit, not ambient
- allow diff/project workflows without provider keys

## Prompt-first failure mode

Direct agent writes make it too easy to pollute working directories, branch history, and review flow. Once generated changes are mixed into durable work, the human has to clean up after the agent instead of reviewing a controlled proposal.

```mermaid
flowchart LR
  Prompt["Prompt"] --> Agent["Agent writes files"]
  Agent --> Repo["Durable repo"]
  Repo --> Mess["Mixed changes"]
  Mess --> Cleanup["Manual cleanup"]

  classDef bad fill:#5a2a2a,stroke:#aa6a6a,color:#f2f2f2,stroke-width:2px
  classDef neutral fill:#4a4a4a,stroke:#a6a6a6,color:#f2f2f2,stroke-width:2px

  class Agent,Repo,Mess,Cleanup bad
  class Prompt neutral
```

## Review-first path

glib-code makes the agent produce a proposal instead of directly mutating durable state. The human reviews the proposal, then promotes it if it is worth keeping.

```mermaid
flowchart LR
  Prompt["Prompt"] --> Session["Isolated session"]
  Session --> Diff["Review diff"]
  Diff --> Decision{"Accept?"}
  Decision -->|Yes| Promote["Promote"]
  Decision -->|No| Revise["Revise or discard"]
  Promote --> Repo["Real repo"]

  classDef core fill:#3a3a3a,stroke:#b3b3b3,color:#f2f2f2,stroke-width:2px
  classDef review fill:#5a5a5a,stroke:#d4d4d4,color:#f2f2f2,stroke-width:2px
  classDef safe fill:#4a5a2a,stroke:#8aaa4a,color:#f2f2f2,stroke-width:2px
  classDef discard fill:#4a4a4a,stroke:#a6a6a6,color:#f2f2f2,stroke-width:2px

  class Prompt,Session core
  class Diff,Decision review
  class Promote,Repo safe
  class Revise discard
```

## Outcome

- agent output stays reviewable
- human approval remains the gate
- durable history stays cleaner
- bad generations are cheap to discard
- good generations are easy to promote
