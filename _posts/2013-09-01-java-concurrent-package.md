---
layout: article
title: Java1.5的并发库
desc: Doug Lea并发编程专家贡献给jdk的库，简化了Java的并发编程
---

并发编程是困难的，即便是专家也不能保证自己可以很容易的写出没有问题的并发程序，那么编程模型的简化就是一个必须要研究的问题，就像google发明map-reduce来简化分布式编程一样.

java.util.concurrent这个包是在jdk1.5加入的，牛人，专家Doug Lea的贡献，它使得我们编写多线程程序会更加的健壮和简单，如果你的jdk大于1.4，就少用java原来的那些线程api吧，因为这些api是存在问题的，你不是高手就很难规避这些问题。
 
贴张图以明确整体结构
![Java并发包](/images/java_concurrent.jpg)

这个包下面有两个子包，一是原子操作类，一个是手动锁，原子操作类借助硬件级别的原子指令来完成，比如CAS,这些类是构建无锁算法，无锁数据结构的砖块


手动锁和Condition对象一起来提供相比java内部锁和条件等待更好的伸缩性，但是需要额外编程的代码比较多，需要小心管理，在java6版本，手动锁和内部锁的性能差异已经很小，只要在内部锁不能满足需求的情况才考虑用手动锁，另外还有一个读写锁，这个类是为了对付那种读远远大于写的数据结构的，如果两个线程都是读，那么就没有必要互相等待，读写锁允许的情况就是允许多读和一写，但是不能两者同时存在，所以在这样的业务场景，可以用读写锁提高性能。
 
接下来就是包中的几块，并发集合，执行框架，队列和同步工具，大体介绍一下
 
执行框架解耦任务提交和任务执行，核心接口就是Executor
Callable 接口类似于 Runnable 两者都是为那些其实例可能被另一个线程执行的类设计的。但是 Runnable 不会返回结果，并且无法抛出经过检查的异常。
Future 未来的意思，表示异步计算的结果
ExecutorService 扩展了Executor这个接口,提供了管理线程生命周期的一些方法，以及可为跟踪一个或多个异步任务执行状况而生成 Future的方法。
Executors 一个非常重要的工厂类，可以生产各种线程池执行器和线程工厂。
 
并发集合也就是多线程安全的集合，一般ArrayList和HashMap是不能在多线程下用的，多线程环境我们就必须用这些并发集合，这里有List,Set和Map
CopyOnWriteArrayList 是ArrayList的线程安全变体，底层实现就是copy然后修改即写时复制，然后再合并
CopyOnWriteArraySet 利用CopyOnWriteArrayList 实现的Set
ConcurrentHashMap 通过降低锁定粒度而取得伸缩性的HashMap，支持多线程访问，迭代器若一致性，不会抛出恐怖的ConcurrentModificationException异常。
 
队列中大部分都是阻塞队列，只有一个并发队列ConcurrentLinkedQueue  这是以个基于链表数据结构的无界线程安全队列 FIFO。
阻塞队列有一个子接口双端队列，双端队列可在存储元素时等待双端队列中的空间变得可用。
双端阻塞队列在这个包中就是LinkedBlockingDeque,基于链表数据结构实现。
其他就是各种类型的阻塞队列，比如
ArrayBlockingQueue 是一个用数组实现的有界阻塞队列，FIFO.
DelayQueue 延迟队列
LinkedBlockingQueue 基于链表数据结构的无界阻塞队列，FIFO.
PriorityBlockingQueue 优先级队列，无界阻塞队列。
SynchronousQueue 同步队列，没有容量，插入必须等待移除。
 
 
同步器工具类大量使用在状态依赖的多线程环境编程,它们都是用AbstractQueuedSynchronizer这个框架来实现的




