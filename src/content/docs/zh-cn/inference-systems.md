---
title: 推理系统
description: 推理引擎、调度、batching、KV cache、内存行为、数值一致性和性能调试。
---

推理系统是模型架构遇到生产约束的地方。

模型定义能力，推理系统定义这种能力如何在延迟、吞吐、内存、正确性和成本约束下被交付。

## 为什么推理系统重要

推理不是简单地“跑模型”。真实系统里的推理涉及：

- 请求调度
- batching
- prefill 和 decode 分离
- KV cache 管理
- GPU memory planning
- 并行策略
- streaming output
- 延迟控制
- 吞吐优化
- 数值精度
- 模型加载和 warmup
- 请求取消
- fairness 和 admission control
- 可观测性
- 故障恢复

同一个模型在不同 runtime 条件下可能表现很不一样。

## 我关心的问题

- batching 如何影响延迟、吞吐和数值行为？
- scheduler 实际在优化什么？
- KV cache 如何塑造内存压力？
- 为什么 bf16 推理可能在不同 batch size 下产生不同结果？
- streaming inference 应该如何组织？
- 推理系统里的 correctness 应该如何测试？
- 生产系统如何处理 tail latency？

## 心智模型

推理系统是一个资源分配系统。

它持续决定：

```text
哪个请求，
在什么时间，
使用哪种计算资源，
带着什么内存状态，
在什么延迟和正确性约束下执行？
```

模型是 workload。推理引擎是围绕这个 workload 的操作系统。
