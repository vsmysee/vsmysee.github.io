---
layout: article
title: 我喜欢的jvm参数
---

[原文](https://www.javaworld.com/article/2072604/my-favorite-hotspot-jvm-flags.html)


```
-server
-Xms and -Xmx
-Xshare

-verbose:gc
-Xprof
-Xrunhprof

-XX:+UseParallelGC
-XX:+UseConcMarkSweepGC

-XX:NewRatio The defaults are 1:12 in the -client VM and 1:8 in the -server VM
-XX:MaxPermSize

-XX:+PrintCompilation
-XX:+PrintGCDetails

-XX:+TraceClassLoading and -XX:+TraceClassUnloading 

-XX:MaxInlineSize
-XX:CompileThreshold
-XX:+LogCompilation

-XX:+PrintOptoAssembly
```
