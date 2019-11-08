---
layout: article
title:  合理存储
---
只用一个语言和只用一个DB的时代结束了

[store](https://docs.microsoft.com/en-us/azure/architecture/guide/design-principles/use-the-best-data-store)

In any large solution, it's likely that a single data store technology won't fill all your needs. Alternatives to relational databases include key/value stores, document databases, search engine databases, time series databases, column family databases, and graph databases. Each has pros and cons, and different types of data fit more naturally into one or another.

在任何大型解决方案中，单个数据存储技术很可能满足不了所有需求。 关系数据库的替代方案包括键/值存储、文档数据库、搜索引擎数据库、时间序列数据库、列系列数据库和图形数据库。 每个方案都有其优缺点，不同类型的数据适合其中不同的方案。


data includes more than just the persisted application data. It also includes application logs, events, messages, and caches.

数据不仅仅包括持久化的应用程序数据。 还包括应用程序日志、事件、消息和缓存

## 建议

- Don't use a relational database for everything. Consider other data stores when appropriate. See Choose the right data store.

- Embrace polyglot persistence. In any large solution, it's likely that a single data store technology won't fill all your needs.

- Consider the type of data. For example, put transactional data into SQL, put JSON documents into a document database, put telemetry data into a time series data base, put application logs in Elasticsearch, and put blobs in Azure Blob Storage.

- Prefer availability over (strong) consistency. The CAP theorem implies that a distributed system must make trade-offs between availability and consistency. (Network partitions, the other leg of the CAP theorem, can never be completely avoided.) Often, you can achieve higher availability by adopting an eventual consistency model.

- Consider the skillset of the development team. There are advantages to using polyglot persistence, but it's possible to go overboard. Adopting a new data storage technology requires a new set of skills. The development team must understand how to get the most out of the technology. They must understand appropriate usage patterns, how to optimize queries, tune for performance, and so on. Factor this in when considering storage technologies.

- Use compensating transactions. A side effect of polyglot persistence is that single transaction might write data to multiple stores. If something fails, use compensating transactions to undo any steps that already completed.

- Look at bounded contexts. Bounded context is a term from domain driven design. A bounded context is an explicit boundary around a domain model, and defines which parts of the domain the model applies to. Ideally, a bounded context maps to a subdomain of the business domain. The bounded contexts in your system are a natural place to consider polyglot persistence. For example, "products" may appear in both the Product Catalog subdomain and the Product Inventory subdomain, but it's very likely that these two subdomains have different requirements for storing, updating, and querying products.


- 请勿在任何情况下都使用关系数据库。 请考虑在适当的时候使用其他数据存储。 请参阅选择正确的数据存储。
- 采用混合持久性。 在任何大型解决方案中，单个数据存储技术很可能满足不了所有需求。
- 请考虑数据的类型。 例如，将事务数据存储在 SQL 中，将 JSON 文档存储在文档数据库中，将遥测数据存储在时序数据库中，将应用程序日志存储在 Elasticsearch 中，并将 Blob 存储在 Azure Blob 存储中。
- 优先考虑可用性而非（强）一致性。 CAP 定理意味着分布式系统须权衡可用性和一致性。 （网络分区，是 CAP 定理中不能完全避免的另一方面。）通常情况下，可以通过采用最终一致性模型来获得更高的可用性。
- 请考虑开发团队的技能组合。 使用混合持久性有一些好处，但也有可能适得其反。 采用新的数据存储技术需要新的技能组合。 开发团队须了解如何充分利用此技术。 他们必须了解恰当的使用模式、如何优化查询、调整性能等。 请在考虑存储技术时将此因素考虑在内。
- 使用补偿事务。 混合持久性的副作用是单个事务可能会将数据写入多个存储。 如果出现故障，使用补偿事务来撤消任何已完成的步骤。
- 查看界限上下文。 界限上下文是域驱动设计中的一个术语。 界限上下文是域模型的显式边界，它定义模型适用于域的哪个部分。 理想情况下，界限上下文将映射到业务域的子域。 系统中的界线上下文是考虑混合持久性的自然位置。 例如，“产品”可能会出现在产品目录子域和产品清单子域，但这两个子域很可能对存储、更新、查询产品的要求不同。