---
layout: article
title:  线程是一个奇怪的抽象
---

[原文](https://dave.cheney.net/2016/03/30/threads-are-a-strange-abstraction)


From the programmer’s point of view, threads are great. It’s as if you can create virtual CPUs, on the fly, and the operating system will take care of simulating these virtual CPUs on top of real ones.

程序员把线程当成一个虚拟的cpu


But on an implementation level, what is a simple abstraction can lead you, the programmer, into a trap. You don’t have an infinite number of CPUs and applying threaded abstractions in an unbounded manner invites you to overwhelm the real CPU if you try to actually use all these virtual CPUs simultaneously, or overwhelm the address space if they sit idle due to the overhead needed to maintain the illusion.

但是从实现层面，cpu是有限的，所以对于线程资源的控制会很复杂


Careful tuning of one or both of the number of threads in use by the program, or the amount of memory each thread is allocated is needed whenever threads as a concurrency primitive are used in anger. So much for abstraction.


Go’s goroutines sit right in the middle, the same programmer interface as threads, a nice imperative coding model, but also efficient implementation model based on coroutines.

Go语言的goroutines寻求一个中庸之道