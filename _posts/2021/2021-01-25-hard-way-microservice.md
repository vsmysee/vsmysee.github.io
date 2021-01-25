---
layout: article
title:  微服务之难
---


[原文](https://itnext.io/microservices-c8b5dbdd58b8)


我们的服务最终是看上去“分离“实际上紧耦合的


我们所预计的规模远远超出了现实里可能遇到的任何规模

```
Conway’s Law
You aren’t Google
You still aren’t Google
Everything is a trade-off
```


```
Design for the problems you know you have, and be very meticulous when guessing about the future.

It’s safer to start with a few larger services and carve them up as the boundaries reveal themselves. A good rule of thumb is that one microservice is better than two unless you can articulate the reason for splitting them. Of course, there are many valid reasons, but make sure you know how they apply before going ahead.

When experimenting and building MVP services, be very clear about what you won’t do and stick to that. It’s easy to get trapped into maintaining something which isn’t the right solution.
```


```
为已知的问题做设计，对未来的猜测要谨慎
从少数大型服务开始，并且仔细地设计边界。首要法则是一个微服务 比两个要好，除非你真的能找到拆分它们的强烈理由。当然，总是有很多有效的理由，但是确保在决策之前真正理解这些理由。
当实验以及构建MVP服务时，要非常清楚地知道不会做什么并且要坚持住。不然很容易就会陷入维护错误方案的陷进里
```