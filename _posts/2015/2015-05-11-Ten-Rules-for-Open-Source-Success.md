---
layout: article
title: 成功开源项目10条规则
---

[原文](http://hintjens.com/blog:95)

Everyone wants it, lots of people try it, yet doing it is mostly painful and irritating. I'm speaking about free software aka open source. Today I'm going to summarize 30 years of coding experience in ten management-proof bullet points.

1. People Before Code

This is the Golden Rule, taught to me by Isabel Drost-Fromm. Build community, not software. Without community your code will solve the wrong problems. It will be abandoned, ignored, and will die. Collect people and give them space to work together. Give them good challenges. Stop writing code yourself.

人比代码重要


2. Use a Share-Alike License

Share-alike is the seat belt of open source. You can boast about how you don't need it, until you have a bad accident. Then you will either find your face smeared on the wall, or have light bruising. Don't become a smear. Use share-alike. If GPL/LGPL is too political for you, use MPLv2.

使用“以相同方式共享”的许可证

3. Use an Zero-Consensus Process

Seeking upfront consensus is like waiting for the ideal life partner. It is kind of crazy. Github killed upfront consensus with their fork/pull-request flow, so you've no excuse in 2015. Accept patches like Wikipedia accepts edits. Merge first, fix later, and discuss out of band. Do all work on master. Don't make people wait. You'll get consensus, after the fact.

使用一个无需达成共识的协作流程

4. Problem, then Solution

Educate yourself and others to focus on problems not features. Every patch must be a minimal solution to a solid problem. Embrace experiments and wild ideas. Help people to not blow up the lab. Collect good solutions and throw away the bad ones. Embrace failure, at all levels. It is a necessary part of the learning process.

首先是问题，然后才是解决方案

5. Contracts Before Internals

Be aggressive about documenting contracts (APIs and protocols) and testing them. Use CI testing on all public contracts. Code coverage is irrelevant. Code documentation is irrelevant. All that matters is what contracts the code implements, and how well it does that.

首先约定，然后再完成内部实现

6. Promote From Within

Promote contributors to maintainers, and maintainers to owners. Do this smoothly, easily, and without fear. Keep final authority to ban bad actors. Encourage people to start their own projects, especially to build on, or compete, with existing projects. Remove power from people who are not earning it on a daily basis.

从内部提拔

7. Write Down the Rules

As you develop your rules, write them down so people can learn them. Actually, don't even bother. Just use the C4.1 rules we already designed for ZeroMQ, and simplify them if you want to.

将规则写下来

8. Enforce the Rules Fairly

Use your power to enforce rules, not bully others into your "vision" of the project's direction. Above all, obey the rules yourself. Nothing is worse than a clique of maintainers who act special while blocking patches because "they don't like them." OK, that's exaggeration. Many things are much worse. Still, the clique thing will harm a project.

公平地执行规则

9. Aim For the Cloud

Aim for a cloud of small, independent, self-organizing, competing projects. Be intolerant of large projects. By "large" I mean a project that has more than 2-3 core minds working on it. Don't use fancy dependencies like submodules. Let people pick and choose the projects they want to put together. It's economics 101.

以“云”为目标

10. Be Happy and Pleasant

Maybe you noticed that "be innovative" isn't anywhere on my list. It's probably point 11 or 12. Anyhow, cultivate a positive and pleasant mood in your community. There are no stupid questions. There are no stupid people. There are a few bad actors, who mostly stay away when the rules are clear. And everyone else is valuable and welcome like a guest who has traveled far to see us.

开心愉快最重要