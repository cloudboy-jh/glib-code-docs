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

  classDef bad fill:#f38ba8,stroke:#eba0ac,color:#11111b,stroke-width:2px
  classDef neutral fill:#9399b2,stroke:#bac2de,color:#11111b,stroke-width:2px

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

  classDef core fill:#cba6f7,stroke:#f5c2e7,color:#11111b,stroke-width:2px
  classDef review fill:#f9e2af,stroke:#fab387,color:#11111b,stroke-width:2px
  classDef safe fill:#a6e3a1,stroke:#94e2d5,color:#11111b,stroke-width:2px
  classDef discard fill:#9399b2,stroke:#bac2de,color:#11111b,stroke-width:2px

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
