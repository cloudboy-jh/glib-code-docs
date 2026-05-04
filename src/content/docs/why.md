---
title: Why glib-code
description: Why glib-code exists and how it keeps AI-assisted development reviewable.
---

glib-code is built around one rule: review comes before promotion.

Agents can explore, edit, and propose changes, but those changes should not land in the real repo by default. glib-code gives generated work a safe place to exist until a human accepts it.

## The failure mode

Direct agent writes make it too easy to pollute working directories, branch history, and review flow. Once generated changes are mixed into durable work, the human has to clean up after the agent instead of reviewing a controlled proposal.

```mermaid
flowchart LR
  Prompt["Prompt"] --> Agent["Agent writes files"]
  Agent --> Repo["Real repo"]
  Repo --> Mess["Mixed changes"]
  Mess --> Cleanup["Manual cleanup"]

  classDef bad fill:#f38ba8,stroke:#eba0ac,color:#11111b,stroke-width:2px
  classDef neutral fill:#9399b2,stroke:#bac2de,color:#11111b,stroke-width:2px

  class Agent,Repo,Mess,Cleanup bad
  class Prompt neutral
```

## The glib-code path

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

## Why this matters

- Agent output stays reviewable.
- Human approval remains the gate.
- Durable history stays cleaner.
- Bad generations are cheap to throw away.
- Good generations are easy to promote.
