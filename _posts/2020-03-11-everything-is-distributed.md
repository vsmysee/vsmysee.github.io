---
layout: article
title: 一切分布式
---

[原文](https://www.oreilly.com/content/everything-is-distributed/)


```
人们应该感到惊讶的并不是每天都有这么多故障，而是每天只有这么少故障。你不应该惊 讶于自己的系统偶尔会崩溃，而应该惊讶于它竟然能长时间不出错地运行。

— Richard Cook
```


```
“What is surprising is not that there are so many accidents. It is that there are so few. The thing that amazes you is not that your system goes down sometimes, it’s that it is up at all.”—Richard Cook
```


We have reached a point in software development where we can no longer understand, see, or control all the component parts, both technical and social/organizational—they are increasingly complex and distributed. The business of software itself has become a distributed, complex system. How do we develop and manage systems that are too large to understand, too complex to control, and that fail in unpredictable ways?

我们已经到达了软件开发中的一个特殊点 —— 不管是在技术上还是在社会/组织上，到 了这个点我们不再能理解、看到、或控制系统的所有组件 —— 我们的软件正在变得越来越复 杂和分布式。软件行业本身已经变成一个分布式的、复杂的系统。我们如何开发和管理那些庞大到无法理解、复杂到无法控制、出错方式也无法预测的系统？



The solution to grappling with complex distributed systems is not simply more testing, or Agile processes. It’s not DevOps, or continuous delivery. No one single thing or approach could prevent something like the Toyota incident from happening again. In fact, it’s almost a given that something like that will happen again. The answer is to embrace that failures of an unthinkable variety are possible—a vast sea of unknown unknowns—and to change how we think about the systems we are building, not to mention the systems within which we already operate.

应对复杂分布式系统的方法并不是简单地增加测试，或者采用敏捷开发流程，也不是采用 DevOps 或者持续交付（continuous delivery）。任何单一的技术或方法都无法阻止类似 丰田汽车事故这样的事情再次发生。实际上，类似这样的事情肯定会再次发生。

解决这类问题我们需要拥抱这样一种观念：无法预知的故障种类太多了 —— 我们面对的是一 片巨大而未知的未知海洋；此外，还需要改变我们构建系统时 —— 以及运维现有系统时 —— 的思考方式。


But nothing really runs on one computer any more—the cloud is the computer now. It’s akin to a living system, something that is constantly changing, especially as companies move toward continuous delivery as the new normal.

但现在已经没有应用还运行在单台机器上了 —— 云就是这个时代的计 算机（the cloud is the computer now），它就像一个生命系统（living system），一 直在持续不断地变化，尤其是在越来越多的公司开始采用持续交付这种新范式的过程中。



So, you have to start by assuming the system in which your software runs will fail. Then you need hypotheses about why and how, and ways to collect data on those hypotheses. 

```
接受这样的假设：支撑你的软件运行的系统一定会发生故障
对为什么会发生故障以及故障可能会以怎样的形式发生做出预案
针对这些预案设计数据收集方案
```



The traditional nature of testing presumes you can delineate all the cases that require testing, which is fundamentally impossible in distributed systems.

传统的测试哲学中，假定 所有测试用例都是能够描述出来的，但在分布式系统中这一点不再成立。



histograms are generally preferable to averages when it comes to looking at your application and system data,

直方图通常比平均值更能说明问题

 
 
 
we have primarily leaned toward exhaustive requirements and creating tight couplings in order to have “control,” but this often leads to brittle systems that are in fact more prone to break or fail.
 
我们倾向于粗细不分地列出需求（ exhaustive requirements）和创建紧耦合（tight couplings），但这种方式经常 更容易导致故障，或者产生更脆弱的系统。


he reality is that most large failures are the result of a string of micro-failures leading up to the final event. There is no root cause. We’d do better to stop looking for one

大部分大故障都是一连串小故障叠加的结果，最终触发了某个事件（most large failures are the result of a string of micro-failures leading up to the final event）。这些故障并没有根本原因（There is no root cause）。我们最好不 要再去试图寻找根本原因了