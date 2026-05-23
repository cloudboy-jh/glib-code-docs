---
title: Sessions
description: Session is the unit of agent work plus timeline and isolated workspace mapping.
---

Session = unit of agent work + timeline + isolated workspace mapping.

Current behavior:

- create: `POST /api/agent/sessions`
- send: `POST /api/agent/sessions/:id/send`
- stream: `GET /api/agent/sessions/:id/stream`
- abort: `DELETE /api/agent/sessions/:id/turn`
- delete: `DELETE /api/agent/sessions/:id`

Session timeline includes user turns, assistant output, tool calls, errors, and turn lifecycle events.

## Session lifecycle

```mermaid
stateDiagram-v2
  [*] --> Created
  Created --> Running: send turn
  Running --> Streaming: stream events
  Streaming --> Reviewable: diff materialized
  Reviewable --> Running: revise
  Reviewable --> Promoted: promote accepted files
  Running --> Aborted: abort turn
  Promoted --> [*]
  Aborted --> [*]

  classDef created fill:#89b4fa,stroke:#74c7ec,color:#11111b,stroke-width:2px
  classDef active fill:#cba6f7,stroke:#f5c2e7,color:#11111b,stroke-width:2px
  classDef review fill:#f9e2af,stroke:#fab387,color:#11111b,stroke-width:2px
  classDef done fill:#a6e3a1,stroke:#94e2d5,color:#11111b,stroke-width:2px
  classDef bad fill:#f38ba8,stroke:#eba0ac,color:#11111b,stroke-width:2px

  class Created created
  class Running active
  class Streaming,Reviewable review
  class Promoted done
  class Aborted bad
```
