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


### 构建块

共有四种不同的应用组件类型：

* Activity
* 服务
* 广播接收器
* 内容提供程序

Activity表达界面，是用户交互的入口点，不是界面的就是Service，和web开发的Controller和Service相似，Service是一个通用入口点，用于因各种原因使应用在后台保持运行状态,它是一种在后台运行的组件，用于执行长时间运行的操作或为远程进程执行作业。服务不提供界面

广播接收器可以理解为消息中间件，更常见的用途只是作为通向其他组件的通道，旨在执行极少量的工作，许多广播均由系统发起，广播接收器作为 BroadcastReceiver 的子类实现，并且每条广播都作为 Intent 对象进行传递

内容提供程序管理一组共享的应用数据，您可以将这些数据存储在文件系统、SQLite 数据库、网络中或者您的应用可访问的任何其他持久化存储位置。其他应用可通过内容提供程序查询或修改数据（如果内容提供程序允许），像级后端研发中的RPC。
内容提供程序是应用的入口点，用于发布由 URI 架构识别的已命名数据项。因此，应用可以决定如何将其包含的数据映射到 URI 命名空间，进而将这些 URI 分发给其他实体。反之，这些实体也可使用分发的 URI 来访问数据。

### 系统特点

任何应用都可启动其他应用的组件。例如，当您想让用户使用设备相机拍摄照片时，另一个应用可能也可执行该操作，因而您的应用便可使用该应用，而非自行产生一个 Activity 来拍摄照片。您无需加入甚至链接到该相机应用的代码。只需启动拍摄照片的相机应用中的 Activity 即可。完成拍摄时，系统甚至会将照片返回您的应用，以便您使用。对用户而言，这就如同相机是您应用的一部分。

当系统启动某个组件时，它会启动该应用的进程（如果尚未运行），并实例化该组件所需的类。例如，如果您的应用启动相机应用中拍摄照片的 Activity，则该 Activity 会在属于相机应用的进程（而非您的应用进程）中运行。因此，与大多数其他系统上的应用不同，Android 应用并没有单个入口点（即没有 main() 函数）。

由于系统在单独的进程中运行每个应用，且其文件权限会限制对其他应用的访问，因此您的应用无法直接启动其他应用中的组件，但 Android 系统可以。如要启动其他应用中的组件，请向系统传递一条消息，说明启动特定组件的 Intent。系统随后便会为您启动该组件。


### 启动组件

在四种组件类型中，有三种（Activity、服务和广播接收器）均通过异步消息 Intent 进行启动。Intent 会在运行时对各个组件进行互相绑定。您可以将 Intent 视为从其他组件（无论该组件是属于您的应用还是其他应用）请求操作的信使。
与 Activity、服务和广播接收器不同，内容提供程序并非由 Intent 启动。相反，它们会在成为 ContentResolver 的请求目标时启动。内容解析程序会通过内容提供程序处理所有直接事务，因此通过提供程序执行事务的组件便无需执行事务，而是改为在 ContentResolver 对象上调用方法

每种组件都有不同的启动方法：

* 启动 Activity，您可以向 startActivity() 或 startActivityForResult() 传递 Intent（当您想让 Activity 返回结果时），或者为其安排新任务。
* startService() 传递 Intent 来启动服务,通过向将 bindService() 传递 Intent 来绑定到该服务,可以使用 JobScheduler 类来调度操作
* 通过向 sendBroadcast()、sendOrderedBroadcast() 或 sendStickyBroadcast() 等方法传递 Intent 来发起广播。
* 通过在 ContentResolver 上调用 query()，对内容提供程序执行查询。

### 资源

Android 应用并非仅包含代码，它还需要与源代码分离的资源，如图像、音频文件以及任何与应用的视觉呈现有关的内容。例如，您可以通过 XML 文件定义 Activity 界面的动画、菜单、样式、颜色和布局。借助应用资源，您无需修改代码即可轻松更新应用的各种特性。
通过提供备用资源集，您可以针对各种设备配置（如不同的语言和屏幕尺寸）优化您的应用。

资源目录

* animator
* anim
* color
* drawable
* mipmap
* layout
* menu
* raw
* values
* xml
* font

## 生命周期

对于任何一个编程领域，我们都逃不过对核心对象生命周期的理解，如果不能理解，则程序基本上就是一个炸弹，一个 Activity 在其生命周期中会经历多种状态。您可以使用一系列回调来处理状态之间的转换

* onCreate，系统创建Activity时触发
* onStart，此回调包含 Activity 进入前台与用户进行互动之前的最后准备工作
* onResume，会在 Activity 开始与用户互动之前调用此回调。此时，该 Activity 位于 Activity 堆栈的顶部，并会捕获所有用户输入
* onPause，Activity 失去焦点并进入“已暂停”状态时，系统就会调用
* onStop， Activity 对用户不再可见时，系统会调用 
* onRestart，当处于“已停止”状态的 Activity 即将重启时，系统就会调用此回调
* onDestroy，系统会在销毁 Activity 之前调用此回调

![](https://media.geeksforgeeks.org/wp-content/uploads/20191125165133/Activity-Lifecycle-in-Android.jpg)