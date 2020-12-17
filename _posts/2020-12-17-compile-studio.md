---
layout: article
title: 编译AndroidStudio源代码
---

AndroidStudio是在Intellij IDEA的社区版本上定制出来的，我们通过学习它的源代码来学习如何扩展一个IDEA

Repo安装，下载源代码

```
安装python3
mkdir ~/bin
PATH=~/bin:$PATH
curl https://storage.googleapis.com/git-repo-downloads/repo > ~/bin/repo
chmod a+x ~/bin/repo
```

下载1.0代码

```
repo init --depth=1 -u https://android.googlesource.com/platform/manifest -b studio_1.0.0
repo sync
```

然后用2013年发布的IDEA版本，比如13.1.7打开tools/idea目录
然后配置好jdk1.6就可以编译了，这也是早期最简单的一个版本了，以后的版本大部分都不能直接编译，特别是耦合了kotlin之后，变得越来越复杂。

根据测试, tag中3.0,3.1.2,3.2.1都是可以编译通过的。


