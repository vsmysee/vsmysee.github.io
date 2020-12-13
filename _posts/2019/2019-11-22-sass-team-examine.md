---
layout: article
title:  SAAS团队自检清单
---

来自：
[AWS](https://amazonaws-china.com/cn/blogs/apn/modeling-saas-tenant-profiles-on-aws/)


- What are some of the security considerations that might influence your customer’s willingness to run in a multi-tenant environment?
- Are there specific standards or compliance criteria that must be met by some or all of your tenants?
- Are there tenants who may have specific data governance requirements?
- Are there other SaaS solutions that might be used in combination with this application?
- Are there tenants who will demand some level of isolation from other tenants?
- Are there tenants who will be willing to run in a fully shared environment?
- Are there optimizations, workflows, or product features that could be offered as value-added options?
- Are there any significant variations in how each tenant may need to respond to spikes in user load/activity?
- Do one or more tenants require customization of the application’s flow, business rules, appearance, and so on?
- Are there specific SLA requirements/expectations that may be imposed by some tenants?


哪些安全考虑因素可能会影响客户在多租户环境中运行的意愿？

是否有特定的标准或合规标准，必须满足您的一些或所有租户？

是否有租户可能有特定的数据治理要求？

是否有其他SaaS解决方案可以与此应用程序结合使用？

是否有租户会要求与其他租户保持一定程度的隔离？

是否有租户愿意在完全共享的环境中运行？

是否有可以作为增值选项提供的优化、工作流或产品功能？

每个租户对用户负载/活动峰值的响应方式是否有重大变化？

一个或多个租户是否需要自定义应用程序的流、业务规则、外观等？

是否有一些租户可能强加的特定SLA要求/期望？


来自:
[Google](https://cloud.google.com/kubernetes-engine/docs/concepts/multitenancy-overview?hl=zh-cn)


在规划多租户架构时，您应该考虑 Kubernetes 中的资源隔离层：集群、命名空间、节点、Pod 和容器。您还应该考虑在租户之间共享不同类型资源的安全隐患。例如，将来自不同租户的 Pod 调度到同一节点上可以减少集群中所需的机器数量。另一方面，您可能需要阻止某些工作负载共置。例如，您可能不允许来自组织外部的不受信任的代码与处理敏感信息的容器在同一节点上运行。

虽然 Kubernetes 不能保证租户之间完全安全地隔离，但它为特定使用场景提供了足够的相关功能。您可以将每个租户及其 Kubernetes 资源分隔到各自的命名空间中。然后，您可以使用政策来强制执行租户隔离。政策通常按命名空间划分，可用于限制 API 访问、资源使用以及允许容器执行的操作。

集群的用户根据其权限分为三种不同的角色：

```
集群管理员
命名空间管理员
开发者
```

## 多租户政策实施

```
访问权限控制
网络政策
资源配额
Pod 安全政策
Pod 反相似性
```
