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
13. 高性能
14. 基于JVM
15. 约定
16. 强大的IDE支持
17. 洞察力

站在巨人肩膀上集大成

![](/images/gradle.png)


## 扩展方式
1. 定制任务类型
2. 定制任务动作
3. 属性控制
4. 定制约定
5. 定制模型


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
另外对于构建的设置独立到了settings.gradle，对于settings.gradle，在单项目构建时是可选的，对于多项目构建需要在里面用include语法包含进来，另外settings.gradle还有可设置插件仓库

```
pluginManagement {
          resolutionStrategy {
          }
          repositories {
          }
}
```

在maven中我们经常用的属性设置，gradle是用一个叫做gradle.properties的文件来完成的，比如你可以用这个文件来控制一些行为，比如

```
org.gradle.daemon=true
org.gradle.parallel=true

```


有了build.gradle和settings.gradle,我们就可以构建项目了，那么我们需要类似maven那样先安装吗？答案是NO，这也是我最喜欢它的地方，Gradle提供了一个机制叫Wrapper，可以把gradle本身放在项目里
这样就实现了各个项目的构建高度的内聚，你可以在新项目里用新的gradle版本而不会对其他项目产生影响，一个项目的一切的一切都包含在了源代码管理中，不存在泄露，不存在生产和测试的环境不一致。


gradle也提供了一个叫做init.gradle来完成maven的settings.xml的功能，但是我建议不要用

## 如何构建
构建的过程其实就是编写一系列的Task，你可以在Task里对工程的目录进行约定，调用javac,jar等命令进行打包操作，Gradle的内核只是执行这些Task

定义：
{% highlight groovy %}

task myTask {
   doLast {
   }
}

//<<写法新版已经废弃
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

```
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
```

比如我们经常要用的依赖分析：./gradlew dependencies

由于build.gradle本身就是一个构建程序，假如你自己的Task需要依赖一些第三方包怎么办？这时你需要声明依赖：

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

执行./gradlew properties我们会得到这个项目的所有属性，这些属性我们都可以在Task中访问到

