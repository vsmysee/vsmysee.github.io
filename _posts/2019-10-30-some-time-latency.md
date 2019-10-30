---
layout: article
title: 一些时间单位
---
这里是一些时间延迟总结，建立对速度的基本认识，网络通过光传输，物理上要明白光速局限，CPU内部也因光速的极限问题导致了计算上限。


**光速300000km/s**


```
Cpu cycle ...................0.3 ns
L1 cache reference ..................................... 0.5 ns
Branch mispredict ........................................ 5 ns
L2 cache reference ....................................... 7 ns
Mutex lock/unlock ....................................... 25 ns

Main memory reference .................................. 100 ns
Compress 1K bytes with Zippy ......................... 3,000 ns =   3 µs

Send 2K bytes over 1 Gbps network ................... 20,000 ns =  20 µs
SSD random read .................................... 150,000 ns = 150 µs
Read 1 MB sequentially from memory ................. 250,000 ns = 250 µs


Round trip within same datacenter .................. 500,000 ns = 0.5 ms
Read 1 MB sequentially from SSD .................. 1,000,000 ns =   1 ms
Network delay between two Shanghai datacenters ... 1,000,000 ns =   1 ms
Disk seek ....................................... 10,000,000 ns =  10 ms
Read 1 MB sequentially from disk ................ 20,000,000 ns =  20 ms
Network delay from Beijing to Shanghai .......... 30,000,000 ns =  30 ms
Send packet CA->Netherlands->CA ................ 150,000,000 ns = 150 ms

```

可以看到内存级访问是在纳秒级别

机械盘到了微妙

磁盘寻道为毫秒

```
互联网：旧金山到纽约 40毫秒
互联网：旧金山到英国 81毫秒
互联网：旧金山到澳大利亚 183毫秒
```


```
执行一条指令 1ns
TCP包重传1到3秒
局域网ping一台主机百微秒
Redis一次查询百微秒
广域网ping一台主机10-100毫秒
局域网数据库查询（有索引）：10-100毫秒
Java程序本地方法调用:几微秒
访问一个网站就是秒级了
```

常见磁盘平均物理寻道时间为：
```
7200转/分的STAT硬盘平均物理寻道时间是9ms
10000转/分的STAT硬盘平均物理寻道时间是6ms
15000转/分的SAS硬盘平均物理寻道时间是4ms
```
