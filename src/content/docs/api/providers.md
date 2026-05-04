---
title: Providers
description: API reference for provider configuration and model access.
---

Provider APIs define the available model backends for agent sessions.

## Resource shape

```ts
type Provider = {
  id: string
  label: string
  models: Model[]
  enabled: boolean
}

type Model = {
  id: string
  label: string
  capabilities: string[]
}
```

## Common operations

- List enabled providers.
- List models for a provider.
- Validate a provider/model pair before session creation.
- Record provider/model choice on the session.

## Flow

```mermaid
flowchart LR
  List["List providers"] --> Select["Select model"]
  Select --> Validate["Validate policy"]
  Validate --> Session["Create session"]

  classDef read fill:#89b4fa,stroke:#74c7ec,color:#11111b,stroke-width:2px
  classDef policy fill:#f9e2af,stroke:#fab387,color:#11111b,stroke-width:2px
  classDef core fill:#cba6f7,stroke:#f5c2e7,color:#11111b,stroke-width:2px

  class List,Select read
  class Validate policy
  class Session core
```
