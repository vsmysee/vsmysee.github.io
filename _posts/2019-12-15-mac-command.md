---
layout: article
title:  Mac命令
---

## 工具

```
iTerm2 - 免费的终端工具，直接替代自带的 Terminal，有非常多惊人的特性。
hyper - 基于 Web 技术的终端，直接替代自带的 Terminal。
cool-retro-term - 怀旧的命令行终端。
autojump - 告别又臭又长的路径名，一键直达任何目录。
Glances - 在命令行中查看你系统运行状态的工具。
httpie - HTTPie 是一个让你微笑的命令行 HTTP 客户端。
Cakebrew - Homebrew 的客户端软件。摆脱命令方便安装、查看、卸载软件。
Terminus - 免费的终端工具，基于 Web 技术的终端
Termius - 免费的终端工具，可以与windows 平台的 xshell 媲美
ndm - 查看本地NPM安装的包客户端软件。摆脱命令方便安装、查看、卸载软件。
silver searcher (ag) - 类似于ack的代码搜索工具，专注于速度。
trash - 将文件和目录移动到废纸篓。
Upterm - Upterm (之前是 Black Screen) 来自 21 世纪的强大终端。
Fish Shell - 智能且用户友好的命令行终端。 Awesome List
bash-it - 一个社区的 bash 的框架。
bat - 带有语法高亮和Git集成的 cat(1) 克隆。
color-retro-term - 一款复古风格的终端，非常酷炫。
HyperTerm - 一款基于 Node 开发的终端软件，逼格很高。
itunes-remote - 通过终端控制您的 iTunes。
pgcli - 为Postgres提供一个支持自动补全和语法高亮的命令行工具。
mycli - 为 MySQL 命令行客户端，提供语法高亮和提示功能
m-cli - 用于 macOS 的瑞士军刀。
Mac-CLI - 自动化您的 OS X 系统的使用。
job - 短命令并发、重复执行工具, 适用于压测.
LNav - 日志文件阅读器.
tmux - 一个优秀的终端复用器类自由软件。
mas - 一个简单的命令行界面的苹果应用商店。
cmus - 命令行播放音乐应用。
Serial - 为工程师和系统管理员嵌入式硬件更容易。
ttygif - 将终端录制转换为 GIF 动画。
Zsh - 一个专为交互式使用而设计的命令行 shell。
spaceship - 一个简约，功能强大且极易定制的Zsh提示。
```


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

Command + ` 切换同一个应用的不同窗口

```

```
history n	列出最近执行过的 n 条命令
ctrl-r	检索之前执行过的命令
![value]	执行最近以 value 开始的命令
![value]:p	显示最近以 value 开始的命令
!!	执行最后一次执行的命令
!!:p	显示最后一次执行的命令
```

defaults write -g ApplePressAndHoldEnabled -bool false

defaults write com.apple.finder AppleShowAllFiles  YES  显示隐藏文件

ls -lh


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

chmod -R 755 /System/Library/Extensions 

sudo find /dir -name ".svn" -exec rm -r {} \;

find . -name "*.m" -or -name "*.h" -or -name "*.xib" -or -name "*.c" -or -name "*.storyboard"  |xargs wc -l

ifconfig | grep "inet" | grep -v 127.0.0.1


统计常用命令

```
history | awk '{CMD[$2]++;count++;} END { for (a in CMD )print CMD[ a ]" " CMD[ a ]/count*100 "% " a }' | grep -v "./" | column -c3 -s " " -t |sort -nr | nl | head -n10

```



