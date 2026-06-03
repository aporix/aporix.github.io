---
title: Performance Tuning Notes
description: A cleaned-up starting page for performance tuning topics.
---

This note is adapted from the old blog archive. The original page was a checklist for performance tuning topics.

## Infrastructure tuning

### CPU cache

Main memory access is much slower than CPU cache access. A rough mental model:

- L1 cache: about 4 to 5 cycles
- L2 cache: about 12 cycles
- L3 cache: about 30 cycles
- main memory: often more than 100 cycles

For a CPU with a 2 GHz clock, one cycle is about 0.5 ns.

The core idea is simple: improve cache hit rate.

### Improve data cache hit rate

When traversing arrays, access data in memory-layout order. Sequential access is usually friendlier to cache lines than jumping across memory.

This is especially visible in nested loops over two-dimensional arrays: the loop order should match the actual memory layout.

### Improve instruction cache hit rate

CPU branch predictors matter. If a branch is overwhelmingly likely, the compiler can be given a hint:

```cpp
#define likely(x) __builtin_expect(!!(x), 1)
#define unlikely(x) __builtin_expect(!!(x), 0)

if (likely(a == 1)) {
    // hot path
}
```

Do not overuse this. It is useful only when the branch probability is known and stable.

### Improve cache behavior on multi-core CPUs

Linux provides `sched_setaffinity` for CPU affinity. If multiple threads are doing dense computation and cache locality is important, binding threads to specific cores can reduce migration and improve locality.

`perf` also exposes a `cpu-migrations` event that helps observe how often a process moves across CPU cores.

## Topics to expand

- memory pools
- indexes
- zero-copy I/O
- coroutine scheduling
- lock contention
- network-layer tuning
- encoding and decoding overhead

## Reference

- 系统调优必知必会
