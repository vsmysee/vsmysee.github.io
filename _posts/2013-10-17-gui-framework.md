---
layout: article
title: GUI编程框架的思考
---


GUI，用户界面，对于终端用户非常重要，它已经延伸到心理学，美学等领域, 即便是程序员自己，对于哪个工具的GUI是否做的优秀也还比较挑剔。

记得上大学的适合，用过汇编语言写了一个windows程序hello wolrd，即便这个小小小的程序都写了大量的代码，窗口句柄，消息循环等等概念都要熟悉，然后开始接触QT,MFC，他们必然会比汇编高端，但是
也很繁琐。

这是MFC的hello world,代码来自网络，无责任copy

{% highlight c++ %}
#include <afxwin.h>
// 说明应用程序类
class CHelloApp : public CWinApp
{
   public:  
      virtual BOOL InitInstance();
};
// 建立应用程序类的实例
CHelloApp HelloApp;
// 说明主窗口类
class CHelloWindow : public CFrameWnd
{
    CStatic* cs;
    public:
        CHelloWindow();
};
// 每当应用程序首次执行时都要调用的初始化函数
BOOL CHelloApp::InitInstance()
{
    m_pMainWnd = new CHelloWindow();
    m_pMainWnd->ShowWindow(m_nCmdShow);
    m_pMainWnd->UpdateWindow();
    return TRUE;
}
// 窗口类的构造函数
CHelloWindow::CHelloWindow()
{
    // 建立窗口本身
    Create(NULL,
           "Hello World!",
           WS_OVERLAPPEDWINDOW,
           CRect(0,0,200,200));
    // 建立静态标签
    cs = new CStatic();
    cs->Create("hello world",
               WS_CHILD|WS_VISIBLE|SS_CENTER,
               CRect(50,80,150,150),
               this);
}
{% endhighlight %}


这是QT的hello world

{% highlight c++ %}
#include <QApplication>
#include <QPushButton>
int main(int argc, char *argv[])
{
	QApplication app(argc, argv);
	QPushButton hello("Hello world!");
	hello.show();
	return app.exec();
}
{% endhighlight %}

相比之下,QT要简单了些。

是的，面向对象的一大重要应用领域就是GUI，我们可以非常直观的得到Window,Button,Panel，然后这些对象存在继承和抽象，可是编程的繁琐一直存在。

到了Java时代，情况稍微好点，当我在学SWT和Swing的时候明显比QT，MFC要容易，编译容易，运行容易，生产力稍微解放了一些，但是程序本质也还是在new Window,new JFrame等。

计算机本质是抽象，如果把MFC,QT等这一批编程模型视为命令式编程，那么应该还对应一个声明式的UI编程，通过声明式可以把大量的非逻辑代码抽离出去，于是html出现了，我们通过声明式的html+函数式的js解放了繁琐的命令式，画画式的
GUI编程，这种编程把大量的工作转移到了浏览器或者解释器，挺好，可是在不熟悉html的人来说，html又显得很繁琐，特别是还有一个css，css也是声明式的，这个时候extjs出现了，它又把我们拉回了QT,MFC,SWT的时代，只不过这个时候要高级一点，
它跨平台，运行在更加抽象的浏览器中。

桌面到浏览器，现在又到了移动计算时代，UI编程变得更加复杂了，以前可能还只有键盘和鼠标的输入，现在涉及到触摸，手势等等，那么面对移动设备的UI编程又是什么样子呢？ IOS还是用代码编写，Android UI用了xml+代码，这个似乎和我们的html+js还是一个道理。

Android的编程模型
{% highlight java %}
public class HelloWorld extends Activity { 
    /** Called when the activity is first created. */ 
    @Override 
    public void onCreate(Bundle savedInstanceState) { 
        super.onCreate(savedInstanceState); 
        setContentView(R.layout.main); 
    } 
} 
{% endhighlight %}

代码中的R引用到了声明式的xml
{% highlight xml %}
<?xml version="1.0" encoding="utf-8"?> 
<LinearLayout xmlns:android="http://schemas.android.com/apk/res/android" 
    android:orientation="vertical" 
    android:layout_width="fill_parent" 
    android:layout_height="fill_parent" 
    > 
<TextView  
    android:layout_width="fill_parent" 
    android:layout_height="wrap_content" 
    android:text="@string/hello" 
    /> 
</LinearLayout> 
{% endhighlight %}

GUI编程还有一个问题那就是多线程，几乎所有的GUI工具都是单线程的，浏览器是，Swing是，Android UI也是，所以在编写GUI编程的时候一定要注意它的线程模型。多线程GUI框架试图被发明，但是它极易受到死锁的困扰，
多线程GUI框架成为了计算机科学史上的一场梦。

GUI编程大概走的路线就是声明+部分代码+样式隔离，html+css+js很多年了，不知以后会如何进化......


