---
layout: article
title: 完美的语言
---

[原文](https://eli.thegreenplace.net/2017/clojure-the-perfect-language-to-expand-your-brain/)

Clojure是一个完美的扩展你大脑的语言


```
A language that doesn't affect the way you think about programming, is not worth knowing.
```

设计者的功力:

The designers of Clojure are extremely pragmatic, building upon decades of industry experience. 


## The right approach to object-orientation

Historically, Lisp programmers weren't the biggest proponents of OOP. This doesn't mean that OOP has absolutely no value in Lisp-y languages, however. Common Lisp has had CLOS for decades, and Clojure also comes with an array of OO-like features.

That said, Clojure's flavor of OOP is particularly powerful and tends to discourage bad practices. Clojure uses "protocols", which are a kind of interfaces, and encourages thinking in terms of protocols rather than in terms of classes with inheritance hierarchies, sort of like Go. Add to that an ability to do true multiple dispatch and you have a powerful modeling tool at your fingertips.

和Go一样的方案来正确的解决OO问题