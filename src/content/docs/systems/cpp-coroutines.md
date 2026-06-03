---
title: C++20 Coroutine Message Scheduler
description: A lightweight message-driven coroutine example using C++20.
---

This note comes from the old blog archive and has been cleaned up for the new docs site.

## Goal

Build a lightweight message-driven async scheduler with C++20 coroutines.

The example supports:

- waiting for a message key with `co_await`
- resuming coroutines when messages arrive
- out-of-order message arrival
- queue-based scheduling instead of direct nested `resume()`
- a single-threaded lock-free model where each thread owns its own `CoroutineContext`
- exception capture through `std::exception_ptr`
- manual cleanup of historical message data

## Layout

```text
project/
  src/
    coroutine_context.h
    task.h
    main.cpp
  README.md
```

## Build

Use a compiler with C++20 coroutine support, such as GCC 11+ or Clang 14+.

```sh
g++ -std=c++20 -pthread -o main src/main.cpp
```

Run it:

```sh
./main
```

The example starts coroutines `A`, `B`, and `C`, then delivers messages in an intentionally out-of-order sequence. The scheduler resumes coroutines according to their dependencies.

## Coroutine context

`CoroutineContext` owns arrived messages, suspended waiters, and a task queue.

```cpp
#pragma once

#include <coroutine>
#include <functional>
#include <queue>
#include <string>
#include <unordered_map>
#include <vector>

class CoroutineContext {
public:
    struct Awaiter {
        CoroutineContext& ctx_;
        std::string msg_key_;

        Awaiter(CoroutineContext& ctx, std::string key)
            : ctx_(ctx), msg_key_(std::move(key)) {}

        bool await_ready() noexcept {
            return ctx_.messages_.find(msg_key_) != ctx_.messages_.end();
        }

        void await_suspend(std::coroutine_handle<> h) noexcept {
            ctx_.waiters_[msg_key_].push_back(h);
        }

        std::string await_resume() noexcept {
            return ctx_.messages_[msg_key_];
        }
    };

    Awaiter wait_for(const std::string& key) {
        return Awaiter(*this, key);
    }

    void message_arrive(const std::string& key, const std::string& value) {
        messages_[key] = value;
        if (waiters_.find(key) != waiters_.end()) {
            for (auto h : waiters_[key]) {
                tasks_.push([h]() { h.resume(); });
            }
            waiters_[key].clear();
        }
        run_tasks();
    }

    void run_tasks() {
        while (!tasks_.empty()) {
            auto task = tasks_.front();
            tasks_.pop();
            task();
        }
    }

    void purge_message(const std::string& key) {
        messages_.erase(key);
    }

private:
    std::unordered_map<std::string, std::string> messages_;
    std::unordered_map<std::string, std::vector<std::coroutine_handle<>>> waiters_;
    std::queue<std::function<void()>> tasks_;
};
```

## Task wrapper

`Task` manages the coroutine handle and stores exceptions in the promise.

```cpp
#pragma once

#include <coroutine>
#include <exception>

struct Task {
    struct promise_type {
        std::exception_ptr exception_;

        Task get_return_object() noexcept {
            return Task{std::coroutine_handle<promise_type>::from_promise(*this)};
        }

        std::suspend_always initial_suspend() noexcept { return {}; }
        std::suspend_always final_suspend() noexcept { return {}; }
        void unhandled_exception() noexcept { exception_ = std::current_exception(); }
        void return_void() noexcept {}
    };

    explicit Task(std::coroutine_handle<promise_type> h) : coro_(h) {}

    void resume() {
        if (coro_ && !coro_.done()) {
            coro_.resume();
        }
    }

    void rethrow_exception_if_any() {
        if (coro_.done() && coro_.promise().exception_) {
            std::rethrow_exception(coro_.promise().exception_);
        }
    }

    ~Task() {
        if (coro_) {
            coro_.destroy();
        }
    }

private:
    std::coroutine_handle<promise_type> coro_;
};
```

## Example flow

```cpp
Task process_A(CoroutineContext& ctx) {
    auto msgA = co_await ctx.wait_for("A");
    std::cout << "[A] Received: " << msgA << "\n";
}

Task process_B(CoroutineContext& ctx) {
    co_await ctx.wait_for("A");
    auto msgB = co_await ctx.wait_for("B");
    std::cout << "[B] Received: " << msgB << "\n";
}

Task process_C(CoroutineContext& ctx) {
    co_await ctx.wait_for("B");
    auto msgC = co_await ctx.wait_for("C");
    std::cout << "[C] Received: " << msgC << "\n";
}
```

With input order `B, A, C`, coroutine `B` still waits for `A`, and coroutine `C` waits for `B`. Message arrival order and execution order are separated.

## Notes

This is a minimal scheduling model, not a production runtime. The useful part is the shape:

- represent async dependencies as awaiters
- store suspended coroutine handles by key
- push resumes into a queue to avoid deep recursive resumes
- keep context ownership explicit
