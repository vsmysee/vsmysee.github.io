---
layout: article
title:  安卓记事
---

我做了10年的基于web的后端研发，从来没有想过可能和安卓有交集，新的工作让我不得不进入这个领域，最大的感受依然不变，我们需要对每个知识领域保持敬畏，因为深入到细节层面，或者可靠性层面，唯有敬畏之心
方可对复杂性有认识，不存在技术领域有高低贵贱之分，微尘出大千，一个小小的程序都可以洞见大大的世界。


作为一个2003年起步的操作系统，算下来快要20年了，20年是足以让一个领域变得成熟，成熟就会变得庞大，庞大的后果就是我们觉得每个个体都好弱小，几年的光阴都在一小块天地里挣扎，谷歌在在收购安卓之后，直到2008年左右才开始把系统推向市场，如果考究这个系统
本质上是建立在Linux上的，但是内核分支独立了出去，对比IOS，后者历史则更为厚重，是从Mac Book上阉割出来的，智能手机操作系统的最大的推动者还是乔布斯。


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


### 堆栈结构

在当前 Activity 启动另一个 Activity 时，新的 Activity 将被推送到堆栈顶部并获得焦点。上一个 Activity 仍保留在堆栈中，但会停止。
当 Activity 停止时，系统会保留其界面的当前状态。当用户按返回按钮时，当前 Activity 会从堆栈顶部退出（该 Activity 销毁），上一个 Activity 会恢复（界面会恢复到上一个状态）。
堆栈中的 Activity 永远不会重新排列，只会被送入和退出，在当前 Activity 启动时被送入堆栈，在用户使用返回按钮离开时从堆栈中退出。因此，返回堆栈按照“后进先出”的对象结构运作。


### 进程生命
在大多数情况下，每个 Android 应用都在各自的 Linux 进程中运行。当需要运行应用的一些代码时，系统会为应用创建此进程，并使其保持运行，直到不再需要它且系统需要回收其内存以供其他应用使用。
应用开发者必须了解不同的应用组件（特别是 Activity、Service 和 BroadcastReceiver）对应用进程的生命周期有何影响。这些组件使用不当会导致系统在应用进程正执行重要任务时将它终止。


## 最佳实践

一个技术领域会先从蛮荒阶段发展到架构成熟阶段，中间会出现各种不同的写法或者轮子框架，最后会由部分组织抽象出一套统一的模式来避免各种重复代码，比如后台开发就被Spring统一了，大家的概念认知就比较统一。
Android也一样，早期非常混乱，Goole I/O 2018大会上推出的Android Jetpack架构组件来指导开发的最佳实践。

Android 架构组件是一组库，可帮助您设计稳健、可测试且易维护的应用。您可以从管理界面组件生命周期和处理数据持久性的类着手。

* 通过应用架构指南，学习有关汇编稳健应用的基础知识。
* 管理应用的生命周期。新的生命周期感知型组件可帮助您管理 Activity 和 Fragment 的生命周期。在配置更改后继续有效、避免内存泄漏，以及将数据轻松加载到界面中。
* 使用 LiveData 构建数据对象，在基础数据库改变时通知视图。
* ViewModel 存储界面相关的数据，这些数据不会在应用旋转时销毁。
* Room 是一个 SQLite 对象映射库。它可用来避免样板代码，还可以轻松地将 SQLite 表数据转换为 Java 对象。Room 提供 SQLite 语句的编译时检查，并且可以返回 RxJava、Flowable 和 LiveData 可观察对象。

## 构造界面

界面构造首先需要学习布局，可通过两种方式声明布局：

* 在 XML 中声明界面元素。Android 提供对应 View 类及其子类的简明 XML 词汇，如用于微件和布局的词汇。您也可使用 Android Studio 的 Layout Editor，并采用拖放界面来构建 XML 布局。

* 在运行时实例化布局元素。您的应用能以程序化方式创建 View 对象和 ViewGroup 对象（并操纵其属性）。

