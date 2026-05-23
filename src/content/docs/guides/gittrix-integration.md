---
title: GitTrix integration
description: Use GitTrix as the durable/ephemeral isolation boundary for glib-code sessions.
---

Use GitTrix as isolation boundary:

- start session workspace from durable repo context
- run agent writes only in ephemeral workspace
- review produced diff
- promote selected files back to durable

## Integration shape

```mermaid
flowchart TD
  Durable["Durable repo context"] --> Start["Start session workspace"]
  Start --> Ephemeral["GitTrix ephemeral workspace"]
  Ephemeral --> Agent["Agent writes"]
  Agent --> Diff["Review produced diff"]
  Diff --> Promote["Promote selected files"]
  Promote --> Durable

  classDef glib fill:#cba6f7,stroke:#f5c2e7,color:#11111b,stroke-width:2px
  classDef gittrix fill:#89b4fa,stroke:#74c7ec,color:#11111b,stroke-width:2px
  classDef review fill:#f9e2af,stroke:#fab387,color:#11111b,stroke-width:2px
  classDef durable fill:#a6e3a1,stroke:#94e2d5,color:#11111b,stroke-width:2px

  class Start glib
  class Ephemeral,Agent gittrix
  class Diff,Promote review
  class Durable durable
```
