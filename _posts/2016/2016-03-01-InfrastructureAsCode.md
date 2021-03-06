---
layout: article
title:  基础设施即代码
---

Martin Fowler

[InfrastructureAsCode](https://martinfowler.com/bliki/InfrastructureAsCode.html)

```
使用解释型文件： 所有的配置信息都被定义于可执行的配置解释文件中，比如说shell脚本，ansible的playbooks，Chef的recipes，或者Puppet的manifests。人们无需登入服务器，就可以做出实时的动态调整。开发时，这些代码可以作为持续的定义，来减少任何生成雪花服务器（SnowflakeServer）的风险。这也意味着更新代码的频率要快。幸运的是，计算机可以快速执行程序，并可以准备数百个服务器，速度比任何人类都快。

自归档的系统和过程： 相比于人们使用文档中的指示来执行操作（人工级别的可靠性），代码更加清晰准确并且可以不断的被执行。而且如果有必要的话，根据这些代码也可以生成一些更具有可读性的文档。

给所有代码做版本控制： 要让所有的代码都处于版本控制之中。这样每次配置以及每个修改都会有记录可以查询的到，而且还可以利用可重用的构建（ReproducibleBuild）来诊断问题。

持续地测试系统和过程： 测试可以帮助计算机快速地找到基础设施配置中的诸多错误。在现代软件系统中，你可以搭建用于基础设施代码的“部署流水线”，这能够让你实践针对基础设施变化的持续交付流程。

小步改变，避免批处理： 基础设施改变的动作越大，就越可能包含错误，也更难去诊断错误，特别是如果有多个错误交织在一起。小步更新就会让发现和改正错误更加容易。所以频繁地修改基础设施（小步）可以减少这种事情的发生。

保证服务持续可用： 持续增长的系统负担不起更新或者修复时的宕机。一些技术，比如说蓝绿部署和ParallelChange，可以不失可用性地进行小步的更新。

```