---
title: 写作系统
description: 这个站点如何组织长期技术写作。
---

这个站点按照“小型工程知识库”来维护。

## 内容模型

- `系统编程`：实现笔记、语言/运行时细节、构建工具和性能基础。
- `网络协议`：QUIC、RPC、代理行为、传输层细节和协议源码阅读。
- `Agent 基础设施`：编码 Agent 工作流、本地自动化、工具设计和操作记录。
- `项目`：公开项目说明和可以长期引用的项目复盘。

## 写作方式

每篇文章尽量回答一个具体问题：

- 这个问题是什么？
- 我观察到了什么？
- 当前可工作的模型是什么？
- 下次应该怎么做？

主题没有成熟前，先保持短。只有值得长期维护的内容才沉淀进知识库。

## 文件命名

使用小写 slug：

```text
src/content/docs/protocols/quic-loss-recovery.md
src/content/docs/systems/cpp-coroutines.md
src/content/docs/agents/local-agent-workflows.md
```

## 发布流程

- 长期维护内容放在 `src/content/docs`。
- 按时间记录的内容放在 `src/content/posts`。
- 需要长期检索的文章要加标签。
- 图片和使用它的 Markdown 放在一起。
- 适合持续编辑的图用 Mermaid。
