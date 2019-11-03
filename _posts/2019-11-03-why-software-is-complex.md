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

[工程本质](https://www.cnblogs.com/feng9exe/p/9949906.html)

```
复杂性有三类
1，问题域本身的复杂性
2，采用的技术方案引入的额外复杂性
3，涉及到的人和组织再引入的额外复杂性
```
```
所以，软件工程必须管理复杂性
1，技术熵越少越好
2，组织熵越少越好
3，良好的领域抽象，是真正的关键
4，如何去控制变化，隔离变化，适应变化
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


[十个观点](https://www.ics.uci.edu/~ziv/ooad/intro_to_se/tsld009.htm)

- The field is young and there is little consensus and few standards
- Software is irregular, intangible, invisible
- Software is malleable -- we can modify the product itself
- Software construction is human-intensive
- Software application horizons expand with hardware capabilities
- Software problems are unprecedentedly complex
- Software solutions require unusual rigor
- Software has discontinuous operational nature
- No two parts or two systems are alike
- Scaling up the system causes a nonlinear increase in complexity



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


[复杂](https://itnext.io/the-origin-of-complexity-8ecb39130fc)

- Don’t repeat yourself — because that adds coordination.
- Make it small — because that reduces coordination.
- Avoid mutable state — because it adds coordination.
- Use pure functions — because they reduce coordination.
- Use interfaces — because they reduce coordination.
- Use polymorphism — because it reduces coordination.
- Prefer composition — because it reduces coordination.
- Use declarative style — because it reduces coordination.
- Avoid temporal coupling — because it introduces coordination
- Work in small teams — because it reduces coordination.
- Make small commits — because it reduces coordination.
- Avoid long lived branches — because they increase coordination.
- Test your code — to catch coordination that wasn’t done correctly!

我们需要coordination

- Hardware & network are affected by the reality so that they sometimes break and need to be repaired or replaced.
- Concepts from the world become models in our code.
- People are affected by the world and the environment they live and work in.
- People leave teams/projects and new people appear.
- Tools & services are used to manage hardware & network. Sometimes manually by people that use tools and sometimes automated.
- Tools are used to execute or debug runtime code.
- Tools & services are made up of runtime code so that they can be executed.
- Hardware is needed to execute runtime code.
- Source code is transformed into runtime code.
- Tools are used to work with source code.
- Tools are used by other tools & services.
- People create tools & services.
- People interact with other people.
- Models affect how the source code is written.
- Tools are used to create models.
- Tools and services are used by people to perform tasks: 5 ) manage hardware & network, 6) execute or debug code, 10) work with source code, 15) create models, 16) organise people.

最后又提到了: talk Simple Made Easy by Rich Hickey