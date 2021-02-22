---
layout: article
title:  安卓记事
---

我做了10年的基于web的后端研发，没有想过可能和安卓有交集，新的工作让我进入这个领域，最大的感受依然不变，我们需要对每个知识领域保持敬畏，因为深入到细节层面，或者可靠性层面，唯有敬畏之心
方可对复杂性有认识，不存在技术领域有高低贵贱之分，微尘出大千，一个小小的程序都可以洞见大大的世界。


作为一个2003年起步的操作系统，算下来快要20年了，20年是足以让一个领域变得成熟，成熟就会变得庞大，庞大的后果就是我们觉得每个个体都好弱小，几年的光阴都在一小块天地里挣扎，谷歌在在收购安卓之后，直到2008年左右才开始把系统推向市场，如果考究这个系统
对比IOS，后者历史则更为厚重，是从Mac Book操作系统上阉割出来的，智能手机操作系统的最大的推动者还是乔布斯。


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


首先我们从系统的相对比较底层的组件开始，然后才开始从功能开发和非功能开发两个部分来描述。


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

然后就是Android Studio的历史

* Android Studio v0.1.x（2013 年 5 月）
* Android Studio v1.0（2014 年 12 月）
* 2.0（2016 年 4 月）
* 3.0（2017 年 10 月）
* 3.6（2020 年 2 月）
* 4.0（2020 年 5 月）

早期Android的速度比较慢，于是在4.1的时候谷歌启动了黄油计划提升性能，后台又在各个版本做了安全，性能，瘦身，续航等优化。
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

然后用JNI技术在jvm上构造了java语言和C++库的桥，然后封装了一套java API的框架，图形引擎使用Skia，web部分使用Webkit，但并不是所有APP都可以用Java来写，所以还提供了一套底层的NDK。

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


## 编译打包

前面提到了Android的内库是取自JDK，但是字节码结构和虚拟机是重新实现的，同样一段代码，字节码格式是不一样的

![](https://miro.medium.com/max/700/1*sRkZebFFMiuSa-tXfmBOIA.png)

![](https://miro.medium.com/max/700/1*g50YUoPcBFT-I4Cv8KrDaw.png)

从源文件是如何编译成一个APK的呢？编译过程还是复用了javac，javac产生的字节码会经过混淆器R8，D8编译器的处理成dex文件，D8的工作还包含一部分脱糖工作，这样能让我们使用java8的语法。

![](https://miro.medium.com/max/700/1*APXAk8JFCdcfOPTpCD7SeQ.png)

这个过程的全貌可以用这个图来表达

![](https://miro.medium.com/max/1000/1*2wsimRFo3i2Ro-Fcpb_kyA.png)

AAPT2（Android 资源打包工具）是一种构建工具，Android Studio 和 Android Gradle 插件使用它来编译和打包应用的资源。AAPT2 会解析资源、为资源编制索引，并将资源编译为针对 Android 平台进行过优化的二进制格式。

### 字节码

标准Java的栈结构字节码是8位字节码，Android虚拟机字节码是16位字节码，传统的Java字节码class文件中包含了很多冗余的数据，Dalvik对冗余的数据进行了精简压缩，从而减小体积。

机器模型和调用规范旨在大致模仿常见的真实架构和 C 样式的调用规范

* 机器基于寄存器，而帧的大小在创建时确定后就固定不变。每一帧由特定数量的寄存器（由相应方法指定）以及执行该方法所需的所有辅助数据构成，例如（但不限于）程序计数器和对包含该方法的 .dex 文件的引用。
* 当用于位值（例如整数和浮点数）时，寄存器会被视为宽度为 32 位。如果值是 64 位，则使用两个相邻的寄存器。对于寄存器对，没有对齐要求。
* 当用于对象引用时，寄存器会被视为其宽度正好能够容纳一个此类引用。
* 对于按位表示，(Object) null == (int) 0。
* 如果一个方法有 N 个参数，则在该方法的调用帧的最后 N 个寄存器中按顺序传递这些参数。宽参数占用两个寄存器。向实例方法传入一个 this 引用作为其第一个参数。

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


## 进程间通信

PC 是 Inter-Process Communication 的缩写，为进程间或者跨进程通信，是指两个进程之间进行数据交换的过程。在Android中最有特色的进程间通信方式就是 Binder 。

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



大多数 Android 设备都有内置传感器，用来测量运动、屏幕方向和各种环境条件。这些传感器能够提供高度精确的原始数据，非常适合用来监测设备的三维移动或定位，或监测设备周围环境的变化。例如，游戏可以跟踪设备重力传感器的读数，以推断出复杂的用户手势和动作，如倾斜、摇晃、旋转或挥动。
同样，天气应用可以使用设备的温度传感器和湿度传感器来计算和报告露点，旅行应用则可以使用地磁场传感器和加速度计来报告罗盘方位。

Android 平台支持三大类传感器：

* 动态传感器
* 环境传感器
* 位置传感器


### 连接

智能手机的的最大优势是其连接性，根据不同的场景，我们存在非常多的连接方式，比如

* 蓝牙
* 低功耗蓝牙
* NFC
* WIFI
* USB
* SIP 

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


Android 视图对象不是线程安全的。无论是创建、使用还是销毁界面对象，应用都应在主线程上完成。如果您尝试在主线程以外的其他线程中修改甚至引用界面对象，则可能导致异常、无提示故障、崩溃以及其他未定义的异常行为。

对于需要快速将工作从主线程移动到工作线程的应用来说，AsyncTask 类是一个简单实用的基元。例如，输入事件可能会触发使用加载的位图更新界面的需求。AsyncTask 对象可以将位图加载和解码分流到备用线程；处理完成后，AsyncTask 对象可以设法回到主线程上接收工作以更新界面。

在使用 AsyncTask 时，请注意以下几个性能方面的要点。首先，默认情况下，应用会将其创建的所有 AsyncTask 对象推送到单个线程中。因此，它们按顺序执行，而且与主线程一样，特别长的工作数据包可能会阻塞队列。鉴于这个原因，我们建议您仅使用 AsyncTask 处理持续时间短于 5ms 的工作项。


虽然 AsyncTask 很有用，但对您的线程处理问题来说，它可能并不一定是正确的解决方案。相反，您可能需要采用更传统的方法在更长时间运行的线程上执行工作块，并且能够手动管理该工作流。


### 线程池

某些类型的工作可以简化为高度并行的分布式任务。例如，为 800 万像素图片的每个 8x8 块计算滤镜就是这样的一个任务。鉴于这会创建大量的工作数据包，AsyncTask 和 HandlerThread 类并不合适。具有单线程处理特性的 AsyncTask 会将所有线程池化的工作转化为一个线性系统。另一方面，使用 HandlerThread 类需要程序员在一组线程之间手动实现负载平衡。

ThreadPoolExecutor 是一个可简化此过程的辅助类。这个类可用于管理一组线程的创建，设置其优先级，并管理工作在这些线程之间的分布情况。随着工作负载的增减，该类会创建或销毁更多线程以适应工作负载。

该类还可帮助您的应用生成最佳数量的线程。构造 ThreadPoolExecutor 对象时，应用会设置最小和最大线程数。随着 ThreadPoolExecutor 上的工作负载不断增加，该类会考虑初始化的最小和最大线程计数，并考虑待处理工作量。ThreadPoolExecutor 根据这些因素决定在任何特定时间应保留多少线程。

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