---
title: Introduction
description: glib-code is a review-first coding workflow for shipping agent-written changes without losing control of your repo.
---

glib-code is a review-first coding workflow for shipping agent-written changes without losing control of your repo.

Agents can generate quickly. The failure mode is letting generated edits touch durable git state before review. glib-code fixes that by isolating agent work, rendering changes as diffs, and only promoting accepted output.

## Architecture

```mermaid
flowchart TD
  Developer["Developer"] --> WebDesktop["Web/Desktop"]
  WebDesktop --> Server["Server"]
  Server --> ProviderModel["Provider/Model"]
  ProviderModel --> Session["Agent Session"]
  Session --> Ephemeral["Ephemeral Workspace"]
  Ephemeral --> Review["Review Diff"]
  Review --> Promote["Promote"]
  Promote --> Durable["Durable Repo"]

  classDef surface fill:#89b4fa,stroke:#74c7ec,color:#11111b,stroke-width:2px
  classDef core fill:#cba6f7,stroke:#f5c2e7,color:#11111b,stroke-width:2px
  classDef review fill:#f9e2af,stroke:#fab387,color:#11111b,stroke-width:2px
  classDef durable fill:#a6e3a1,stroke:#94e2d5,color:#11111b,stroke-width:2px

  class WebDesktop surface
  class Server,ProviderModel,Session core
  class Ephemeral,Review,Promote review
  class Durable durable
```

The review boundary is between session workspace and durable repo.

## Product principles

- review first
- isolate agent edits
- explicit promote to durable git
- runtime-truth provider/model authority
- avoid hidden side effects

## Current priorities

- richer typed tool artifacts and timeline components
- less raw output in default UI paths
- promote ergonomics (finer-grained selection)
- resilience under reconnect/restart/multi-session load

## Where to go next

- [Why glib-code](/why/)
- [Getting Started](/getting-started/)
- [Review-first loop](/concepts/review-first/)
