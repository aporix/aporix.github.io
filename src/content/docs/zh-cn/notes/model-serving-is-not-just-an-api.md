---
title: 模型服务不只是 API
description: 为什么 model serving 是系统问题，而不只是 endpoint。
---

把 model serving 看成简单 API 很诱人。

发送请求，运行模型，返回结果。

这个视角适合 demo，不适合生产。

## 简单视角

```text
client -> model API -> response
```

它隐藏了大部分真实系统：

- scheduling
- batching
- GPU memory
- rate limiting
- model versioning
- fallback
- observability
- cost
- failure

生产 serving 活在这些隐藏部分里。

## 真实路径

```text
client
  -> auth
  -> quota / rate limit
  -> routing
  -> model selection
  -> scheduler
  -> runtime
  -> GPU memory
  -> postprocess
  -> logging / tracing
  -> evaluation
  -> response
```

每一层都引入决策。谁可以调用这个模型？哪个模型处理这个请求？这个请求是否应该被 batching？GPU 满了怎么办？成本超预算怎么办？

Serving 不是函数调用。Serving 是控制系统。
