---
layout: article
title: 容器和操作系统
---

[原文](https://dave.cheney.net/2018/01/16/containers-versus-operating-systems)

由于容器的崛起，让宿主操作系统的发行出现某些尴尬的局面


```
“The UNIX kernel is an I/O multiplexer more than a complete operating system. This is as it should be.”

Ken Thompson, BSTJ, 1978
```

内核本身不能服务于市场，需要发行商

```
Skip forward to Linux and the GNU generation, a kernel by itself does not serve the market, it needs a user space of tools to attract and nurture users accustomed to the full interactive environment.

But that software was hard, and messy, and spread across a million ftp, tucows, sourceforge, and cvs servers. Their installation procedures are each unique, their dependencies are unknown or unmanaged–in short, a job for an expert. Thus distributions became experts at packaging open source software to work together as a coherent interactive userspace story.
```

