---
layout: article
title: log4j的正交设计
---

我们设计一个系统应该最大化的挖掘正交性，让各个维度独立变化，在Java领域，值得参考的例子就是log4j
下面这篇文章解读了log4j:

[原文](https://www.javaworld.com/article/2078767/java-tip-orthogonality-by-example.html)

Appenders, level, and layout are three aspects of Log4j that can be seen as independent dimensions. I use the term aspect here as a synonym for concern, meaning a piece of interest or focus in a program. In this case, it is easy to define these three concerns based on the questions that each addresses:

```
Appender: Where should the log event data be sent for display or storage?
Layout: How should a log event be presented?
Level: Which log events should be processed?
```

{% highlight java %}
// setup logging !
Logger logger = Logger.getLogger("Foo");        
Appender appender = new ConsoleAppender();
Layout layout = new org.apache.log4j.TTCCLayout()
appender.setLayout(layout);
logger.addAppender(appender);
logger.setLevel(Level.INFO);
// start logging !
logger.warn("Hello World");

{% endhighlight %}


![](/images/orthogonality-log4j.png)

Orthogonality is a powerful concept because it enables us to establish a relatively simple mental model for complex application use cases. In particular, we can focus on one dimension while ignoring other aspects.

正交性是一个强大的概念，因为它使我们能够为复杂的应用程序用例建立相对简单的思维模型。特别是，我们可以专注于一个维度，而忽略其他方面。


The reduction in complexity that orthogonality brings to software programs is similar to how dimensions are used in geometry, where the complicated movement of points in an n-dimensional space is broken down to the relatively simple manipulation of vectors. The entire field of linear algebra is based on this powerful idea.


正交性给软件程序带来的复杂性降低类似于几何中使用尺寸的方式，其中将点在n维空间中的复杂移动分解为相对简单的矢量操作。线性代数的整个领域都基于这个强大的思想。


## 但是

log4j的某些代码是违反了正交性的
比如JDBCAppender


## 权衡

The fact that there is no easy solution to fix the design of JDBCAppender indicates that there is a deeper problem at work. In this case, the level of abstraction chosen when designing the core abstract types (in particular Layout) needs fine-tuning. The core method defined by Layout is format(LoggingEvent event). This method returns a string. However, when logging to a relational database a tuple of values (a row), and not a string needs to be generated.

One possible solution would be to use a more sophisticated data structure as a return type for format. However, this would imply additional overhead in situations where you might actually want to generate a string. Additional intermediate objects would have to be created and then garbage-collected, compromising the performance of the logging framework. Using a more sophisticated return type would also make Log4j more difficult to understand. Simplicity is a very desirable design goal.


没有固定解决方案设计的简单解决方案这一事实JDBCAppender表明，工作中存在着更深层次的问题。在这种情况下，设计核心抽象类型（尤其是Layout）时选择的抽象级别需要进行微调。定义的核心方法Layout是format(LoggingEvent event)。此方法返回一个字符串。但是，当登录到关系数据库时，需要生成一个值的元组（一行），而不是一个字符串。

一种可能的解决方案是使用更复杂的数据结构作为格式的返回类型。但是，这可能意味着在您实际想要生成字符串的情况下会产生额外的开销。必须创建其他中间对象，然后进行垃圾回收，从而损害了日志记录框架的性能。使用更复杂的返回类型也会使Log4j更加难以理解。简单性是一个非常理想的设计目标。


In this article I have used Log4j as an example to demonstrate both the design principle of orthogonality and the occasional trade-off between following a design principle and achieving a system quality attribute such as scalability. Even in cases where it is impossible to achieve full orthogonality, I believe that the trade-off should be a conscious decision, and that it should be well documented (for instance, as technical debt). See the Resources section to learn more about the concepts and technologies discussed in this article.


我的观点:

```
抽象在一定程度上是简洁的，但是在复杂场景下是可能会被破坏的，这个时候就需要设计者进行权衡
没有绝对抽象完美的系统，因为现实的复杂性导致的
```
