---
title: Site Rebuild Notes
description: Why this site moved toward a documentation-first writing system with a small chronological notes layer.
date: 2026-06-04
tags: [writing, site]
---

The site is now split into two complementary surfaces.

The documentation area keeps durable technical pages stable and searchable. It is the right place for protocol notes, systems programming details, and project writeups that should improve over time.

The notes area keeps publication order visible. It is better for release notes, short observations, reading logs, and ideas that may later become full documentation pages.

This keeps the public site simple without forcing every piece of writing into the same format.

```mermaid
flowchart LR
  Idea[Draft idea] --> Note[Chronological note]
  Note -->|stabilize| Doc[Durable documentation]
  Doc --> Project[Project writeup]
```

For image-heavy posts, keep assets next to the article:

```text
src/content/posts/example-post/
├── index.md
├── architecture.png
└── trace.webp
```
