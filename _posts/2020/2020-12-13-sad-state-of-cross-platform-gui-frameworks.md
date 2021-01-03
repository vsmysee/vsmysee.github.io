---
layout: article
title: 跨平台GUI框架的悲惨现状
---


[原文](https://blog.royalsloth.eu/posts/sad-state-of-cross-platform-gui-frameworks/)


基本上现在的所有框架都不能令人满意,唯独flutter稍微合适,但是桌面开发任重道远

作者期望的框架应该具备

```
Fast compile times for debug builds.

Automatic UI reloading so we don’t have to build yet another half finished RAD tool to ease the pain of building the layout.

It should have the same non-native look and feel on all platforms, which could be customized with a CSS or CSS like language (obviously painting the native widgets didn’t work out so far)

It should be event based (for lower power consumption).

It should contain commonly used GUI components such as buttons, text fields, date pickers, tables, layout containers, grids, etc. Check your current operating system’s native toolkit for ideas.

It should compile down to a statically linked blob that you can just execute and run.

Big bonus if you can cross compile your GUI (e.g: creating Windows builds on Linux)
```