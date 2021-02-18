---
layout: article
title:  安卓记事
---

我做了10年的后端，其实从来没有想过可能和安卓有交集，新的工作让我不得不进入这个领域，最大的感受依然不变，我们需要对每个知识领域保持敬畏，因为深入到细节层面，或者可靠性层面，唯有敬畏之心
方可对复杂性有认识，不存在技术领域有高低贵贱之分。


作为一个2003年起步的操作系统，算下来快要20年了，20年是足以让一个领域变得成熟，成熟就会变得庞大，庞大的后果就是我们觉得每个个体都好弱小，几年的光阴都在一小块天地里挣扎，谷歌在在收购安卓之后，直到2008年左右才开始把系统推向市场，如果考究这个系统
本质上是建立在Linux上的，但是内核分支独立了出去，对比IOS，后者历史则更为厚重，是从MacOS上阉割出来的，智能手机操作系统的最大的推动者还是乔布斯。

这是此系统的堆栈结构，我们都需要明白自己活在哪一层

![](https://source.android.google.cn/images/android_framework_details.png?hl=zh-cn)


本文的大部分内容都在开发者指南https://developer.android.com/guide


## 核心概念

打开一个APP，首先要解决的是如何显示界面，于是有了Activity，在web开发中我们叫做页面，一个APP由非常多的Activity组成，各种Activity互相调用，由于某一个时刻和用户交互的是一个Activity，所以会在交互过程
中形成一个栈结构.

Activity真正在显示一个UI的时候需要依靠一个布局对象，布局对象对UI组件进行管理，于是得到了另外两个对象，View 和 ViewGroup, 这两个对象会形成一个层次结构放进Activity,所有的UI组件要么是View的子类，要么是
ViewGroup的子类
![](https://developer.android.com/images/viewgroup_2x.png)



