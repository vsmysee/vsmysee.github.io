---
layout: article
title: 好喜欢的gradle
---
我已经使用gradle好多年了，它体现出的设计哲学，使用方式是那么的干净，通透，最近看了一些物理学书籍，比如科学之美，里面提到的一个概念叫对称，说我们这个世界很多的美是在对称性上体现的。
如果以这个观点来审视gradle，我觉得也非常的合适。模块化，概念简单，组合性都是那么的美妙

## 特征
Gradle出现在Ant，Maven之后，这时Groovy动态语言已经足够成熟，业界已经开始被DSL语言推动，比如Ruby，所以在继承前构建工具的优点前提下可以毫无负担的大胆设计，这种感觉在我喜欢的另一个测试框架Spock
上也体验到了,根据官网文档描述，有如下特征

1. 声明式构建
2. 编程式基础
3. 结构化构建
4. 深度API
5. 可扩展性
6. 多项目构建
7. 多样化依赖管理
8. 第一级构建集成工具
9. 易升级
10. Grooy语言
11. 包装器
12. 自由开源

## 核心概念
Gradle的核心概念只有两个，一个是项目Project，一个是任务Task, 用领域驱动的说法，这就是它的核心领域模型，一个项目对应一个build.gradle文件，这个文件叫构建脚本，然后文件中包含各种
完成构建任务的Task,一个Task的样子如下

{% highlight groovy %}
task onetask {
    println "this is a task"
}
{% endhighlight %}

有了Project和Task，剩下的就是如何协调Task的问题，Gradle里存在一个核心数据结构：Directed acyclic graph (有向无环图),所有的Task会被编排到这个数据结构上进行调度执行。
build.gradle是一个DSL，本身就是代码，所以Gradle可以实现任何你想到的构建模型。

在maven里，我们需要pom.xml和一个约定的文件夹结构，在gradle里只需要一个build.gradle,而把文件夹的结构解析交给了另一个模型：Plugin（插件），所以你会发现Gradle把组件抽象得单一和内聚。
另外对于构建的设置独立到了settings.gradle，对于settings.gradle，在单项目构建时是可选的。

在maven中我们经常用的属性设置，gradle是用一个叫做gradle.properties的文件来完成的，比如你可以用这个文件来控制一些行为，比如

```
org.gradle.daemon=true
org.gradle.parallel=true

```


有了build.gradle和settings.gradle,我们就可以构建项目了，那么我们需要类似maven那样先安装吗？答案是NO，这也是我最喜欢它的地方，Gradle提供了一个机制叫Wrapper，可以把gradle本身放在项目里
这样就实现了各个项目的构建高度的内聚，你可以在新项目里用新的gradle版本而不会对其他项目产生影响，一个项目的一切的一切都包含在了源代码管理中，不存在泄露，不存在生产和测试的环境不一致。

## 如何构建
构建的过程其实就是编写一系列的Task，你可以在Task里对工程的目录进行约定，调用javac,jar等命令进行打包操作，Gradle的内核只是执行这些Task

定义：
{% highlight groovy %}
task helloWorld << {
    println "Hello World!"
}

task intro(dependsOn: helloWorld) << {
    println "I'm Gradle"
}
{% endhighlight %}

执行：
{% highlight groovy %}
./gradlew intro
{% endhighlight %}

继承maven的习惯，其实对于java工程的构建大家都按照约定俗称的模式，所以Gradle内置了插件，你只需要直接使用就行了。在build.gradle中声明一下

{% highlight groovy %}
plugins {
    id 'java'
}
{% endhighlight %}
或者:

{% highlight groovy %}
apply plugin: 'java'
{% endhighlight %}


有了这个java插件之后，就自动获取了一系列好用的Task,比如build,clean,jar,assemble，自动获得了约定，比如src/main,src/test, 各种语言的编译都可以采用自己独立的约定结构，这绝对是对Maven来说最大的打击。

多项目构建时就在settings.gradle中声明子文件夹：include 'projectA','projectB','projectC'

当项目没有声明任何插件的时候，Gradle默认加载了一些插件，可以直接使用的一些Task如下
{% highlight groovy %}

Build Setup tasks:
init
wrapper

Help tasks:
dependencies
projects
properties
tasks
help
model
buildEnvironment
components
dependentComponents
{% endhighlight %}

由于build.gradle本身就是一个构建程序，加入你自己的Task需要依赖一些第三方包怎么办？这时你需要声明依赖：

{% highlight groovy %}
buildscript {
    repositories {
        mavenCentral()
        maven {
            url 'https://plugins.gradle.org/m2/'
        }
    }
    dependencies {
        classpath 'net.ltgt.gradle:gradle-errorprone-plugin:0.0.14'
    }
}
{% endhighlight %}

## 一般构建结构

一般来说我们使用的构建结构如下，当然由于构建脚本本身就是程序，你可以比较灵活的写代码来编写自己的结构

```

build.gradle //根
settings.gradle
gradle.properties


//wrapper
gradle
    wrapper
gradlew
gradlew.bat


//settings.gradle内容：
include "subProject"

//build.gradle的内容

buildscript {}
plugins {}
ext {}
allprojects {}
subprojects {}
task {}
dependencies {}
apply plugin: ''

```
对于include进去的子项目的文件结构我们前面说了，取决于你使用的插件如何理解



## 生命周期
不同于maven，gradle没有构建时约定固定的生命周期，这里的生命周期是gradle自身运行的几个阶段，可以理解为对于构建过程透明，不做逻辑干涉, 一共有三个：

Initialization初始化：创建项目(Project)实例,执行settings.gradle

Configuration配置：配置Project对象

Execution执行：执行Task

## 依赖管理
真实的项目我们常常需要依赖第三方库，gradle直接利用现在的生态，声明仓库即可,然后再声明你要依赖的包
{% highlight groovy %}

repositories {
          mavenCentral()
}

dependencies {
          implementation("org.springframework:spring-web:5.0.2.RELEASE")
}

{% endhighlight %}

## 待续..