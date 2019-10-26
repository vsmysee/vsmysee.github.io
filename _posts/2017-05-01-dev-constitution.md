---
layout: article
title: 收集的开发章程
---
我们看一个开源软件，或者参与一个开源项目的开发，必须得先了解这个软件的设计准则或者开发章程，因为这里面体现出的是软件作者的品味，哲学，风格。
有些人被linux作者骂的原因估计都是风格和哲学不匹配


[开源行为准侧](https://www.contributor-covenant.org/)


## Unix

```

Write programs that do one thing and do it well.
Write programs to work together.
Write programs to handle text streams, because that is a universal interface.


Rule of Modularity: Write simple parts connected by clean interfaces.
Rule of Clarity: Clarity is better than cleverness.
Rule of Composition: Design programs to be connected to other programs.
Rule of Separation: Separate policy from mechanism; separate interfaces from engines.
Rule of Simplicity: Design for simplicity; add complexity only where you must.
Rule of Parsimony: Write a big program only when it is clear by demonstration that nothing else will do.
Rule of Transparency: Design for visibility to make inspection and debugging easier.
Rule of Robustness: Robustness is the child of transparency and simplicity.
Rule of Representation: Fold knowledge into data so program logic can be stupid and robust.
Rule of Least Surprise: In interface design, always do the least surprising thing.
Rule of Silence: When a program has nothing surprising to say, it should say nothing.
Rule of Repair: When you must fail, fail noisily and as soon as possible.
Rule of Economy: Programmer time is expensive; conserve it in preference to machine time.
Rule of Generation: Avoid hand-hacking; write programs to write programs when you can.
Rule of Optimization: Prototype before polishing. Get it working before you optimize it.
Rule of Diversity: Distrust all claims for “one true way”.
Rule of Extensibility: Design for the future, because it will be here sooner than you think.

```


## Xwindow

```
Small is beautiful.
Make each program do one thing well.
Build a prototype as soon as possible.
Choose portability over efficiency.
Store data in flat text files.
Use software leverage to your advantage.
Use shell scripts to increase leverage and portability.
Avoid captive user interfaces.
Make every program a filter.

```


## Elasticsearch

[原文](https://github.com/elastic/engineering/blob/master/development_constitution.md)

```
团队希望尽可能快地向可靠，健壮，安全，可扩展且易于使用的系统迁移
删除脆弱的代码，并致力于改善用户体验
过程优于结果

为今天设计！谨慎使用抽象
开始简单; 不要聪明
注意：删除代码很困难
严格，明确，可靠，简单
坚守核心职责 我们的系统坚持 稳固 和 可靠 特性至关重要
你是专家; 就表现得像一名专家
独立构建功能
先移除再修复
默认速度很快; 慢是可选的
关注升级体验
突破主要的，而不是小的
自下而上测试
考虑Java API 专家 API 
重要的是，对所有的代码保持质疑，并拥抱错误 
不要害怕犯错
不要害怕重大改变 
不要害怕说不
只接受可扩展的功能
始终从梦想出发
关注错误报告
为代码提供文档
默认为私有
每一个变化都值得审阅
敢于打破规则 
精确和尊重地表达你的意见
保持友善
权力随之而来的是责任
珍惜激情
对压力感同身受
对我们的行为准则小组报告滥用评论
如有疑问，请提问
通过相互交谈来解决冲突
```


## Python
```
优美胜于丑陋（Python 以编写优美的代码为目标）
明了胜于晦涩（优美的代码应当是明了的，命名规范，风格相似）
简洁胜于复杂（优美的代码应当是简洁的，不要有复杂的内部实现）
复杂胜于凌乱（如果复杂不可避免，那代码间也不能有难懂的关系，要保持接口简洁）
扁平胜于嵌套（优美的代码应当是扁平的，不能有太多的嵌套）
间隔胜于紧凑（优美的代码有适当的间隔，不要奢望一行代码解决问题）
可读性很重要（优美的代码是可读的）
即便假借特例的实用性之名，也不可违背这些规则（这些规则至高无上）
不要包容所有错误，除非你确定需要这样做（精准地捕获异常，不写 except:pass 风格的代码）
当存在多种可能，不要尝试去猜测
而是尽量找一种，最好是唯一一种明显的解决方案（如果不确定，就用穷举法）
虽然这并不容易，因为你不是 Python 之父（这里的 Dutch 是指 Guido ）
做也许好过不做，但不假思索就动手还不如不做（动手之前要细思量）
如果你无法向人描述你的方案，那肯定不是一个好方案；反之亦然（方案测评标准）
命名空间是一种绝妙的理念，我们应当多加利用（倡导与号召）
```


## Python & Ruby

```

Beautiful is better than ugly.	Beauty is in the eye of the beholder.
Explicit is better than implicit.	Implicit is preferable to explicit.
Simple is better than complex.	Simple is boring.
Complex is better than complicated.	Complex is interesting.
Flat is better than nested.	Delegate the details to someone else.
Sparse is better than dense.	If possible, make it a one-liner.
Readability counts.	Readability is sometimes nice.
Special cases aren't special enough to break the rules.	Special cases are everywhere; the rules can't cover them all.
Although practicality beats purity.	When in doubt, monkeypatch.
Errors should never pass silently.	Errors should be suppressed.
Unless explicitly silenced.	Unless whiny nils is turned on.
In the face of ambiguity, refuse the temptation to guess.	When in doubt, make assumptions about what the user wanted.
There should be one-- and preferably only one --obvious way to do it.	There should be many-- preferably dozens --of non-obvious ways to do it.
Although that way may not be obvious at first unless you're Dutch.	What's obvious to you may be completely unintuitive to someone else.
Now is better than never.	Now is better than later.
Although never is often better than *right* now.	And later is better than never.
If the implementation is hard to explain, it's a bad idea.	If the design is flawed, explain why in the implementation docs.
If the implementation is easy to explain, it may be a good idea.	If the design is good, don't bother with implementation docs.
Namespaces are one honking great idea -- let's do more of those!	Namespaces are completely unnecessary -- let's make everything global!
```



## Redis

[英文连接](http://oldblog.antirez.com/post/redis-manifesto.html)

```
操作数据结构的语言工具
定位于一个内存数据库，正是由于内存的快速访问特性，才使得 Redis 能够有如此高的性能
使用基础的 API 操作基础的数据结构
有着诗一般优美的代码
始终避免复杂化，我们认为设计一个系统的本质，就是与复杂化作战
支持两个层面的 API，第一个层面包含部分操作 API，但它支持用于分布式环境下的 Redis。第二个层面的 API 支持更复杂的 multi-key 操作
我们以优化代码为乐，我们相信编码是一件辛苦的工作，唯一对得起这辛苦的就是去享受它


```


## Paul Merlyn 的观点

[英文](https://www.infoq.com/articles/simplicity-manifesto-development)

复杂
```
复杂度是软件公司成长和盈利的最大障碍。
开发成本随代码库的复杂度增加呈指数增长。
在进度和简洁之间做选择是一个错误的二分法。对简洁的投资就是对进度的投资。
很少有高管认识到复杂度的代价，因为他们不了解其销售的产品的性质。
软件是一种比较特殊的产品，它混合了产品和服务，带有非常独特的质保。

```

简洁
```
学习
领导力
重新评估
有策略地招聘
知识管理
脚踏实地

```


## TIDB

[原文](https://mp.weixin.qq.com/s?__biz=MzI3NDIxNTQyOQ==&mid=2247484474&idx=1&sn=0d9a5ab3beb2783cfca3d3b22a567dfc&chksm=eb162350dc61aa46dfc8156b5b92d404d0785b5dff60bd1e6bca42a60109cf1dc30857f1e811#rd)

```
所有计算机科学里面的问题都可以把它不停地抽象，抽象到另外一个层次上去解决
Talk is cheap，show me the tests
对于一个架构师来说，所有的工作都是在去规避复杂度，提升开发效率和稳定性
Where there’s a metric there’s a way
做基础软件的工程师，最好的方式就是润物细无声
不要意外
悲观预设 永远都会有各种各样的恶心事情和异常的状况发生
```


## Tobias Günther的观点

[原文](https://www.git-tower.com/blog/dev-philosophy-1/)

```
Applications Need Solid Foundations
Choosing the Boring Solution
Coding the Lego Way
Aiming for Simplicity
Constantly Redefining the Term "Edge Case"
Creating Good APIs
Design Patterns
Embrace Best Practices
Fashion-Driven Development
Stack-Overflow-Driven Development


```

## Clojure

## 简单
复杂问题很难有一个简单的解决方案。但是，如果把事情搞得不必要的复杂，即便是有经验的程序员也会栽倒，这就是“偶然复杂性”，与其相对的是任务的本质复杂性（Moseley 2006）。Clojure 致力于帮我们解决各种复杂问题，而不引入偶然复杂性，比如，各种数据需求、多并发线程、独立开发的程序库等。它还提供了一些工具，减少了一些初看起来像本质复杂性的东西。如此一来，最终的特性集合或许看起来并不简单，尤其在我们对这些特性还不甚熟悉时，但随着通读本书，我们认为，你会逐渐体会到 Clojure 去除了多少的复杂性。
偶然复杂性有一个例子，就是现代面向对象程序设计语言的一个发展趋势，即它要将所有可运行代码打包在类定义、继承和类型声明这样的层次里。Clojure 通过支持“纯函数”去除了所有这些东西，所谓纯函数就是传入几个实参，然后，只根据这些实参产生一个返回值。Clojure 很大一部分就是构建在这样的函数基础上的，绝大多数应用也可以如此，这意味着，尝试解决手头问题时，需要考虑的东西会更少。

## 专注
写代码总是要和干扰做斗争，每当语言让我们思考语法、运算符优先级、继承层次结构时，只会让干扰增多。Clojure 尽力让一切保持尽可能简单，无需为探索一个想法经历“编译—运行”的循环，无需类型声明，等等。它还提供了一些工具，让我们可以改造语言，使词汇和文法能够更好地适应问题领域，因此，Clojure 极具表现力。这种做法影响极大，可以在不牺牲可理解性的前提下，很好地完成一些极其复杂的任务。
之所以能够保持专注，关键一点在于恪守对动态系统的承诺。Clojure 程序中定义的几乎所有一切都是可以重新定义的，即便程序尚在运行：函数、多重方法、类型、类型层次结构，甚至 Java 的方法实现。动态重定义这些东西貌似很可怕，尤其是在生产系统上，但它却为思考如何编写程序打开了另一种奇妙的可能性。我们可以对不熟悉的 API 进行更多的实验和探索，这是一种乐趣，而这种乐趣却常常为更静态的语言、漫长的编译周期所阻碍。
但是，Clojure 并不只有乐趣。乐趣只是一种副产品，更重要的是，它可以让程序员有能力获得超乎想象的高效。

## 实用
某些程序设计语言生来只为展示学术成果，或是探索某种计算理论。Clojure 不在此列。Rich Hickey 曾在很多场合说过，在构建有趣且有用的应用方面，Clojure 是很有价值的。
为达此目标，Clojure 努力做到务实 —— 一种用于完成工作的工具。在 Clojure 里，如果某一设计决策要在实用和聪明、花哨或是纯理论的解决方案进行权衡，胜者往往是那些实用的解决方案。Clojure 曾试图让我们远离 Java，但这样做要在程序员和程序库之间插入大量 API，这种做法可能会让第三方 Java 程序库很难用。所以，Clojure 选择了另一条路：不做封装、编译成相同的字节码，能够直接访问 Java 的类和方法。Clojure 字符串就是 Java 字符串；Clojure 函数调用就是 Java 方法调用。这样做简单、直接、务实。
使用Java虚拟机（JVM）这个决策本身就是一个务实的做法。JVM存在某些技术上的缺陷，诸如启动时间、内存使用、缺乏尾递归优化（tail-call optimization，TCO）2。但是，它也是一个惊人的务实平台——成熟、快速、部署广泛。其支持各种硬件和操作系统，拥有数量众多的程序库，以及支持工具，由于这个极尽务实的决策，所有这一切都可以为Clojure所用。

## 清晰
Clojure 为代码的清晰做着努力，提供了一些工具规避几种不同的混乱。就刚才描述的那种情况而言，采用它所提供的不变局部量和持久化集合，便可一并消除了单线程和多线程的大部分问题。
当我们所用的语言将不相关的行为合在一个构造里时，我们不难发现，自己已深陷多种泥潭。Clojure 通过分离关注点让我们保持警醒，应对这样的情况。一旦事物得到分离，思路就会清晰许多，只在必要时重新组合

## 一致
Clojure 在两个具体的方面提供了一致性：语法和数据结构。
语法一致性指的是，相关的概念在形式上是类似的。有个简洁有力的例子，for 和 doseq 这两个宏之间的语法是一样的。
它们做的事情不尽相同——for 返回的是一个惰性 seq，而 doseq 只是为了产生副作用——但二者支持相同的迷你语言（mini-language）：嵌套迭代、解构、:when 和:while 卫语句。比较下面这个例子就不难看出相似性：