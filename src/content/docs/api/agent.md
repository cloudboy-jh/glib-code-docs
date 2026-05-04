---
title: Agent
description: API reference for starting and managing agent work.
---

Agent APIs run the work that produces reviewable session output.

## Run shape

```ts
type AgentRun = {
  sessionId: string
  prompt: string
  providerId: string
  modelId: string
}
```

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

The agent should produce session output, logs/events, and a diff. It should not directly mutate durable project state.
