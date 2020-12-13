---
layout: article
title: 别迷恋完美代码
---

[原文](https://dzone.com/articles/dont-waste-time-writing)


```
You Can't Write Perfect Software. Did that hurt? It shouldn't. Accept it as an axiom of life. Embrace it. Celebrate it. Because perfect software doesn't exist. No one in the brief history of computing has ever written a piece of perfect software. It's unlikely that you'll be the first. And unless you accept this as a fact, you'll end up wasting time and energy chasing an impossible dream.” 
Andrew Hunt,  The Pragmatic Programmer: from Journeyman to Master
```

```
“你不能写出完美的软件。是不是收到了伤害？并不。把它作为生活的公理接受它、拥抱它、庆祝它。因为完美的软件不存在。在计算机的短暂历史中从没有人写过完美的软件。你不可能成为第一个。除非你接受这个事实，否则你最终会浪费时间和精力追逐不可能的梦想。”

Andrew Hunt，务实的程序员: 从熟练工到大师
```

Code that is written once doesn’t need to be beautiful and elegant. It has to be correct. It has to be understandable – because code that is never changed may still be read many times over the life of the system. It doesn't have to be clean and tight – just clean enough. Copy and paste and other short cuts in this code can be allowed, at least up to a point. This is code that never needs to be polished. This is code that doesn't need to be refactored (until and unless you need to change it), even if other code around it is changing. This is code that isn't worth spending extra time on.

```
次性写的代码不需要美观优雅。但它必须是正确的、可以理解的 —— 因为绝不会改变的代码在系统的整个生命周期内可能仍然被阅读很多次。它不需要干净并紧凑 —— 只要干净就够了。代码中复制和粘贴和其他小的裁剪是允许的，至少在某种程度上是这样的。这些是永远不需要打磨的代码。即使周围的其他代码正在更改，这些也是不需要重构的代码（除非你需要更改它）。这是不值得花费额外时间的代码。
```

The core idea of Lean Development is: don’t waste time on things that aren't important,This should inform how we write code, and how we refactor it, how we review it, how we test it.

```
精益开发Lean Development的核心思想是：不要浪费时间在不重要的事情上。这应该提醒我们该如何编写代码，以及我们如何重构它、审查它、测试它。
```

Write tests that matter. Tests that cover the main paths and the important exception cases. Tests that give you the most information and the most confidence with the least amount of work. Big fat tests, or small focused tests – it doesn't matter, and it doesn't matter if you write the tests before you write the code or after, as long as they do the job.

```
写测试很重要。测试涵盖主要流程和重要的意外情况。测试让你用最少的工作获得最多的信息和最大的信心。大面积覆盖测试，或小型针对性测试 —— 都没关系，只要一直在做这个工作，在编写代码之前或之后编写测试并不重要。
```


```
The architectural and engineering metaphors have never been valid for software. We aren’t designing and building bridges or skyscrapers that will stay essentially the same for years or generations. We’re building something much more plastic and abstract, more ephemeral. Code is written to be changed – that is why it’s called “software”.
```

建筑和工程方面的隐喻对软件从未有效过。我们不是设计和建造几年或几代将保持基本不变的桥梁或摩天大楼。我们构建的是更加弹性和抽象、更加短暂的东西。代码写来是被修改的 —— 这就是为什么它被称为“软件”。
