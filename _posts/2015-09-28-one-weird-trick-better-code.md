---
layout: article
title: 数据驱动编程
---

[原文](http://etodd.io/2015/09/28/one-weird-trick-better-code/)

本文作者通过多个阶段的编程感悟，最后推导出，数据驱动编程的好处


分析了毁灭战士源代码在继承结构上的僵化


```
Trick #1: globals are evil
Trick #2: object-oriented programming
Trick #3: in general, favor composition over inheritance
Trick #4: line up data in memory for huge performance gains
```

Even the CPU likes it when we organize our data correctly (trick #4).

CPU喜欢你正确的组织数据，因为缓存问题


The One Weird Trick: data first, not code first


```
in summary, design data structures to match your specific problem. Don't shoehorn a single concept into a bunch of separate, encapsulated objects.

Next, write functions that leave the smallest possible footprint on that data. If possible, write pure stateless functions.
```


