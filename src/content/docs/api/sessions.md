---
title: Sessions
description: API reference for session lifecycle and state.
---

Session APIs create, inspect, and manage agent work sessions.

## Resource shape

```ts
type Session = {
  id: string
  status: 'created' | 'running' | 'reviewable' | 'promoted' | 'rejected'
  providerId: string
  modelId: string
  projectId: string
  createdAt: string
  updatedAt: string
}
```

## Common operations

- Create a session.
- Get session status.
- List session events.
- Request revision.
- Mark review decision.

## State flow

```mermaid
flowchart LR
  Create["Create"] --> Run["Run"]
  Run --> Review["Reviewable"]
  Review --> Promote["Promoted"]
  Review --> Reject["Rejected"]

  classDef start fill:#89b4fa,stroke:#74c7ec,color:#11111b,stroke-width:2px
  classDef active fill:#cba6f7,stroke:#f5c2e7,color:#11111b,stroke-width:2px
  classDef review fill:#f9e2af,stroke:#fab387,color:#11111b,stroke-width:2px
  classDef done fill:#a6e3a1,stroke:#94e2d5,color:#11111b,stroke-width:2px
  classDef bad fill:#f38ba8,stroke:#eba0ac,color:#11111b,stroke-width:2px

  class Create start
  class Run active
  class Review review
  class Promote done
  class Reject bad
```
