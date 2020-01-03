---
layout: article
title:  微服务不止代码
---

[原文](https://dzone.com/articles/microservices-more-than-writing-code?fromrel=true)

It is well understood that although microservices bring gifts of well-known architectural quality, including attributes of modularity, granularity, reusability, extensibility, testability, and maintainability to a system, it is far from an easy architecture to implement for all the challenges and complexities it introduces. In this article, I will try to point out a few I have learned and technologies I used to implement them over the last couple of Java/Groovy & Spring framework based microservices projects I have architected and implemented.

众所周知，尽管微服务为系统带来了众所周知的体系结构质量，包括模块性、粒度、可重用性、可扩展性、可测试性和可维护性等属性，但是要实现它所带来的所有挑战和复杂性，还远远不是一件容易的事情。在这篇文章中，我将尝试指出一些我所学到的，以及在我设计和实现的基于Java/Groovy & Spring框架的微服务项目中用于实现它们的技术。

```
Configuration Management
Routing Patterns
    Service Discovery
    Services Gateway
Client Resiliency Patterns
    Circuit Breaker Pattern
    Fallback Pattern
    Bulkheading
```

![](/images/microservices.png)


Implementing a microservices architecture and not implementing the above patterns essentially means that you have developed a modularized system

实现微服务，如果没有实现上面这些模式，那只能算一个模块化系统