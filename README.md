# Aporix

Public engineering notebook for [aporix](https://github.com/aporix), built with Astro and Starlight.

The site is the long-term public surface for systems programming, network protocol notes, and practical agent-infrastructure writing.

## Write

Add durable documentation pages under `src/content/docs`.

```text
src/content/docs/systems/
src/content/docs/protocols/
src/content/docs/agents/
src/content/docs/projects/
```

Add chronological posts under `src/content/posts`. Use one directory per post so images and diagrams stay with the article.

```md
src/content/posts/example-post/index.md

---
title: Example Post
description: A one-line summary for lists and RSS.
date: 2026-06-04
tags: [systems, protocols]
---
```

Reference images with relative Markdown paths:

```md
![Architecture overview](./architecture.png)
```

Render diagrams with Mermaid code blocks:

````md
```mermaid
flowchart LR
  Idea --> Draft
  Draft --> Publish
```
````

## Run locally

```sh
npm install
npm run dev
```

## Build

```sh
npm run build
```

## Public structure

- Docs pages are maintained, evergreen notes.
- Posts are chronological updates with tags, archive pages, and RSS.
- Images live beside the Markdown that references them.
- Mermaid diagrams are supported in Markdown code blocks.
