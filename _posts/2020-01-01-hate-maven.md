---
layout: article
title:  Maven宿命
---

这是NealFord的文章，写于2003年，标题是Why Everyone (Eventually) Hates (or Leaves) Maven

为什么每个人（最终）讨厌（或者离开）Maven。

NealFord是函数式编程思维一书的作者，在这本书中，有一章节也论述了为什么应该抛弃Maven

[原文](http://nealford.com/memeagora/2013/01/22/why_everyone_eventually_hates_maven.html)


Banq老师的翻译


[地址](https://www.jdon.com/44914)

```
Martin Fowler倡导一种内部可编程工具 InternalReprogrammability，并且分享了类似Emacs 和 Smalltalk让人心灵减少悲苦的工具。

作者总结了编程世界中两种可扩展可编程的抽象类型：Composable组合与Contextual语境上下文。

Maven是一个经典的contextual工具:它是武断的，刚性的，通用的，和教条的，项目之初，它容易通过插件添加行为和其他预建的细节。但随着时间的推移，项目变得不通用的，更像一个真正的，混乱的项目。在项目早期，因为没有人知道生命周期等特点，刚性制度当然很好，但是随着时间推移，项目复杂性增加，需要程序员有大量分支意见，这时Maven已经无能为力。

语言构建工具应该更加composable，作者推荐的是Rake，Ruby世界的构建工具，是一个简单强大充满魔力的捆绑工具。当作者从Ant到Rake时，发现Ant的task是可以在Rake中使用，是一种类似Ant世界。

很多人可能以为作者攻击Maven，成为Maven-bashing，作者只是想让大家明白，没有工具在任何场景上下文下工作得完美，Maven是启动新项目的好工具。
```

一个定律

```
Dietzler’s Law for Access

Every Access project will eventually fail because, while 80% of what the user wants is fast and easy to create, and the next 10% is possible with difficulty, ultimately the last 10% is impossible because you can’t get far enough underneath the built-in abstractions, and users always want 100% of what they want
```

每个Access项目最终都会失败，因为尽管用户想要的80％的内容快速且易于创建，而下一个10％的内容可能会遇到困难，但最终的10％的结果是不可能的，因为您在该项目下无法获得足够的距离内置抽象，用户总是想要他们想要的东西的100％。


Unix Shell:

```
tr -cs A-Za-z '\n' |
tr A-Z a-z |
sort |
uniq -c |
sort -rn |
sed ${1}q
```



I tend to prefer composable tools. They tend to have a steeper learning curve but deliver more power and scalability over time, which is why I’m a huge Emacs fan, and why Martin’s post on InternalReprogrammability struck a chord. Contextual tools are fantastic for the proper use; I use IntelliJ for Java coding, but Emacs for pretty much everything else, and I tend to seek out composable tools when there’s an option.

我倾向于使用可组合工具。它们往往具有较陡的学习曲线，但是随着时间的推移会提供更多的功能和可伸缩性，这就是为什么我是Emacs的忠实粉丝，也是为什么Martin在InternalReProgrammability上发表文章的原因。上下文工具非常适合正确使用；我使用IntelliJ进行Java编码，但是使用Emacs进行几乎所有其他操作，并且我倾向于在有选择的情况下寻找可组合的工具。

