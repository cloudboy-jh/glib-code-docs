---
title: Diff
description: API reference for generated changes and reviewable diffs.
---

Diff APIs expose generated changes for review and promotion.

## Resource shape

```ts
type DiffSummary = {
  sessionId: string
  filesChanged: number
  additions: number
  deletions: number
  status: 'pending-review' | 'accepted' | 'rejected'
}
```

## Review data

Diff endpoints should make it easy to answer:

- What files changed?
- What lines changed?
- Which changes were accepted?
- Which changes were rejected?
- Is the diff still tied to the current baseline?

```mermaid
flowchart TD
  Output["Agent output"] --> Normalize["Normalize diff"]
  Normalize --> Summary["Diff summary"]
  Normalize --> Files["File patches"]
  Summary --> Review["Review UI"]
  Files --> Review
  Review --> Decision["Decision"]

  classDef generated fill:#cba6f7,stroke:#f5c2e7,color:#11111b,stroke-width:2px
  classDef diff fill:#89b4fa,stroke:#74c7ec,color:#11111b,stroke-width:2px
  classDef review fill:#f9e2af,stroke:#fab387,color:#11111b,stroke-width:2px

  class Output,Normalize generated
  class Summary,Files diff
  class Review,Decision review
```
