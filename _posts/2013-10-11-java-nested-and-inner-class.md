---
layout: article
title: Java嵌套类和内部类
desc: Java的内部类模拟了动态语言的闭包，导致语法看起来比较复杂
---


关于嵌套类和内部类的官方定义：
A class defined within another class is called a nested class. Like other members of a class, a nested class can be declared static or not. A nonstatic nested class is called an inner class. An instance of an inner class can exist only within an instance of its enclosing class and has access to its enclosing class's members even if they are declared private.
 
Java编程我们以类为单位，类要么完全开放，要么对包开放，如果把一个类写入另外一个类内部，那么它就成叫做嵌套类，嵌套类类似成员，我们可以用public,private,protected甚至static来声明，如果一个嵌套类用static声明，我们叫做静态嵌套类，非静态的嵌套类我们叫做内部类。

语法：
{% highlight java %}
class OuterClass {

    protected static class StaticNestedClass {

    }

    private class NestedClass {

    }
}
{% endhighlight %}

为什么有嵌套类呢？
There are several compelling reasons for using nested classes, among them:
It is a way of logically grouping classes that are only used in one place.
It increases encapsulation.
Nested classes can lead to more readable and maintainable code.
Logical grouping of classes—If a class is useful to only one other class, then it is logical to embed it in that class and keep the two together. Nesting such "helper classes" makes their package more streamlined.
Increased encapsulation—Consider two top-level classes, A and B, where B needs access to members of A that would otherwise be declared private. By hiding class B within class A, A's members can be declared private and B can access them. In addition, B itself can be hidden from the outside world.
 
More readable, maintainable code—Nesting small classes within top-level classes places the code closer to where it is used. 
表达意思就是我们让类的定义更加内聚，可以增强封装和使代码更可读和维护。
 
内部类可以像声明类成员一样声明，但还可以在方法内声明，还可以在表达式或语句中使用匿名内部类。
内部类不能有静态成员声明，内部类和它所在的外部类可以访问彼此的成员，没有访问修饰的限制，静态嵌套类只能访问外部类的静态成员。
内部类没有静态属性，要使用它必须先得有对象实例，内部类的对象实例之前必须先实例外部类对象，所以如果内部类对象实例了，那么在实例之前肯定外部类实例化出了一个对象

通过外部对象来实例内部类对象的语法：
OuterClass.InnerClass innerObject = outerObject.new InnerClass();
在外部类实例方法中可以用this.new NestedClass();
内部类对象和外部类会建立某种关联，如果在内部类对象中想引用外部类对象，语法是：OuterClass.this
 
如果把一个内部类写到方法中，则只能在方法内实例化，方法内的类声明类似方法内的变量，它没有了访问修饰符。
注意在方法中的内部类对象如果要引用方法内的变量，这些变量必须是final的，原因等会解释。

除了成员内部类，方法内部类，还有一种内部类叫做匿名内部类，它没有类名，类的声明是隐式的，Java支持这种方式可能是为了简化某些代码，比如我们可以不用先写一个实现某个接口的类，而直接在接口上new对象，语法是new ClassName(){};这个ClassName是匿名类要继承的类，要么是接口继承，要么是实现继承，如果是接口继承则大括号内要实现接口中的方法，如果是实现继承，大括号可覆盖超类方法，但是不要添加新东西，因为是多态调用，新添加的东西没有意义，演示代码：

{% highlight java %}
interface Service {
    void method();
}

class BaseClass {
    void method() {
    }
}


public class Test {

    public static void main(String[] args) {
        //接口匿名
        new Service() {
            public void method() {

            }
        };
        //对类匿名
        new BaseClass() {
            @Override //可重写
            public void method() {

            }
        };
    }
}
{% endhighlight %}

现在我们来看看在方法内使用一个匿名内部类但是引用了方法中的变量的代码：
{% highlight java %}
class BaseClass {
    public Service method() {
        final int i = 2;//局部变量
        //返回了一个使用局部变量的匿名内部类对象
        return new Service() {
            public void method() {
                System.out.println(i);
            }
        };
    }
}
{% endhighlight %}


如果方法内的i不是final的，那么这个i的生命周期是个栈周期，方法返回数据就没有了，如果写成final，java在编译器就把这些数据放到了常量区，这样返回的对象访问的数据其实是在常量区。
但是注意，如果final修饰了对象引用，则是编译器在编译的时候生成了部分代码来copy指针，这样也保证了指针的周期。
如果大家学过javascript，我们来看看它的一段代码：
{% highlight java %}
function f1(){
　　var n=999;//局部变量
　　function f2(){
　　　　alert(n); 
　　}
　　return f2;//返回f2函数，它引用了f1的局部变量
}
var result=f1();
result(); // 999
{% endhighlight %}

它没有final，它是怎么不让n的值丢掉呢？函数调用都是在栈上保存数据的，这就是JS的作用域链，通过这种方式造就了强大的闭包。
java的这种语法可以看做面向对象的闭包，但是对于闭包中的数据访问，java和js完全不一样，复习一下java的内存：
 
 
1. 寄存器：最快的存储区, 由编译器根据需求进行分配,我们在程序中无法控制.
2. 栈：存放基本类型的变量数据和对象的引用，但对象本身不存放在栈中，而是存放在堆（new 出来的对象）或者常量池中（字符串常量对象存放在常量池中。）
3. 堆：存放所有new出来的对象。
4. 静态域：存放静态成员（static定义的）
5. 常量池：存放字符串常量和基本类型常量（public static final）。
6. 非RAM存储：硬盘等永久存储空间
 
 
对象在堆中，但是有些对象比如String是在常量区，fina值在常量区。
 
对于java的内部类和闭包，截取Spring JdbcTemplate中的一段代码，你能看出奥妙吗？
{% highlight java %}
public int update(final String sql) throws DataAccessException {
		Assert.notNull(sql, "SQL must not be null");
		if (logger.isDebugEnabled()) {
			logger.debug("Executing SQL update [" + sql + "]");
		}
		class UpdateStatementCallback implements StatementCallback<Integer>, SqlProvider {
			public Integer doInStatement(Statement stmt) throws SQLException {
				int rows = stmt.executeUpdate(sql);
				if (logger.isDebugEnabled()) {
					logger.debug("SQL update affected " + rows + " rows");
				}
				return rows;
			}
			public String getSql() {
				return sql;
			}
		}
		return execute(new UpdateStatementCallback());
	}
{% endhighlight %}

这其实是一种方法对象模式，因为在java中，方法或者函数不能被当成数据处理，但是又想模拟函数式编程的特性，那么只有这么一个办法，把一个方法包装到对象中，然后用这个对象去旅行函数式编程的职责，其实现就是，先写一个接口，然后用一个匿名内部类去实现这个接口，然后返回这个匿名内部类实例化出来的对象，这个时候这个对象可以捕获实例它的那个环境从而得到一个闭包。
 
这种风格细究下去是一个编程范式，或者一种世界观，他们都是一种解决问题的视图，每种视图可能都具备各自的局限性和优越性

![范式](/images/paradigm.png)

静态嵌套类和外部类的实例无关，它被放到一个类内部，其目的应该是类的聚合性，静态嵌套类可以访问外部类的静态成员不用考虑访问限制，静态嵌套类的实例化语法：new OuterClass.StaticNestedClass();



