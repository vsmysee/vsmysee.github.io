---
layout: article
title: 打造你的mac
---
Mac是目前为止桌面操作系统中设计最棒的,图形和命令都是非常有效的人机交互手段,只有mac osx完美融合了二者,关于程序员为什么要用mac,互联网上已经有很多文章,生命短暂,请用最好的工具节省
你的时间,请把时间花在美好的事物上,花在创造美好的事物上,Mac生态很多软件是需要购买的,所以请准备能力内的银子.

### 硬件准备
首先你需要一个mac,内存越大越好,硬盘越快越好,然后需要买显示器转接线将屏幕扩展出多个,最好三个或者四个,当然显示器越大越好,然后你需要一个移动硬盘
这样可以用mac的时间机器软件对你的系统进行备份以便用于"穿越",最后你需要一个机械键盘,最好是蓝牙的

如果你是一个果粉，请安装***mactracker***以跟踪苹果公司的所有产品。

### 系统和备份

* 刻录启动盘
{% highlight java %}
准备一个U盘,在AppStore里下载最新的系统
sudo /Applications/Install\ OS\ X\ Mavericks.app/Contents/Resources/createinstallmedia --volume 
/Volumes/Untitled --applicationpath /Applications/Install\ OS\ X\ Mavericks.app --nointeraction

启动时按住 option 键，然后选择通过U盘启动
{% endhighlight %}

* 时间机器与系统恢复

插上移动硬盘，打开时间机器进行备份
系统启动的时候可以按 ***Command + R***进入恢复模式,这样你可以插上上面提到的移动硬盘来恢复系统.


### 键盘和触控

鼠标对于程序员来说是一个效率障碍，鼠标用得越多越浪费时间

优雅使用触控

常用快捷

* Command-Option-D 显示和隐藏dock
* Command + TAB 切换应用
* Command + 波浪号 切换同一个应用的窗口mactracker
* Command + W 关闭最前段的窗口
* Command + Q 退出当前应用

编辑模式时，比如浏览器地址，记事本，终端时，mac使用emacs的控制模式

* Control-A 移至行或段落的开头。
* Control-E 移至行或段落的末尾。
* Control-F 向前移动一个字符。
* Control-B 向后移动一个字符。
* Control-L 将光标或所选内容置于可见区域中央。
* Control-P 上移一行。
* Control-N 下移一行。
* Control-U 清除当前行。
* Control-K 清除至行尾。
* Control-O 在插入点后插入一行。
* Control-T 将插入点后面的字符与插入点前面的字符交换。

需要截屏时

* Cmd+Shift+3：全屏截图；截取整个屏幕，保存截图至桌面文件夹。
* Cmd+Shift+4：区域截图；鼠标光标变成带坐标的小十字，通过拖拽截取特定区域，保存截图至桌面文件夹。
* Cmd+Shift+4 - 单击空格键 - 鼠标单击指定窗口：窗口截图；出现小十字光标后对指定窗口按空格键，鼠标光标变成照相机，鼠标单击截取指定窗口，保存截图至桌面文件夹。

### 管理MAC
首先我们需要安装Homebrew,Homebrew Cask来安装软件，然后用AppZapper或者Appcleanr来卸载软件

{% highlight java %}
ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"

brew tap phinze/cask
brew install brew-cask

{% endhighlight %}

* ForkLift
* Karabiner + Seil 修改键盘(比如将CapsLock修改为delete)
* Keyboard Maestro 键盘大师
* F.lux

### 效率工具

1. 首先你应该会用vim或者emacs
2. 安装go2shell,按住command将应用拖放到finder的工具栏，融合图形和终端,在终端输入open . 如果希望打开的是iterm2，则在go2shell的窗口中执行open -a Go2Shell --args config

* 安装xcode，然后自动获得很多工具比如git，gcc
{% highlight java %}
xcode-select -p 检查是否安装
xcode-select --install 为安装命令
{% endhighlight %}


* Alfred2
* iTerm + Zsh + z(zsh自带这个插件，打开即可)
{% highlight java %}
sh -c "$(curl -fsSL https://raw.github.com/robbyrussell/oh-my-zsh/master/tools/install.sh)"
{% endhighlight %}


* Chrome插件Vimium,Vimari对应Safari
* Manico
* PopClip

* aText
代码模板，代码片段通过这个软件快捷输入

* MWeb
* BetterSnapTool
* Atom
* Dash
* Sequel Pro
* Mindnode
* Parallels Desktop
* VMware fusion
* VirtualBox
* Contexts - 窗口切换软件
* Shortcat
* Keymo
* MacID
* Key Cue 显示当前你应用的快捷键
* Vgrant + Docker
* Hammerspoon


### 编写AppleScript


### 善用JetBrians
oh my zsh是在站在zsh的肩膀上的工具，oh my idea是站在intellij的肩膀上的工具，这是我个人作品，可以让你编写java代码的运键如飞。

oh my idea的理念是组合Intellij内部的action,然后将这些命令按照类似vim的模式概念进行组织，但是整个操作过程尽量不用控制键而是只使用字母区域的键位，这样可以完全保持手型不动迅捷的编码，此插件内部实现了atext的代码片段。
