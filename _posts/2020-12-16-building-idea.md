---
layout: article
title: 构建编译IDEA
---

IDEA的社区代码都是要和Android插件一起编译的，Android部分需要独立克隆，然后放在代码目录里。

历史上有部分分支是合并了Android，比如

https://github.com/JetBrains/intellij-community/tree/117


这个分支的代码编译步骤如下：

下载对应的IDEA：

https://download.jetbrains.com/idea/ideaIC-11.1.5d.exe?_ga=2.205728411.926551103.1604454578-1773214424.1591879625


然后打开工程

由于编译需要jdk 1.6，在项目设置里添加IDEA jdk指向1.6 

可以在这里下载： http://85-207-0-21.static.bluetone.cz/java/1.6.0_45/


然后点击菜单上的make project就可以了，也可以只运行IDEA, 由于这是目前我觉得最干净的一个分支，所以把它备份了

https://github.com/vsmysee/intellij-community-117


如果需要编译出分发包，需要执行工程的ant脚本