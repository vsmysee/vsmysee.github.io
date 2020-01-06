---
layout: article
title: 自动化系列
---

[原文](https://www.ibm.com/developerworks/views/java/libraryview.jsp?search_by=automation+people:)

[中文](https://www.ibm.com/developerworks/cn/java/j-ap08016/index.html)

[gitbook](https://wizardforcel.gitbooks.io/ibm-j-ap/index.html)


```
Repository，这个模式在一个集中的存储库中管理所有配置文件，这样就可以使用 Scripted Deployment 生成有效的软件
Scripted Deployment，这个模式通过脚本执行所有部署操作，这样在执行部署时就不需要人为干预
Single Command，这个模式减少部署的复杂性，确保实现部署流程的无头执行（Headless Execution）
Tokenize Configuration，这个模式提供一种可重复的把可变信息注入配置文件中的方法
Externalized Configuration，这个模式可以一次性地 输入在目标环境之间有差异的信息
Template Verifier，这个模式帮助确保所有目标环境属性都是相同的
Headless Execution，这个模式提供一种在自动化流程中安全地访问多台机器的方法
Unified Deployment，这个模式帮助建立可以在许多目标环境中运行的单一部署脚本
```

```
Binary Integrity，确保全部目标环境使用相同的工件。
Disposable Container，使目标环境处于已知状态，以减少部署错误。
Remote Deployment，确保部署可以从一个集中化的机器或集群与多台机器交互。
Database Upgrades，提供一个集中管理的、脚本化流程，以便将增量更改应用到数据库。
Deployment Test，根据最近的部署，使用部署前和部署后检查，确认应用程序按预期运行。
Environment Rollback，如果部署失败，回滚应用程序和数据库更改。
Protected Files，控制对构建系统使用的某些文件的访问。
```

```
团队进行并行开发时，一定要以最高的频率将代码合并回干线（即主干）
```

错误的做法：

```
手工变更数据库
不能与团队的其他成员分享数据库变更
使用不一致的方法变更数据库或数据
使用低效的手工方法管理数据库版本之间的变更
```

持续重构：

```
使用 CheckStyle 度量 圈复杂度（cyclomatic complexity），并提供诸如 Replace Conditional with Polymorphism之类的重构，以此来减少 条件复杂度代码味道
使用 CheckStyle 评估 代码重复率，并提供诸如 Pull Up Method之类的重构，以此来移除 重复代码
使用 PMD（或 JavaNCSS）计算 源代码行，并提供诸如 Extract Method之类的重构，以此来淡化 大类代码味道
使用 CheckStyle（或 JDepend）确定一个类的 传出耦合度（efferent coupling），并提供诸如 Move Method之类的重构，以此来除掉 过多的导入代码味道
```

文档化

```
使用 UMLGraph 生成当前源代码的 UML图。
使用 SchemaSpy 创建 实体关系图（ERD），归档数据库中的表格和关系。
使用 Grand 生成构建目标以及它们之间的关系的 Ant 构建图。
使用 Doxygen 生成 源代码文档。
使用 DocBook 制作 用户文档。
```

```
在任何时候执行负载测试
在开发过程的初期检测并解决负载和性能问题
监视构建服务器的最新的负载测试和性能测试报告
减少依靠单个人配置和运行测试时可能出现的瓶颈和错误
```

CI 相关的六个反模式


```
签入不够频繁，这会导致集成被延迟
破碎的构建，这使团队无法转而执行其他任务
反馈太少，这使开发人员无法采取纠正措施
接收 垃圾反馈，这使开发人员忽视反馈消息
所拥有的 机器缓慢，这导致延迟反馈
依赖于 膨胀的构建，这会降低反馈速度
```

```
通过 Ant 运行 JUnit 测试
使用 JUnit 和 DbUnit 执行更长时间的运行组件测试
使用 JUnitPerf 确定哪些方法花费时间过久而执行失败
用 Selenium 运行基于 Web 的功能测试
用 Cobertura 访问代码覆盖率
用 CruiseControl 进行持续测试
```


善用插件

```
编码标准
代码重复
代码覆盖率
依赖项分析
复杂度监控
```

```
创建一致、可重复、可维护的构建
```


九个气味

```
惟 IDE 的构建
复制-粘贴式的编写脚本方法
冗长的目标
庞大的构建文件
没有清理干净
硬编码的值
测试失败还能构建成功
魔力机
格式的缺失
```


