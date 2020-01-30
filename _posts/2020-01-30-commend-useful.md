---
layout: article
title: 冷门有用命令
---

[命令艺术](https://github.com/jlevy/the-art-of-command-line/blob/master/README-zh.md)


```
expr：计算表达式或正则匹配

m4：简单的宏处理器

yes：多次打印字符串

cal：漂亮的日历

env：执行一个命令（脚本文件中很有用）

printenv：打印环境变量（调试时或在写脚本文件时很有用）

look：查找以特定字符串开头的单词或行

cut，paste 和 join：数据修改

fmt：格式化文本段落

pr：将文本格式化成页／列形式

fold：包裹文本中的几行

column：将文本格式化成多个对齐、定宽的列或表格

expand 和 unexpand：制表符与空格之间转换

nl：添加行号

seq：打印数字

bc：计算器

factor：分解因数

gpg：加密并签名文件

toe：terminfo 入口列表

nc：网络调试及数据传输

socat：套接字代理，与 netcat 类似

slurm：网络流量可视化

dd：文件或设备间传输数据

file：确定文件类型

tree：以树的形式显示路径和文件，类似于递归的 ls

stat：文件信息

time：执行命令，并计算执行时间

timeout：在指定时长范围内执行命令，并在规定时间结束后停止进程

lockfile：使文件只能通过 rm -f 移除

logrotate： 切换、压缩以及发送日志文件

watch：重复运行同一个命令，展示结果并／或高亮有更改的部分

when-changed：当检测到文件更改时执行指定命令。参阅 inotifywait 和 entr。

tac：反向输出文件

shuf：文件中随机选取几行

comm：一行一行的比较排序过的文件

strings：从二进制文件中抽取文本

tr：转换字母

iconv 或 uconv：文本编码转换

split 和 csplit：分割文件

sponge：在写入前读取所有输入，在读取文件后再向同一文件写入时比较有用，例如 grep -v something some-file | sponge some-file

units：将一种计量单位转换为另一种等效的计量单位（参阅 /usr/share/units/definitions.units）

apg：随机生成密码

xz：高比例的文件压缩

ldd：动态库信息

nm：提取 obj 文件中的符号

ab 或 wrk：web 服务器性能分析

strace：调试系统调用

mtr：更好的网络调试跟踪工具

cssh：可视化的并发 shell

rsync：通过 ssh 或本地文件系统同步文件和文件夹

wireshark 和 tshark：抓包和网络调试工具

ngrep：网络层的 grep

host 和 dig：DNS 查找

lsof：列出当前系统打开文件的工具以及查看端口信息

dstat：系统状态查看

glances：高层次的多子系统总览

iostat：硬盘使用状态

mpstat： CPU 使用状态

vmstat： 内存使用状态

htop：top 的加强版

last：登入记录

w：查看处于登录状态的用户

id：用户/组 ID 信息

sar：系统历史数据

iftop 或 nethogs：套接字及进程的网络利用情况

ss：套接字数据

dmesg：引导及系统错误信息

sysctl： 在内核运行时动态地查看和修改内核的运行参数

hdparm：SATA/ATA 磁盘更改及性能分析

lsblk：列出块设备信息：以树形展示你的磁盘以及磁盘分区信息

lshw，lscpu，lspci，lsusb 和 dmidecode：查看硬件信息，包括 CPU、BIOS、RAID、显卡、USB设备等

lsmod 和 modinfo：列出内核模块，并显示其细节

fortune，ddate 和 sl：额，这主要取决于你是否认为蒸汽火车和莫名其妙的名人名言是否“有用”
```
