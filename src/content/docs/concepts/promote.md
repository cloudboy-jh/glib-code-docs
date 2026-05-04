---
title: Promote
description: How reviewed changes move from isolated agent work into the target workspace.
---

Promotion applies reviewed session output to the destination workspace. It is the point where isolated generated work becomes durable work.

## Promotion gate

```mermaid
flowchart TD
  Diff["Reviewed diff"] --> Gate{"Human accepts?"}
  Gate -->|Yes| Apply["Apply accepted changes"]
  Gate -->|No| Stop["Do not touch target"]
  Apply --> Target["Target workspace"]
  Target --> Record["Promotion record"]

  classDef review fill:#f9e2af,stroke:#fab387,color:#11111b,stroke-width:2px
  classDef gate fill:#cba6f7,stroke:#f5c2e7,color:#11111b,stroke-width:2px
  classDef safe fill:#a6e3a1,stroke:#94e2d5,color:#11111b,stroke-width:2px
  classDef rejected fill:#f38ba8,stroke:#eba0ac,color:#11111b,stroke-width:2px

  class Diff review
  class Gate gate
  class Apply,Target,Record safe
  class Stop rejected
```

## Promotion should preserve

- Which session produced the changes.
- Which diff was accepted.
- Which target workspace received the changes.
- Whether the apply completed cleanly.

## Promotion should not do

- Promote unreviewed work.
- Silently merge conflicts.
- Hide generated changes inside unrelated edits.
- Let providers bypass the human gate.