```
allprojects: [root project 'demogradle']
ant: org.gradle.api.internal.project.DefaultAntBuilder@7bb1604c
antBuilderFactory: org.gradle.api.internal.project.DefaultAntBuilderFactory@6e27e546
archivesBaseName: demogradle
artifacts: org.gradle.api.internal.artifacts.dsl.DefaultArtifactHandler_Decorated@44294f96
asDynamicObject: DynamicObject for root project 'demogradle'
assemble: task ':assemble'
baseClassLoaderScope: org.gradle.api.internal.initialization.DefaultClassLoaderScope@609e0e6a
buildDependents: task ':buildDependents'
buildDir: /Volumes/data/awesome-demo/demogradle/build
buildFile: /Volumes/data/awesome-demo/demogradle/build.gradle
buildNeeded: task ':buildNeeded'
buildPath: :
buildScriptSource: org.gradle.groovy.scripts.TextResourceScriptSource@105db135
buildscript: org.gradle.api.internal.initialization.DefaultScriptHandler@41816bad
check: task ':check'
childProjects: {}
class: class org.gradle.api.internal.project.DefaultProject_Decorated
classLoaderScope: org.gradle.api.internal.initialization.DefaultClassLoaderScope@4f5ad9f4
classes: task ':classes'
compileJava: task ':compileJava'
compileTestJava: task ':compileTestJava'
components: SoftwareComponentInternal set
configurationActions: org.gradle.configuration.project.DefaultProjectConfigurationActionContainer@5f27632b
configurationTargetIdentifier: org.gradle.configuration.ConfigurationTargetIdentifier$1@220eb5e3
configurations: configuration container
convention: org.gradle.api.internal.plugins.DefaultConvention@68186e0c
defaultArtifacts: org.gradle.api.internal.plugins.DefaultArtifactPublicationSet_Decorated@71149f82
defaultTasks: []
deferredProjectConfiguration: org.gradle.api.internal.project.DeferredProjectConfiguration@15ce94b0
dependencies: org.gradle.api.internal.artifacts.dsl.dependencies.DefaultDependencyHandler_Decorated@42388a47
depth: 0
description: null
displayName: root project 'demogradle'
distsDir: /Volumes/data/awesome-demo/demogradle/build/distributions
distsDirName: distributions
docsDir: /Volumes/data/awesome-demo/demogradle/build/docs
docsDirName: docs
ext: org.gradle.api.internal.plugins.DefaultExtraPropertiesExtension@697bf402
extensions: org.gradle.api.internal.plugins.DefaultConvention@68186e0c
fileOperations: org.gradle.api.internal.file.DefaultFileOperations@3c468e20
fileResolver: org.gradle.api.internal.file.BaseDirFileResolver@5dccf60c
gradle: build 'demogradle'
group: 
hello: task ':hello'
identityPath: :
inheritedScope: org.gradle.api.internal.ExtensibleDynamicObject$InheritedDynamicObject@5ba03540
jar: task ':jar'
javadoc: task ':javadoc'
layout: org.gradle.api.internal.file.DefaultProjectLayout@6d4d11d2
libsDir: /Volumes/data/awesome-demo/demogradle/build/libs
libsDirName: libs
logger: org.gradle.internal.logging.slf4j.OutputEventListenerBackedLogger@4b90c0c1
logging: org.gradle.internal.logging.services.DefaultLoggingManager@6572b5d5
modelRegistry: org.gradle.model.internal.registry.DefaultModelRegistry@5fb443e1
modelSchemaStore: org.gradle.model.internal.manage.schema.extract.DefaultModelSchemaStore@68bec060
module: org.gradle.api.internal.artifacts.ProjectBackedModule@1d0446b9
name: demogradle
normalization: org.gradle.normalization.internal.DefaultInputNormalizationHandler_Decorated@5647762
objects: org.gradle.api.internal.model.DefaultObjectFactory@22259d
parent: null
parentIdentifier: null
path: :
pluginManager: org.gradle.api.internal.plugins.DefaultPluginManager_Decorated@708ee451
plugins: [org.gradle.api.plugins.HelpTasksPlugin@520ccf76, org.gradle.language.base.plugins.LifecycleBasePlugin@6d27e91, org.gradle.api.plugins.BasePlugin@58e068dc, org.gradle.api.plugins.ReportingBasePlugin@5a1815c1, org.gradle.platform.base.plugins.ComponentBasePlugin@7cd51bd8, org.gradle.language.base.plugins.LanguageBasePlugin@4a260c0, org.gradle.platform.base.plugins.BinaryBasePlugin@dd80aea, org.gradle.api.plugins.JavaBasePlugin@2ba1a354, org.gradle.api.plugins.JavaPlugin@3abe6570]
processOperations: org.gradle.api.internal.file.DefaultFileOperations@3c468e20
processResources: task ':processResources'
processTestResources: task ':processTestResources'
project: root project 'demogradle'
projectConfigurator: org.gradle.api.internal.project.BuildOperationCrossProjectConfigurator@3d15a21a
projectDir: /Volumes/data/awesome-demo/demogradle
projectEvaluationBroadcaster: ProjectEvaluationListener broadcast
projectEvaluator: org.gradle.configuration.project.LifecycleProjectEvaluator@70d77008
projectPath: :
projectRegistry: org.gradle.api.internal.project.DefaultProjectRegistry@564ac645
properties: {...}
providers: org.gradle.api.internal.provider.DefaultProviderFactory@2e4fe3bd
reporting: org.gradle.api.reporting.ReportingExtension_Decorated@1f16bc19
reportsDir: /Volumes/data/awesome-demo/demogradle/build/reports
repositories: repository container
resourceLoader: org.gradle.internal.resource.transfer.DefaultUriTextResourceLoader@f83d893
resources: org.gradle.api.internal.resources.DefaultResourceHandler@441fbe5b
rootDir: /Volumes/data/awesome-demo/demogradle
rootProject: root project 'demogradle'
script: false
scriptHandlerFactory: org.gradle.api.internal.initialization.DefaultScriptHandlerFactory@44673073
scriptPluginFactory: org.gradle.configuration.ScriptPluginFactorySelector@6ebbaa92
serviceRegistryFactory: org.gradle.internal.service.scopes.ProjectScopeServices$4@7fedb096
services: ProjectScopeServices
sourceCompatibility: 1.8
sourceSets: SourceSet container
standardOutputCapture: org.gradle.internal.logging.services.DefaultLoggingManager@6572b5d5
state: project state 'EXECUTED'
status: integration
subprojects: []
targetCompatibility: 1.8
tasks: task set
test: task ':test'
testClasses: task ':testClasses'
testReportDir: /Volumes/data/awesome-demo/demogradle/build/reports/tests
testReportDirName: tests
testResultsDir: /Volumes/data/awesome-demo/demogradle/build/test-results
testResultsDirName: test-results
version: unspecified

```

