---
title: Kafka Protocol Guide
description: Notes on Kafka request/response APIs, partition metadata, batching, and wire formats.
---

This note is adapted from the old blog archive. It summarizes the Kafka protocol used by Kafka 0.8 and later.

The Kafka protocol is a TCP-based binary protocol. APIs are defined as request/response pairs. Clients initiate socket connections, write request messages, and read corresponding responses. There is no explicit connection handshake.

## Core client APIs

Kafka has six core client request APIs:

1. `Metadata`: describes available brokers, host/port information, partitions, and partition leaders.
2. `Produce`: sends messages to brokers.
3. `Fetch`: reads messages from brokers.
4. `Offsets`: gets available offsets for a topic partition.
5. `OffsetCommit`: commits offsets for a consumer group.
6. `OffsetFetch`: fetches offsets for a consumer group.

Since Kafka 0.9, consumer group management adds:

1. `GroupCoordinator`: locates the coordinator for a group.
2. `JoinGroup`: joins a group or creates one if there are no active members.
3. `SyncGroup`: synchronizes group member state, such as partition assignments.
4. `Heartbeat`: keeps a group member alive.
5. `LeaveGroup`: leaves a group directly.

Admin APIs include:

1. `DescribeGroups`: inspects group state.
2. `ListGroups`: lists groups managed by a broker.

## Network model

Kafka uses a binary protocol over TCP.

Clients usually keep persistent connections open so they can amortize TCP handshake cost. A client may need connections to multiple brokers because data is partitioned and each partition has a leader broker.

The server guarantees that requests on a single TCP connection are processed in send order, and responses are returned in that same order. Clients can still use non-blocking I/O and pipeline requests because outstanding requests can be buffered by the socket layer.

The server has a configurable maximum request size. Oversized requests can cause the socket to be disconnected.

## Partitioning and bootstrapping

Kafka is a partitioned system. Topics are divided into partitions, and each partition is replicated according to the replication factor.

Clients control message partitioning. To produce or fetch data, the client must know the target partition and send the request to the broker that currently leads that partition.

To discover this, clients issue metadata requests. Any broker can answer metadata requests, returning:

- topics
- partitions
- partition leaders
- brokers and their host/port information
- replicas and in-sync replicas

A practical client bootstrapping flow is:

1. Iterate through an initial broker URL list until a connection succeeds.
2. Fetch cluster metadata.
3. Route produce/fetch requests to the broker that leads the target partition.
4. Refresh metadata and retry when socket errors or partition-leader errors occur.

## Partition strategy

Partitioning has two purposes:

1. balance data and request load across brokers
2. preserve local ordering and state for related messages

For simple load balancing, a producer can round-robin across partitions. For semantic partitioning, the producer hashes a key, such as a user ID, and maps that key to a partition. This keeps related records in the same partition.

## Batching

Kafka APIs encourage batching. Produce and fetch APIs handle message sequences instead of individual records.

Batching improves throughput by reducing per-message overhead. A client can collect separately submitted messages and send them as larger requests. Kafka also allows batching across multiple topics and partitions.

## Versioning and compatibility

Kafka protocol evolution is API-version based. Each request contains:

- API key
- API version
- correlation ID
- client ID

Servers reject unsupported request versions and respond using the version format requested by the client. This lets new server features roll out before clients are upgraded.

## Basic protocol types

Kafka protocol messages use fixed and variable-width primitives.

Fixed-width types:

- `int8`
- `int16`
- `int32`
- `int64`

Variable-width types:

- `bytes`
- `string`

Variable-width values are represented by a signed length followed by that many bytes. Length `-1` means `null`. String sizes use `int16`; byte arrays use `int32`.

Arrays are encoded as an `int32` length followed by repeated elements.

## Request and response envelope

All requests and responses have a size prefix:

```text
RequestOrResponse => Size (RequestMessage | ResponseMessage)
  Size => int32
```

Requests use:

```text
RequestMessage => ApiKey ApiVersion CorrelationId ClientId RequestMessage
  ApiKey => int16
  ApiVersion => int16
  CorrelationId => int32
  ClientId => string
  RequestMessage => MetadataRequest | ProduceRequest | FetchRequest | OffsetRequest | OffsetCommitRequest | OffsetFetchRequest
```

Responses use:

```text
Response => CorrelationId ResponseMessage
  CorrelationId => int32
  ResponseMessage => MetadataResponse | ProduceResponse | FetchResponse | OffsetResponse | OffsetCommitResponse | OffsetFetchResponse
```

`CorrelationId` is returned unchanged by the server. It lets clients match responses to requests.

## Message set and record batch

Older Kafka versions use `MessageSet`:

```text
MessageSet => [Offset MessageSize Message]
  Offset => int64
  MessageSize => int32
```

Kafka 0.11 introduced `RecordBatch`, which replaced the older recursive message-set model. Compression applies to records while the batch header remains uncompressed.

```text
RecordBatch =>
  FirstOffset => int64
  Length => int32
  PartitionLeaderEpoch => int32
  Magic => int8
  CRC => int32
  Attributes => int16
  LastOffsetDelta => int32
  FirstTimestamp => int64
  MaxTimestamp => int64
  ProducerId => int64
  ProducerEpoch => int16
  FirstSequence => int32
  Records => [Record]

Record =>
  Length => varint
  Attributes => int8
  TimestampDelta => varint
  OffsetDelta => varint
  KeyLen => varint
  Key => data
  ValueLen => varint
  Value => data
  Headers => [Header]
```

## Metadata API

The metadata API answers:

- what topics exist?
- how many partitions does each topic have?
- which broker leads each partition?
- what are the broker host and port values?

Request:

```text
TopicMetadataRequest => [TopicName]
  TopicName => string
```

Response:

```text
MetadataResponse => [Broker][TopicMetadata]
  Broker => NodeId Host Port
    NodeId => int32
    Host => string
    Port => int32
  TopicMetadata => TopicErrorCode TopicName [PartitionMetadata]
    TopicErrorCode => int16
  PartitionMetadata => PartitionErrorCode PartitionId Leader Replicas Isr
    PartitionErrorCode => int16
    PartitionId => int32
    Leader => int32
    Replicas => [int32]
    Isr => [int32]
```

## Reference

- [A Guide To The Kafka Protocol](https://cwiki.apache.org/confluence/display/KAFKA/A+Guide+To+The+Kafka+Protocol)
