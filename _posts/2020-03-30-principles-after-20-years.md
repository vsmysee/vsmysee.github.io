---
layout: article
title: 20年经验
---

[原文](https://medium.com/@alexewerlof/my-guiding-principles-after-20-years-of-programming-a087dc55596c)


Don’t fight the tools: libraries, language, platform, etc. Use as much native constructs as possible. Don’t bend the technology, but don’t bend the problem either. Pick the right tool for the job or you’ll have to find the right job for the tool you got.

不要纠结于工具，尽量用本地构造，用正确的工具解决正确的问题

You don’t write the code for the machines, you write it for your colleagues and your future self (unless it’s a throw away project or you’re writing assembly). Write it for the junior ones as a reference.

代码写给人看

Any significant and rewarding piece of software is the result of collaboration. Communicate effectively and collaborate openly. Trust others and earn their trust. Respect people more than code. Lead by example. Convert your followers to leaders.

开放写作

Divide and conquer. Write isolated modules with separate concerns which are loosely coupled. Test each part separately and together. Keep the tests close to reality but test the edge cases too.

分而治之,模块测试

Deprecate yourself. Don’t be the go-to person for the code. Optimize it for people to find their way fixing bugs and adding features to the code. Free yourself to move on to the next project/company. Don’t own the code or you’ll never grow beyond that.

代码与个人分离

Security comes in layers: each layer needs to be assessed individually but also in relation to the whole. Risk is a business decision and has direct relation to vulnerability and probability. Each product/organization has a different risk appetite (the risk they are willing to take for a bigger win). Often these 3 concerns fight with each other: UX, Security, Performance.

安全性分层，常这三个关注点之间存在相互冲突：用户体验、安全性和性能。


Realize that every code has a life cycle and will die. Sometimes it dies in its infancy before seeing the light of production. Be OK with letting go. Know the difference between 3 categories of features:
Core: like an engine in a car. The product is meaningless without it.
Necessary: like a car’s spare will. It’s rarely used but when needed, its function decides the success of the system.
Added value: like a car’s cup-holder. It’s nice to have but the product is perfectly usable without it.

每一行代码都有其生命周期

Don’t attach your identity to your code. Don’t attach anyone’s identity to their code. Realize that people are separate from the artifacts they produce. Don’t take code criticism personally but be very careful when criticizing others’ code.

避免个人主义

Tech debt is like fast food. Occasionally it’s acceptable but if you get used to it, it’ll kill the product faster than you think (and in a painful way).

应对技术债务

When making decisions about the solution all things equal, go for this priority:
Security > Usability (Accessibility & UX) > Maintainability > Simplicity (Developer experience/DX) > Brevity (code length) > Performance
But don’t follow that blindly because it is dependent on the nature of the product. Like any career, the more experience you earn, the more you can find the right balance for each given situation. For example, when designing a game engine, performance has the highest priority, but when creating a banking app, security is the most important factor.

寻找解决方案的决策顺序：安全性 > 可用性（可访问性和用户体验）> 可维护性 > 简单性（开发者体验）> 简洁性（代码量）> 性能


Bugs’ genitals are called copy & paste. That’s how they reproduce. Always read what you copy, always audit what you import. Bugs take shelter in complexity. “Magic” is fine in my dependency but not in my code.

拷贝粘贴是滋生 bug 的温床,阅读你的拷贝


Don’t only write code for the happy scenario. Write good errors that answer why it happened, how it was detected and what can be done to resolve it. Validate all system input (including user input): fail early but recover from errors whenever possible. Assume the user hold a gun: put enough effort into your errors to convince them to shoot something other than your head!

不要只顾着写正常的代码，处理异常的代码也要好好写

Don’t use dependencies unless the cost of importing, maintaining, dealing with their edge cases/bugs and refactoring when they don’t satisfy the needs is significantly less than the code that you own.

不要使用依赖项，除非使用它们的成本比你自己写代码的成本低很多

Stay clear from hype-driven development. But learn all you can. Always have pet projects.

保持清醒应对炒作驱动开发

Get out of your comfort zone. Learn every day. Teach what you learn. If you’re the master, you’re not learning. Expose yourself to other languages, technologies, culture and stay curious.

走出舒适区，每天都要学习

Good code doesn’t need documentation, great code is well documented so that anyone who hasn’t been part of the evolution, trial & error process and requirements that led to the current status can be productive with it. An undocumented feature is a non-existing feature. A non-existing feature shouldn’t have code.

好代码不需要注释

Avoid overriding, inheritance and implicit smartness as much as possible. Write pure functions. They are easier to test and reason about. Any function that’s not pure should be a class. Any code construct that has a different function, should have a different name.

尽量避免使用重载、继承和隐式的智能特性

Never start coding (making a solution) unless you fully understand the problem. It’s very normal to spend more time listening and reading than typing code. Understand the domain before starting to code. A problem is like a maze. You need to progressively go through the code-test-improve cycle and explore the problem space till you reach the end.

在彻底了解问题之前不要急着写代码

Don’t solve a problem that doesn’t exist. Don’t do speculative programming. Only make the code extensible if it is a validated assumption that it’ll be extended. Chances are by the time it gets extended, the problem definition looks different from when you wrote the code.

不要尝试去解决不存在的问题

Software is more fun when it’s made together. Build a sustainable community. Listen. Inspire. Learn. Share.

大家一起开发软件会更加有趣