每个布局文件都必须只包含一个根元素，按照在 HTML 中创建包含一系列嵌套元素的网页的相同方式快速设计界面布局及其包含的屏幕元素。

以最简单的线性布局为例子

```
<?xml version="1.0" encoding="utf-8"?>
<LinearLayout xmlns:android="http://schemas.android.com/apk/res/android"
              android:layout_width="match_parent"
              android:layout_height="match_parent"
              android:orientation="vertical" >
    <TextView android:id="@+id/text"
              android:layout_width="wrap_content"
              android:layout_height="wrap_content"
              android:text="Hello, I am a TextView" />
    <Button android:id="@+id/button"
            android:layout_width="wrap_content"
            android:layout_height="wrap_content"
            android:text="Hello, I am a Button" />
</LinearLayout>
```

任何 View 对象均可拥有与之关联的整型 ID，用于在结构树中对 View 对象进行唯一标识。编译应用后，系统会以整型形式引用此 ID，但在布局 XML 文件中，系统通常会以字符串的形式在 id 属性中指定该 ID
代码中查找组件

```
Button myButton = (Button) findViewById(R.id.my_button);
```

其实这种方式类似于dom操作，非常原始，学习web，在后来的Android开发中可以使用视图绑定，在 Android Studio 3.6 及更高版本中，视图绑定功能可以替换 findViewById() 调用，并为与视图互动的代码提供编译时类型安全。考虑使用视图绑定，而非 findViewById()。

对于组件的大小，有两个非常重要的属性

* wrap_content 指示您的视图将其大小调整为内容所需的尺寸。
* match_parent 指示您的视图尽可能采用其父视图组所允许的最大尺寸。


不要使用绝对单位（如像素）来指定布局宽度和高度。更好的方法是使用相对测量单位（如与密度无关的像素单位 dp、wrap_content 或 match_parent），因为这样有助于确保您的应用在各类尺寸的设备屏幕上正确显示

视图的几何形状就是矩形的几何形状，视图拥有一个位置（以一对“水平向左”和“垂直向上”的坐标表示）和两个尺寸（以宽度和高度表示）。位置和尺寸的单位是像素，视图拥有两对宽度和高度值，第一对称为“测量宽度”和“测量高度”。这些尺寸定义视图希望在其父项内具有的大小。您可通过调用 getMeasuredWidth() 和 getMeasuredHeight() 来获得这些测量尺寸。
第二对简称为“宽度”和“高度”，有时称为“绘制宽度”和“绘制高度”，为了测量尺寸，视图需将其内边距考虑在内。内边距以视图左侧、顶部、右侧和底部各部分的像素数表示，尽管视图可以定义内边距，但它并不支持外边距。


复杂的布局，我们可能使用各种布局组件嵌套组合才能实现，后来平台提供了一个ConstraintLayout，可让您使用扁平视图层次结构（无嵌套视图组）创建复杂的大型布局。它与 RelativeLayout 相似，其中所有的视图均根据同级视图与父布局之间的关系进行布局，但其灵活性要高于 RelativeLayout，并且更易于与 Android Studio 的布局编辑器配合使用。


### 自定义

当平台提供的默认组件不满足要求的时候，我们就需要自定义组件，需要执行如下操作

* 扩展的最通用的视图是 View，因此您通常需要先扩展此视图，以创建新的父组件
* 可以提供一个构造函数（从 XML 获取属性和参数），也可以使用您自己的此类属性和参数
* 可能需要创建自己的事件监听器、属性存取器和修饰符，以及在组件类中创建可能更为复杂的行为
* 换 onMeasure()；如果您希望组件显示某些内容，也可能需要替换 onDraw()。虽然两者都具有默认行为，但默认的 onDraw() 不会执行任何操作，而默认的 onMeasure() 始终会设置 100x100 的大小，这可能不是您所希望的。
* 根据需要替换其他 on... 方法

onDraw的本质是操作一个叫做Canvas的类，这是一个画布，我们拿着画笔在上面随意的绘制即可，注意只能绘制2D图形，如果需要3D绘制，需要扩展 SurfaceView，从单独的线程绘制

