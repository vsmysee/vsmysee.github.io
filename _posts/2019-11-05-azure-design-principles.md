---
layout: article
title:  Azure应用的设计原则
---
遵循这些设计原则可以提高应用程序的可伸缩性、复原能力和易管理性

Design for self healing. In a distributed system, failures happen. Design your application to be self healing when failures occur.
自我修复设计。 在分布式系统中，故障时有发生。 设计应用程序以在故障发生时进行自我修复。

Make all things redundant. Build redundancy into your application, to avoid having single points of failure.
实现全面冗余。 在应用程序中构建冗余，以避免出现单一故障点。

Minimize coordination. Minimize coordination between application services to achieve scalability.
尽量减少协调。 最大程度地减少应用程序服务之间的协调以实现可伸缩性。

Design to scale out. Design your application so that it can scale horizontally, adding or removing new instances as demand requires.
横向扩展设计。合理设计应用程序，以便能够通过按需添加或删除新实例对应用程序进行横向缩放。

Partition around limits. Use partitioning to work around database, network, and compute limits.
通过分区解决限制。 使用分区来解决数据库、网络和计算限制。

Design for operations. Design your application so that the operations team has the tools they need.
运营设计。 合理设计应用程序，使运营团队获得所需的工具。

Use managed services. When possible, use platform as a service (PaaS) rather than infrastructure as a service (IaaS).
使用托管服务。 尽量使用平台即服务 (PaaS) 而不是基础结构即服务 (IaaS)。

Use the best data store for the job. Pick the storage technology that is the best fit for your data and how it will be used.
使用最佳的数据存储完成作业。 选择最适合数据的存储技术，并了解如何使用该技术。

Design for evolution. All successful applications change over time. An evolutionary design is key for continuous innovation.
演变设计。 所有成功的应用程序会不断变化。 演变设计是持续创新的关键。

Build for the needs of business. Every design decision must be justified by a business requirement.
根据业务需求构建。 每个设计决策必须与业务要求相称。
