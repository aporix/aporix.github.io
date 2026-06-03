---
title: Markdown Image and Mermaid Check
description: A short rendering test for local images and Mermaid diagrams in the Markdown-first writing workflow.
date: 2026-06-04
tags: [writing, mermaid, images]
---

This note checks the writing path I want to use long term: one Markdown file, local assets in the same folder, and diagrams written as text.

## Local image

The image below is referenced with a relative Markdown path:

```md
![Markdown writing workflow](./writing-workflow.svg)
```

![Markdown writing workflow](./writing-workflow.svg)

## Mermaid diagram

The diagram below is written directly in Markdown:

```mermaid
flowchart TD
  Draft[Write index.md] --> Asset[Add local image]
  Asset --> Diagram[Add Mermaid block]
  Diagram --> Build[npm run build]
  Build --> Publish[GitHub Pages]
```

If both the image and the diagram render, future posts can stay content-only.
