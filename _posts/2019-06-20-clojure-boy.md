---
layout: article
title: 一个clojure大师
---
Clojure这个语言值得学到东西非常多，其作者的很多软件设计理念也非常值得研究，比如rich hickey说SCIP的学习其实对于你学习clojure帮助不大
本文是摘取了一个国内clojure程序员的一个文章，貌似这个大哥对clojure的理解非常的深入

大家可以follow下他的github
[原文](https://github.com/linpengcheng/PurefunctionPipelineDataflow)


另外这个大哥把乒乓球和太极关联了起来

[太极阴阳](https://github.com/linpengcheng/PurefunctionPipelineDataflow/blob/master/doc/interaction_of_static_and_dynamic.md)

```

NASA’s 10 rules for writing mission-critical code: 
1.Restrict all code to very simple control flow constructs.
        ----Gerard J. Holzmann, NASA JPL lead scientist.
        
Minimize control flow complexity and "area under ifs", 
favoring consistent execution paths and times over "optimally" avoiding unnecessary work.
        ---- John Carmack

Clojure Aphorism: A tangled web of mutation means any change to 
your code potentially occurs in the large. 
        ---- The Joy of Clojure (2nd Edition, Chapter 10)
        
Bad programmers worry about the code. 
Good programmers worry about data structures and their relationships.
        ---- Linus Torvalds
        
Data dominates. If you’ve chosen the right data structures and organized things well, 
the algorithms will almost always be self-evident. 
Data structures, not algorithms, are central to programming. 
        ---- Rob Pike
        
It’s better to have 100 functions operate on one data structure 
than 10 functions on 10 data structures.        
        ---- Alan Perlis

Even the simplest procedural logic is hard for humans to verify, 
but quite complex data structures are fairly easy to model and reason about. 
...
Data is more tractable than program logic. It follows that where you see a choice 
between complexity in data structures and complexity in code, choose the former. 
More: in evolving a design, you should actively seek ways to shift complexity from code to data.
        ---- Eric Steven Raymond, The Art of Unix Programming, Basics of the Unix Philosophy
        
Metaphors for a Richer Understanding of Software Development.
        ---- The most valuable chapter of "Code Complete": Chapter 2
        
Principles-based are better than rules-based.
        ----International Accounting Standards       
        
```
 
翻译：

```
NASA的10大编程规则：第一条：用非常简单的控制流结构体来编写程序。
        ---- NASA 喷气推进实验室（JPL）的首席科学家 Gerard J. Holzmann
       
最小化控制流复杂性和“ifs下的区域”，倾向于一致的执行路径和时间, 
而不是 "最优化", 以避免不必要的工作。。
       ---- 约翰 卡马克       

Clojure格言：交织的变化网意味着，代码的任何变化都可能会在更大层面上产生影响。
        ---- Clojure编程乐趣(第2版)第10章
        
糟糕的程序员关注代码。优秀的程序员关注数据结构及其关系。
       ---- Linus Torvalds

数据占主导地位。如果您选择了正确的数据结构并组织好了，那么算法几乎总是不言自明的。
数据结构才是编程的核心, 而不是算法。
        ---- Rob Pike

围绕一个数据结构开发100个函数, 比设计10个带10个函数的数据结构更好.
       ---- Alan Perlis

即使是最简单的程序逻辑对于人类来说也难以验证，但非常复杂的数据结构却相当容易建模和推理。
...
数据比程序逻辑更容易处理。接下来，您可以选择数据结构的复杂性和代码的复杂性，选择前者。
更多：在设计的演变过程中，您应该积极寻求将复杂性从代码转移到数据的方法。
        ---- Eric Steven Raymond, Unix编程的艺术, Unix哲学的基础知识

善于在软件开发中运用比喻。
       ---- "代码大全"最有价值章节(第二章)
       
基于原则比基于规则更好。
       ----国际会计准则
       
```
