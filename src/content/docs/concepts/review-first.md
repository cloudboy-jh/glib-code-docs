---
title: Review-first loop
description: The core glib-code loop for generating, reviewing, and promoting agent changes.
---

The review-first loop keeps generated work separate from accepted work until the diff has been inspected.

The loop is intentionally boring: start a session, let the agent work, review the diff, then either promote or revise. Anything else is how agent workflows turn into cleanup workflows.

```mermaid
flowchart LR
  Prompt["Prompt"] --> Session["Agent session"]
  Session --> Work["Ephemeral work"]
  Work --> Diff["Review diff"]
  Diff -->|Accept| Promote["Promote changes"]
  Diff -->|Revise| Session
  Diff -->|Reject| Discard["Discard session"]
  Promote --> Workspace["Workspace"]

  classDef input fill:#89b4fa,stroke:#74c7ec,color:#11111b,stroke-width:2px
  classDef session fill:#cba6f7,stroke:#f5c2e7,color:#11111b,stroke-width:2px
  classDef review fill:#f9e2af,stroke:#fab387,color:#11111b,stroke-width:2px
  classDef done fill:#a6e3a1,stroke:#94e2d5,color:#11111b,stroke-width:2px
  classDef reject fill:#f38ba8,stroke:#eba0ac,color:#11111b,stroke-width:2px

  class Prompt input
  class Session,Work session
  class Diff review
  class Promote,Workspace done
  class Discard reject
```

## Steps

### 1. Start a session

A session captures the task, model/provider choice, project context, and working boundary.

### 2. Generate isolated work

The agent edits inside an isolated workspace. The real repo is not the write target.

### 3. Review the diff

The human reviews the generated output as a proposal. This is the control point.

### 4. Promote accepted changes

Promotion applies only the accepted output to the target workspace.

## Bad signs

- The agent can write directly to durable state.
- The review happens after changes are already mixed into the repo.
- Rejected work has to be manually untangled.
- Provider/model choice is hidden from the session record.
