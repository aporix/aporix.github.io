---
title: Writing System
description: How this site is organized for long-term technical writing.
---

This site is organized as a small engineering notebook.

The operating sentence is:

```text
confusion -> observation -> note -> model -> diagram -> project -> reusable system
```

This is not content production. It is system formation.

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

## Publishing workflow

- Put evergreen material under `src/content/docs`.
- Put time-based updates under `src/content/posts`.
- Use tags on posts when the topic should be discoverable later.
- Keep images next to the Markdown file that uses them.
- Use Mermaid for diagrams that benefit from staying editable in text.

## Note template

```md
## Problem
What is the concrete problem or question?

## Context
Where did this problem appear?

## Observation
What did I observe?

## Model
What is the underlying structure or mental model?

## Trade-offs
What are the competing forces?

## Conclusion
What should I remember next time?
```
