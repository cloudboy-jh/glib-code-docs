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

  classDef queue fill:#89b4fa,stroke:#74c7ec,color:#11111b,stroke-width:2px
  classDef run fill:#cba6f7,stroke:#f5c2e7,color:#11111b,stroke-width:2px
  classDef done fill:#a6e3a1,stroke:#94e2d5,color:#11111b,stroke-width:2px
  classDef fail fill:#f38ba8,stroke:#eba0ac,color:#11111b,stroke-width:2px

  class Queued queue
  class Running run
  class Completed done
  class Failed fail
```

## Output

The agent emits timeline events, tool calls, and diff-producing output for review. Durable mutation happens only through promote.
