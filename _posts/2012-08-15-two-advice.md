---
layout: article
title: 两个领悟
---

[文章一](http://russolsen.com/articles/2012/08/09/the-best-programming-advice-i-ever-got.html)


```
“今后，千万别碰其他人的代码！（In the future, stay the Hell out of other people’s code.）”
```

In later years, as I found myself building and managing software teams, I've realized that there were probably a dozen programmers on that ancient project who knew why the system was so slow and how to fix it. They knew, but they kept it to themselves because in that organization, there were some things that were more important than making the system better. In the future, stay the Hell out of other people's code. assumes there will be a future. But the best way to have a future is to be part of a team that values progress over politics, ideas over territory and initiative over decorum.

在后来的那些年里，随着我自己也在建立并管理软件开发团队，我已经意识到，对于那种古来的项目而言，可能会有整整一打程序员都知道系统到底为何如此缓慢，而且也知道该如何修复它。尽管他们心知肚明，但是他们却把解决方案烂在肚子里。因为在那种组织里，与让系统变得更好相比，还有一些更重要的事情（派系之争、办公室政治等等）要关注。“今后，千万别碰其他人的代码，”，这句话假设将会有未来。

但是，拥有未来的最好方法是让以下内容成为团队的一部分：看重系统进步高于办公室政治（progress over politics）、奇思妙想高于固步自封（ideas over territory）、自告奋勇高于彬彬有礼（initiative over decorum）



[文章二](http://www.informit.com/articles/article.aspx?p=1941206)

Advice:

A year or two after I'd joined the Labs, I was pair programming with Ken Thompson on an on-the-fly compiler for a little interactive graphics language designed by Gerard Holzmann. I was the faster typist, so I was at the keyboard and Ken was standing behind me as we programmed. We were working fast, and things broke, often visibly—it was a graphics language, after all. When something went wrong, I'd reflexively start to dig in to the problem, examining stack traces, sticking in print statements, invoking a debugger, and so on. But Ken would just stand and think, ignoring me and the code we'd just written. After a while I noticed a pattern: Ken would often understand the problem before I would, and would suddenly announce, "I know what's wrong." He was usually correct. I realized that Ken was building a mental model of the code and when something broke it was an error in the model. By thinking about *how* that problem could happen, he'd intuit where the model was wrong or where our code must not be satisfying the model.

Ken taught me that thinking before debugging is extremely important. If you dive into the bug, you tend to fix the local issue in the code, but if you think about the bug first, how the bug came to be, you often find and correct a higher-level problem in the code that will improve the design and prevent further bugs.

I recognize this is largely a matter of style. Some people insist on line-by-line tool-driven debugging for everything. But I now believe that thinking—without looking at the code—is the best debugging tool of all, because it leads to better software.

忠告：

在我加入贝尔实验室一年多后，我开始和Ken Thompson一起在开发一个针对由Gerard Holzmann设计的很小的图形化交换语言的即时编译器上做结对编程。我打字比较快，所以我坐在电脑前，Ken站在我身后看我编程。我们开发的很快，但经常会遇到问题，而且可以看出来出错了——毕竟这是一个图形化的编程语言。当程序出错时，我本能的一头扎进问题，检查报错跟踪信息，添加调试打印语句，启动调试器，等等，但Ken只是站在那思考，完全不理会我也不查看我们写的出问题的代码。一段时间后我发现一个规律，Ken经常会比我先找到问题出在什么地方，而且会突然的喊一嗓子，“我知道什么地方的问题了。”每次他的判断都很准确。我认识到，Ken已经在脑海里构建了代码的模型，当有问题出现时，那是他脑子里的模型出了问题。在思考为什么会发生这些错误时，他能凭直觉找到模型中什么地方不对或发现写的代码跟这个模式什么地方有出入。

Ken教会了我一个极其重要的习惯：纠错前先思考。如果你一头扎进问题中，你可能只解决了当前出现问题的代码，但如果你先思考这个错误，这个bug是怎么引入的？你通常发现和纠正一个更高层次的问题，进而改进了系统设计，防止了更多bug的出现。

我认识到这种编程思考模式非常的重要。有些人痴迷于一行行的、使用各种工具来调试所有的东西。但我现在相信，思考——不看代码的思考——是最好的调试途径，因为它能让你开发出更好的软件。