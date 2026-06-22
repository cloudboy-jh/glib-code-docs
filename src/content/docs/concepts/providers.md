---
title: Providers & models
description: Provider and model availability comes from runtime truth, not a static UI catalog.
---

glib-code has **no static provider/model catalog**. Availability is discovered at runtime from the `pi` agent's capabilities, so the UI always reflects what's actually usable.

## Design rules

- **App-managed auth.** Provider keys are saved under glib-code's app config (`<configDir>/pi/auth.json`), never in your repo and never read from other apps' auth stores.
- **Runtime truth.** `GET /api/providers` returns live provider/model availability and the current backend-selected defaults. The Models settings tab renders exactly that.
- **Auth gates execution, not browsing.** Missing or unusable provider auth blocks starting/sending an agent session — but project browsing and diff review work without any key.

## Key handling

The RPC runtime injects the selected provider key into the `pi` subprocess environment (`ANTHROPIC_API_KEY`, `OPENAI_API_KEY`, etc.) at spawn time. Keys are never written to sandbox disk.

Manage keys in **Settings → Models**:

- add a key — `POST /api/providers/:id/auth`
- remove a key — `DELETE /api/providers/:id/auth`
- pick defaults — `PATCH /api/providers/defaults`

Unsupported OAuth credentials are rejected as unusable for providers that require API keys.
