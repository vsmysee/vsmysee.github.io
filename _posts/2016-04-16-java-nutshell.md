---
layout: article
title: 果壳中的Java
---
这是Java In A Nutshell一书的笔记外加一些自己的胡思乱想,这本书的作者是David Flanagan,他是何许人?你一定觉得会奇怪,他是犀牛书JavaScript权威指南的作者,Java和JavaScript是雷锋和雷峰塔的区别呀,国外的这些大牛啊
感觉是悟性到了,出手皆不简单,这本书的第一页是这样的文字:献给所有传播和平及抵制暴力的人,让我很是费解.Java如坚果,会存活相当长的时间,不信? 那我们先看他的三个核心.

## Java环境三核心

### 语言
Java语言受Java语言规范(JLS)的约束,这个规范限定了某项功能必须采用某种方式实现,Java是人类可读的编程语言,基于类,而且面向对象,比较易读易写***(偶尔有点啰嗦)***,Java是一个完全向后兼容的语言
在第8版的时候出现了较大幅度变化,lambda表达式的引入和核心集合API的大幅度改写.

### JVM
Jvm是一个程序,提供运行Java程序所需的运行时环境,提供给Jvm运行的程序不是Java语言源码,源码必须转换为一种称为Java字节码的格式,Jvm使用运行时信息进行自我管理,80年代研究表明,程序运行时的行为
有很多有趣且有用的模式无法再编译时推论得出,Jv模式真正意义第一个利用这项研究成果的主流平台.JIT是典型JVM使用的运行时优化技术.

* 包含一个容器,让应用代码在其中运行
* 较之c/c++,提供一个安全的执行环境
* 代开发者管理内存
* 提供一个跨平台的执行环境

现如今在JVM上执行的语言不计其数,scala,clojure,javascript,groovy已经是我们必须得学的了.Ruby语言的发明人在他的书中都明确的表示了
他在某型方面感觉败给了Jruby.

### 生态
当下的技术生态系统中,很少出现某种技术组件不提供Java连接器的情况,不管是传统关系数据库,NOSQL和消息系统,一般我们能想到的解决方案,在Java生态环境里都有可能已经被别人实现,我真的不知道Java生态里
将会有多少个SSH,以前是Struts,Spring,Hibernate,如今是Spark,Storm,Hadoop.Java核心技术开放式架构让企业和开发者选择的余地非常之大.

## Java的句法
Java语言使用Unicode字符集编写,Java使用一种稍微独特的方式表示字符:在传给javac的输入中,标识符使用UTF-8编码,但在内部使用
定长编码(16位)表示字符.

标点符号分为两类,一类是分隔符,一类是运算符
{% highlight java %}

//分隔符
() {} [] ... @ :: ; , .

//运算符
+ += - -=  *  *=   /  /=  %  %=  & &=   |  |=  ^  ^= << <<=  >>  >>=  >>>  >>>=

= == != < <= > >= ! ~ && || ++ -- ? : ->

{% endhighlight %}

8种基本数据类型
![Java](/images/primitive_data_type.png)


转义字符:**\b \t \n \f \r \" \' \\ \xxx(八进制000到377之间) \uxxxx Unicode字符***
Java对字符的16位表示法不能表示最新的Unicode规范,所以引入了codepoint

switch语句以一个表达式开始,这个表达式的返回值是int,short,char,byte,String或枚举

try catch finally句法只有一种方法能让try子句退出而不执行finally子句,那就是System.exit()方法的调用,如果finally中抛出异常
这个异常会取代任何正在抛出的异常,异常时Throwable对象,而且异常主要分为两类,通过Error和Exception之类标识,Error类是未检异常,Exception类还有一个子类RuntimeException,他的子类
都输入未检异常

java不允许脱离类的概念运行方法,所以lambda表达式是某个类中定义的匿名方法,lambda表达式当成值使用时会根据要存储的变量类型,自动转换为响应的对象,下面是一个稍微复杂的实例
{% highlight java %}
ActionListener listener = (e) -> {
    System.out.println("Event fired at:" + e.getWhen());
}
{% endhighlight %}


