---
title: Terminal
description: WebSocket terminal for remote command execution.
---

## Endpoint

- `GET /api/term` — WebSocket upgrade

## Protocol

**Client → Server**

- `hello`
- `run`
- `ping`

**Server → Client**

- `ready`
- `ack`
- `output`
- `exit`
- `error`
- `pong`
