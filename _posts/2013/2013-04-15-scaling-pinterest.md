---
layout: article
title: 扩展pinterest
---

[原文](http://highscalability.com/blog/2013/4/15/scaling-pinterest-from-0-to-10s-of-billions-of-page-views-a.html)

在这两年里，Pinterest，从 每月PV量0增长到100亿，从两名创始人和一个工程师成长为四十个工程师，从只有一台MySQL 服务器，发展到180台Web 服务器（Web Engine）、240台接口服务器（API Engine）、88 台 MySQL 数据库 (AWS cc2.8xlarge， a Cluster Compute 8XL) ，并且每台DB有一个备份服务器，110台Redis 实例服务（Redis Instance）、200台 Memcache 实例服务（Memcache  Instance）。


Two of my favorite lessons from the talk:

1. Architecture is doing the right thing when growth can be handled by adding more of the same stuff. You want to be able to scale by throwing money at a problem which means throwing more boxes at a problem as you need them. If your architecture can do that, then you’re golden.

2. When you push something to the limit all technologies fail in their own special way. This lead them to evaluate tool choices with a preference for tools that are: mature; really good and simple; well known and liked; well supported; consistently good performers; failure free as possible; free. Using these criteria they selected: MySQL, Solr, Memcache, and Redis. Cassandra and Mongo were dropped.

强大的架构在处理增长时通过简单增加相同的东西（服务器）来应对，同时还能保证系统的正确性。当遇到性能问题时，通过砸钱，简单增加服务器来扩容。如果你的架构能够做到这一点，那它就如金子般强大而珍贵！

当性能快到极限时，大多数技术其实都会失败，以它们自己的方式。这使得他们在审核工具时要考虑以下特性：成熟且简单，用得人多，良好的支持，持续的优异性能，很少失败，开源。按照这样的标准，他们选择了：MySQL, Solr、Memcache 和 Redis，放弃了 Cassandra 、Mongo。


## 得到教训

```

为了应对未来的问题，让其保持简单。
让其变的有趣。只要应用程序还在使用，就会有很多的工程师加入，过于复杂的系统将会让工作失去乐趣。让架构保持简单就是大的胜利，新的工程师从入职的第一周起就可以对项目有所贡献。
当你把事物用至极限时，这些技术都会以各自不同的方式发生故障。
如果你的架构应对增长所带来的问题时，只需要简单的投入更多的主机，那么你的架构含金量十足。
集群管理算法本身就用于处理SPOF，如果存在漏洞的话可能就会影响到每个节点。
为了快速的增长，你需要为每次负载增加的数据进行均匀分配。
在节点间传输的数据越少，你的架构越稳定。这也是他们弃集群而选择分片的原因
一个面向服务的架构规则。拆分功能，可以帮助减少连接、组织团队、组织支持以及提升安全性。
搞明白自己究竟需要什么。为了匹配愿景，不要怕丢弃某些技术，甚至是整个系统的重构。
不要害怕丢失一点数据。将用户数据放入内存，定期的进行持久化。失去的只是几个小时的数据，但是换来的却是更简单、更强健的系统！
 
```


## Lessons Learned

It will fail. Keep it simple.

Keep it fun. There’s a lot of new people joining the team. If you just give them a huge complex system it won’t be fun. Keeping the architecture simple has been a big win. New engineers have been contributing code from week one.

When you push something to the limit all these technologies fail in their own special way.

Architecture is doing the right thing when growth can be handled by adding more of the same stuff. You want to be able to scale by throwing money at the problem by throwing more boxes at the problem as you need them. If your architecture can do that, then you’re golden.

Cluster Management Algorithm is a SPOF. If there’s a bug it impacts every node. This took them down 4 times.

To handle rapid growth you need to spread data out evenly to handle the ever increasing load.

The least data you move across your nodes the more stable your architecture. This is why they went with sharding over clusters.

A service oriented architecture rules. It isolates functionality, helps reduce connections, organize teams, organize support, and  improves security.

Asked yourself what your really want to be. Drop technologies that match that vision, even if you have to rearchitecture everything.

Don’t freak out about losing a little data. They keep user data in memory and write it out periodically. A loss means only a few hours of data are lost, but the resulting system is much simpler and more robust, and that’s what matters.