关于Java的数组,首先它是一个种特殊的对象,Java不支持其他语言中的矩阵式多为数组,数组也是引用类型,数组类型不是类但是数组实例是对象,数组支持放大转换,也即是数组协变,现代标准认为这是历史遗留不合理的功能,
因为编译时和运行时得出的类型不一致.
下面代码通过了编译,却执行报错了
{% highlight java %}
String[] words = {"hello","worlds};
Object[] objects = words;

//天啦,运行时异常
objects[0] = new Integer(42);
{% endhighlight %}



## 面向对象
面向对象和面向函数是来个不同的语言思维范式,一个是名词一个是动词,Java完全是一个名词王国构造的系统,不过在Java8开始我们可以开始使用部分用动词行为构造程序的方法.
Java更是要一个单根集成系统,这简化了C++的大量复杂性,但是某些问题域本身确实是多继承的,所以类似ruby,scala,groovy都提供了对这种问题的解决方案.

类是Java程序最基本的元素结构,编写Java代码不可能不定义类,Java不是一个纯面向对象的语言,而ruby才是,比如ruby支持1.times{}.

Java有五种基本引用类型,他们分别是类,接口,数组,枚举和注解,javac生成的字节码会在运行时使用"虚拟方法查找",某些其他语言,例如c#和C++默认不使用虚拟查找,如果
程序员想在之类中覆盖方法,要显式使用virtual关键字.


## 类型系统
Java是一个静态类型的语言,只在运行时检查类型兼容性的语言叫做动态类型语言,(当然语言除了类型上的动静,还有类型上的强弱,动态语言和动态类型语言以及强类型语言都是不同的概念)
<T>句法有一个专门的名称---参数化类型,因此,泛型还有一个名称---参数化类型.Java是一个完全像后兼容语言,所以Java5引入的泛型采用了类型擦除机制,泛型的类型参数只在编译时可见
javac会去掉类型参数,而且在字节码中不提现出来,但是我们可以在运行时通过反射可以找寻到些蛛丝马迹,所以下面的代码是通不过编译的
{% highlight java %}
interface OrderCounter {
    int totalOrders(Map<String,List<String>> orders);
    int totalOrders(Map<String,Integer> orders);
}
{% endhighlight %}

如果某个类型是参数化得,我们要实例化必须提供一个类型,可是有时候我不知道要使用什么类型,Java为此提供了一个<?>类型通配符,比如ArrayList<?> list,这个list不能放入new Object()
因为类型不可知,所以java也不允许专业那个写List<?> list = new ArrayList<?>().

对于Object o = new String("X")是合法的,但是List<Object> objects = ArrayList<String>()不合法,他们构成子类关系,而List<?> objects = new ArrayList<String>()没问题.

<?>表示我不知道是什么类型,但是我们有时候知道他是某个类的子类或超类,所以可以这样写<? extends>和<? super>,这也引出了容器类型中的类型协变和逆变问题.

除了泛型类,我们也可以写泛型方法
{% highlight java %}
public class Utils {
    public static <T> T comma(T a,T b){
        return a;
    }
}
{% endhighlight %}


### 嵌套类型
java是个必须写类的语言,但是有时候我们觉得单独建一个类文件没有必要,比如LinkedList内部需要一个节点类型
{% highlight java %}
public class LinkedList<E> {
    private static class Node<E> {
            E item;
            Node<E> next;
            Node<E> prev;

            Node(Node<E> prev, E element, Node<E> next) {
                this.item = element;
                this.next = next;
                this.prev = prev;
            }
    }
}
{% endhighlight %}

所以有了嵌套类型,主要有两个目的,都是和封装有关

* 某个类型需要特别深入的地访问另一个类型的内部实现
* 某个类型可能只在特定的情况下需要使用



嵌套的方式有下面四种

* 静态成员类型
* 非静态成员类型
* 局部类(定义在代码块中)
* 匿名类

代码块中的局部类给我们带来了其他如javascript语言中的闭包特性以及词法作用域.final关键字让javac编译时生成了一个私有内部副本而让生命周期延续了.java通过局部类,匿名类和lambda表达式实现闭包.


### lambda表达式
javac遇到lambda表达式时会把它解释为一个方法主体,这个方法具有特定的签名,必须满足以下条件才算是合法的

* 必须出现在期望使用接口类型实例的地方
* 接口类型必须只有一个强制方法
* 强制方法的签名要完全匹配这个表达式

虽然lambda表达式和匿名类有很多相似之处,但它不是语法糖,而是使用方法句柄和一个特殊的新jvm字节码invokedynamic实现的.

java的某些特性决定了他不可能是函数式语言,具体而言有一下几点

* 没有结构类型,没有真正的函数类型
* 类型擦除会导致高阶函数的类型安全性会丢失
* 天生善变

## 内存管理和并发
对象占用的内存在不需要使用时会自动回收,这项技术在lisp等语言中已经存在多年了,我们首先编写一个内存泄露的程序
{% highlight java %}
public static void main(String args[]){
     int bigArray[] = new int[100000];
     int result = compute(bigArray();
     //如果这里不显式告诉垃圾搜集器
     bigArray = null;
     for(;;) handle_input(result);
}
{% endhighlight %}

jvm维护了一个分配表数据结构来跟踪数组和对象的引用,在应用线程的堆栈跟踪中,从其中一个方法的某个局部变量开始,沿着引用链如果最终能找到一个对象就成为可达对象.


## 集合库


## 文本数字和日期


## IO

## 类加载反射和方法句柄


## Nashorn的JS运行时


## 工具和配置