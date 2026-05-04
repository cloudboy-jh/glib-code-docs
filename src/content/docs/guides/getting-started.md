---
title: Getting Started
description: Start using glib-code for review-first agent development.
---

Start a session, let the agent produce changes, review the diff, then promote the accepted work.

## Workflow

```mermaid
flowchart LR
  Project["Choose project"] --> Session["Start session"]
  Session --> Prompt["Send prompt"]
  Prompt --> Review["Review diff"]
  Review --> Promote["Promote accepted work"]

  classDef start fill:#89b4fa,stroke:#74c7ec,color:#11111b,stroke-width:2px
  classDef core fill:#cba6f7,stroke:#f5c2e7,color:#11111b,stroke-width:2px
  classDef review fill:#f9e2af,stroke:#fab387,color:#11111b,stroke-width:2px
  classDef done fill:#a6e3a1,stroke:#94e2d5,color:#11111b,stroke-width:2px

  class Project start
  class Session,Prompt core
  class Review review
  class Promote done
```

## First session checklist

1. Pick the project you want the agent to work against.
2. Pick the provider/model for the run.
3. Describe the task narrowly.
4. Wait for a reviewable diff.
5. Promote only what you want to keep.

## Prompting rule

Ask for one reviewable change at a time. Big vague prompts create big vague diffs.
