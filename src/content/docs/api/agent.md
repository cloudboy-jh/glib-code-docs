---
title: Agent
description: Agent session creation, turns, streaming, abort, and delete endpoints.
---

## Endpoints

- `POST /api/agent/sessions`
- `POST /api/agent/sessions/:id/send`
- `GET /api/agent/sessions/:id/stream?projectPath=...&replay=...`
- `DELETE /api/agent/sessions/:id/turn?projectPath=...`
- `DELETE /api/agent/sessions/:id`

## Runtime states

```mermaid
stateDiagram-v2
  [*] --> Queued
  Queued --> Running
  Running --> Completed
  Running --> Failed
  Completed --> [*]
  Failed --> [*]

  classDef queue fill:#3a3a3a,stroke:#b3b3b3,color:#f2f2f2,stroke-width:2px
  classDef run fill:#3a3a3a,stroke:#b3b3b3,color:#f2f2f2,stroke-width:2px
  classDef done fill:#4a5a2a,stroke:#8aaa4a,color:#f2f2f2,stroke-width:2px
  classDef fail fill:#5a2a2a,stroke:#aa6a6a,color:#f2f2f2,stroke-width:2px

  class Queued queue
  class Running run
  class Completed done
  class Failed fail
```

## Output

The agent emits timeline events, tool calls, and diff-producing output for review. Durable mutation happens only through promote.
