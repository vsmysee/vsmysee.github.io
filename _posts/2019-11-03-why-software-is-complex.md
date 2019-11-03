---
layout: article
title:  好难
---
软件开发真的很难，你有这个感觉吗？看看他们都怎么说的

复杂度的象限：

[ThoughtWorks工程师](http://icodeit.org/2017/01/why-software-is-complex/)

![复杂象限](http://icodeit.org/images/2017/01/cynefin-resized.png)

- 简单（Simple）问题

该域中的因果关系非常明显，解决这些问题的方法是 感知-分类-响应（Sense-Categorise-Respond），有对应的最佳实践

- 复合（Complicated）问题

该域中的因果关系需要分析，或者需要一些其他形式的调查和/或专业知识的应用，解决这些问题的方法是感知-分析-响应（Sense-Analyze-Respond），有对应的好的实践

- 复杂（Complex）问题

该域中的因果关系仅能够从回顾中发现，解决这些问题的方法是探索-感知-响应（Probe-Sense-Respond），我们能够感知涌现实践（emergent practice）

- 混乱（Chaotic）问题

该域中没有系统级别的因果关系，方法是行动-感知-响应（Act-Sense-Respond），我们能够发现新颖实践（novel practice）

- 失序（Disorder）问题

该域中没有因果关系，不可感知，其中的问题也无法被解决

显然，软件开发过程更多地是一个复杂（Complex）问题。在一个产品被开发出来之前，不确定性非常高，团队（包括业务人员和技术人员）对产品的知识也是最少的，而且需要大量的学习和尝试才可以明确下一步可能的方向。
不幸的是，很多时候我们需要在一开始（不确定性最高的时候）就为项目做计划。这种从传统行业中非常适合的方法在软件开发领域不再适用，这也是敏捷开发、精益等方法论在软件开发中更加适合的原因。

```
软件的复杂性来自于大量的不确定性，而这个不确定性事实上是无法避免的，而且每个软件都是独一无二的。
另一方面，软件的需求会以各种方式来变化，而且往往会以开发者没有预料到的方向
```

[七个理由](https://www.finextra.com/blogs/fullblog.aspx?blogid=6836)

- The software industry is young
- Every line of code is a potential point of failure
- Lack of user input
- Users don't know what they want until they see it
- There are no barriers to entry to become a programmer
- All software is affected by external factors
- Estimating is an art not a science

A software application is like an iceberg – 90% of it is not visible. 
The major complexity in the application lies below the waterline and is invisible to the user. 
The next time you are wondering why software projects appear so difficult to get right you might perhaps spare a thought for the developers. 
They are generally working hard to deliver on time against a tidal wave of challenges and complexity.


[写点代码简单，可做软件难](http://www.thoughtclusters.com/2011/01/programming-is-easy-software-development-is-hard/)

Programming is a learnable skill. The more you work on it, the better you become. You can master the intricacies of a language, 
understand different patterns of building software, acquire the knowledge of useful algorithms

Software development is about that tricky part. It is about understanding your customer, sometimes talking to them and sometimes not knowing them and only understanding them through observation. 
It is also about working with multiple people to build a coherent quality system. It happens in the real world where things can go wrong and frequently do. 
I don’t need to elaborate because you know what I am talking about. 
It is far easier for a single programmer to pick a problem and solve it than for a huge team to define the problem and set about to find a solution to it.


## Erlang 之父 Joe Armstrong 的感触

多年前我曾一度认为编程很简单，然而随着岁月的流逝，我终于意识到编程并不是件容易的事。
这是因为，我所认为的「究竟什么是编程」和「程序员到底是做什么的」，在感知上已经渐渐地发生了转变。

```
程序输出是优美的；

程序输入是优美的；

程序本身也是优美的；

程序输入有着完好并正确的文档；

程序本身也是有着完好并正确的文档；

程序是经过良好测试过并验证是正确的；

正在解决的问题是十分明确的；

整个问题本身也是十分明确的；

```
加上这些约束后，编程就变得非常困难了

必须要维护的程序

还有其他三个因素让编程变得困难：

- 修复本不应该出问题的程序
- 没时间学习
- 编程的恶劣环境

这三个问题全是「时间的小偷」


### 莫名其妙

我的emacs拼写检查器在这台机器上忠实的工作了好几年了。就在我抱怨花费半生时间修复本不应该出问题的程序的时候，我的emacs拼写检查器坏掉了。