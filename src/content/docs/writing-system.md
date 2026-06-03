---
title: Writing System
description: How this site is organized for long-term technical writing.
---

This site is organized as a small engineering notebook.

## Content model

- `Systems`: implementation notes, language/runtime details, build tools, performance basics.
- `Protocols`: QUIC, RPC, proxy behavior, transport notes, and protocol source reading.
- `Agent Infrastructure`: agent workflows, local automation, tool design, and operating notes.
- `Projects`: public project notes and release-quality writeups.

## Writing style

Each article should answer one concrete question:

- What problem is this about?
- What did I observe?
- What is the working model?
- What should I do differently next time?

Keep notes short until the topic deserves a full essay.

## File naming

Use lowercase slugs:

```text
src/content/docs/protocols/quic-loss-recovery.md
src/content/docs/systems/cpp-coroutines.md
src/content/docs/agents/local-agent-workflows.md
```
