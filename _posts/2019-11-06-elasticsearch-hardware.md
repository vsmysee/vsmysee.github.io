---
layout: article
title:  Elasticsearch 硬件
---
如果你不关注一个中间件的硬件部署要求，和部署一个炸弹没有区别

节选自书籍[Elasticsearch: The Definitive Guide](https://www.amazon.com/dp/1449358543/ref=sr_1_1?__mk_zh_CN=%E4%BA%9A%E9%A9%AC%E9%80%8A%E7%BD%91%E7%AB%99&keywords=elasticsearch&qid=1573019262&sr=8-1)

## 我的摘要

```
内存大了不好
机器好了不好
不要相信网络盘
不要相信网络
多数据中心部署是自讨苦吃
如果不是旋转盘，要注意操作系统的IO设置
不需要RAID
CPU要求不高
```


If you’ve been following the normal development path, you’ve probably been playing with Elasticsearch on your laptop or on a small cluster of machines laying around. But when it comes time to deploy Elasticsearch to production, there are a few recom‐ mendations that you should consider. Nothing is a hard-and-fast rule; Elasticsearch is used for a wide range of tasks and on a bewildering array of machines. But these rec‐ ommendations provide good starting points based on our experience with produc‐ tion clusters.

按照正常的流程，你可能已经在自己的笔记本电脑或集群上使用了 Elasticsearch。 但是当要部署 Elasticsearch 到生产环境时，有一些建议是你需要考虑的。这里没有什么必须要遵守的准则，Elasticsearch 被用于在众多的机器上处理各种任务。基于我们在生产环境使用 Elasticsearch 集群的经验，这些建议可以为你提供一个好的起点。

## Memory

If there is one resource that you will run out of first, it will likely be memory. Sorting and aggregations can both be memory hungry, so enough heap space to accommo‐
date these is important. Even when the heap is comparatively small, extra memory can be given to the OS filesystem cache. Because many data structures used by Lucene are disk-based formats, Elasticsearch leverages the OS cache to great effect.
A machine with 64 GB of RAM is the ideal sweet spot, but 32 GB and 16 GB machines are also common. Less than 8 GB tends to be counterproductive (you end up needing many, many small machines), and greater than 64 GB has problems that we will discuss in “Heap: Sizing and Swapping” on page 641.

如果有一种资源是最先被耗尽的，它可能是内存。排序和聚合都很耗内存，所以有足够的堆空间来应付它们是很重要的。即使堆空间是比较小的时候， 也能为操作系统文件缓存提供额外的内存。因为 Lucene 使用的许多数据结构是基于磁盘的格式，Elasticsearch 利用操作系统缓存能产生很大效果。

64 GB 内存的机器是非常理想的， 但是32 GB 和16 GB 机器也是很常见的。少于8 GB 会适得其反（你最终需要很多很多的小机器），大于64 GB 的机器也会有问题， 我们将在 堆内存:大小和交换 中讨论。

## CPUs

Most Elasticsearch deployments tend to be rather light on CPU requirements. As such, the exact processor setup matters less than the other resources. You should choose a modern processor with multiple cores. Common clusters utilize two to eight core machines.
If you need to choose between faster CPUs or more cores, choose more cores. The extra concurrency that multiple cores offers will far outweigh a slightly faster clock speed.

大多数 Elasticsearch 部署往往对 CPU 要求不高。因此，相对其它资源，具体配置多少个（CPU）不是那么关键。你应该选择具有多个内核的现代处理器，常见的集群使用两到八个核的机器。

如果你要在更快的 CPUs 和更多的核心之间选择，选择更多的核心更好。多个内核提供的额外并发远胜过稍微快一点点的时钟频率。

## Disks

Disks are important for all clusters, and doubly so for indexing-heavy clusters (such as those that ingest log data). Disks are the slowest subsystem in a server, which means that write-heavy clusters can easily saturate their disks, which in turn become the bottleneck of the cluster.
If you can afford SSDs, they are by far superior to any spinning media. SSD-backed nodes see boosts in both query and indexing performance. If you can afford it, SSDs are the way to go.

硬盘对所有的集群都很重要，对大量写入的集群更是加倍重要（例如那些存储日志数据的）。硬盘是服务器上最慢的子系统，这意味着那些写入量很大的集群很容易让硬盘饱和，使得它成为集群的瓶颈。

如果你负担得起 SSD，它将远远超出任何旋转介质（注：机械硬盘，磁带等）。 基于 SSD 的节点，查询和索引性能都有提升。如果你负担得起，SSD 是一个好的选择。

```
Check Your I/O Scheduler
If you are using SSDs, make sure your OS I/O scheduler is configured correctly. 
When you write data to disk, the I/O scheduler decides when that data is actually sent to the disk. 
The default under most *nix distributions is a scheduler called cfq (Com‐ pletely Fair Queuing).
This scheduler allocates time slices to each process, and then optimizes the delivery of 
these various queues to the disk. It is optimized for spinning media: the nature of rotating 
platters means it is more efficient to write data to disk based on physical lay‐ out.
This is inefficient for SSD, however, since there are no spinning platters involved. Instead, 
deadline or noop should be used instead. The deadline scheduler optimizes based on 
how long writes have been pending, while noop is just a simple FIFO queue.

This simple change can have dramatic impacts. We’ve seen a 500-fold improvement 
to write throughput just by using the correct scheduler.
```

```
检查你的 I/O 调度程序

如果你正在使用 SSDs，确保你的系统 I/O 调度程序是配置正确的。 
当你向硬盘写数据，I/O 调度程序决定何时把数据实际发送到硬盘。 大多数默认 *nix 发行版下的调度程序都叫做 cfq（完全公平队列）。

调度程序分配 时间片 到每个进程。并且优化这些到硬盘的众多队列的传递。
但它是为旋转介质优化的： 机械硬盘的固有特性意味着它写入数据到基于物理布局的硬盘会更高效。

这对 SSD 来说是低效的，尽管这里没有涉及到机械硬盘。但是，deadline 或者 noop 应该被使用。
deadline 调度程序基于写入等待时间进行优化， noop 只是一个简单的 FIFO 队列。

这个简单的更改可以带来显著的影响。仅仅是使用正确的调度程序，我们看到了500倍的写入能力提升。
```

If you use spinning media, try to obtain the fastest disks possible (high-performance server disks, 15k RPM drives).
Using RAID 0 is an effective way to increase disk speed, for both spinning disks and SSD. There is no need to use mirroring or parity variants of RAID, since high availa‐ bility is built into Elasticsearch via replicas.
Finally, avoid network-attached storage (NAS). People routinely claim their NAS sol‐ ution is faster and more reliable than local drives. Despite these claims, we have never seen NAS live up to its hype. NAS is often slower, displays larger latencies with a wider deviation in average latency, and is a single point of failure.

如果你使用旋转介质，尝试获取尽可能快的硬盘（高性能服务器硬盘，15k RPM 驱动器）。

使用 RAID 0 是提高硬盘速度的有效途径，对机械硬盘和 SSD 来说都是如此。没有必要使用镜像或其它 RAID 变体，因为高可用已经通过 replicas 内建于 Elasticsearch 之中。

最后，避免使用网络附加存储（NAS）。人们常声称他们的 NAS 解决方案比本地驱动器更快更可靠。除却这些声称， 我们从没看到 NAS 能配得上它的大肆宣传。NAS 常常很慢，显露出更大的延时和更宽的平均延时方差，而且它是单点故障的。

## Network
A fast and reliable network is obviously important to performance in a distributed system. Low latency helps ensure that nodes can communicate easily, while high bandwidth helps shard movement and recovery. Modern data-center networking (1 GbE, 10 GbE) is sufficient for the vast majority of clusters.
Avoid clusters that span multiple data centers, even if the data centers are colocated in close proximity. Definitely avoid clusters that span large geographic distances.
Elasticsearch clusters assume that all nodes are equal—not that half the nodes are actually 150ms distant in another data center. Larger latencies tend to exacerbate problems in distributed systems and make debugging and resolution more difficult.
Similar to the NAS argument, everyone claims that their pipe between data centers is robust and low latency. This is true—until it isn’t (a network failure will happen even‐ tually; you can count on it). From our experience, the hassle of managing cross–data center clusters is simply not worth the cost.


快速可靠的网络显然对分布式系统的性能是很重要的。 低延时能帮助确保节点间能容易的通讯，大带宽能帮助分片移动和恢复。现代数据中心网络（1 GbE, 10 GbE）对绝大多数集群都是足够的。

即使数据中心们近在咫尺，也要避免集群跨越多个数据中心。绝对要避免集群跨越大的地理距离。

Elasticsearch 假定所有节点都是平等的—​并不会因为有一半的节点在150ms 外的另一数据中心而有所不同。更大的延时会加重分布式系统中的问题而且使得调试和排错更困难。

和 NAS 的争论类似，每个人都声称他们的数据中心间的线路都是健壮和低延时的。这是真的—​直到它不是时（网络失败终究是会发生的，你可以相信它）。 从我们的经验来看，处理跨数据中心集群的麻烦事是根本不值得的。

## General Considerations
It is possible nowadays to obtain truly enormous machines: hundreds of gigabytes of RAM with dozens of CPU cores. Conversely, it is also possible to spin up thousands of small virtual machines in cloud platforms such as EC2. Which approach is best?
In general, it is better to prefer medium-to-large boxes. Avoid small machines, because you don’t want to manage a cluster with a thousand nodes, and the overhead of simply running Elasticsearch is more apparent on such small boxes.
At the same time, avoid the truly enormous machines. They often lead to imbalanced resource usage (for example, all the memory is being used, but none of the CPU) and can add logistical complexity if you have to run multiple nodes per machine.


获取真正的高配机器在今天是可能的：成百 GB 的 RAM 和几十个 CPU 核心。 反之，在云平台上串联起成千的小虚拟机也是可能的，例如 EC2。哪种方式是最好的?

通常，选择中配或者高配机器更好。避免使用低配机器， 因为你不会希望去管理拥有上千个节点的集群，而且在这些低配机器上运行 Elasticsearch 的开销也是显著的。

与此同时，避免使用真正的高配机器。它们通常会导致资源使用不均衡（例如，所有的内存都被使用，但 CPU 却没有）而且在单机上运行多个节点时，会增加逻辑复杂度。


