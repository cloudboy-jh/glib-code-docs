---
title: Provider/model authority
description: How glib-code handles provider and model selection boundaries.
---

Provider and model authority controls which agent backend is allowed to run a session. The selected provider and model are part of the session boundary, not a hidden global side effect.

## Authority flow

```mermaid
flowchart LR
  User["User selects model"] --> Policy["Provider policy"]
  Policy --> Allowed{"Allowed?"}
  Allowed -->|Yes| Session["Create session"]
  Allowed -->|No| Block["Block run"]
  Session --> Provider["Provider API"]
  Provider --> Agent["Agent output"]

  classDef input fill:#89b4fa,stroke:#74c7ec,color:#11111b,stroke-width:2px
  classDef policy fill:#f9e2af,stroke:#fab387,color:#11111b,stroke-width:2px
  classDef good fill:#a6e3a1,stroke:#94e2d5,color:#11111b,stroke-width:2px
  classDef bad fill:#f38ba8,stroke:#eba0ac,color:#11111b,stroke-width:2px
  classDef core fill:#cba6f7,stroke:#f5c2e7,color:#11111b,stroke-width:2px

  class User input
  class Policy,Allowed policy
  class Session,Provider,Agent core
  class Block bad
```

## Why it exists

- Different models have different cost, latency, and quality profiles.
- Some tasks should only run on approved providers.
- Session records should show which backend produced the work.
- Provider permissions should be enforceable before execution.

## Practical rule

If a model choice affects output, cost, permissions, or auditability, it belongs in the session record.