定义完自己的类之后，就可以在xml中配置使用了

```
<view xmlns:android="http://schemas.android.com/apk/res/android"
    class="com.example.android.notepad.NoteEditor$LinedEditText"
    android:id="@+id/note"
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    android:background="@android:color/transparent"
    android:padding="5dp"
    android:scrollbars="vertical"
    android:fadingEdge="vertical"
    android:gravity="top"
    android:textSize="22sp"
    android:capitalize="sentences"
/>
```

## 如何有趣？

需要构造有趣且丰富的界面，我们需要掌握下面几个知识

* 动画
* 过渡
* 图片
* 图形
* 音频
* 视频
* 相机
* 传感器

而为了访问这个大千世界，我们需要联网

动画部分，最强大的框架是属性动画系统，几乎可以为任何内容添加动画效果，借助属性动画系统，您可以定义动画的以下特性：

* 时长：您可以指定动画的时长。默认时长为 300 毫秒。
* 时间插值：您可以指定如何根据动画的当前已播放时长来计算属性的值。
* 重复计数和行为：您可以指定是否在某个时长结束后重复播放动画以及重复播放动画多少次。您还可以指定是否要反向播放动画。如果将其设置为反向播放，则会先播放动画，然后反向播放动画，直到达到重复次数。
* Animator 集：您可以将动画分成多个逻辑集，它们可以一起播放、按顺序播放或者在指定的延迟时间后播放。
* 帧刷新延迟：您可以指定动画帧的刷新频率。默认设置为每 10 毫秒刷新一次，但应用刷新帧的速度最终取决于整个系统的繁忙程度以及系统为底层计时器提供服务的速度。


借助 Android 的过渡框架，您只需提供起始布局和结束布局，即可为界面中的各种运动添加动画效果。
您可以选择所需的动画类型（例如，淡入/淡出视图或更改视图尺寸），而过渡框架会确定如何为从起始布局到结束布局的运动添加动画效果。

图片和图形的处理需要掌握 Drawable 类及其子类，Drawable 是可绘制对象的常规抽象。不同的子类可用于特定的图片场景，您可以对其进行扩展以定义您自己的行为方式独特的可绘制对象。

音频应用的首选架构是客户端/服务器设计。播放器及其媒体会话在 MediaBrowserService 内实现，界面和媒体控制器与 MediaBrowser 一起位于 Android Activity 中。典型的视频播放器在运行期间会一直显示其控件和视频内容；它无法在后台运行或在没有界面的情况下运行。因此，比较合适的做法是将您的应用构建成为单个 Activity，使其包含用户界面、播放器、媒体会话和媒体控制器：
对于音视频开发几个重要的类是

* MediaPlayer
* MediaRecorder
* ExoPlayer

ExoPlayer 的标准音频和视频组件基于 Android 的 MediaCodec API 构建

Android 框架支持通过 android.hardware.camera2 API 或相机 Intent 捕获图像和视频，相关的类是

* android.hardware.camera2
* Camera
* SurfaceView
* MediaRecorder
* Intent

MediaStore.ACTION_IMAGE_CAPTURE 或 MediaStore.ACTION_VIDEO_CAPTURE 的 Intent 操作类型可用于捕获图像或视频，而无需直接使用 Camera 对象。


大多数 Android 设备都有内置传感器，用来测量运动、屏幕方向和各种环境条件。这些传感器能够提供高度精确的原始数据，非常适合用来监测设备的三维移动或定位，或监测设备周围环境的变化。例如，游戏可以跟踪设备重力传感器的读数，以推断出复杂的用户手势和动作，如倾斜、摇晃、旋转或挥动。
同样，天气应用可以使用设备的温度传感器和湿度传感器来计算和报告露点，旅行应用则可以使用地磁场传感器和加速度计来报告罗盘方位。

Android 平台支持三大类传感器：

* 动态传感器
* 环境传感器
* 位置传感器