假如你想看到Project的所有方法，即便默认插件没有提供这个Action，你可以理解写一段代码自己实现

```
task showProjectMethod {
    project.getClass().getMethods().each{m -> println(m.getName()) }
}
```

## 一般构建结构

一般来说我们使用的构建结构如下，当然由于构建脚本本身就是程序，你可以比较灵活的写代码来编写自己的结构

```

build.gradle //根
settings.gradle
gradle.properties


buildSrc //用于插件开发

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

虽然build.gradle本身就是代码，但是gradle的最佳实践建议不要在构建脚本里放入太多命令式逻辑

```
There is a common misconception that Gradle’s power and flexibility come from the
fact that its build scripts are code. This couldn’t be further from the truth. It’s the
underlying model and API that provide the power. As we recommend in our best practices, 
you should avoid putting much, if any, imperative logic in your build
scripts.
```


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
   		maven { url 'https://repo.spring.io/libs-release' }
}

dependencies {
          implementation("org.springframework:spring-web:5.0.2.RELEASE")
}

{% endhighlight %}

依赖的类型如下：

测试和正式
编译，运行，编译运行得到六种组合

```
compileOnly
implementation 老版本叫做compile
runtimeOnly 老版本叫做runtime


testCompileOnly
testImplementation
testRuntimeOnly

```

其内部的结构如下图：
![](/images/gradle_depend.png)

在一个依赖图结构上，肯定会出现冲突，我们不希望在生产包里存在同一个jar多个版本，gradle这一冲突的解决策略是用最新的那个版本，这个切记，和maven的策略不一样


## 如何使用插件

Gradle的内核非常小，所有丰富的功能都是通过插件来扩展的，所以我们在真实项目中必须要和各种各样的插件配合
插件能做的，理论上你完全可以在build.gradle里通过写代码来做，但是为了重用，内聚和保持build.gradle的干净，我们需要把插件独立打包

插件也分为两种类型：script plugins 和 binary plugins, 后者通常是实现为Plugin这个类的二进制文件,一个插件早期可以是一个脚本，然后发现价值大了之后才转为二进制格式

使用一个插件需要两个步骤，第一个是解析，第二个是应用

应用一个脚本插件:
```
apply from: 'other.gradle'
```
可以从本地加载，也可以从远程url加载


二进制插件如果放在官方portal，都有一个全局的ID，当然获取一个二进制插件有下面几种方式：

1. 通过插件DSL从portal里下载
2. 如果是外部的jar，需要在buildscript里声明仓库和依赖
3. 定义插件在本地的buidSrc目录
4. 定义一个插件作为build script的内部类


插件DSL的格式是plugins{},有如下一些限制

1. 语法限制 (必须是顶级语句，不能出现在if或者for里)
2. 只能用在build script里

但是可能由于版本的升级会有改变
所以建议在项目中还是使用语法：apply plugin:''

我们可以通过在build.gradle里直接编写一个插件来体验下插件的开发

{% highlight groovy %}


class GreetingPlugin implements Plugin<Project> {
    void apply(Project project) {
        project.task('hello') {
            doLast {
                println 'Hello from the GreetingPlugin'
            }
        } }
}

// Apply the plugin
apply plugin: GreetingPlugin

{% endhighlight %}



## Kotlin支持



## 版本变化

0.7

1.0

2.0

3.0

4.0

5.0



## 待续..