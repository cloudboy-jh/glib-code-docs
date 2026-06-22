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

  classDef glib fill:#3a3a3a,stroke:#b3b3b3,color:#f2f2f2,stroke-width:2px
  classDef gittrix fill:#3a3a3a,stroke:#b3b3b3,color:#f2f2f2,stroke-width:2px
  classDef review fill:#5a5a5a,stroke:#d4d4d4,color:#f2f2f2,stroke-width:2px
  classDef durable fill:#4a5a2a,stroke:#8aaa4a,color:#f2f2f2,stroke-width:2px

  class Start glib
  class Ephemeral,Agent gittrix
  class Diff,Promote review
  class Durable durable
```
