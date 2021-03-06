---
layout: article
title:  安卓记事
---

我做了10年web后端研发，没有想过可能和安卓有交集，新的工作让我进入这个领域，最大的感受依然不变，我们需要对每个知识领域保持敬畏，因为深入到细节层面，或者可靠性层面，唯有敬畏之心
方可对复杂性有认识，不存在技术领域有高低贵贱之分，微尘出大千，一个小小的程序都可以洞见大大的世界。


作为一个2003年起步的操作系统，算下来快要20年了，20年是足以让一个领域变得成熟，成熟就会变得庞大，庞大的后果就是我们觉得每个个体都好弱小，几年的光阴都在一小块天地里挣扎，谷歌在在收购安卓之后，直到2008年左右才开始把系统推向市场，如果考究这个系统
对比IOS，后者历史则更为厚重，是从Mac Book操作系统上阉割出来的，智能手机操作系统的最大的推动者还是乔布斯。后来Android和IOS都齐头并进，互相学习，甚至被应用生态倒逼系统更新，比如中国的小程序。


首先我们要熟悉下手机的结构，相比电脑，手机由于体积的限制，有很多概念是不一样的。ROM其实相当于硬盘，处理部分叫SOC，Soc芯片上通常会集成CPU（负责管理手机反应运行速度），GPU（管理手机的游戏性能），基带芯片（管理手机信号），NPU（管手机人工智能）等关键芯片的功能。
市面上常听到的高通骁龙和华为麒麟芯片，都属于SOC芯片，SOC还决定了将会用什么RAM（运行内存）和ROM（存储内存）。

相比电脑，我觉得比较特别的硬件就是：

传感器

手机里边传感器，比如距离传感器、加速度传感器、重力传感器、陀螺仪、气压计等等，传感器就是手机的耳鼻眼手，能够采集周围环境的各种参数给CPU，使得手机具有真正智能的功能。

射频芯片

手机里边有很多跟射频相关的芯片，主要包括：射频发射芯片、GPS导航天线芯片、WIFI无线网络芯片、NFC近场传输芯片、蓝牙芯片等，这些芯片的数量和性能，决定了手机通信手段的多少和通信能力的强弱。


然后我们来看软件系统的堆栈结构，我们都需要明白自己活在哪一层

