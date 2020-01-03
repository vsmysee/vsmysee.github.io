---
layout: article
title: Unix哲学崩溃
---

[原文](https://www.johndcook.com/blog/2010/06/30/where-the-unix-philosophy-breaks-down/)

Unix philosophy says a program should do only one thing and do it well.

Unix哲学认为程序应该只做一件事并且做得好


In practice, programs gain overlapping features over time

随着时间的推移，程序会获得重叠的功能


Piping the output of a simple shell command to another shell command is easy. But as tasks become more complex, more and more work goes into preparing the output of one program to be the input of the next program. Users want to be able to do more in each program to avoid having to switch to another program to get their work done.

将简单的shell命令的输出传递到另一个shell命令很容易。但是随着任务变得越来越复杂，准备一个程序的输出作为下一个程序的输入的工作也越来越多。用户希望能够在每个程序中执行更多操作，以避免不得不切换到另一个程序来完成工作。


An example of the opposite of the Unix philosophy would be the Microsoft Office suite.

与Unix哲学相反的一个例子是Microsoft Office套件


Office users are grateful for the redundancy.

办公室用户感谢您的冗余。


Companies expand or contract until they reach an equilibrium between bureaucracy costs and transaction costs,Technology can cause the equilibrium point to change over time

公司扩张或收缩，直到它们在官僚机构成本和交易成本之间达到平衡。技术会导致平衡点随时间变化
