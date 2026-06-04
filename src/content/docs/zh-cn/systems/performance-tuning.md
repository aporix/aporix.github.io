---
title: 性能调优笔记
description: 性能调优主题的整理入口。
---

这篇页面作为性能调优主题的中文起点，后续可以逐步扩展为更系统的笔记。

## 基础设施调优

### CPU cache

主存访问远慢于 CPU cache。一个粗略模型：

- L1 cache：约 4 到 5 个周期
- L2 cache：约 12 个周期
- L3 cache：约 30 个周期
- 主存：通常超过 100 个周期

核心思想很简单：提高 cache hit rate。

### 数据 cache

遍历数组时，应尽量按照内存布局顺序访问。顺序访问通常比跨行跳跃更适合 cache line。

二维数组尤其明显：循环顺序要匹配实际内存布局。

### 指令 cache 和分支预测

如果某个分支概率稳定，可以使用编译器 hint，但不要滥用：

```cpp
#define likely(x) __builtin_expect(!!(x), 1)
#define unlikely(x) __builtin_expect(!!(x), 0)
```

### 多核 cache 行为

Linux 的 `sched_setaffinity` 可以设置 CPU affinity。对于密集计算线程，减少核心迁移有助于保持 cache locality。

## 待扩展主题

- memory pool
- index
- zero-copy I/O
- coroutine scheduling
- lock contention
- network-layer tuning
- encoding/decoding overhead