![](https://source.android.google.cn/images/android_framework_details.png?hl=zh-cn)

每一层对程序员的要求也不一样。

```
应用程序层：
应用程序层是一个核心应用程序的集合，所有安装在手机上的APP属于这一层。

应用程序框架层：
应用程序框架层主要提供了构建应用程序时用到的各种API。

核心类库：
核心类库中包含了系统库及Android运行环境。

Linux内核：
Linux内核层为Android设备的各种硬件提供了底层的驱动。
```

Android系统支持的CPU有三种架构类型，x86,ARM,MIPS

```
x86 CISC绝大部分pc都是x86架构。
ARM RISC广泛应用在嵌入式系统
MIPS RISC广泛被使用在许多电子产品、网络设备、个人娱乐装置与商业装置上
```

目前支持以下七种不同的CPU：ARMv5，ARMv7 (从2010年起)，x86 (从2011年起)，MIPS (从2012年起)，ARMv8，MIPS64和x86_64 (从2014年起)，每一种都关联着一个相应的应用程序二进制接口ABI（Application Binary Interface）。

ABI定义了二进制文件（尤其是.so文件）如何运行在相应的系统平台上，从使用的指令集，内存对齐到可用的系统函数库。


SO文件在系统中非常重要:

```
so机制让开发者最大化利用已有的C和C++代码，达到重用的效果，利用软件世界积累了几十年的优秀代码
so是二进制，没有解释编译的开消，用so实现的功能比纯java实现的功能要快
so内存分配不受Dalivik/ART的单个应用限制，减少OOM
相对于java代码，二进制代码的反编译难度更大，一些核心代码可以考虑放在so中。
```

## 手机的发布

了解下Android手机系统发布和更新的过程


```
谷歌首先发布版本，我们称之为AOSP原生代码。AOSP原生代码只支持极少数几款手机。

然后是芯片厂商在AOSP基础上发布自己的版本。比如高通，华为，MTK。比如以前AOSP没有双卡双待功能，这些功能有一些是芯片厂商自己加的。另外，芯片厂商还要针对自己发的版本做大量稳定性测试。

华米OV等终端厂商并不直接使用谷歌的原生代码，它们其实使用的是所用芯片厂商提供的Android代码。然后，设备厂商还得魔改一下，加上终端厂商自己的特性。这就是MIUI，EMUI，ColorOS等的功能。

现在大部分终端厂商使用芯片厂商的Turnkey方案，主要是CPU+通讯模组，芯片+软件打包卖给终端厂商。少数公司比如魅族使用的CPU是三星，而通信模组不知道哪一家，那么魅族就需要把三星的CPU和别家的通讯模组整合到一起，难度比使用Turnkey方案得大一些。

终端厂商集成完后，还需要考虑运营商定制的情况，然后加上对应的运营商定制功能，并做对应的测试。

```

了解上面的情况后，光从测试角度看，源码从谷歌发布到最终的手机上，测试的工作量都非常大——所以到终端消费者手里的速度会慢多了。厂商的解决办法就是在新款手机上直接使用新版系统，老款手机往往要等一段时间才会发布新版升级包。

总之，在Android手机世界里，谷歌、芯片厂商、终端厂商，运营商都是生态链里的关键玩家，四者互相影响。从终端厂商角度看，我觉得芯片厂商对终端厂商的影响力更关键和致命。最简单来说，高通要是不更新更好的芯片，很多手机商的产品也就停滞不前了。

对比苹果，人家从芯片到OS都自己搞.

所以手机制造商需要提升领域的核心能力，芯片这一关就需要跨过去，然后是系统，如果谷歌的AOSP哪天闭源，则又是一个巨大咽喉锁定，在中国，从系统到芯片再到终端，甚至运营商都有技术涉足的只有华为公司。


有了这些基础知识，首先我们从系统的相对比较底层的组件开始，然后才开始从功能开发和非功能开发两个部分来描述。


## 版本

大概的历史

* 2003年10月，Andy Rubin团队创办Android公司；
* 2005年8月，谷歌收购Android公司，Andy Rubin担任谷歌工程部副总裁继续负责Android项目；
* 2008年9月，谷歌正式发布Android 1.0系统；
* 2011年1月，Android系统设备的用户总数达到了1.35亿，成为智能手机领域占有量第一的系统；
* 2011年8月，Android手机占据全球智能机市场48%份额，并在亚太地区市场占据统治地位，终结了Symbian系统的霸主地位，跃居全球第一；
* 2012年1月，谷歌Android Market已有10万开发者，推出超过40万应用；
* 2013年11月，Android 4.4正式发布，系统更智能、UI更现代；
* 2013年到2018年，这个阶段安卓进入飞速发展期，被升级的有摄像头、内存、机身、芯片等，原来的3.5寸小屏已退出历史舞台，全面屏、刘海屏、水滴屏已成为当下主流屏幕方案。

官方文档目前最低版本是4.4，于2013年发布，详细的版本历史

```

|  版本            | 时间               | API Level |

| KitKat 4.4       | 2013              |  19 |
| Lollipop 5.0     | 2014              |  21 |
| Marshmallow 6.0  | 2015              |  23 |
| Nougat           | 2016              |  24 |
| O                | 2017              |  26 |
| P                | 2018              |  28 |
| 10               | 2019              |  29 |
| 11               | 2020              |  30 |
```

Android各个版本API的区别

```
（1）android3.0，代号Honeycomb，引入Fragments、 ActionBar、属性动画、硬件加速；
（2）android4.0，代号I，API14，截图功能、人脸识别、虚拟按键、3D优化驱动；
（3）android5.0，代号L，API21，调整桌面图标及部件透明度等；
（4）android6.0，代号M，API23，软件权限管理、安卓支付、指纹支持、App关联；
（5）android7.0，代号N，API24，多窗口支持(不影响Activity生命周期)，增加了JIT编译器，引入了新的应用签名方案APK Signature Scheme v2（缩短应用安装时间和更多未授权APK文件更改保护），严格了权限访问；
（6）android8.0，代号O ，API26，取消静态广播注册，限制后台进程调用手机资源，桌面图标自适应；
（7）android9.0，代号P，API27，加强电池管理，系统界面添加了Home虚拟键，提供人工智能API，支持免打扰模式；
```

然后就是Android Studio的历史

* Android Studio v0.1.x（2013 年 5 月）
* Android Studio v1.0（2014 年 12 月）
* 2.0（2016 年 4 月）
* 3.0（2017 年 10 月）
* 3.6（2020 年 2 月）
* 4.0（2020 年 5 月）

早期Android的速度比较慢，于是在4.1的时候谷歌启动了黄油计划提升性能，后来又在各个版本做了安全，性能，瘦身，续航等优化。
在9.0更是引入了机器学习API。


## 认识刷机过程

掌握刷机流程之后，我们就可以对系统的结构有进一步的认识

使用谷歌Pixel Sailfish，需要注意，系统是系统，驱动是驱动，内核是内核

如果手机没有BL解锁需要先解锁，在开发者选项里打开oem解锁

```
adb reboot bootloader
fastboot flashing unlock
```


下载驱动 https://developers.google.com/android/drivers

Sailfish使用的是高通的组件，所以是需要高通的驱动，驱动的硬件是GPS, Audio, Camera, Gestures, Graphics, DRM, Video, Sensors

当然，如果只是构建出镜像在模拟器里跑就不需要驱动。

AOSP
```
repo init -u https://android.googlesource.com/platform/manifest -b android-10.0.0_r2

安装OpenJDK 8
初始化编译环境 source build/envsetup.sh
make -j60 #这个60是cpu核心个数*2，我这是30个cpu
编译完成的系统镜像位于当前目录的out/target/product/sailfish/下，很多的img

```
boot.img
recovery.img
ramdisk.img
system.img
userdata.img
```


adb reboot bootloader
fastboot flashall -w

```

驱动下载下来是两个脚本：

extract-google_devices-sailfish.sh
extract-qcom-sailfish.sh

执行脚本得到驱动，然后拷贝到aosp源代码目录



内核
```
git clone https://android.googlesource.com/kernel/msm.git
cd msm
git checkout android-msm-marlin-3.18-pi-qpr1
source build/envsetup.sh
lunch aosp_sailfish-userdebug
make -j60
adb reboot bootloader
fastboot flash boot boot.img
```




## 平台架构

简略的说，是从Linux那里取了内核，从JDK取了内库，然后自己实现了一个特殊虚拟机ART（早期叫Dalvik），字节码的格式基于了寄存器而不是栈结构。

为了避免Linux内核的协议问题，构造了一个硬件抽象层HAL，这样各个厂商不需要开放源代码。

然后用JNI技术在jvm上构造了java语言和C++库的桥，然后封装了一套java API的框架，图形引擎使用Skia，Android中的那些控件其内部就是使用libskia为二维图形库（3维绘制则使用OpenGLES）。libskia也就是现在的Flutter底层绘制引擎。web部分使用Webkit，但并不是所有APP都可以用Java来写，所以还提供了一套底层的NDK。

开发IDE早期是一个eclipse插件，后来用了JetBrains的IDE社区版进行扩展。开发语言与时俱进，可以用比较新的Kotlin，构建工具使用在2007年开始流程的Gradle。

另外还有配套的各种工具，比如ADB，模拟器

系统架构在Android10上做了很大的更新：

### Android 10

Android 10 或更高版本采用模块化方式来处理一些 Android 系统组件，使其能够在 Android 的常规发布周期外的时间进行更新。
最终用户设备可以从 Google Play 商店基础架构或通过合作伙伴提供的无线下载 (OTA) 机制接收这些模块化系统组件的更新。

利用模块化系统组件，Google 和 Android 合作伙伴能够以非侵入方式广泛、快速、无缝地向最终用户设备分发更新。例如，媒体编解码器碎片和严重错误可能会显著降低应用的采用率和用户互动度。
频繁更新媒体相关模块可以减少编解码器碎片，以使媒体应用在不同 Android 设备上的行为更加一致，并且可以修复严重错误，以建立用户信任。

Android 10 或更高版本会将选定的系统组件转换为模块，其中一些模块采用 APEX 容器格式（在 Android 10 中引入），另一些则采用 APK 格式。借助模块化架构，系统组件能够根据需要以修复严重问题以及做出其他改进的方式进行更新，而不会影响较低级别的供应商实现或较高级别的应用和服务。

模块更新不会引入新的 API。它们仅使用由兼容性测试套件 (CTS) 保证的 SDK 和系统 API，并且只会彼此之间进行通信，且只使用稳定的 C API 或稳定的 AIDL 接口。

您可以将更新后的模块化系统组件打包在一起，并通过 Google（使用 Google Play 商店基础架构）或 Android 合作伙伴（使用合作伙伴提供的 OTA 机制）将其推送到最终用户设备。模块软件包会以原子方式安装（和回滚），这意味着所有需要更新的模块都会进行更新，或者所有模块都不会进行更新。例如，如果某个需要更新的模块出于某种原因无法更新，设备不会安装软件包中的任何模块。


### JNI

JNI（Java Native Interface，Java本地接口），用于打通Java层与Native(C/C++)层。
这不是Android系统所独有的，而是Java所有。众所周知，Java语言是跨平台的语言，而这跨平台的背后都是依靠Java虚拟机，虚拟机采用C/C++编写，适配各个系统，通过JNI为上层Java提供各种服务，保证跨平台性。

JNI定义了 Android 从受管理代码（使用 Java 或 Kotlin 编程语言编写）编译的字节码与原生代码（使用 C/C++ 编写）互动的方式。JNI 不依赖于供应商，支持从动态共享库加载代码，虽然有时较为繁琐，但效率尚可。

如需查看全局 JNI 引用并了解这些引用创建和删除的位置，请使用 Android Studio 3.2 及更高版本的内存性能剖析器中的 JNI 堆视图。

Android系统在启动启动过程中，先启动Kernel创建init进程，紧接着由init进程fork第一个横穿Java和C/C++的进程，即Zygote进程。Zygote启动过程中会AndroidRuntime.cpp中的startVm创建虚拟机，VM创建完成后，紧接着调用startReg完成虚拟机中的JNI方法注册。

JNI 编程对要求比较高，需要注意：

尽量减少 JNI 层的占用空间。您需要从几个方面来考虑实现这一点。您的 JNI 解决方案应该尝试遵循以下准则（按重要程度依次列出，从最重要的开始）：

* 尽可能减少跨 JNI 层编组资源的次数。跨 JNI 层进行编组的费用十分高昂。尝试设计一种接口，尽可能减少需要编组的数据量以及必须进行数据编组的频率。
* 尽可能避免在使用受管理编程语言编写的代码与使用 C++ 编写的代码之间进行异步通信。这样可使 JNI 接口更易于维护。通常，您可以采用与编写界面相同的编程语言保持异步更新，以简化异步界面更新。例如，最好使用 Java 编程语言在两个线程之间进行回调（其中一个线程发出阻塞 C++ 调用，然后在阻塞调用完成时通知界面线程），而不是通过 JNI 从使用 Java 代码的界面线程调用 C++ 函数。
* 尽可能减少需要接触 JNI 或被 JNI 接触的线程数。如果您确实需要使用 Java 和 C++ 这两种语言的线程池，请尽量保持在池所有者之间（而不是各个工作器线程之间）进行 JNI 通信。
* 将接口代码保存在少量易于识别的 C++ 和 Java 源位置，以便将来进行重构。酌情考虑使用 JNI 自动生成库。

JNI 定义了两个关键数据结构，即“JavaVM”和“JNIEnv”。两者本质上都是指向函数表的二级指针。（在 C++ 版本中，它们是一些类，这些类具有指向函数表的指针，并具有每个通过该函数表间接调用的 JNI 函数的成员函数。）JavaVM 提供“调用接口”函数，您可以利用此类来函数创建和销毁 JavaVM。理论上，每个进程可以有多个 JavaVM，但 Android 只允许有一个。

JNIEnv 提供了大部分 JNI 函数。您的原生函数都会收到 JNIEnv 作为第一个参数。

该 JNIEnv 将用于线程本地存储。因此，您无法在线程之间共享 JNIEnv。如果一段代码无法通过其他方法获取自己的 JNIEnv，您应该共享相应 JavaVM，然后使用 GetEnv 发现线程的 JNIEnv。（假设该线程包含一个 JNIEnv；请参阅下面的 AttachCurrentThread。）

JNIEnv 和 JavaVM 的 C 声明与 C++ 声明不同。"jni.h" include 文件会提供不同的类型定义符，具体取决于该文件是包含在 C 还是 C++ 中。因此，我们不建议在这两种语言包含的头文件中添加 NIEnv 参数。（换个说法：如果您的头文件需要 #ifdef __cplusplus，且该标头中有任何内容引用 JNIEnv，您可能都必须进行一些额外操作。）


### 内核部分

什么是内核？通俗的说类似这样的场景：

就像是一个为高管（硬件）服务的忙碌的个人助理。助理的工作就是将员工和公众（用户）的消息和请求（进程）转交给高管，记住存放的内容和位置（内存），并确定在任何特定的时间谁可以拜访高管、会面时间有多长。

Linux 内核有 4 项工作：

* 内存管理：追踪记录有多少内存存储了什么以及存储在哪里
* 进程管理：确定哪些进程可以使用中央处理器（CPU）、何时使用以及持续多长时间
* 设备驱动程序：充当硬件与进程之间的调解程序/解释程序
* 系统调用和安全防护：从流程接受服务请求

进程通信，文件系统以及网络接口都是一个内核的模块。


将 Linux 计算机想象成有三层结构：

硬件：物理机（这是系统的底层结构或基础）是由内存（RAM）、处理器（或 CPU）以及输入/输出（I/O）设备（例如存储、网络和图形）组成的。其中，CPU 负责执行计算和内存的读写操作。

Linux 内核：操作系统的核心。（明白了吗？内核正居于核心位置。）它是驻留在内存中的软件，用于告诉 CPU 要执行哪些操作。

用户进程：这些是内核所管理的运行程序。用户进程共同构成了用户空间。用户进程有时也简称为进程。内核还允许这些进程和服务器彼此进行通信（称为进程间通信或 IPC）。

系统执行的代码通过以下两种模式之一在 CPU 上运行：内核模式或用户模式。在内核模式下运行的代码可以不受限制地访问硬件，而用户模式则会限制 SCI 对 CPU 和内存的访问。内存也存在类似的分隔情况（内核空间和用户空间）。这两个小细节构成了一些复杂操作的基础，例如安全防护、构建容器和虚拟机的权限分隔。

这也意味着：如果进程在用户模式下失败，则损失有限，无伤大雅，可以由内核进行修复。另一方面，由于内核进程要访问内存和处理器，因此内核进程的崩溃可能会引起整个系统的崩溃。由于用户进程之间会有适当的保护措施和权限要求，因此一个进程的崩溃通常不会引起太多问题。

手机的内核其实比运行PC还麻烦：

虽然 Linux 内核包含其支持的所有不同芯片架构和硬件驱动程序的代码，但各个系统仅运行一小部分代码库。一台普通的笔记本电脑需要使用来自 5000 个文件的大约 200 万行内核代码才能正常运行；
而 Pixel 手机需要使用来自 6000 个文件的 320 万行内核代码才能正常运行（因为 SoC 的复杂性有所增加）。

AOSP 通用内核是长期支持 (LTS) 内核的下游，包含与 Android 社区相关但尚未合并到 LTS 的补丁程序。这些补丁程序可能包括：

* 针对 Android 需求定制的功能（例如交互式 cpufreq 调节器）。
* 由于实现方面的问题而被上游拒绝的功能（例如 MTP/PTP、Paranoid Networking）。
* 可供 Android 设备使用但仍处于开发上游阶段的功能（例如 Energy Aware Scheduling/EAS）。
* 对其他方有用的供应商/原始设备制造商 (OEM) 功能（例如 sdcardfs）。

与 LTS (4.14.0) 相比，Android 通用内核更改了 355 行，插入了 32266 行，并删除了 1546 行（截至 2018 年 2 月）。

最大的特性包括：

* 19.8% Energy Aware Scheduling (kernel/sched)
* 13.8% 网络 (net/netfilter)
* 13.5% Sdcardfs (fs/sdcardfs)
* 9.4% USB (drivers/usb)
* 7.2% SoC (arch/arm64, arch/x86)
* 6.2% f2fs（fs/f2fs - 从上游向后移植）
* 6.1% 输入 (drivers/input/misc)
* 5.4% FIQ 调试程序 (drivers/staging/android/fiq_debugger)
* 3.6% Goldfish 模拟器 (drivers/platform/goldfish)
* 3.4% Verity (drivers/md)
* 11.6% 其他


内核中有很多的驱动代码：

显示驱动（Display Driver）：基于Linux的帧缓冲（Frame Buffer）驱动。

键盘驱动（KeyBoard Driver）：作为输入设备的键盘驱动。

Flash内存驱动（Flase Memory Driver）：基于MTD的Flash驱动程序。

照相机驱动（Camera Driver）：常用的基于Linux的v412（Video for Linux）的驱动。

音频驱动（Audio Driver）：常用的基于ALSA的高级Linux声音体系驱动。

蓝牙驱动（Bluetooth Driver）：基于IEEE 802.15.1标准的无线传输技术。

WiFi驱动：基于IEEE 802.11标准的驱动程序。

Binder IPC驱动：Android的一个特殊的驱动程序，具有单独的设备节点，提供进程间通信的功能。

Power Management（电源管理）：比如电池电量等。

### 代码结构

Android的代码结构非常庞大，内核部分都是独立的，对这个结构基本了解一下即可

```
art 全新的ART运行环境（Android Runtime）
bionic  系统C库
bootable 启动引导相关代码
build 存放系统编译规则及generic等基础开发包配置
cts Android兼容性测试套件标准
dalvik dalvik虚拟机
developers 开发者目录
development  应用程序开发相关
device 设备相关配置
external 开源模组相关文件
frameworks 应用程序框架，Android系统核心部分，由Java和C++编写
hardware 主要是硬件抽象层的代码
libcore 核心库相关文件
libnativehelper 动态库，实现JNI库的基础
packages 应用程序包
pdk 本地开发套件
platform_testing 平台测试
prebuilts x86和arm架构下预编译的一些资源
sdk sdk和模拟器
system 底层文件系统库、应用和组件
toolchain 工具链文件
tools 工具文件
Makefile 全局Makefile文件，用来定义编译规则
```

### 运行时

Android Runtime (ART) 是 Android 上的应用和部分系统服务使用的托管式运行时。ART 及其前身 Dalvik 最初是专为 Android 项目打造的。作为运行时的 ART 可执行 Dalvik 可执行文件并遵循 Dex 字节码规范。

ART 和 Dalvik 是运行 Dex 字节码的兼容运行时，因此针对 Dalvik 开发的应用也能在 ART 环境中运作。不过，Dalvik 采用的一些技术并不适用于 ART。

ART 功能

* 预先 (AOT) 编译
* 垃圾回收方面的优化
* 支持采样分析器
* 支持更多调试功能
* 优化了异常和崩溃报告中的诊断详细信息

关于AOT，在7.0开始结合JIT

垃圾回收的具体优化

* 大多采用并发设计，具有一次 GC 暂停
* 并发复制，可减少后台内存使用和碎片
* GC 暂停的时间不受堆大小影响
* 在清理最近分配的短时对象这种特殊情况中，回收器的总 GC 时间更短
* 优化了垃圾回收的工效，能够更加及时地进行并行垃圾回收，这使得 GC_FOR_ALLOC 事件在典型用例中极为罕见

ART 有多个不同的 GC 方案，涉及运行不同的垃圾回收器。从 Android 8 (Oreo) 开始，默认方案是并发复制 (CC)。另一个 GC 方案是并发标记清除 (CMS)。


演进

* 在Android 5.0之前，使用JIT模式。由于边解释边执行，所以效率比较低。
* 在Android 5.0 ~ 6.0，使用AOT模式。效率高，但是安装时间长。
* 从Android 7.0 到现在，采用解释器 + JIT + AOT这种混合模式。
* 在Android 8.0上改进了解释器，解释模式执行效率大幅提升
* Android 10上提供了预先放置热点代码的方式，应用在安装的时候就能知道常用代码会被提前编译(Google Play)。


## 编译打包

前面提到了Android的内库是取自JDK，但是字节码结构和虚拟机是重新实现的，同样一段代码，字节码格式是不一样的

![](https://miro.medium.com/max/700/1*sRkZebFFMiuSa-tXfmBOIA.png)

![](https://miro.medium.com/max/700/1*g50YUoPcBFT-I4Cv8KrDaw.png)

从源文件是如何编译成一个APK的呢？编译过程还是复用了javac，javac产生的字节码会经过混淆器R8，D8编译器的处理成dex文件，D8的工作还包含一部分脱糖工作，这样能让我们使用java8的语法。

![](https://miro.medium.com/max/700/1*APXAk8JFCdcfOPTpCD7SeQ.png)

这个过程的全貌可以用这个图来表达

![](https://miro.medium.com/max/1000/1*2wsimRFo3i2Ro-Fcpb_kyA.png)

AAPT2（Android 资源打包工具）是一种构建工具，Android Studio 和 Android Gradle 插件使用它来编译和打包应用的资源。AAPT2 会解析资源、为资源编制索引，并将资源编译为针对 Android 平台进行过优化的二进制格式。


这里面有七步：

* 应用资源（res文件、assets文件、AndroidManifest.xml以及android.jar）通过 aapt 生成R.java文件以及打包好的资源文件
* AIDL文件通过 aidl 生成对应的Java文件
* 源码文件、R.java文件以及AIDL生成的Java文件通过 javac 编译成.class文件
* 第3步生成的.class文件以及第三方库中的.class文件通过 dx 处理生成classes.dex文件
* 打包好的资源文件、上一步生成的classes.dex文件、第三方库中的资源文件以及.so文件等其他资源通过 apkbuilder 生成未签名的.apk文件
* 调用 jarsigner 对上面未签名.apk进行签名
* 调用 zipalign 对签名后的.apk进行对齐处理


如何缩减APK包大小？

代码:保持良好的编程习惯，不要重复或者不用的代码，谨慎添加libs，移除使用不到的libs。②使用proguard混淆代码，它会对不用的代码做优化，并且混淆后也能够减少安装包的大小。③native code的部分，大多数情况下只需要支持armabi与x86的架构即可。如果非必须，可以考虑拿掉x86的部分。

资源:
使用工具查找没有使用到的资源，去除不使用的图片，String，XML等。②生成APK的时候，aapt工具本身会对png做优化，但是在此之前还可以使用其他工具如tinypng对图片进行进一步的压缩预处理。③jpeg还是png，根据需要做选择，在某些时候jpeg可以减少图片的体积。对于.9.png的图片，可拉伸区域尽量切小，另外可以通过使用.9.png拉伸达到大图效果的时候尽量不要使用整张大图。

策略:
有选择性的提供hdpi，xhdpi，xxhdpi的图片资源。建议优先提供xhdpi的图片，对于mdpi，ldpi与xxxhdpi根据需要提供有差异的部分即可。②尽可能的重用已有的图片资源。例如对称的图片，只需要提供一张，另外一张图片可以通过代码旋转的方式实现。③能用代码绘制实现的功能，尽量不要使用大量的图片。例如减少使用多张图片组成animate-list的AnimationDrawable，这种方式提供了多张图片很占空间。

### 字节码

标准Java的栈结构字节码是8位字节码，Android虚拟机字节码是16位字节码，传统的Java字节码class文件中包含了很多冗余的数据，Dalvik对冗余的数据进行了精简压缩，从而减小体积。

机器模型和调用规范旨在大致模仿常见的真实架构和 C 样式的调用规范

* 机器基于寄存器，而帧的大小在创建时确定后就固定不变。每一帧由特定数量的寄存器（由相应方法指定）以及执行该方法所需的所有辅助数据构成，例如（但不限于）程序计数器和对包含该方法的 .dex 文件的引用。
* 当用于位值（例如整数和浮点数）时，寄存器会被视为宽度为 32 位。如果值是 64 位，则使用两个相邻的寄存器。对于寄存器对，没有对齐要求。
* 当用于对象引用时，寄存器会被视为其宽度正好能够容纳一个此类引用。
* 对于按位表示，(Object) null == (int) 0。
* 如果一个方法有 N 个参数，则在该方法的调用帧的最后 N 个寄存器中按顺序传递这些参数。宽参数占用两个寄存器。向实例方法传入一个 this 引用作为其第一个参数。


列表

```
int OP_NOP                          = 0x0000;
33    int OP_MOVE                         = 0x0001;
34    int OP_MOVE_FROM16                  = 0x0002;
35    int OP_MOVE_16                      = 0x0003;
36    int OP_MOVE_WIDE                    = 0x0004;
37    int OP_MOVE_WIDE_FROM16             = 0x0005;
38    int OP_MOVE_WIDE_16                 = 0x0006;
39    int OP_MOVE_OBJECT                  = 0x0007;
40    int OP_MOVE_OBJECT_FROM16           = 0x0008;
41    int OP_MOVE_OBJECT_16               = 0x0009;
42    int OP_MOVE_RESULT                  = 0x000a;
43    int OP_MOVE_RESULT_WIDE             = 0x000b;
44    int OP_MOVE_RESULT_OBJECT           = 0x000c;
45    int OP_MOVE_EXCEPTION               = 0x000d;
46    int OP_RETURN_VOID                  = 0x000e;
47    int OP_RETURN                       = 0x000f;
48    int OP_RETURN_WIDE                  = 0x0010;
49    int OP_RETURN_OBJECT                = 0x0011;
50    int OP_CONST_4                      = 0x0012;
51    int OP_CONST_16                     = 0x0013;
52    int OP_CONST                        = 0x0014;
53    int OP_CONST_HIGH16                 = 0x0015;
54    int OP_CONST_WIDE_16                = 0x0016;
55    int OP_CONST_WIDE_32                = 0x0017;
56    int OP_CONST_WIDE                   = 0x0018;
57    int OP_CONST_WIDE_HIGH16            = 0x0019;
58    int OP_CONST_STRING                 = 0x001a;
59    int OP_CONST_STRING_JUMBO           = 0x001b;
60    int OP_CONST_CLASS                  = 0x001c;
61    int OP_MONITOR_ENTER                = 0x001d;
62    int OP_MONITOR_EXIT                 = 0x001e;
63    int OP_CHECK_CAST                   = 0x001f;
64    int OP_INSTANCE_OF                  = 0x0020;
65    int OP_ARRAY_LENGTH                 = 0x0021;
66    int OP_NEW_INSTANCE                 = 0x0022;
67    int OP_NEW_ARRAY                    = 0x0023;
68    int OP_FILLED_NEW_ARRAY             = 0x0024;
69    int OP_FILLED_NEW_ARRAY_RANGE       = 0x0025;
70    int OP_FILL_ARRAY_DATA              = 0x0026;
71    int OP_THROW                        = 0x0027;
72    int OP_GOTO                         = 0x0028;
73    int OP_GOTO_16                      = 0x0029;
74    int OP_GOTO_32                      = 0x002a;
75    int OP_PACKED_SWITCH                = 0x002b;
76    int OP_SPARSE_SWITCH                = 0x002c;
77    int OP_CMPL_FLOAT                   = 0x002d;
78    int OP_CMPG_FLOAT                   = 0x002e;
79    int OP_CMPL_DOUBLE                  = 0x002f;
80    int OP_CMPG_DOUBLE                  = 0x0030;
81    int OP_CMP_LONG                     = 0x0031;
82    int OP_IF_EQ                        = 0x0032;
83    int OP_IF_NE                        = 0x0033;
84    int OP_IF_LT                        = 0x0034;
85    int OP_IF_GE                        = 0x0035;
86    int OP_IF_GT                        = 0x0036;
87    int OP_IF_LE                        = 0x0037;
88    int OP_IF_EQZ                       = 0x0038;
89    int OP_IF_NEZ                       = 0x0039;
90    int OP_IF_LTZ                       = 0x003a;
91    int OP_IF_GEZ                       = 0x003b;
92    int OP_IF_GTZ                       = 0x003c;
93    int OP_IF_LEZ                       = 0x003d;
94    int OP_AGET                         = 0x0044;
95    int OP_AGET_WIDE                    = 0x0045;
96    int OP_AGET_OBJECT                  = 0x0046;
97    int OP_AGET_BOOLEAN                 = 0x0047;
98    int OP_AGET_BYTE                    = 0x0048;
99    int OP_AGET_CHAR                    = 0x0049;
100    int OP_AGET_SHORT                   = 0x004a;
101    int OP_APUT                         = 0x004b;
102    int OP_APUT_WIDE                    = 0x004c;
103    int OP_APUT_OBJECT                  = 0x004d;
104    int OP_APUT_BOOLEAN                 = 0x004e;
105    int OP_APUT_BYTE                    = 0x004f;
106    int OP_APUT_CHAR                    = 0x0050;
107    int OP_APUT_SHORT                   = 0x0051;
108    int OP_IGET                         = 0x0052;
109    int OP_IGET_WIDE                    = 0x0053;
110    int OP_IGET_OBJECT                  = 0x0054;
111    int OP_IGET_BOOLEAN                 = 0x0055;
112    int OP_IGET_BYTE                    = 0x0056;
113    int OP_IGET_CHAR                    = 0x0057;
114    int OP_IGET_SHORT                   = 0x0058;
115    int OP_IPUT                         = 0x0059;
116    int OP_IPUT_WIDE                    = 0x005a;
117    int OP_IPUT_OBJECT                  = 0x005b;
118    int OP_IPUT_BOOLEAN                 = 0x005c;
119    int OP_IPUT_BYTE                    = 0x005d;
120    int OP_IPUT_CHAR                    = 0x005e;
121    int OP_IPUT_SHORT                   = 0x005f;
122    int OP_SGET                         = 0x0060;
123    int OP_SGET_WIDE                    = 0x0061;
124    int OP_SGET_OBJECT                  = 0x0062;
125    int OP_SGET_BOOLEAN                 = 0x0063;
126    int OP_SGET_BYTE                    = 0x0064;
127    int OP_SGET_CHAR                    = 0x0065;
128    int OP_SGET_SHORT                   = 0x0066;
129    int OP_SPUT                         = 0x0067;
130    int OP_SPUT_WIDE                    = 0x0068;
131    int OP_SPUT_OBJECT                  = 0x0069;
132    int OP_SPUT_BOOLEAN                 = 0x006a;
133    int OP_SPUT_BYTE                    = 0x006b;
134    int OP_SPUT_CHAR                    = 0x006c;
135    int OP_SPUT_SHORT                   = 0x006d;
136    int OP_INVOKE_VIRTUAL               = 0x006e;
137    int OP_INVOKE_SUPER                 = 0x006f;
138    int OP_INVOKE_DIRECT                = 0x0070;
139    int OP_INVOKE_STATIC                = 0x0071;
140    int OP_INVOKE_INTERFACE             = 0x0072;
141    int OP_INVOKE_VIRTUAL_RANGE         = 0x0074;
142    int OP_INVOKE_SUPER_RANGE           = 0x0075;
143    int OP_INVOKE_DIRECT_RANGE          = 0x0076;
144    int OP_INVOKE_STATIC_RANGE          = 0x0077;
145    int OP_INVOKE_INTERFACE_RANGE       = 0x0078;
146    int OP_NEG_INT                      = 0x007b;
147    int OP_NOT_INT                      = 0x007c;
148    int OP_NEG_LONG                     = 0x007d;
149    int OP_NOT_LONG                     = 0x007e;
150    int OP_NEG_FLOAT                    = 0x007f;
151    int OP_NEG_DOUBLE                   = 0x0080;
152    int OP_INT_TO_LONG                  = 0x0081;
153    int OP_INT_TO_FLOAT                 = 0x0082;
154    int OP_INT_TO_DOUBLE                = 0x0083;
155    int OP_LONG_TO_INT                  = 0x0084;
156    int OP_LONG_TO_FLOAT                = 0x0085;
157    int OP_LONG_TO_DOUBLE               = 0x0086;
158    int OP_FLOAT_TO_INT                 = 0x0087;
159    int OP_FLOAT_TO_LONG                = 0x0088;
160    int OP_FLOAT_TO_DOUBLE              = 0x0089;
161    int OP_DOUBLE_TO_INT                = 0x008a;
162    int OP_DOUBLE_TO_LONG               = 0x008b;
163    int OP_DOUBLE_TO_FLOAT              = 0x008c;
164    int OP_INT_TO_BYTE                  = 0x008d;
165    int OP_INT_TO_CHAR                  = 0x008e;
166    int OP_INT_TO_SHORT                 = 0x008f;
167    int OP_ADD_INT                      = 0x0090;
168    int OP_SUB_INT                      = 0x0091;
169    int OP_MUL_INT                      = 0x0092;
170    int OP_DIV_INT                      = 0x0093;
171    int OP_REM_INT                      = 0x0094;
172    int OP_AND_INT                      = 0x0095;
173    int OP_OR_INT                       = 0x0096;
174    int OP_XOR_INT                      = 0x0097;
175    int OP_SHL_INT                      = 0x0098;
176    int OP_SHR_INT                      = 0x0099;
177    int OP_USHR_INT                     = 0x009a;
178    int OP_ADD_LONG                     = 0x009b;
179    int OP_SUB_LONG                     = 0x009c;
180    int OP_MUL_LONG                     = 0x009d;
181    int OP_DIV_LONG                     = 0x009e;
182    int OP_REM_LONG                     = 0x009f;
183    int OP_AND_LONG                     = 0x00a0;
184    int OP_OR_LONG                      = 0x00a1;
185    int OP_XOR_LONG                     = 0x00a2;
186    int OP_SHL_LONG                     = 0x00a3;
187    int OP_SHR_LONG                     = 0x00a4;
188    int OP_USHR_LONG                    = 0x00a5;
189    int OP_ADD_FLOAT                    = 0x00a6;
190    int OP_SUB_FLOAT                    = 0x00a7;
191    int OP_MUL_FLOAT                    = 0x00a8;
192    int OP_DIV_FLOAT                    = 0x00a9;
193    int OP_REM_FLOAT                    = 0x00aa;
194    int OP_ADD_DOUBLE                   = 0x00ab;
195    int OP_SUB_DOUBLE                   = 0x00ac;
196    int OP_MUL_DOUBLE                   = 0x00ad;
197    int OP_DIV_DOUBLE                   = 0x00ae;
198    int OP_REM_DOUBLE                   = 0x00af;
199    int OP_ADD_INT_2ADDR                = 0x00b0;
200    int OP_SUB_INT_2ADDR                = 0x00b1;
201    int OP_MUL_INT_2ADDR                = 0x00b2;
202    int OP_DIV_INT_2ADDR                = 0x00b3;
203    int OP_REM_INT_2ADDR                = 0x00b4;
204    int OP_AND_INT_2ADDR                = 0x00b5;
205    int OP_OR_INT_2ADDR                 = 0x00b6;
206    int OP_XOR_INT_2ADDR                = 0x00b7;
207    int OP_SHL_INT_2ADDR                = 0x00b8;
208    int OP_SHR_INT_2ADDR                = 0x00b9;
209    int OP_USHR_INT_2ADDR               = 0x00ba;
210    int OP_ADD_LONG_2ADDR               = 0x00bb;
211    int OP_SUB_LONG_2ADDR               = 0x00bc;
212    int OP_MUL_LONG_2ADDR               = 0x00bd;
213    int OP_DIV_LONG_2ADDR               = 0x00be;
214    int OP_REM_LONG_2ADDR               = 0x00bf;
215    int OP_AND_LONG_2ADDR               = 0x00c0;
216    int OP_OR_LONG_2ADDR                = 0x00c1;
217    int OP_XOR_LONG_2ADDR               = 0x00c2;
218    int OP_SHL_LONG_2ADDR               = 0x00c3;
219    int OP_SHR_LONG_2ADDR               = 0x00c4;
220    int OP_USHR_LONG_2ADDR              = 0x00c5;
221    int OP_ADD_FLOAT_2ADDR              = 0x00c6;
222    int OP_SUB_FLOAT_2ADDR              = 0x00c7;
223    int OP_MUL_FLOAT_2ADDR              = 0x00c8;
224    int OP_DIV_FLOAT_2ADDR              = 0x00c9;
225    int OP_REM_FLOAT_2ADDR              = 0x00ca;
226    int OP_ADD_DOUBLE_2ADDR             = 0x00cb;
227    int OP_SUB_DOUBLE_2ADDR             = 0x00cc;
228    int OP_MUL_DOUBLE_2ADDR             = 0x00cd;
229    int OP_DIV_DOUBLE_2ADDR             = 0x00ce;
230    int OP_REM_DOUBLE_2ADDR             = 0x00cf;
231    int OP_ADD_INT_LIT16                = 0x00d0;
232    int OP_RSUB_INT                     = 0x00d1;
233    int OP_MUL_INT_LIT16                = 0x00d2;
234    int OP_DIV_INT_LIT16                = 0x00d3;
235    int OP_REM_INT_LIT16                = 0x00d4;
236    int OP_AND_INT_LIT16                = 0x00d5;
237    int OP_OR_INT_LIT16                 = 0x00d6;
238    int OP_XOR_INT_LIT16                = 0x00d7;
239    int OP_ADD_INT_LIT8                 = 0x00d8;
240    int OP_RSUB_INT_LIT8                = 0x00d9;
241    int OP_MUL_INT_LIT8                 = 0x00da;
242    int OP_DIV_INT_LIT8                 = 0x00db;
243    int OP_REM_INT_LIT8                 = 0x00dc;
244    int OP_AND_INT_LIT8                 = 0x00dd;
245    int OP_OR_INT_LIT8                  = 0x00de;
246    int OP_XOR_INT_LIT8                 = 0x00df;
247    int OP_SHL_INT_LIT8                 = 0x00e0;
248    int OP_SHR_INT_LIT8                 = 0x00e1;
249    int OP_USHR_INT_LIT8                = 0x00e2;
250    int OP_INVOKE_POLYMORPHIC           = 0x00fa;
251    int OP_INVOKE_POLYMORPHIC_RANGE     = 0x00fb;
252    int OP_INVOKE_CUSTOM                = 0x00fc;
253    int OP_INVOKE_CUSTOM_RANGE          = 0x00fd;
254    int OP_CONST_METHOD_HANDLE          = 0x00fe;
255    int OP_CONST_METHOD_TYPE            = 0x00ff;
256    // END(libcore-opcodes)
257
258    /** Never implemented; do not use. */
259    int OP_CONST_CLASS_JUMBO            = 0x00ff;
260    /** Never implemented; do not use. */
261    int OP_CHECK_CAST_JUMBO             = 0x01ff;
262    /** Never implemented; do not use. */
263    int OP_INSTANCE_OF_JUMBO            = 0x02ff;
264    /** Never implemented; do not use. */
265    int OP_NEW_INSTANCE_JUMBO           = 0x03ff;
266    /** Never implemented; do not use. */
267    int OP_NEW_ARRAY_JUMBO              = 0x04ff;
268    /** Never implemented; do not use. */
269    int OP_FILLED_NEW_ARRAY_JUMBO       = 0x05ff;
270    /** Never implemented; do not use. */
271    int OP_IGET_JUMBO                   = 0x06ff;
272    /** Never implemented; do not use. */
273    int OP_IGET_WIDE_JUMBO              = 0x07ff;
274    /** Never implemented; do not use. */
275    int OP_IGET_OBJECT_JUMBO            = 0x08ff;
276    /** Never implemented; do not use. */
277    int OP_IGET_BOOLEAN_JUMBO           = 0x09ff;
278    /** Never implemented; do not use. */
279    int OP_IGET_BYTE_JUMBO              = 0x0aff;
280    /** Never implemented; do not use. */
281    int OP_IGET_CHAR_JUMBO              = 0x0bff;
282    /** Never implemented; do not use. */
283    int OP_IGET_SHORT_JUMBO             = 0x0cff;
284    /** Never implemented; do not use. */
285    int OP_IPUT_JUMBO                   = 0x0dff;
286    /** Never implemented; do not use. */
287    int OP_IPUT_WIDE_JUMBO              = 0x0eff;
288    /** Never implemented; do not use. */
289    int OP_IPUT_OBJECT_JUMBO            = 0x0fff;
290    /** Never implemented; do not use. */
291    int OP_IPUT_BOOLEAN_JUMBO           = 0x10ff;
292    /** Never implemented; do not use. */
293    int OP_IPUT_BYTE_JUMBO              = 0x11ff;
294    /** Never implemented; do not use. */
295    int OP_IPUT_CHAR_JUMBO              = 0x12ff;
296    /** Never implemented; do not use. */
297    int OP_IPUT_SHORT_JUMBO             = 0x13ff;
298    /** Never implemented; do not use. */
299    int OP_SGET_JUMBO                   = 0x14ff;
300    /** Never implemented; do not use. */
301    int OP_SGET_WIDE_JUMBO              = 0x15ff;
302    /** Never implemented; do not use. */
303    int OP_SGET_OBJECT_JUMBO            = 0x16ff;
304    /** Never implemented; do not use. */
305    int OP_SGET_BOOLEAN_JUMBO           = 0x17ff;
306    /** Never implemented; do not use. */
307    int OP_SGET_BYTE_JUMBO              = 0x18ff;
308    /** Never implemented; do not use. */
309    int OP_SGET_CHAR_JUMBO              = 0x19ff;
310    /** Never implemented; do not use. */
311    int OP_SGET_SHORT_JUMBO             = 0x1aff;
312    /** Never implemented; do not use. */
313    int OP_SPUT_JUMBO                   = 0x1bff;
314    /** Never implemented; do not use. */
315    int OP_SPUT_WIDE_JUMBO              = 0x1cff;
316    /** Never implemented; do not use. */
317    int OP_SPUT_OBJECT_JUMBO            = 0x1dff;
318    /** Never implemented; do not use. */
319    int OP_SPUT_BOOLEAN_JUMBO           = 0x1eff;
320    /** Never implemented; do not use. */
321    int OP_SPUT_BYTE_JUMBO              = 0x1fff;
322    /** Never implemented; do not use. */
323    int OP_SPUT_CHAR_JUMBO              = 0x20ff;
324    /** Never implemented; do not use. */
325    int OP_SPUT_SHORT_JUMBO             = 0x21ff;
326    /** Never implemented; do not use. */
327    int OP_INVOKE_VIRTUAL_JUMBO         = 0x22ff;
328    /** Never implemented; do not use. */
329    int OP_INVOKE_SUPER_JUMBO           = 0x23ff;
330    /** Never implemented; do not use. */
331    int OP_INVOKE_DIRECT_JUMBO          = 0x24ff;
332    /** Never implemented; do not use. */
333    int OP_INVOKE_STATIC_JUMBO          = 0x25ff;
334    /** Never implemented; do not use. */
335    int OP_INVOKE_INTERFACE_JUMBO       = 0x26ff;
336
337    /*
338     * The rest of these are either generated by dexopt for optimized
339     * code, or inserted by the VM at runtime.  They are never generated
340     * by "dx".
341     *
342     * They are all deprecated and will be removed in a future
343     * release, since these declarations are really of private implementation
344     * details that are subject to change.
345     */
346
347    /**
348     * Implementation detail.
349     * @deprecated Implementation detail.
350     */
351    @Deprecated int OP_IGET_WIDE_VOLATILE           = 0xe8;
352
353    /**
354     * Implementation detail.
355     * @deprecated Implementation detail.
356     */
357    @Deprecated int OP_IPUT_WIDE_VOLATILE           = 0xe9;
358
359    /**
360     * Implementation detail.
361     * @deprecated Implementation detail.
362     */
363    @Deprecated int OP_SGET_WIDE_VOLATILE           = 0xea;
364
365    /**
366     * Implementation detail.
367     * @deprecated Implementation detail.
368     */
369    @Deprecated int OP_SPUT_WIDE_VOLATILE           = 0xeb;
370
371    /**
372     * Implementation detail.
373     * @deprecated Implementation detail.
374     */
375    @Deprecated int OP_BREAKPOINT                   = 0xec;
376
377    /**
378     * Implementation detail.
379     * @deprecated Implementation detail.
380     */
381    @Deprecated int OP_THROW_VERIFICATION_ERROR     = 0xed;
382
383    /**
384     * Implementation detail.
385     * @deprecated Implementation detail.
386     */
387    @Deprecated int OP_EXECUTE_INLINE               = 0xee;
388
389    /**
390     * Implementation detail.
391     * @deprecated Implementation detail.
392     */
393    @Deprecated int OP_EXECUTE_INLINE_RANGE         = 0xef;
394
395    /**
396     * Implementation detail.
397     * @deprecated Implementation detail.
398     */
399    @Deprecated int OP_INVOKE_DIRECT_EMPTY          = 0xf0;
400
401    /**
402     * Implementation detail.
403     * @deprecated Implementation detail.
404     */
405    @Deprecated int OP_IGET_QUICK                   = 0xf2;
406
407    /**
408     * Implementation detail.
409     * @deprecated Implementation detail.
410     */
411    @Deprecated int OP_IGET_WIDE_QUICK              = 0xf3;
412
413    /**
414     * Implementation detail.
415     * @deprecated Implementation detail.
416     */
417    @Deprecated int OP_IGET_OBJECT_QUICK            = 0xf4;
418
419    /**
420     * Implementation detail.
421     * @deprecated Implementation detail.
422     */
423    @Deprecated int OP_IPUT_QUICK                   = 0xf5;
424
425    /**
426     * Implementation detail.
427     * @deprecated Implementation detail.
428     */
429    @Deprecated int OP_IPUT_WIDE_QUICK              = 0xf6;
430
431    /**
432     * Implementation detail.
433     * @deprecated Implementation detail.
434     */
435    @Deprecated int OP_IPUT_OBJECT_QUICK            = 0xf7;
436
437    /**
438     * Implementation detail.
439     * @deprecated Implementation detail.
440     */
441    @Deprecated int OP_INVOKE_VIRTUAL_QUICK         = 0xf8;
442
443    /**
444     * Implementation detail.
445     * @deprecated Implementation detail.
446     */
447    @Deprecated int OP_INVOKE_VIRTUAL_QUICK_RANGE   = 0xf9;
448
449    /**
450     * Implementation detail.
451     * @deprecated Implementation detail.
452     */
453    @Deprecated int OP_INVOKE_SUPER_QUICK           = 0xfa;
454
455    /**
456     * Implementation detail.
457     * @deprecated Implementation detail.
458     */
459    @Deprecated int OP_INVOKE_SUPER_QUICK_RANGE     = 0xfb;

```

### 反编译
在Android中反编译主要通过dex2jar以及apktool来完成。

（1）使用dex2jar和jd-gui反编译apk
首先将apk解压后提取出classes.dex文件，接着通过dex2jar反编译classes.dex，然后通过jd-gui来打开反编译后的jar包。

（2）使用apktool对apk进行二次打包
使用dex2jar和jd-gui反编译apk，可以将一个dex文件反编译为Java代码，但是它们无法反编译出apk中的二进制数据资源，但是apktool可以做到这一点。此外apktool还可以用于二次打包


## 启动过程

几个概念

* BootROM 它是一个驻留在CPU专用集成电路的硬连线代码
* Bootloader 引导加载程序，它是一个小程序
* Init进程它是Linux内核完成安装后启动的第一个进程

Bootloader可以当做电脑的BIOS，市场上的手机一般上会加锁这个程序。Bootloader锁就是限制用户刷第三方ROM和第三方Recovery以及限制Root的“锁”。

Recovery 更类似于一个小型的管理系统。只不过功能简单，所做的管理有限。在recovery模式下，会加载了部分文件系统，所以才可以读sdcard中的update.zip进行刷机，当然，也可以清除cache和用户数据。

Fastboot 主要是用来与bootloader的USB通讯的PC命令行工具。他一般主要也用来向bootloader传送刷机文件进行文件分区重烧。 因此在使用时，必须有一个PC机并且USB线要始终联着。所以这种方式称为线刷

启动过程如下

![](https://community.nxp.com/t5/image/serverpage/image-id/46742i6BD77ACF9DCC3C8C/image-size/large?v=1.0&px=999)


Bootrom is a small piece of write-protected flash rom memory embedded inside the processor chip. It contains the very first code that is executed by the processor when it powers up or resets.

BootLoader is started by the bootrom, it’s job is to execute any specific setup before starting the Kernel, which literary means to copy os files to working memory.

Kernel will start setup cache, protected memory, scheduling and loads drivers. When kernel finishes system setup first thing it does is look for “init” in system files and launches root process or the first process of the system.

init is a root process, it has two responsibilities, mount directories like /sys, /dev, /proc and run init.rc script that starts among other things native daemons like Service Manager, Media Server etc..

Android runtime is started by init root process with app_process command which tells it to start Art or Dalvik process virtual machine and to call Zygote's main() function.

Art/Dalvik are process virtual machines. Dalvik is used on devices below Lollipop where's it is replaced by Art. The biggest difference between them is that Dalvik uses JIT (just in time) and Art uses AOT (ahead of time) compilation.

Zygote is a special Android OS process that enables shared code across Dalvik/Art VM in contrast with Java VM where each instance has its own copy of core library class files and heap objects.

相比服务端的jvm，android的虚拟机运行模式有很大的区别，会存在共享，这就是Zygote的作用

Zygote进程运行时, 会初始化Dalvik虚拟机, 并运行它. Android的应用程序是由Java编写的, 它们不能直接运行在Linux上, 只能运行在Dalvik虚拟机中. 并且, 每个应用程序都运行在各自的虚拟机中, 应用程序每次运行都要重新初始化并启动虚拟机, 这个过程会消耗相当长时间, 是拖慢应用程序的原因之一. 因此, 在Android中, 应用程序运行前, 通过Zygote进程共享已运行的虚拟机的代码与内存信息, 缩短应用程序运行所耗费的时间. 也就是说, Zygote进程会事先将应用程序要使用的Android Framework中的类与资源加载到内存中, 并组织形成所用资源的链接信息. 这样, 新运行的Android应用程序在使用所需资源时不必每次形成资源的链接信息, 这样就大大提升了程序的运行时间.

Android内部有很多的分区：

* system 分区
* MISC分区
* recovery分区
* boot 分区
* userdata 分区
* cache 分区
* SD卡分区

Android 10 进行了进一步更改来支持动态分区，这是一种可以通过无线下载 (OTA) 更新来创建、销毁分区或调整分区大小的用户空间分区系统。
作为此更改的一部分，Linux 内核无法再在搭载 Android 10 的设备上装载逻辑系统分区，因此该操作由第一阶段的 init 处理。


/system 分区：它是存放所有 Google 提供的 Android 组件的地方。这个分区只能以只读方式 mount。这样主要基于稳定性和安全性考虑，即使发生用户突然断电的情况，也依然需要保证 /system 分区的内容不会受到破坏和篡改。

/data 分区：它是所有用户数据存放的地方。主要为了实现数据隔离，即系统升级和恢复的时候会擦除整个 /system 分区，但是却不会影响 /data 的用户数据。而恢复出厂设置，只会擦除 /data 的数据。

/vendor 分区：它是存放厂商特殊系统修改的地方。特别是在 Android 8.0 以后，隆重推出了“Treble”项目。厂商 OTA 时可以只更新自己的 /vendor 分区即可，让厂商能够以更低的成本，更轻松、更快速地将设备更新到新版 Android 系统。

一个APP的启动过程可以简述如下：

```
Launcher被调用点击事件，转到Instrumentation类的startActivity方法。
Instrumentation通过跨进程通信告诉AMS要启动应用的需求。
AMS反馈Launcher，让Launcher进入Paused状态
Launcher进入Paused状态，AMS转到ZygoteProcess类，并通过socket与Zygote通信，告知Zygote需要新建进程。
Zygote fork进程，并调用ActivityThread的main方法，也就是app的入口。
ActivityThread的main方法新建了ActivityThread实例，并新建了Looper实例，开始loop循环。
同时ActivityThread也告知AMS，进程创建完毕，开始创建Application，Provider，并调用Applicaiton的attach，onCreate方法。
最后就是创建上下文，通过类加载器加载Activity，调用Activity的onCreate方法。
```


## 进程间通信

IPC 是 Inter-Process Communication 的缩写，为进程间或者跨进程通信，是指两个进程之间进行数据交换的过程。在Android中最有特色的进程间通信方式就是 Binder 。

传统的通信方式:

```
1、管道（pipe）：速度慢，容量有限，只有父子进程能通讯。
2、命名管道（FIFO）：任何进程间都能通讯，但速度慢。
3、消息队列：容量受到系统限制，且需要注意第一次读的时候，需要考虑上一次没有读完数据的问题。
4、信号量：不能传递复杂消息，只能用来同步。
5、共享内存：能够很容易控制容量，速度快，但要保持同步。
```

Binder 是基于 C/S 架构的。由一系列的组件组成，包括 Client、 Server、 ServiceManager、 Binder 驱动。其中 Client 、Server 、Service Manager 运行在用户空间，Binder 驱动运行在内核空间。其中 Service Manager 和 Binder 驱动由系统提供，而 Client、 Server 由应用程序来实现。Client、 Server 和 ServiceManager 均是通过系统调用 open、 mmap 和 ioctl 来访问设备文件 /dev/binder，从而实现与 Binder 驱动的交互来间接的实现跨进程通信。

AIDL 意思即 Android Interface Definition Language，翻译过来就是Android接口定义语言，是用于定义服务器和客户端通信接口的一种描述语言，可以拿来生成用于IPC的代码。从某种意义上说AIDL其实是一个模板，因为在使用过程中，实际起作用的并不是AIDL文件，而是据此而生成的一个IInterface的实例代码，AIDL其实是为了避免我们重复编写代码而出现的一个模板

Android 10 添加了对稳定的 Android 接口定义语言 (AIDL) 的支持，这是一种跟踪由 AIDL 接口提供的应用编程接口 (API)/应用二进制接口 (ABI) 的新方法。稳定的 AIDL 与 AIDL 的主要区别如下：

* 在构建系统中使用 aidl_interfaces 定义接口。
* 接口只能包含结构化数据。对于代表所需类型的 Parcelable，系统会根据其 AIDL 定义自动创建，并自动对其进行编组和解组。
* 可以将接口声明为“稳定”接口（向后兼容）。声明之后，会在 AIDL 接口旁的一个文件中对这些接口的 API 进行跟踪和版本编号。


## 消息通信

在整个Android的源码世界里，有两大利剑，其一是Binder IPC机制，，另一个便是消息机制(由Handler/Looper/MessageQueue等构成的)

Android有大量的消息驱动方式来进行交互，比如Android的四剑客Activity, Service, Broadcast, ContentProvider的启动过程的交互，都离不开消息机制，Android某种意义上也可以说成是一个以消息驱动的系统。消息机制涉及MessageQueue/Message/Looper/Handler这4个类。


* Message：消息分为硬件产生的消息(如按钮、触摸)和软件生成的消息；
* MessageQueue：消息队列的主要功能向消息池投递消息(MessageQueue.enqueueMessage)和取走消息池的消息(MessageQueue.next)；
* Handler：消息辅助类，主要功能向消息池发送各种消息事件(Handler.sendMessage)和处理相应消息事件(Handler.handleMessage)；
* Looper：不断循环执行(Looper.loop)，按分发机制将消息分发给目标处理者。

Handler通过sendMessage()发送Message到MessageQueue队列；
Looper通过loop()，不断提取出达到触发条件的Message，并将Message交给target来处理；
经过dispatchMessage()后，交回给Handler的handleMessage()来进行相应地处理。
将Message加入MessageQueue时，处往管道写入字符，可以会唤醒loop线程；如果MessageQueue中没有Message，并处于Idle状态，则会执行IdelHandler接口中的方法，往往用于做一些清理性地工作。


## 工具

### ADB

Android 调试桥 (adb) 是一种功能多样的命令行工具，可让您与设备进行通信。adb 命令可用于执行各种设备操作（例如安装和调试应用），并提供对 Unix shell（可用来在设备上运行各种命令）的访问权限。它是一种客户端-服务器程序，包括以下三个组件：

* 客户端：用于发送命令。客户端在开发计算机上运行。您可以通过发出 adb 命令从命令行终端调用客户端。
* 守护程序 (adbd)：用于在设备上运行命令。守护程序在每个设备上作为后台进程运行。
* 服务器：用于管理客户端与守护程序之间的通信。服务器在开发机器上作为后台进程运行。
* adb 包含在 Android SDK 平台工具软件包中

### Logcat 

Logcat 是一个命令行工具，用于转储系统消息日志，包括设备抛出错误时的堆栈轨迹，以及从您的应用使用 Log 类写入的消息。

Android 日志记录系统是系统进程 logd 维护的一组结构化环形缓冲区。这组可用的缓冲区是固定的，并由系统定义。最相关的缓冲区为：main（用于存储大多数应用日志）、system（用于存储源自 Android 操作系统的消息）和 crash（用于存储崩溃日志）。每个日志条目都包含一个优先级（VERBOSE、DEBUG、INFO、WARNING、ERROR 或 FATAL）、一个标识日志来源的标记以及实际的日志消息。


## AndroidStudio

Android Studio 是用于开发 Android 应用的官方集成开发环境 (IDE)，以 IntelliJ IDEA 为基础构建而成。除了 IntelliJ 强大的代码编辑器和开发者工具，Android Studio 还提供更多可提高 Android 应用构建效率的功能，例如：

* 基于 Gradle 的灵活构建系统
* 快速且功能丰富的模拟器
* 统一的环境（供您开发适用于所有 Android 设备的应用）
* Apply Changes 功能可将代码和资源更改推送到正在运行的应用，而无需重启应用
* 代码模板和 GitHub 集成，可协助您打造常见的应用功能及导入示例代码
* 大量的测试工具和框架
* Lint 工具，能够找出性能、易用性和版本兼容性等方面的问题
* C++ 和 NDK 支持
* 内置对 Google Cloud Platform 的支持，可轻松集成 Google Cloud Messaging 和 App Engine

Android的构建比较复杂，AndroidStudio的开发过程依赖于google内部组件，在推向AOSP之前需要做一次内部组件清除的过程，而这个过程在开源社区没有找到相应的方法，即便推向了 AOSP的分支代码也存在没有清理干净的情况，尝试自己做清理会发生一连串的依赖性错误

早期版本的构建比较简单，能够构建的最大版本是3.2.1

首先需要用Repo工具下载代码

分支地址：https://android.googlesource.com/platform/manifest/+refs

```
需要python3
mkdir ~/bin
PATH=~/bin:$PATH
curl https://storage.googleapis.com/git-repo-downloads/repo > ~/bin/repo
chmod a+x ~/bin/repo
repo init --depth=1 -u https://android.googlesource.com/platform/manifest -b studio-3.0
repo sync
repo forall -vc "git reset --hard"
```

进入到toos/idea目录，执行./build_studio.sh

每一个版本的AndroidStuidio都是Base在某个版本的intellij-community上的，所以我们最好是根据tag找到和时间匹配的版本进行工程调试

1.0版本的代码依赖IDEA 13.1.5，发布于2013年，可以用IDEA13.1.7直接打开tools/idea目录，3.0代码基于2017.1.2 ，可以用IDEA2017.1.6打开，然后进行调试

由于IDEA13.17还没有自带jvm，需要先设置jdk1.6的环境变量

export JAVA_HOME=/home/ubuntu/Downloads/jdk1.6.0_45

启动IDEA打开AndroidStuido源码之后可以直接运行

# 功能开发


## 项目结构

Android项目是由gradle管理的，一般外层放一个文件

```
buildscript {
    repositories {
        jcenter()
        google()
    }
    dependencies {
        classpath 'com.android.tools.build:gradle:3.4.0'    
    }
}

allprojects {
    repositories {
        jcenter()
        google()
    }
}


```
然后里面放应用文件夹，可以是开发app，也可以是开发库


如果是开发库，则gradle写法如下

```
apply plugin: 'com.android.library'

group='com.github.yourpackage'

android {
    compileSdkVersion 28
    buildToolsVersion '28.0.3'
    defaultConfig {
        minSdkVersion 14
        targetSdkVersion 28
        versionCode 3
        versionName '3.1.0'
    }
    buildTypes {
        release {
            minifyEnabled false
            proguardFiles getDefaultProguardFile('proguard-android.txt'), 'proguard-rules.pro'
        }
    }
    testOptions {
        unitTests.returnDefaultValues = true // this prevents "not mocked" error
    }
}

dependencies {
    implementation 'androidx.annotation:annotation:1.0.0'
    testImplementation 'junit:junit:4.12'
}

task sourcesJar(type: Jar) {
    from android.sourceSets.main.java.srcDirs
    classifier = 'sources'
}

task javadoc(type: Javadoc) {
    options.charSet = 'UTF-8'
    failOnError  false
    source = android.sourceSets.main.java.sourceFiles
    classpath += project.files(android.getBootClasspath().join(File.pathSeparator))
}

task javadocJar(type: Jar, dependsOn: javadoc) {
    classifier = 'javadoc'
    from javadoc.destinationDir
}

artifacts {
    archives sourcesJar
    archives javadocJar
}


```

开发应用则是

```
apply plugin: 'com.android.application'

android {
    compileSdkVersion 28
    defaultConfig {
        applicationId "yourpackage"
        minSdkVersion 16
        targetSdkVersion 28
        versionCode 57
        versionName '3.1.0'
        testInstrumentationRunner "androidx.test.runner.AndroidJUnitRunner"
    }

    buildTypes {
        release {
            minifyEnabled false
            proguardFiles getDefaultProguardFile('proguard-android.txt'), 'proguard-rules.pro'
        }
    }
}

dependencies {
    implementation "androidx.appcompat:appcompat:1.0.2"
    implementation 'com.google.android.material:material:1.0.0'
}

```

注意这几个版本设置，影响到手机的运行和API的使用

```
buildToolsVersion
compileSdkVersion
minSdkVersion
maxSdkVersion
targetSdkVersion
```

详细结构如下

```
1、build

    模块编译后的文件存放目录。

2、libs

    模块依赖的jar包存放目录。

3、src/androidTest

    设备化测试代码存放目录。

4、src/main/java

    代码存放目录，该目录等同于Eclipse里面的src目录。

5、src/main/res

    资源文件存放目录，该目录等同于Eclipse里面的res目录，后面详细介绍。

6、src/main/AndroidManifest.xml

    应用程序的基本信息清单，等同于Eclipse中的AndroidManifest.xml文件。

7、src/test

    测试代码存放目录。

8、.gitignore

    模块中Git版本管理忽略文件，标记出哪些文件不用进入git库中。

9、app.iml

    模块配置文件。

10、build.gradle

    模块的gradle构建配置文件。

11、proguard-rules.pro

    代码混淆文件。

    除了上述所描述的文件和文件夹，以后开发过程中可能还会遇到这些：

11、src/main/jniLibs

    so文件存放目录。

12、src/main/assets

    附加的资源文件存放目录，作用同Eclipse中的assets目录。
```




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


一个Activity由于需求的膨胀肯定会变得复杂，很可能里面的部分逻辑是需要在多个Activity中复用的，于是出现了Fragment

Fragment表示Activity中的部分行为或者UI。我们可以将多个framgent组合进一个Activity来构建一个多窗格的UI，一个fragment也能在多个Activity中进行复用。我们可以将fragment理解为Activity的一个模块，它有自己的生命周期，接收自己的输入事件，我们可以在Activity运行时添加或者删除一个fragment。

Fragment必须嵌入到Activity中，且其生命周期会直接被宿主Activity的生命周期影响。


我们至少需要实现以下生命周期方法：

onCreate()
创建Fragment时调用。我们应该初始化Fragment暂停或停止，然后恢复时要保留的必要组件。

onCreateView()
第一次绘制UI时调用。我们在这里要返回fragment布局的根view，如果Fragment不提供UI，可以返回null。


onPause()
用户正在离开fragment时调用，这并不总是意味着Fragment正在被销毁。我们应该在这里提供需要持久化的用户的更改操作，因为用户可能不再回来。


Activity与Fragment之间最重要的不同在于两者在返回栈的保存方式。Activity被放置在由系统管理的返回栈中(More information, see Tasks and Back Stack)。然而，Fragment被放置在由宿主Activity管理的返回栈中。

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


### 清单文件

清单文件需声明以下内容：

应用的软件包名称，其通常与代码的命名空间相匹配。 构建项目时，Android 构建工具会使用此信息来确定代码实体的位置。 打包应用时，构建工具会使用 Gradle 构建文件中的应用 ID 来替换此值，而此 ID 则用作系统和 Google Play 上的唯一应用标识符。了解关于软件包名称和应用 ID 的更多内容。

应用的组件，包括所有 Activity、服务、广播接收器和内容提供程序。 每个组件都必须定义基本属性，例如其 Kotlin 或 Java 类的名称。 清单文件还能声明一些功能，例如其所能处理的设备配置，以及描述组件如何启动的 Intent 过滤器。了解关于应用组件的更多内容。

应用为访问系统或其他应用的受保护部分所需的权限。 如果其他应用想要访问此应用的内容，则清单文件还会声明其必须拥有的权限。 了解关于权限的更多内容。

应用需要的硬件和软件功能，这些功能会影响哪些设备能够从 Google Play 安装应用。了解关于设备兼容性的更多内容。


下表提供 AndroidManifest.xml 文件中所有有效元素的参考文档链接。

```
<action>	向 Intent 过滤器添加操作。
<activity>	声明 Activity 组件。
<activity-alias>	声明 Activity 的别名。
<application>	应用的声明。
<category>	向 Intent 过滤器添加类别名称。
<compatible-screens>	指定与应用兼容的每个屏幕配置。
<data>	向 Intent 过滤器添加数据规范。
<grant-uri-permission>	指定父级内容提供程序有权访问的应用数据的子集。
<instrumentation>	声明支持您监控应用与系统进行交互的 Instrumentation 类。
<intent-filter>	指定 Activity、服务或广播接收器可以响应的 Intent 类型。
<manifest>	AndroidManifest.xml 文件的根元素。
<meta-data>	可以提供给父级组件的其他任意数据项的名称-值对。
<path-permission>	定义内容提供程序中特定数据子集的路径和所需权限。
<permission>	声明安全权限，可用于限制对此应用或其他应用的特定组件或功能的访问。
<permission-group>	为相关权限的逻辑分组声明名称。
<permission-tree>	声明权限树的基本名称。
<provider>	声明内容提供程序组件。
<receiver>	声明广播接收器组件。
<service>	声明服务组件。
<supports-gl-texture>	声明应用支持的一种 GL 纹理压缩格式。
<supports-screens>	声明应用支持的屏幕尺寸，并为大于此尺寸的屏幕启用屏幕兼容模式。
<uses-configuration>	指明应用要求的特定输入功能。
<uses-feature>	声明应用使用的单个硬件或软件功能。
<uses-library>	指定应用必须链接到的共享库。
<uses-permission>	指定为使应用正常运行，用户必须授予的系统权限。
<uses-permission-sdk-23>	指明应用需要特定权限，但仅当应用在运行 Android 6.0（API 级别 23）或更高版本的设备上安装时才需要。
<uses-sdk>	您可以通过整数形式的 API 级别，表示应用与一个或多个版本的 Android 平台的兼容性。
```


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

这里面比较迷惑的是drawable和mipmap：

drawable

```
位图文件（.png、.9.png、.jpg、.gif）或编译为以下可绘制对象资源子类型的 XML 文件：
九宫格（可调整大小的位图）
状态列表
形状
动画可绘制对象
其他可绘制对象
```

mipmap

适用于不同启动器图标密度的可绘制对象文件。


所以注意，启动图标，也就是放在桌面上的图标需要放在mipmap

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

### 应用级开发架构

应用级架构要做到清晰也会需要分层，清洁架构等主题

![](https://fernandocejas.com/assets/img/blog/clean_architecture_evolution_diagram.png)

层次

![](https://fernandocejas.com/assets/img/blog/clean_architecture_evolution_layers.png)

业界探索出了很多模式或组件，比如RxJava，Dagger，ORM等。

对于任何一种思想，我们需要保持独立思考，千万记住这世上没有银弹。然而，一个好软件的架构将帮助我们把代码变得简洁而又健壮，同时易于扩展和维护。

当遇到一个软件问题的时候，你必须要采取的态度：

```
遵循 SOLID 原则；

不要想太多（不把过度设计）；

遵循实用主义；

尽可能地在项目中减少框架依赖。
```


## 构造界面

在底层，界面的绘制使用的是GPU加速，技术是线上有三个东西：

Skia 库，它是一款能在低端设备，如手机呈现高质量的 2D 跨平台图形框架，类似 Chrome、Flutter 内部使用的都是 Skia 库。

OpenGL ES （Embedded Systems）：OpenGL ES 是针对嵌入式设备的 OpenGL 规范的一种变体。Android 支持多个版本的 OpenGL ES API。

Vulkan：它是一个低开销、跨平台的 3D 图形和计算 API。Vulkan 的目标是跨所有平台的高性能实时 3D 图形应用程序，旨在提供更高的性能和更均衡的 CPU / GPU 使用。

Android 7.0 把 OpenGL ES 升级到最新的 3.2 版本的同时，还添加了对 Vulkan 的支持。Vulkan 的设计目标是取代 OpenGL，Vulkan 是一个相当低级别的 API，并且提供并行的任务处理。Vulkan 还能够渲染 2D 图形应用程序。
除了其较低的 CPU 使用率，Vulkan 还能够更好地在多个 CPU 内核之间分配工作。在功耗、多核优化提升绘图调用上有着非常明显的优势。


Android的界面构造一般模式从上往下：

```
状态栏
操作栏
内容区域
导航栏
```
操作栏叫做ActionBar,在Android 3.0之后加入到系统的API当中，它标识了用户当前操作界面的位置，并提供了额外的用户动作、界面导航等功能。使用ActionBar的好处是，它可以给提供一种全局统一的UI界面，使得用户在使用任何一款软件时都懂得该如何操作，并且ActionBar还可以自动适应各种不同大小的屏幕

### 单位

由于android设备的碎片化，市场上各种各样的设备大小不一，像素不一，所以我们要搞清楚很重要的几个单位。

像素px：屏幕上的一个点

分辨率：横纵向上的像素点数DPI

屏幕尺寸：屏幕的对角线的长度，单位是英寸，1英寸=2.54厘米

DPI：dots per inch，一英寸的像素数量

DIP：设备独立像素，device independent pixels的缩写

SP：一般用来设置字体大小，和dp的区别是它可以根据用户的字体大小偏好来缩放。

要在密度不同的屏幕上保留界面的可见尺寸，您必须使用密度无关像素 (dp) 作为度量单位来设计界面。dp 是一个虚拟像素单位，1 dp 约等于中密度屏幕（160dpi；“基准”密度）上的 1 像素。对于其他每个密度，Android 会将此值转换为相应的实际像素数。

将 dp 单位转换为像素单位
在某些情况下，您需要以 dp 表示尺寸，然后将其转换为像素。dp 单位转换为屏幕像素很简单：

px = dp * (dpi / 160)

要针对不同的密度创建备用可绘制位图资源，您应遵循六种主要密度之间的 3:4:6:8:12:16 缩放比。例如，如果您有一个可绘制位图资源，它在中密度屏幕上的大小为 48x48 像素，那么它在其他各种密度的屏幕上的大小应该为：

* 36x36 (0.75x) - 低密度 (ldpi)
* 48x48（1.0x 基准）- 中密度 (mdpi)
* 72x72 (1.5x) - 高密度 (hdpi)
* 96x96 (2.0x) - 超高密度 (xhdpi)
* 144x144 (3.0x) - 超超高密度 (xxhdpi)
* 192x192 (4.0x) - 超超超高密度 (xxxhdpi)



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

```java
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

```
相对定位类似于RelativeLayout的作用
Margins
作用到GONE控件上的Margins
居中和偏移(Bias)
偏移(Bias)
圆形定位
可见性行为
尺寸约束
Widget的尺寸约束
百分比尺寸
链（Chains）
虚拟辅助对象（Virtual Helper objects）
ConstraintSet允许我们通过代码设置一系列约束，除此之外，还能对ConstraintLayout里面的控件做动画。
```


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

底层渲染其实叫做Window

Window表示一个窗口的概念，它存在于Window、Dialog以及Toast中，但是日常开发中并不多见，它可以实现悬浮窗。Window是一个抽象类，其具体实现是PhoneWindow。WindowManager是外界访问Window的入口，Window的具体实现在WindowManagerService中，WindowManager与WindowManagerService之间的交互是一个IPC过程。

Android中所有的视图都是通过Window来呈现的，不管是Activity、Dialog还是Toast，它们的视图实际上都是附加在Window上的，因此Window实际是View的直接管理者。在View的事件分发机制也可以知道，单击事件由Window传递给DecorView，再由DecorView传递给我们的View，就连Activity的设置视图的方法setContentView在底层也是通过Window来实现的。


自定义View注意事项

让View支持wrap_content
直接继承View或ViewGroup的控件，如果不在onMeasure对wrap_content特殊处理，那么wrap_content无法正常使用。


如有必要，让View支持padding
直接继承View的控件，如果不在draw方法中处理paidding，那么padding属性无法起作用。直接继承ViewGroup的控件需要在onMeasure和onLayout中考虑自身的padding和子元素的margin，不然导致失效。

如要需要在View中使用Handler，用post(Runnable)方法代替

View中如果有线程或者动画，需要在适当的时候停止
如果有线程或者动画需要停止时，可以在onDetachedFromWindow中停止。当包含View的Activity退出或者当前View被remove时，View的此方法会回调。与此方法对应的是onAttachedFromWindow。当包含此View的Activity启动时会回调。同时，当View变得不可见时，我们也需要停止，否则有可能会造成内存泄露。


由于界面交互涉及到一个特殊的美学领域，谷歌指定了一个设计准则：Android 用户期望您的应用的外观和行为与平台保持一致。您不仅应当遵循 Material Design 指南来设计视觉和导航模式，还应遵循质量指南，以便确保兼容性、性能和安全性，等等

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


可绘制对象资源
可绘制对象资源是图形的一般概念，是指可在屏幕上绘制的图形，以及可使用 getDrawable(int) 等 API 检索，或应用到拥有 android:drawable 和 android:icon 等属性的其他 XML 资源的图形。可绘制对象包含以下多种类型：

位图文件
位图图形文件（.png、.jpg 或 .gif）。创建 BitmapDrawable。

九宫格文件
具有可伸缩区域的 PNG 文件，支持根据内容调整图像大小 (.9.png)。创建 NinePatchDrawable。

图层列表
管理其他可绘制对象阵列的可绘制对象。这些可绘制对象按阵列顺序绘制，因此索引最大的元素绘制于顶部。创建 LayerDrawable。

状态列表
此 XML 文件用于为不同状态引用不同位图图形（例如，按下按钮时使用不同图像）。创建 StateListDrawable。

级别列表
此 XML 文件用于定义管理大量备选可绘制对象的可绘制对象，每个可绘制对象都配有最大备选数量。创建 LevelListDrawable。

转换可绘制对象
此 XML 文件用于定义可在两种可绘制对象资源之间交错淡出的可绘制对象。创建 TransitionDrawable。

插入可绘制对象
此 XML 文件用于定义以指定距离插入其他可绘制对象的可绘制对象。当视图需要小于视图实际边界的背景可绘制对象时，此类可绘制对象非常有用。

裁剪可绘制对象
此 XML 文件用于定义对其他可绘制对象进行裁剪（根据其当前级别值）的可绘制对象。创建 ClipDrawable。

缩放可绘制对象
此 XML 文件用于定义更改其他可绘制对象大小（根据其当前级别值）的可绘制对象。创建 ScaleDrawable

形状可绘制对象
此 XML 文件用于定义几何形状（包括颜色和渐变）。创建 GradientDrawable。



音频应用的首选架构是客户端/服务器设计。播放器及其媒体会话在 MediaBrowserService 内实现，界面和媒体控制器与 MediaBrowser 一起位于 Android Activity 中。典型的视频播放器在运行期间会一直显示其控件和视频内容；它无法在后台运行或在没有界面的情况下运行。因此，比较合适的做法是将您的应用构建成为单个 Activity，使其包含用户界面、播放器、媒体会话和媒体控制器：
对于音视频开发几个重要的类是

* MediaPlayer
* MediaRecorder
* ExoPlayer

ExoPlayer 的标准音频和视频组件基于 Android 的 MediaCodec API 构建

音频架构图
![](https://source.android.google.cn/devices/audio/images/ape_fwk_audio.png)

Android 框架支持通过 android.hardware.camera2 API 或相机 Intent 捕获图像和视频，相关的类是

* android.hardware.camera2
* Camera
* SurfaceView
* MediaRecorder
* Intent

MediaStore.ACTION_IMAGE_CAPTURE 或 MediaStore.ACTION_VIDEO_CAPTURE 的 Intent 操作类型可用于捕获图像或视频，而无需直接使用 Camera 对象。

视频播放的方式：

使用自带的播放器
使用Intent设置ACTION_VIEW来调用系统的播放器。这种方式播放视频，主要是指定Action为ACTION_VIEW、Data为Uri、Type为MIME类型（MIME类型就是设定某种扩展名的文件用一种应用程序来打开的方式类型，当扩展名文件被访问时，浏览器会自动使用指定应用程序来打开）。

使用VideoView控件播放视频
VideoView控件需要与MediaController类相结合来播放视频。

使用MediaPlayer与SurfaceView播放视频
可以直接从内存或者DMA等硬件接口中取得图像数据，是个非常重要的绘图容器。它可以在主线程之外的线程向屏幕绘图，这样可以避免画图任务繁重时造成主线程阻塞，从而提高了程序的反应速度。
使用MediaPlayer与SurfaceView播放视频的步骤如下：

* 创建MediaPlyer对象，并让其加载指定的视频文件。
* 在布局文件中定义SurfaceView组件，或在程序中创建SurfaceView组件，并为SurfaceView的SurfaceHolder添加Callback监听器。
* 调用MediaPlayer对象的setDisplay()方法将所播放的视频图像输出到指定的SurfaceView组件。
* 调用MediaPlayer对象的start()、stop()、pause()方法控制视频的播放状态。

大多数 Android 设备都有内置传感器，用来测量运动、屏幕方向和各种环境条件。这些传感器能够提供高度精确的原始数据，非常适合用来监测设备的三维移动或定位，或监测设备周围环境的变化。例如，游戏可以跟踪设备重力传感器的读数，以推断出复杂的用户手势和动作，如倾斜、摇晃、旋转或挥动。
同样，天气应用可以使用设备的温度传感器和湿度传感器来计算和报告露点，旅行应用则可以使用地磁场传感器和加速度计来报告罗盘方位。

Android 平台支持三大类传感器：

* 动态传感器
* 环境传感器
* 位置传感器

### 如何存储

Android系统的数据持久化主要有三种方式：即文件存储、SharedPreference存储、数据库存储，此外还可以将数据存入SD卡中。

文件存储不对存储的内容进行任何的格式化处理，所有数据都是原封不动地保存到文件当中，因此适合用于存储一些简单的文本数据或二进制数据。

SharedPreferencds文件是使用XML格式来对数据进行管理的。

数据库存储-SQLite，SQLite是一款轻量级的关系数据库，它的运行速度非常快，占用资源很少，通常只需要几百KB的内存。此外，SQLite不仅支持标准的SQL语法，还遵循了数据库的ACID事务。
Android的SQLite主要用于较大的数据持久化保存，以达到节省客户流量的作用。

### 连接

智能手机的的最大优势是其连接性，根据不同的场景，我们存在非常多的连接方式，比如

* 蓝牙
* 低功耗蓝牙
* NFC
* WIFI
* USB
* SIP 

WiFi、蜂窝网络、蓝牙、NFC 这些都是我们日常经常使用的无线网络类型。

“千兆级 LTE”指的是蜂窝网络在理论上速度可以达到光纤级别的 1Gbps（125MB/s）。虽然基于 4G 标准，但通过MIMO（多输入多输出）、使用载波聚合的LAA等技术，现在已经发展到千兆级 LTE。2020 年我们也即将迎来 5G 的商用，它的理论传输速率可以达到 20Gbps。目前 5G 的标准还没有完全 release

“802.11ac 无线网络”指的是我们经常使用的 WiFi。WiFi 由 IEEE 定义和进行标准化规范，跟任何流行的技术一样，IEEE 也一直在积极地发布新的协议。目前最常用的是802.11ac标准，它的理想速率可以达到 866.7Mbps。

从硬件维度上来看，所有的无线网络都通过基带芯片支持，目前高通在基带芯片领域占据了比较大的优势。之前由于苹果和高通的专利诉讼，iPhone XS 选用了英特尔的基带芯片，但同时也出现大量的用户投诉网络连接异常。

市面上有那么多的无线网络标准和制式，还有双卡双待等各种特色功能，因此基带芯片对技术的要求非常高。随着未来 5G 的商用与普及，国内也会迎来新的一波换机潮。这对各大芯片厂商来说是机遇也是挑战，目前高通、MTK、华为都已经发布了 5G 基带芯片



由于连接本质上的复杂度，一般来说我们都是基于某个框架或者库来开发，Volley 是一个可让 Android 应用更轻松快捷地联网的 HTTP 库，Cronet 是 Chromium 网络堆栈，可作为库提供给 Android 应用
gRPC 是一种可在任何环境中运行的现代开源高性能 RPC 框架。借助可插拔支持，它可以在数据中心内和跨数据中心高效地连接服务，以实现负载平衡、跟踪、运行状况检查和身份验证

当有了网络连接之后，我们会得到另外一个强大UI构造模式，那就是WebView，这样把要显示得内容完全通过网络来传输控制，但是会丧失本地渲染对象得绝佳性能。


```
    <WebView
        android:id="@+id/webview"
        android:layout_width="match_parent"
        android:layout_height="match_parent"
    />
    
```

```java

    WebView myWebView = (WebView) findViewById(R.id.webview);
    myWebView.loadUrl("http://www.example.com");
    
```



## NDK开发

原生开发套件 (NDK) 是一套工具，使您能够在 Android 应用中使用 C 和 C++ 代码，并提供众多平台库，您可使用这些平台库管理原生 Activity 和访问实体设备组件，例如传感器和触摸输入。
NDK 可能不适合大多数 Android 编程初学者，这些初学者只需使用 Java 代码和框架 API 开发应用。然而，如果您需要实现以下一个或多个目标，那么 NDK 就能派上用场：

进一步提升设备性能，以降低延迟或运行游戏或物理模拟等计算密集型应用。
重复使用您自己或其他开发者的 C 或 C++ 库。
您可以在 Android Studio 2.2 或更高版本中使用 NDK 将 C 和 C++ 代码编译到原生库中，然后使用 Android Studio 的集成构建系统 Gradle 将原生库打包到 APK 中。Java 代码随后可以通过 Java 原生接口 (JNI) 框架调用原生库中的函数。如需详细了解 Gradle 和 Android 构建系统，请参阅配置您的版本。

Android Studio 编译原生库的默认构建工具是 CMake。由于很多现有项目都使用 ndk-build 构建工具包，因此 Android Studio 也支持 ndk-build。不过，如果您要创建新的原生库，则应使用 CMake。

如需为您的应用编译和调试原生代码，您需要以下组件：

* Android 原生开发套件 (NDK)：这套工具使您能在 Android 应用中使用 C 和 C++ 代码。
* CMake：一款外部构建工具，可与 Gradle 搭配使用来构建原生库。如果您只计划使用 ndk-build，则不需要此组件。
* LLDB：Android Studio 用于调试原生代码的调试程序。


### 常用组件

```
okhttp
retrofit
dagger
EventBus
热修复框架 tinker
volley
android-async-http
Picasso
Glide
Fresco
RxPermissions
Jsoup
Gson
```

另外有一些黑科技，比如Xposed也可以玩一下


# 非功能性



一般来说，我们会关注一个程序的功能部分，其实非功能部分占据了一个产品级应用的比重非常大，为什么呢？因为这里包含了我们不能做什么的教训。

通过遵循最佳实践，我们会得到一个可以工作的APP，可是要发布这个APP，必须配套下面的各种操作

## 测试

测试应用是应用开发过程中不可或缺的一部分。通过持续对应用运行测试，您可以在公开发布应用之前验证其正确性、功能行为和易用性。测试还会为您提供以下优势：

* 快速获得故障反馈。
* 在开发周期中尽早进行故障检测。
* 更安全的代码重构，让您可以优化代码而不必担心回归。
* 稳定的开发速度，帮助您最大限度地减轻技术负担。

务必考虑随着设计新功能而出现的责任单元。对于每个单元，您需要编写相应的单元测试。您的单元测试应几乎囊括与单元的所有可能的互动，包括标准互动、无效输入以及资源不可用的情况。
应尽可能利用 Jetpack 库；当您使用这些经过充分测试的库时，您可以专注于验证您的应用特有的行为。

Android Studio 中的典型项目包含两个用于放置测试的目录。请按以下方式组织整理您的测试：

* androidTest 目录应包含在真实或虚拟设备上运行的测试。此类测试包括集成测试、端到端测试，以及仅靠 JVM 无法完成应用功能验证的其他测试。
* test 目录应包含在本地计算机上运行的测试，如单元测试。


测试金字塔说明了应用应如何包含三类测试（即小型、中型和大型测试）：

小型测试是指单元测试，用于验证应用的行为，一次验证一个类。
中型测试是指集成测试，用于验证模块内堆栈级别之间的互动或相关模块之间的互动。
大型测试是指端到端测试，用于验证跨越了应用的多个模块的用户操作流程。

小型测试占 70%，中型测试占 20%，大型测试占 10%。

尽可能使用 AndroidX Test API，以便您的单元测试可以在设备或模拟器上运行。对于始终在由 JVM 驱动的开发计算机上运行的测试，您可以使用 Robolectric
用 Espresso-Intents 库中的方法。如需简化传入这些测试的信息，请使用虚假对象和打桩。运行插桩中型测试时使用 Espresso
最好在模拟设备或基于云的服务（如 Firebase 测试实验室）上而不是在物理设备上测试您的应用，因为这样您可以更方便快捷地测试屏幕尺寸和硬件配置的多种组合。

使用 Truth 创建更容易读懂的断言，Guava 团队提供了一个名为 Truth 的流利断言库。在构建测试的验证步骤（或 then 步骤）时，您可以使用此库来代替基于 JUnit 或 Hamcrest 的断言。
Espresso 可让您以编程方式且以线程安全的方式找到应用中的界面元素并与之互动。要了解详情，请参阅 Espresso 指南。通过 UI Automator API，您可以与设备上的可见元素进行互动，而不管获得焦点的是哪个 Activity 或 Fragment。

## 性能

有了测试的覆盖，我们保证了功能的正确性，可是不能保证性能，性能领域我们会有非常多的理论来衡量，可是站在用户角度无外乎

* 耗电少。
* 启动快。
* 对用户互动响应迅速。

这里面有些名词：

* 如果 Android 应用的界面线程处于阻塞状态的时间过长，会触发“应用无响应”(ANR) 错误
* 未处理的异常或信号导致的意外退出，会使 Android 应用崩溃
* 冻结的帧是渲染时间超过 700ms 的界面帧

Android Vitals 是 Google 推出的一项计划，旨在改善 Android 设备的稳定性和性能，开发者必须留意的 Android Vitals 核心指标：崩溃率、ANR 发生率、唤醒次数过多以及唤醒锁定被卡住等指标。

应用有三种启动状态，每种状态都会影响应用向用户显示所需的时间：冷启动、温启动或热启动。在冷启动中，应用从头开始启动。在另外两种状态中，系统需要将后台运行的应用带入前台。建议您始终在假定冷启动的基础上进行优化。这样做也可以提升温启动和热启动的性能。


### 谨慎使用线程

很多性能问题是程序员没有正确理解线程模型导致的，善于在 Android 上利用线程可以帮助您提升应用的性能，当用户启动您的应用时，Android 会创建新的 Linux 进程以及执行线程。这个主线程也称为界面线程，负责屏幕上发生的一切活动。了解其工作原理有助于您通过设计让应用利用主线程实现最佳性能。

应用执行的任何代码块几乎都与事件回调（例如输入、布局扩充或绘制）相关联。当某个操作触发事件时，发生了事件的线程会将事件从线程本身里推送到主线程的消息队列中。然后，主线程可以为事件提供服务。

 ANR的本质:

当有动画或屏幕更新正在进行时，系统会每隔 16ms 左右尝试执行一个工作块（负责绘制屏幕），从而以每秒 60 帧的流畅速度进行渲染。要使系统达到此目标，界面/视图层次结构必须在主线程上更新。但是，如果主线程的消息队列中的任务太多或太长，导致主线程无法足够快地完成更新，那么应用应将此工作移至工作线程。如果主线程无法在 16ms 内执行完工作块，则用户可能会察觉到卡顿、延迟或界面对输入无响应。 
如果主线程阻塞大约 5 秒，系统会显示“应用无响应”(ANR) 对话框，允许用户直接关闭应用。

卡顿的一些可能原因：

```
人为在UI线程中做轻微耗时操作，导致UI线程卡顿；
布局Layout过于复杂，无法在16ms内完成渲染；
同一时间动画执行的次数过多，导致CPU或GPU负载过重；
View过度绘制，导致某些像素在同一帧时间内被绘制多次，从而使CPU或GPU负载过重；
View频繁的触发measure、layout，导致measure、layout累计耗时过多及整个View频繁的重新渲染；
内存频繁触发GC过多（同一帧中频繁创建内存），导致暂时阻塞渲染操作；
冗余资源及逻辑等导致加载和执行缓慢；
ANR；
```

关于为什么是16ms和60帧：

由于人类眼睛特殊的生理结构，并不像相机那样有图像快照送到大脑；相反，大脑在不停地处理眼睛传递给他的视觉信号，所以对于人类的大脑来说并没有帧或者快照的概念，人类眼睛对于运动的概念来自于静止的帧。


12 fps：每秒达到 10 ~ 12 帧以上才可以被感知到运动及变化，但是这样的速率是非常不流畅的，只有帧率超过每秒 24 帧的时候，才会被察觉为流畅的运动及变化。

24fps：每秒 24 帧在电影界是黄金标准，24 帧的速度足够使画面运动的非常流畅，而且 24 帧的电影预算也能满足成本的要求，这也是为什么在过去的 50 年里，绝大多数的电影都使用 24 帧每秒的速率。


现在，每秒 30 帧对于电影来说绰绰有余，但是对于那些复杂绚丽的电影特效，它的视觉效果还是难以令人信服。


60fps：实际上每秒 60fps 的速度才是真正的黄金标准，60 帧的速度非常流畅，绝大多数人都察觉不到比 60 帧还高的视觉体验。

Android 系统每间隔 16ms 发出一次 VSYNC 信号，触发对 UI 的渲染任务；为了能够实现流畅的画面，这就意味着应该始终让应用保持在 60 帧每秒，即每帧工作的准备时间仅有 16ms。



Android 视图对象不是线程安全的。无论是创建、使用还是销毁界面对象，应用都应在主线程上完成。如果您尝试在主线程以外的其他线程中修改甚至引用界面对象，则可能导致异常、无提示故障、崩溃以及其他未定义的异常行为。

对于需要快速将工作从主线程移动到工作线程的应用来说，AsyncTask 类是一个简单实用的基元。例如，输入事件可能会触发使用加载的位图更新界面的需求。AsyncTask 对象可以将位图加载和解码分流到备用线程；处理完成后，AsyncTask 对象可以设法回到主线程上接收工作以更新界面。

在使用 AsyncTask 时，请注意以下几个性能方面的要点。首先，默认情况下，应用会将其创建的所有 AsyncTask 对象推送到单个线程中。因此，它们按顺序执行，而且与主线程一样，特别长的工作数据包可能会阻塞队列。鉴于这个原因，我们建议您仅使用 AsyncTask 处理持续时间短于 5ms 的工作项。


虽然 AsyncTask 很有用，但对您的线程处理问题来说，它可能并不一定是正确的解决方案。相反，您可能需要采用更传统的方法在更长时间运行的线程上执行工作块，并且能够手动管理该工作流。


### 线程池

某些类型的工作可以简化为高度并行的分布式任务。例如，为 800 万像素图片的每个 8x8 块计算滤镜就是这样的一个任务。鉴于这会创建大量的工作数据包，AsyncTask 和 HandlerThread 类并不合适。具有单线程处理特性的 AsyncTask 会将所有线程池化的工作转化为一个线性系统。另一方面，使用 HandlerThread 类需要程序员在一组线程之间手动实现负载平衡。

ThreadPoolExecutor 是一个可简化此过程的辅助类。这个类可用于管理一组线程的创建，设置其优先级，并管理工作在这些线程之间的分布情况。随着工作负载的增减，该类会创建或销毁更多线程以适应工作负载。

该类还可帮助您的应用生成最佳数量的线程。构造 ThreadPoolExecutor 对象时，应用会设置最小和最大线程数。随着 ThreadPoolExecutor 上的工作负载不断增加，该类会考虑初始化的最小和最大线程计数，并考虑待处理工作量。ThreadPoolExecutor 根据这些因素决定在任何特定时间应保留多少线程。

ThreadPoolExecutor是线程池的真正实现，它的构造方法提供了一系列参数来配置线程池，下面这个参数是常用的：

```java
public ThreadPoolExecutor(int corePoolSize,
                          int maximumPoolSize,
                          long keepAliveTime,
                          TimeUnit unit,
                          BlockingQueue<Runnable> workQueue)
```

corePoolSize
线程池的核心线程数。核心线程会一直存活，即使它们处于闲置状态，除非设置allowCoreThreadTimeOut

maximumPoolSize
线程池中允许存在的最大线程数

keepAliveTime
当线程数量超过核心线程数量时，允许闲置线程等待新任务的时长

unit
keepAliveTime参数的时间单位。常用的有MILLISECONDS、SECONDS、MINUTES等

workQueue
线程池中任务队列。该队列将只保存通过execute方法提交的Runnable对象。

ThreadPoolExecutor执行任务时大致遵循以下规则：

```
如果线程池中的线程数量未达到核心线程的数量，那么会直接启动一个核心线程来执行任务。
如果线程池中的线程数量已经达到或者超过了核心线程的数量，那么任务会被插入到队列中排队等待执行。
如果无法插入到队列中，这说明任务队列已满。这时候如果线程未达到线程池规定的最大值，那么会立刻启动一个非核心线程来执行任务。
如果步奏3中的线程数量已经达到了线程池规定的最大值，那么就会拒绝执行此任务，线程池会调用RejectedExecutionHandler#rejectedExecution来通知调用者。
```


您应该创建多少线程？
尽管在软件层面上，您的代码可以创建数百个线程，但这样做会导致性能问题。您的应用与后台服务、渲染程序、音频引擎、网络等共享有限的 CPU 资源。CPU 实际上只能并行处理少量线程；一旦超限便会遇到优先级和调度问题。因此，务必要根据工作负载需求创建合适数量的线程。

实际操作起来，这一决定取决于很多变量，但是可以选择一个值（例如首先选择 4 个），并使用 Systrace 进行测试，这个策略跟任何其他策略一样可靠。您可以采用试错法得出最少要将线程数减至多少才不至于遇到问题。

在决定创建多少个线程时，还需要考虑到线程不是免费的，它们会占用内存。每个线程至少需要占用 64k 内存。设备上安装的众多应用会使这一数字迅速累加，特别是在调用堆栈显著扩大的情况下。

许多系统进程和第三方库经常会创建自己的线程池。如果您的应用可以重复使用现有线程池，则可以减少内存和处理资源争用，从而帮助提高性能。

### 内存管理

Android 运行时 (ART) 和 Dalvik 虚拟机使用分页和内存映射来管理内存。这意味着应用修改的任何内存，无论修改的方式是分配新对象还是轻触内存映射的页面，都会一直驻留在 RAM 中，并且无法换出。要从应用中释放内存，只能释放应用保留的对象引用，使内存可供垃圾回收器回收。
这种情况有一个例外：对于任何未经修改的内存映射文件（如代码），如果系统想要在其他位置使用其内存，可将其从 RAM 中换出

Android 的内存堆是分代的，这意味着它会根据分配对象的预期寿命和大小跟踪不同的分配存储分区。例如，最近分配的对象属于“新生代”。当某个对象保持活动状态达足够长的时间时，可将其提升为较老代，然后是永久代。

尽管垃圾回收速度非常快，但仍会影响应用的性能。通常情况下，您无法从代码中控制何时发生垃圾回收事件。系统有一套专门确定何时执行垃圾回收的标准。当条件满足时，系统会停止执行进程并开始垃圾回收。如果在动画或音乐播放等密集型处理循环过程中发生垃圾回收，则可能会增加处理时间，进而可能会导致应用中的代码执行超出建议的 16ms 阈值，无法实现高效、流畅的帧渲染。


为了维持多任务环境的正常运行，Android 会为每个应用的堆大小设置硬性上限。不同设备的确切堆大小上限取决于设备的总体可用 RAM 大小。如果您的应用在达到堆容量上限后尝试分配更多内存，则可能会收到 OutOfMemoryError。


## 性能跟踪

性能如何度量和跟踪呢？Android 平台提供了多种不同的跟踪信息获取途径：

* Android Studio CPU 性能剖析器
* “系统跟踪”应用
* Systrace 命令行工具
* Perfetto 命令行工具

早期还存在一个方案是Traceview ，但是不建议使用

国内微信的方案：Matrix 是一款微信研发并日常使用的 APM (Application Performance Manage) ，当前主要运行在 Android 平台上。Matrix 的目标是建立统一的应用性能接入框架，通过对各种性能 监控方案快速集成，对性能监控项的异常数据进行采集和分析，输出相应问题的分析、定位与优化建议，从而帮助开发者开发出更高质量的应用。

Facebook 的 Profilo

腾讯的 Matrix

有一些性能跟踪工具或者说APM用到了编译器修改字节码技术：

Android Gradle 1.5 版本后提供的 Transform 机制, 它允许第三方的 Plugin 插件在 .class 文件打包成 dex 之前进行动态修改，这就为动态修改字节码文件提供了入口，衍生出很多“插桩”的功能，比如埋点、插入日志等。

## 性能提示

功能部分我可以通过测试来定性，但是性能部分我们大部分人都会想当然，什么是事实，什么是表象需要沉着冷静的分析各种环境因素。

注意：选择正确的算法和数据结构应始终是您的首要任务。

编写高效代码有两个基本规则：

* 不需要做的工作就不要做。
* 如果可以避免，就不要分配内存。


通常并不能简单地用一句话“设备 X 比设备 Y 快/慢 F 倍”概括.

```
不同版本的虚拟机会在不同的处理器上以不同的速度运行
不能把由一台设备产生的结果扩展到其他设备上
在模拟器上得出的测量结果很难说明在任何设备上的性能
有 JIT 的设备和没有 JIT 的设备之间也存在巨大差异
最适合有 JIT 的设备的代码并不一定最适合没有 JIT 的设备
```

不要做的事情

```
避免创建不必要的对象
静态优先于虚拟
使用增强型 for 循环语法
对于私有内部类，考虑使用包访问权限，而非私有访问权限
避免使用浮点数
了解和使用库
谨慎使用原生方法
```

通常我们所认为的可能也是错的，比如：

```
使用 Android NDK 利用原生代码开发应用不一定比使用 Java 语言编程更高效。首先，Java-原生转换存在一定的成本，并且 JIT 无法在这些范围外进行优化。如果您要分配原生资源（原生堆上的内存、文件描述符或任何其他元素），那么安排对这些资源进行及时回收就可能会困难得多。
您还需要针对要在其中运行的每个架构编译代码（而非依赖于其有 JIT）。您可能还需要为您认为相同的架构编译多个版本：为 G1 中的 ARM 处理器编译的原生代码无法充分利用 Nexus One 中的 ARM，而为 Nexus One 中的 ARM 编译的代码也无法在 G1 中的 ARM 上运行。
```

所以我们应该始终衡量性能

## 性能优化

主要内容包括

```
布局优化
绘制优化
内存优化
响应速度优化
ListView优化
Bitmap优化
线程优化等等
```

布局优化的思想就是尽量减少布局文件的层次。布局优化的外一种手段是采用include、merge标签和ViewStub。

绘制优化的分为两部分，一部分是避免过度绘制，另一部分指View#onDraw方法要避免执行大量的操作。

造成的内存泄漏的一些情况
```
集合类内存泄露
集合类添加元素后，将会持有元素对象的引用，导致该元素对象不能被垃圾回收，从而发生内存泄漏。
属性动画导致的内存泄漏
属性动画中有一类无限循环的动画，如果Activity中播放此类动画且没有在onDestory方法中去停止动画，那么动画会一直播放下去。我们需要在Activity#onDestory中调用animator.cancel()方法来停止动画。
网络、文件等流忘记关闭
手动注册广播时，退出时忘记unregisterReceiver()
Service执行完后忘记stopSelf()
EventBus等观察者模式的框架忘记手动解除注册
```


## 安全

功能和性能没有问题了，那么剩下的就是安全性，这里面包括非常多的细节。

Android 内置了安全功能，可显著降低应用出现安全问题的频率及其造成的影响。系统已经过精心设计，因此一般情况下，您只需要使用默认系统和文件权限即可打造自己的应用，无需费心在安全性方面做出艰难决策。
可以借助以下核心安全功能打造安全应用：

* Android 应用沙盒，可将您的应用数据和代码执行与其他应用分隔开来。
* 一个应用框架，可稳健实现常见的安全性功能，例如加密、权限和安全 IPC。
* ASLR、NX、ProPolice、safe_iop、OpenBSD dlmalloc、OpenBSD calloc 和 Linux mmap_min_addr 等多项技术，可降低与常见内存管理错误相关的风险。
* 加密的文件系统，启用后可保护丢失或被盗设备上的数据。
* 用户授予的权限，可用来限制对系统功能和用户数据的使用。
* 应用定义的权限，可针对各个应用分别控制应用数据。

数据存储我们需要注意三个地方

* 内部存储
* 外部存储
* 内容提供程序

网络通信上要通过证书安全连接，注意webview的安全问题，比如跨站脚本。

为了更安全地读取和写入本地文件，请使用 Security 库。


如果您发现需要实现自己的协议，则不应实现您自己的加密算法。请使用现有加密算法，例如 Cipher 类中提供的 AES 和 RSA 实现。此外，您应遵循以下最佳做法：

* 将 256 位 AES 用于商业用途（如果不可用，请使用 128 位 AES）。
* 使用 224 位或 256 位公钥大小进行椭圆曲线 (EC) 加密。
* 知道何时使用 CBC、CTR 或 GCM 分块模式。
* 在 CTR 模式下避免重复使用 IV/计数器。确保它们是随机加密的。
* 使用加密时，通过下列函数之一使用 CBC 或 CTR 模式实现完整性：
* HMAC-SHA1
* HMAC-SHA-256
* HMAC-SHA-512
* GCM 模式
* 使用安全随机数生成器 SecureRandom 来初始化 KeyGenerator 生成的任意加密密钥。如果使用的密钥不是安全随机数生成器生成的，那么会显著降低算法的强度，而且容易导致离线攻击。

如果您需要存储密钥以供重复使用，请使用 KeyStore 等可以长期存储和检索加密密钥的机制。

Android 有两种设备加密方法：全盘加密和文件级加密。全盘加密是在 Android 4.4 中引入的，并在 Android 5.0 中默认打开。它会将 /data 分区的用户数据操作加密 / 解密，对性能会有一定的影响，但是新版本的芯片都会在硬件中提供直接支持。

我们知道，基于文件系统的加密，如果设备被解锁了，加密也就没有用了。所以 Android 7.0 增加了基于文件的加密。在这种加密模式下，将会给每个文件都分配一个必须用用户的 passcode 推导出来的密钥。特定的文件被屏幕锁屏之后，直到用户下一次解锁屏幕期间都不能访问。

数据库的安全主要有两个方面，一个是防注入，一个是加密。防注入可以通过静态安全扫描的方式，而加密一般会使用 SQLCipher 支持。

SQLite 的加解密都是以页为单位，默认会使用 AES 算法加密，加 / 解密的耗时跟选用的密钥长度有关