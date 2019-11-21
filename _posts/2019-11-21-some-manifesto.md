---
layout: article
title:  那些宣言
---

[敏捷](https://agilemanifesto.org/iso/zhchs/manifesto.html)
[敏捷原则](https://agilemanifesto.org/iso/zhchs/principles.html)

```
个体和互动 高于 流程和工具
工作的软件 高于 详尽的文档
客户合作 高于 合同谈判
响应变化 高于 遵循计划
```

[异步开发](http://asyncmanifesto.org/)

```
Modern tools and flexible work environments over meetings and office hours

Flexibility in prioritization over detailed planning

Comprehensive documentation over tribal knowledge
```

[反应式](https://www.reactivemanifesto.org/zh-CN)

```
即时响应性: ：只要有可能， 系统就会及时地做出响应。 即时响应是可用性和实用性的基石， 而更加重要的是，即时响应意味着可以快速地检测到问题并且有效地对其进行处理。 即时响应的系统专注于提供快速而一致的响应时间， 确立可靠的反馈上限， 以提供一致的服务质量。 这种一致的行为转而将简化错误处理、 建立最终用户的信任并促使用户与系统作进一步的互动。

回弹性：系统在出现失败时依然保持即时响应性。 这不仅适用于高可用的、 任务关键型系统——任何不具备回弹性的系统都将会在发生失败之后丢失即时响应性。 回弹性是通过复制、 遏制、 隔离以及委托来实现的。 失败的扩散被遏制在了每个[组件](/glossary.zh-cn.md#组件)内部， 与其他组件相互隔离， 从而确保系统某部分的失败不会危及整个系统，并能独立恢复。 每个组件的恢复都被委托给了另一个（外部的）组件， 此外，在必要时可以通过复制来保证高可用性。 （因此）组件的客户端不再承担组件失败的处理。

弹性： 系统在不断变化的工作负载之下依然保持即时响应性。 反应式系统可以对输入（负载）的速率变化做出反应，比如通过增加或者减少被分配用于服务这些输入（负载）的资源。 这意味着设计上并没有争用点和中央瓶颈， 得以进行组件的分片或者复制， 并在它们之间分布输入（负载）。 通过提供相关的实时性能指标， 反应式系统能支持预测式以及反应式的伸缩算法。 这些系统可以在常规的硬件以及软件平台上实现成本高效的弹性。

消息驱动：反应式系统依赖异步的消息传递，从而确保了松耦合、隔离、位置透明的组件之间有着明确边界。 这一边界还提供了将失败作为消息委托出去的手段。 使用显式的消息传递，可以通过在系统中塑造并监视消息流队列， 并在必要时应用回压， 从而实现负载管理、 弹性以及流量控制。 使用位置透明的消息传递作为通信的手段， 使得跨集群或者在单个主机中使用相同的结构成分和语义来管理失败成为了可能。 非阻塞的通信使得接收者可以只在活动时才消耗资源， 从而减少系统开销。
```

[软件工艺](http://manifesto.softwarecraftsmanship.org/)

```
Not only working software,
but also well-crafted software
Not only responding to change,
but also steadily adding value
Not only individuals and interactions,
but also a community of professionals
Not only customer collaboration,
but also productive partnerships
```


[简洁宣言](https://www.infoq.com/articles/simplicity-manifesto-development/)
[简洁宣言-中文](https://www.infoq.cn/article/0IVSLVsv5NXqX9*LE39x)

[GNU宣言](https://www.gnu.org/gnu/manifesto.zh-cn.html)

[Dev Ops](https://theagileadmin.com/2010/10/15/a-devops-manifesto/)

[Test Ops](http://literature.cdn.keysight.com/litweb/pdf/5992-3771CHCN.pdf)

[敏捷数据科学](https://www.oreilly.com/radar/a-manifesto-for-agile-data-science/)

[Data Ops](https://www.dataopsmanifesto.org/)