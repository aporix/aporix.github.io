---
title: 什么是 AI 基础设施？
description: AI 基础设施的工作定义。
---

AI 基础设施是把模型能力变成可靠产品能力的系统层。

模型可以回答问题、生成代码、总结文档、分类意图或生成图像。但产品需要的不只是能力，还需要控制。

## 模型不是系统

生产 AI 系统还需要：

- request routing
- model selection
- authentication
- permission control
- rate limiting
- quota
- logging
- tracing
- evaluation
- fallback
- degradation
- cost tracking
- safety checks
- deployment
- rollback
- monitoring
- user feedback
- data governance

没有这些层，模型可能能完成 demo，但无法稳定进入生产。

## 工作定义

AI 基础设施回答四个问题：

```text
谁可以使用哪种 AI 能力，
在什么约束下，
具备什么可见性，
以及失败时如何 fallback？
```

应用表达意图。基础设施控制访问、执行、观察和失败行为。模型提供能力。

生产系统需要的是被治理的能力。
