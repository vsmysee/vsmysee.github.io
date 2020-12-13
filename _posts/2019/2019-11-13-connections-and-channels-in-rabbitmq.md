---
layout: article
title:  RabbitMq中的连接和通道
---

[原文](https://www.cloudamqp.com/blog/2019-11-13-the-relationship-between-connections-and-channels-in-rabbitmq.html)


A connection (TCP) is a link between the client and the broker, that performs underlying networking tasks including initial authentication, IP resolution, and networking.

Connections can multiplex over a single TCP connection, meaning that an application can open "lightweight connections" on a single connection. This "lightweight connection" is called a channel. Each connection can maintain a set of underlying channels.

推荐 

```
Use long-lived connection
Separate the connections for publishers and consumers
Don’t share channels between threads
```


```
We recommend that each process only creates one TCP connection and uses multiple channels in that connection for different threads.
```
