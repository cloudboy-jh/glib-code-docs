---
title: GitTrix isolation
description: GitTrix provides the durable/ephemeral boundary for safe agent edits.
---

GitTrix provides durable/ephemeral boundary:

- durable: local repo (or configured durable adapter)
- ephemeral: session workspace for agent edits
- promote: controlled copy/commit back to durable
