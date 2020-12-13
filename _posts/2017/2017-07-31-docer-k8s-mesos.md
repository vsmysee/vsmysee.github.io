---
layout: article
title: Docker,Kubernetes,Mesos
---

[原文](https://d2iq.com/blog/docker-vs-kubernetes-vs-apache-mesos)


## Docker

```
Packages the application and the libraries in a single package (the Docker Image), so applications can consistently be deployed across many environments;
Provides Git-like semantics, such as "docker push", "docker commit" to make it easy for application developers to quickly adopt the new technology and incorporate it in their existing workflows;
Define Docker images as immutable layers, enabling immutable infrastructure. Committed changes are stored as an individual read-only layers, making it easy to re-use images and track changes. Layers also save disk space and network traffic by only transporting the updates instead of entire images;
Run Docker containers by instantiating the immutable image with a writable layer that can temporarily store runtime changes, making it easy to deploy and scale multiple instances of the applications quickly.
```

```

将应用程序和依赖库封装在一个软件包（即 Docker 镜像）中，因此应用可以被一致地部署在各个环境上；
提供类似 Git 的语义，例如 docker push，docker commit 等命令让应用开发者可以快速接受这门新的技术，并将其融入到现有的工作流中；
定义 Docker 镜像为不可变的层，支持不可变的基础设施。新提交的变更被分别保存为只读层，让复用镜像和追踪变更记录变得十分简单。层还通过只传输更新而不是整个镜像来节省磁盘空间和网络流量；
通过实例化不可变的镜像和读写层来运行 Docker 容器，读写层可以临时地存储运行时变更，从而轻松部署和扩展应用程序的多个实例。
```

## Kubernetes

```
Empower application developers with a powerful tool for Docker container orchestration without having to interact with the underlying infrastructure;
Provide standard deployment interface and primitives for a consistent app deployment experience and APIs across clouds;
Build on a Modular API core that allows vendors to integrate systems around the core Kubernetes technology.

```

```
为应用程序开发人员提供编排 Docker 容器的强大工具，而无需与底层基础设施交互；
提供标准部署接口和原语，以实现云端一致的应用部署体验和 API;
基于模块化 API 核心，允许供应商围绕 Kubernetes 的核心技术集成其系统。

```


## Mesos

```
Abstract data center resources into a single pool to simplify resource allocation while providing a consistent application and operational experience across private or public clouds;
Colocate diverse workloads on the same infrastructure such analytics, stateless microservices, distributed data services and traditional apps to improve utilization and reduce cost and footprint;
Automate day-two operations for application-specific tasks such as deployment, self healing, scaling, and upgrades; providing a highly available fault tolerant infrastructure;
Provide evergreen extensibility to run new application and technologies without modifying the cluster manager or any of the existing applications built on top of it;
Elastically scale the application and the underlying infrastructure from a handful, to tens, to tens of thousands of nodes.

```

```
将数据中心资源抽象为单个池来简化资源分配，同时在私有云或公有云中提供一致的应用和运维体验；
在相同的基础架构上协调多个工作负载，如分析、无状态微服务、分布式数据服务和传统应用程序，以提高利用率，降低成本和台面空间;
为应用程序特定的任务（如部署、自我修复、扩展和升级），自动执行第二天的操作；提供高度可用的容错基础设施；
提供持久的可扩展性来运行新的应用程序和技术，而无需修改集群管理器或其上构建的任何现有应用程序；
弹性扩展可以将应用程序和底层基础设施从少量扩展到数十到数万个节点。
```