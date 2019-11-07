---
layout: article
title:  谷歌工程实践文档
---

Google 有许多通用工程实践，几乎涵盖所有语言和项目。此文档为长期积累的最佳实践，是集体经验的结晶

[地址](https://google.github.io/eng-practices/)

[翻译](https://jimmysong.io/eng-practices/)


## 平衡和完美

A key point here is that there is no such thing as “perfect” code—there is only better code. Reviewers should not require the author to polish every tiny piece of a CL before granting approval. Rather, the reviewer should balance out the need to make forward progress compared to the importance of the changes they are suggesting. Instead of seeking perfection, what a reviewer should seek is continuous improvement. A CL that, as a whole, improves the maintainability, readability, and understandability of the system shouldn’t be delayed for days or weeks because it isn’t “perfect.”


此处有一个关键点就是没有“完美”的代码，只有更好的代码。审查者不该要求开发者在批准程序前仔细清理、润色 CL 每个角落。相反，审查者应该在变更的重要性与取得进展之间取得平衡。审查者不应该追求完美，而应是追求持续改进。不要因为一个 CL不是“完美的”，就将可以提高系统的可维护性、可读性和可理解性的 CL 延迟数天或数周才批准。


## 不要过度

A particular type of complexity is over-engineering, where developers have made the code more generic than it needs to be, or added functionality that isn’t presently needed by the system. Reviewers should be especially vigilant about over-engineering. Encourage developers to solve the problem they know needs to be solved now, not the problem that the developer speculates might need to be solved in the future. The future problem should be solved once it arrives and you can see its actual shape and requirements in the physical universe.

其中一种复杂性就是过度工程（over-engineering），如开发人员使代码过度通用，超过它原本所需的，或者添加系统当前不需要的功能。审查者应特别警惕过度工程。未来的问题应该在它实际到达后解决，且届时才能更清晰的看到其真实样貌及在现实环境里的需求，鼓励开发人员解决他们现在需要解决的问题，而不是开发人员推测可能需要在未来解决的问题。


## 测试

Will the tests actually fail when the code is broken? If the code changes beneath them, will they start producing false positives? Does each test make simple and useful assertions? Are the tests separated appropriately between different test methods?

Remember that tests are also code that has to be maintained. Don’t accept complexity in tests just because they aren’t part of the main binary.

当代码被破坏时，测试是否真的会失败？ 如果代码发生变化时，它们会开始产生误报吗？ 每个测试都会做出简单而有用的断言吗？ 不同测试方法的测试是否适当分开？

请记住，测试也是必须维护的代码。不要仅仅因为它们不是主二进制文件的一部分而接受测试中的复杂性。


Summary


In doing a code review, you should make sure that:

The code is well-designed.
The functionality is good for the users of the code.
Any UI changes are sensible and look good.
Any parallel programming is done safely.
The code isn’t more complex than it needs to be.
The developer isn’t implementing things they might need in the future but don’t know they need now.
Code has appropriate unit tests.
Tests are well-designed.
The developer used clear names for everything.
Comments are clear and useful, and mostly explain why instead of what.
Code is appropriately documented (generally in g3doc).
The code conforms to our style guides.




总结


在进行代码审查时，您应该确保：

```
代码设计精良。
该功能对代码用户是有好处的。
任何 UI 变更都是合理的且看起来是好的。
其中任何并行编程都是安全的。
代码并不比它需要的复杂。
开发人员没有实现他们将来可能需要，但不知道他们现在是否需要的东西。
代码有适当的单元测试。
测试精心设计。
开发人员使用了清晰的名称。
评论清晰有用，且大多用来解释为什么而不是做什么。
代码有适当记录成文件（通常在 g3doc 中）。
代码符合我们的风格指南。
```
