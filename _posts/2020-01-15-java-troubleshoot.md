---
layout: article
title: Java最简排查
---

看日志

```
tail -300f your.log
```


看进程

```
jps
```

看启动参数

```
jps -lvm
```


看线程资源消耗

```
top -Hp pid
```

```
                                            %CPU  %MEM
38 root      20   0 2792972 265924  18088 S  0.3  3.3   0:25.86 SimplePauseDete
39 root      20   0 2792972 265924  18088 S  0.3  3.3   0:25.86 SimplePauseDete
40 root      20   0 2792972 265924  18088 S  0.3  3.3   0:25.83 SimplePauseDete
48 root      20   0 2792972 265924  18088 S  0.3  3.3   0:00.84 http-nio-8080-e
6 root      20   0 2792972 265924  18088 S  0.0  3.3   0:00.00 java
7 root      20   0 2792972 265924  18088 S  0.0  3.3   0:07.69 java
8 root      20   0 2792972 265924  18088 S  0.0  3.3   0:02.00 VM Thread
9 root      20   0 2792972 265924  18088 S  0.0  3.3   0:00.01 Reference Handl
```

线程栈

```
jstack pid
```

```
"Reference Handler" #2 daemon prio=10 os_prio=0 tid=0x00007fa22809f800 nid=0x9 in Object.wait() [0x00007fa22c55a000]
   java.lang.Thread.State: WAITING (on object monitor)
	at java.lang.Object.wait(Native Method)
	at java.lang.Object.wait(Object.java:502)
	at java.lang.ref.Reference.tryHandlePending(Reference.java:191)
	- locked <0x00000000f55e9d78> (a java.lang.ref.Reference$Lock)
	at java.lang.ref.Reference$ReferenceHandler.run(Reference.java:153)
```

nid对应top命令的pid，比如0x9对应下面这一条

```
9 root      20   0 2792972 265924  18088 S  0.0  3.3   0:00.01 Reference Handl
```

注意十六进制转为十进制


```
内存问题一定要提前接入度量指标(Metrics)，看曲线，而不是出问题了再来定位
```


dump

```
jmap -dump:live,format=b,file=/tmp/heap2.bin pid
```

崩溃时dump

```
-XX:+HeapDumpOnOutOfMemoryError -XX:HeapDumpPath=/home/admin/logs/java.hprof
```

dump文件用eclipseMAT分析



分析依赖

```
maven helper插件
mvn dependency:tree > ~/dependency.txt
```


操作系统的自我保护

```
sudo dmesg|grep -i kill|less
```


```
Btrace：可以在不重启服务时，动态追踪程序运营细节的工具。
```












