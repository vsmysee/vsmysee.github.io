---
layout: article
title:  SAAS应用方法论
---
这套理论适用于任意语言和后端服务（数据库、消息队列、缓存等）开发的应用程序

[中文](https://12factor.net/zh_cn/)
[英文](https://12factor.net/)


```
I. Codebase
One codebase tracked in revision control, many deploys

II. Dependencies
Explicitly declare and isolate dependencies

III. Config
Store config in the environment

IV. Backing services
Treat backing services as attached resources

V. Build, release, run
Strictly separate build and run stages

VI. Processes
Execute the app as one or more stateless processes

VII. Port binding
Export services via port binding

VIII. Concurrency
Scale out via the process model

IX. Disposability
Maximize robustness with fast startup and graceful shutdown

X. Dev/prod parity
Keep development, staging, and production as similar as possible

XI. Logs
Treat logs as event streams

XII. Admin processes
Run admin/management tasks as one-off processes

```

```
I. 基准代码
一份基准代码，多份部署

II. 依赖
显式声明依赖关系

III. 配置
在环境中存储配置

IV. 后端服务
把后端服务当作附加资源

V. 构建，发布，运行
严格分离构建和运行

VI. 进程
以一个或多个无状态进程运行应用

VII. 端口绑定
通过端口绑定提供服务

VIII. 并发
通过进程模型进行扩展

IX. 易处理
快速启动和优雅终止可最大化健壮性

X. 开发环境与线上环境等价
尽可能的保持开发，预发布，线上环境相同

XI. 日志
把日志当作事件流

XII. 管理进程
后台管理任务当作一次性进程运行

```

2016年Beyond the Twelve-Factor App，讨论的列表

```
One codebase, one application
API first
Dependency management
Design, build, release, and run
Configuration, credentials, and code
Logs
Disposability
Backing services
Environment parity
Administrative processes
Port binding
Stateless processes
Concurrency
Telemetry
Authentication and authorization

```

[地址](https://content.pivotal.io/blog/beyond-the-twelve-factor-app)