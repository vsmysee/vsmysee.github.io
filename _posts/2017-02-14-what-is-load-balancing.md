---
layout: article
title: 什么是负载均衡
---

[原文](https://www.digitalocean.com/community/tutorials/what-is-load-balancing)


为了避免你的应用出现单点，所以你会发布多个后端应用，这个时候就需要在前面放置一个负载器

![](https://assets.digitalocean.com/articles/high-availability/Diagram_2.png)

主要对四种流量均衡

```
http
https
tcp
udp
```

负载均衡器需要检测后端服务的健康状态

均衡算法有：

```
轮训
最少连接
源hash
```

如果要保持状态，需要粘粘会话


## 如果负载器出问题？


需要引入浮动IP

![](https://www.digitalocean.com/community/tutorials/what-is-load-balancing)