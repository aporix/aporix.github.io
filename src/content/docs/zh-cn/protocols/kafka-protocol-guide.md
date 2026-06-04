---
title: Kafka 协议指南
description: Kafka request/response API、partition metadata、batching 和线格式笔记。
---

这篇笔记整理 Kafka 0.8 以后使用的 TCP 二进制协议。

Kafka 协议是 request/response 模型。客户端主动建立 socket 连接，写入请求消息，再读取对应响应。协议本身没有显式连接握手。

## 核心 Client API

Kafka 的核心请求包括：

1. `Metadata`：获取 broker、topic、partition 和 leader 信息。
2. `Produce`：发送消息。
3. `Fetch`：读取消息。
4. `Offsets`：获取 topic partition 可用 offset。
5. `OffsetCommit`：提交 consumer group offset。
6. `OffsetFetch`：读取 consumer group offset。

Kafka 0.9 之后 consumer group 管理增加：

1. `GroupCoordinator`
2. `JoinGroup`
3. `SyncGroup`
4. `Heartbeat`
5. `LeaveGroup`

## 网络模型

Kafka 使用 TCP 上的二进制协议。客户端通常保持长连接，以摊薄 TCP 握手成本。

同一个 TCP 连接上，服务端保证按照请求发送顺序处理，并按相同顺序返回响应。客户端仍然可以使用非阻塞 I/O 和 pipeline，因为未完成请求可以由 socket 层缓冲。

## Partition 和启动流程

Topic 被拆成 partition，每个 partition 有 leader broker。

客户端发送 produce/fetch 请求前，必须知道目标 partition 的 leader。典型流程：

1. 从初始 broker 列表中连接一个可用 broker。
2. 拉取 cluster metadata。
3. 将 produce/fetch 请求路由到 partition leader。
4. 遇到 socket 错误或 leader 变更时刷新 metadata 并重试。

## Batching

Kafka API 鼓励批量处理。Produce 和 Fetch 面向消息序列，而不是单条消息。

Batching 的价值是降低单条消息的固定开销，并允许跨 topic/partition 聚合请求。

## 协议演进

Kafka 的协议演进基于 API version。每个请求包含：

- API key
- API version
- correlation ID
- client ID

`CorrelationId` 会在响应中原样返回，用于客户端匹配请求和响应。
