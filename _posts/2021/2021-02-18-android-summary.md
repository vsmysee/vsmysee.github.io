---
layout: article
title:  安卓记事
---

我做了10年的后端，其实从来没有想过可能和安卓有交集，新的工作让我不得不进入这个领域，最大的感受依然不变，我们需要对每个知识领域保持敬畏，因为深入到细节层面，或者可靠性层面，唯有敬畏之心
方可对复杂性有认识，不存在技术领域有高低贵贱之分。


作为一个2003年起步的操作系统，算下来快要20年了，20年是足以让一个领域变得成熟，成熟就会变得庞大，庞大的后果就是我们觉得每个个体都好弱小，几年的光阴都在一小块天地里挣扎，谷歌在在收购安卓之后，直到2008年左右才开始把系统推向市场，如果考究这个系统
本质上是建立在Linux上的，但是内核分支独立了出去，对比IOS，后者历史则更为厚重，是从MacOS上阉割出来的，智能手机操作系统的最大的推动者还是乔布斯。

这是此系统的堆栈结构，我们都需要明白自己活在哪一层

![](https://source.android.google.cn/images/android_framework_details.png?hl=zh-cn)


本文的大部分内容都在开发者指南https://developer.android.com/guide


## Activity

打开一个APP，首先要解决的是如何显示界面，于是有了Activity，在web开发中我们叫做页面，一个APP由非常多的Activity组成，各种Activity互相调用，由于某一个时刻和用户交互的是一个Activity，所以会在交互过程
中形成一个栈结构.

Android 应用的界面以布局和微件的层次结构形式构建而成。布局是 ViewGroup 对象，即控制其子视图在屏幕上的放置方式的容器。微件是 View 对象，即按钮和文本框等界面组件，所有的UI组件要么是View的子类，要么是
ViewGroup的子类
![](https://developer.android.com/images/viewgroup_2x.png)


界面的构造方式可以通过代码和xml来实现，xml的方式又可以借助IDE拖拽方式实现，为拖拽方式定制的布局类是ConstraintLayout，至于布局的类型，后面会详细表述。


一个Activity的代码如下
```java
public class MainActivity extends AppCompatActivity {
        @Override
        protected void onCreate(Bundle savedInstanceState) {
            super.onCreate(savedInstanceState);
            setContentView(R.layout.activity_main);
        }
    }
```
R.layout就是指定的布局文件，R是自动生成的类，不需要我们控制。

如果需要成为一个高级的开发，我们需要学会定制自己的View,ViewGroup，因为平台自身提供的不可能满足所有的现实要求，所以对于拖拽式开发不要保持依赖。

Activity如果想启动其他Activity，就需要Intent类，可以理解为消息

```java
Intent intent = new Intent(this, DisplayMessageActivity.class);
EditText editText = (EditText) findViewById(R.id.editText);
String message = editText.getText().toString();
intent.putExtra(EXTRA_MESSAGE, message);
startActivity(intent);
```

Intent包含了目标Activity的Class对象


每个应用项目必须在项目源设置的根目录中加入 AndroidManifest.xml 文件（且必须使用此名称）。 清单文件会向 Android 构建工具、Android 操作系统和 Google Play 描述应用的基本信息。
可以理解为web开发中的web.xml或者struts.xml，因为需要对APP进行配置。

## 基础 

前面的层次图显示我们可以工作在各个层，各个层对编程技术的要求是不一样的，所以编程语言也不一样，应用层我们可以使用java,kotiln，往下就只能用C++或者C, 由于开发人员总是在追求应用层开发的快捷性，所以发明了
其他的一些编程方案，比如用web技术的react native,比如用flutter，但是注意，复杂性不会消失，引入新的开发模式就会有新的问题和新的约束。

每个 Android 应用都处于各自的安全沙盒中，并受以下 Android 安全功能的保护

* Android 操作系统是一种多用户 Linux 系统，其中的每个应用都是一个不同的用户；
* 默认情况下，系统会为每个应用分配一个唯一的 Linux 用户 ID（该 ID 仅由系统使用，应用并不知晓）。系统会为应用中的所有文件设置权限，使得只有分配给该应用的用户 ID 才能访问这些文件；
* 每个进程都拥有自己的虚拟机 (VM)，因此应用代码独立于其他应用而运行。
* 默认情况下，每个应用都在其自己的 Linux 进程内运行。Android 系统会在需要执行任何应用组件时启动该进程，然后当不再需要该进程或系统必须为其他应用恢复内存时，其便会关闭该进程。

Android 系统实现了最小权限原则。换言之，默认情况下，每个应用只能访问执行其工作所需的组件，而不能访问其他组件。这样便能创建非常安全的环境，在此环境中，应用无法访问其未获得权限的系统部分。不过，应用仍可通过一些途径与其他应用共享数据以及访问系统服务：

* 可以安排两个应用共享同一 Linux 用户 ID，在此情况下，二者便能访问彼此的文件。为节省系统资源，也可安排拥有相同用户 ID 的应用在同一 Linux 进程中运行，并共享同一 VM。应用还必须使用相同的证书进行签名。
* 应用可以请求访问设备数据（如用户的联系人、短信消息、可装载存储装置（SD 卡）、相机、蓝牙等）的权限。用户必须明确授予这些权限。如需了解详细信息，请参阅使用系统权限。
