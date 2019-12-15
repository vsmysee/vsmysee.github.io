---
layout: article
title:  Mac命令
---

## 快捷键

```
Ctrl + A	移动光标至行首，也适用于大多数文本编辑器
Ctrl + E	移动光标至行尾，也适用于大多数文本编辑器
Ctrl + L	清屏
Command + K	清屏
Ctrl + U	剪切光标前的所有字符
Ctrl + K	剪切光标后的所有字符
Ctrl + W	剪切光标前的内容，直到遇到为止
Ctrl + Y	粘贴上一次剪切的字符
Ctrl + H	与退格键相同
Ctrl + C	终止当前执行的进程
Ctrl + D	当没有进程在执行时退出当前终端，如果当前有进程就发送 EOF 命令给当前进程
Ctrl + Z	将执行中的任何东西放入后台进程。fg 可以将其恢复。
Ctrl + _	撤销最后一条命令（因为是下划线，所以实际上是 Ctrl + Shift + _）
Ctrl + T	将光标前的两个文字进行互换
Ctrl + F	将将光标向前移动一个字符
Ctrl + B	将将光标向后移动一个字符
Option + →	光标向前移动一个单词
Option + ←	光标向后移动一个单词
Esc + T	将光标前的两个单词进行互换
Tab	自动补全文件或文件夹的名称
```

```
history n	列出最近执行过的 n 条命令
ctrl-r	检索之前执行过的命令
![value]	执行最近以 value 开始的命令
![value]:p	显示最近以 value 开始的命令
!!	执行最后一次执行的命令
!!:p	显示最后一次执行的命令
```
ls -lh

defaults write -g ApplePressAndHoldEnabled -bool false

find /Users -name "file.txt"

grep "Tom" file.txt

grep -R 'string' dir/

alias del=rm -i

unalias del

uname -a

awk '{print $1 $1}' filename

sed "s/red/green/g" filename

mkdir -p /dir/dir

netstat -nat |grep LISTEN

lsof -i tcp

cat words.txt | sort | uniq -c | sort -k1,1nr | head -10

find /etc -name "*.conf" | xargs ls –l

scp gradle-2.10-all.zip share@192.168.3.100:/tmp

kill -9 `ps -ef|grep monitor|grep -v grep |awk '{print $2}'`

for i in */.git; do ( echo $i; cd $i/..; git pull; ); done

