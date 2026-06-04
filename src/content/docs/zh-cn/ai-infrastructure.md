---
title: AI 基础设施
description: 生产 AI 系统、模型网关、可观测性、部署、可靠性和平台控制。
---

AI 基础设施是模型能力变成生产能力的地方。

模型本身可以很强，但生产系统需要的不只是模型。它还需要部署、路由、可观测性、安全、成本控制、可靠性、评估、回滚和运维纪律。

## AI 基础设施包括什么

AI 基础设施不是单个组件，而是围绕模型能力的一组控制层。

典型关注点包括：

- model serving
- model gateway
- routing 和 load balancing
- 多租户隔离
- 认证与授权
- rate limit 和 quota
- 可观测性
- 成本治理
- prompt/response logging
- evaluation 和 feedback
- canary release
- fallback 和降级
- 延迟与 SLA 控制
- GPU 调度
- 部署与回滚
- 数据治理
- 安全边界

模型只是系统的一部分。基础设施决定模型能力能否被安全、可靠、经济地使用。

## 我关心的问题

- 模型网关到底控制什么？
- AI 系统应该如何向应用暴露能力？
- 多模型、多成本、多可靠性 profile 应该如何管理？
- 延迟、质量和成本如何权衡？
- AI 调用如何观察、评估和调试？
- 什么属于平台层，什么属于应用层？
- 模型调用失败时，生产系统应该如何降级？

## 心智模型

一个有用的 AI 基础设施系统应该回答四个问题：

```text
谁可以使用哪种模型能力，
在什么约束下，
具备什么可见性，
以及失败时如何 fallback？
```

如果系统回答不了这些问题，它还不是生产级 AI 基础设施。

## 相关笔记

- [什么是 AI 基础设施？](/zh-cn/notes/what-is-ai-infrastructure/)
- [模型服务不只是 API](/zh-cn/notes/model-serving-is-not-just-an-api/)
