---
layout: article
title: 编辑器抽象
---

[原文](http://deliberate-software.com/editor-abstractions/)

```
Consider the sequence abstractions. With only: map, filter, and fold, you can transform any sequence of data into another shape. Mastering the three sequence abstractions empowers you to transform any data. The power comes from how easily they can be combined.
```
我们使用map,filter,fold这三个抽象可转化任何序列数据。


```
Editor abstractions are most powerful when they can be composed. You can replicate most of the functionality of a refactoring suite using basic, composable text-editing commands. Well-designed editor abstractions can be recorded, edited, and replayed to transform text in any way you need
```

所以对于任何文本的操作，我们也应该掌握部分核心抽象，它具备可组合性，作者建议学习vim，你可以基于一种编辑抽象在各个编辑环境相同的操作。
