---
layout: article
title: python启动一个httpserver
---


有时候局域网两个电脑需要共享文件,比如我的mac和windows,不用装什么软件
用自带的python启动一个server就可以了,默认是8000端口上


```

# python 2
python -m SimpleHTTPServer 端口号
# python 3
python -m http.server 端口号

```