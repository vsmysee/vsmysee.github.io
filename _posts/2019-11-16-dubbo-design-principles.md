---
layout: article
title:  dubbo设计原则
---
一个被广泛使用的服务化框架，作者梁飞好像生一个孩子一样创造它，可贵的是，他承认了实现代码里面还有很多的不完美:

[坏味道](https://dubbo.apache.org/zh-cn/docs/dev/code-smell.html)


### 文章链接

[一](https://dubbo.apache.org/zh-cn/docs/dev/principals/code-detail.html)
[二](https://dubbo.apache.org/zh-cn/docs/dev/principals/general-knowledge.html)
[三](https://dubbo.apache.org/zh-cn/docs/dev/principals/expansibility.html)
[四](https://dubbo.apache.org/zh-cn/docs/dev/principals/configuration.html)
[五](https://dubbo.apache.org/zh-cn/docs/dev/principals/robustness.html)
[六](https://dubbo.apache.org/zh-cn/docs/dev/principals/dummy.html)
[七](https://dubbo.apache.org/zh-cn/docs/dev/principals/extension.html)


### 提取部分精华

```
分离可靠操作和不可靠操作
异常防御，但不忽略异常
提高代码的可测性

API 与 SPI 分离
在重要的过程上设置拦截接口
重要的状态的变更发送事件并留出监听接口
扩展接口职责尽可能单一，具有可组合性
微核插件式，平等对待第三方
不要控制外部对象的生命周期
可配置一定可编程，并保持友好的 CoC 约定
区分命令与查询，明确前置条件与后置条件
增量式扩展，而不要扩充原始核心概念
配置一致性

资源是有限的，CPU、内存、IO 等等。不要因为外部的请求、数据不受限的而崩溃


线程池(ExectorService)的大小和饱和策略
微核心，插件式，平等对待第三方
每个扩展点只封装一个变化因子，最大化复用
全管道式设计，框架自身逻辑，均使用截面拦截实现
最少概念，一致性概念模型
分层，组合式扩展，而不是泛化式扩展

```

### 总结
从任何一个靠谱的设计书籍或者优秀框架上，你可能都会接触到这些词，比如:
 
可靠

可测试

防御

核心抽象

可组合

一致性概念

最少

资源管理


**希望我们每一个程序员职业生涯都能有所创造**

