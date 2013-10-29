---
layout: article
title: 编程语言中的类型
---

在汉语言里，我们通常在讲物以类聚，诸如此类，触类旁通等成语，所以把物品分类应该是我们天然就有的直觉，一旦分类就产生集合，而集合就要涉及到数学，大数学家罗素在解决他的理发师悖论的时候开始引入了类型，而编程语言的类型是否和罗素有关我不得
而知。

在理发师悖论中，就是因为模糊了集合的边界出现了奇怪的悖论，理发师说他只给那些不给自己理发的人理发，这好像没有什么问题，因为如果每个人都自己理发还需要理发师干嘛，可是问题是理发师自己怎么办？它如果给自己理发那么他就不给自己
理发，如果他不给自己理发，按照那个逻辑他又要为自己理发，这种类似的悖论很多，就在我推导Y combinator的时候，RecursiveFactory要得到一个函数必须执行输入函数，但是执行输入
函数的前提又必须传入想得到的那个函数，逻辑绞在了一起。理发师悖论中，如果排除了自己就没有悖论，这就是边界，只要定边界就可以避免他，于是罗素提出了类型论，英文原文：

The types of type theory were invented by Bertrand Russell in response to his discovery that Gottlob Frege's version of naive set theory was afflicted with Russell's paradox. This theory of types features prominently in Whitehead and Russell's Principia Mathematica.
It avoids Russell's paradox by first creating a hierarchy of types,then assigning each mathematical (and possibly other) entity to a type. Objects of a given type are built exclusively from objects of preceding types (those lower in the hierarchy), thus preventing loops.

回到编程语言，任何一个编程语言必须表达出两个核心概念，一个是信息的表示，另一个是信息的处理，这两种表示都要引入类型，那么什么是类型？类型分为两部分，一是类型的取值范围，二是在取值范围上所允许的操作，比如java的int，它的取值范围是-2,147,483,648到 2,147,483,647，而它允许的运算是加减乘除。
所以类型本身就应该封装底层的信息表示或者说数据表示，我们在使用int的时候没有关注它的二进制位吧？而是在它的抽象操作上进行运算，所以面向对象是自然产生的，因为从相对低级的c语言开始，基础类型本身就具备封装了的概念，c语言引出的结构离真正的类型定义
仅仅一步之遥，类似c语言的结构体把信息打包的做法也是一种类型，他是真正类型的半成品，它叫具体数据类型，而把结构体的数据信息封装隐藏之后的class类才是抽象数据类型，抽象数据类型才是真正的类型。

编程语言一般内置几种基本的原始的抽象类型，比如boolean,int，然后提供某种机制比如class组合这些类型形成更大更抽象的类型，组合这些基本类型来表达更大的信息就出现了数据结构，而特定的数据结构也只能通过特定的行为去访问它，所以这些和面向
对象都是完全吻合的，所以任何一个领域只要找准了它的基本抽象就差不多掌握了它的核心，世界之大，日月山川最终都是组合基本粒子得到的，当然由基本粒子可以构建更大的基本抽象，比如生命细胞，基于细胞这个基本抽象我们得到了千奇百怪的生命体。

所以类型是有使用约束的，检查类型是否安全使用就是编程语言实现机制要做的头等大事，根据检查的时间点我们可以把编程语言分为两类，一种是静态类型语言，一种是动态类型语言，前者在运行之前由编译器先进行检查，然后运行时就不需要检查了，这样带来了更高效的程序
和更少的bug滋生，但是程序会显得冗长，因为我们必须明显的在使用变量前去声明类型，而程序本身的算法本质被大量的类型代码干扰,比如这种java，scala代码，有时候真的是迷失在类型里了。
{% highlight java %}
public <T extends Comparable<T>> void sort(T[] array, boolean ascend) {}
{% endhighlight %}

{% highlight scala %}
def map[B, That](f: A => B) (implicit bf: CanBuildFrom[Repr, B, That]): That
{% endhighlight %}

而后者是在运行时做类型检查，这种语言大部分在代码中没有声明类型，而是在运行时依靠类型推断，然后再进行检查，比如python,ruby等语言，不过像groovy这样既可以声明类型，也可以不声明类型的动态语言又可能不用
类型推断，所以类型推断和静态语言或者动态语言无关，Scala是静态语言，但是编译器在编译的时候也做了类型推断。静态类型语言在获得编译前检查的好处外还有就是IDE可以通过分析静态信息提供强大的编程帮助以提高开发速度，静态语言的类型是在变量上分析，而
动态类型语言的类型分析在值上进行。

类型的约束强弱又可以把编程语言分为强类型语言和弱类型语言，我们在罗素悖论中知道，如果把边界模糊就导致不严谨，不严谨就产生悖论，所以如果语言对类型约束不强就可能导致程序不严谨，难以调试，比如c,javascript都是类型不严谨的语言
在c中没有布尔类型，所有非0的值都为真，在javascript中，字符串"1"可以和数字1一起运算，这样的语言会得到奇怪的代码，比如:
{% highlight javascript %}
[[] + [] * 1][0] == "0"
[[] + [] * 1][0][0] == "0"
[[] + [] * 1][0][0][0] == "0"
{% endhighlight %}

由此我们得到一个结论，类型的静态与动态和类型的强弱是正交的概念，没有任何重叠的定义。

编程语言提供的基本抽象类型是可以通过直接量推断的，但是在运行时是没有办法推断组合出来的复杂抽象类型的，由于我们只应该关注它的抽象行为，所以鸭子类型就必然的出现了，拿ruby来说，它是纯粹的OO语言
也就把抽象类型表达得纯粹，我们在调用抽象类型的行为的时候就必须假设它可以完成这个行为，假设他是鸭子，那么他就应该嘎嘎的叫，如果它能够嘎嘎的叫同时也是鸭子的样子那么它就是鸭子，这样类处理类型可以获得
巨大的灵活性，我认为这才是动态语言而不仅仅是动态类型语言。在静态语言中，由于编译器强制检查了类型使用，要获得灵活性必须用抽象类和接口，把灵活性限制在一个继承层次上，这也是面向对象中的多态，一个受限制
的多态，鸭子类型的动态是才是真正的多态，是一种非继承性多态。

对于静态类型语言在多态上的不灵活性，Java等语言提出了RTTI，运行时类型识别技术，通过它可以表达一定灵活性，比如java就可以反射出一个类的信息然后再执行调用，这种类信息的反射处理在ruby等语言中实现得又更强大，
这又催生了动态语言强大的元编程技术。

上面我一直把类型和数据一起讨论，其实类型和计算行为也有关，计算行为我们一般叫做函数，也就是说函数也是有类型的，这在函数式编程语言中体现明显，比如下面的代码

Haskell:
{% highlight haskell %}
data Expression =
    Number   Int
  | Add      Expression Expression
  | Multiply Expression Expression
  | Variable String

evaluate :: Map String Int -> Expression -> Int
evaluate env (Number x) = x
evaluate env (Add x y) = evaluate env x + evaluate env y
evaluate env (Multiply x y) = evaluate env x * evaluate env y
evaluate env (Variable x) = findWithDefault 0 x env

{% endhighlight %}

Scala的case类
{% highlight scala %}
abstract class Expression

case class Number(i: Int) extends Expression
case class Add(x: Expression, y: Expression) extends Expression
case class Multiply(x: Expression, y: Expression) extends Expression
case class Variable(id: Symbol) extends Expression
{% endhighlight %}

他们都在表达代码的类型，目前还不太了解其内在机制，这中类型和我们之前说的类型有可能是两种不相同的东西，理由是：20世纪初B.Russell提出了类型论作为公理集合论 乃至数学的基础，30年后A.Church用λ演算和类 型的概念定义了高阶逻辑的形式系统。
而函数式语言就是以λ演算为基础的。

[参考资源1](http://rethrick.com/#type-theory)

[参考资源2](http://blog.csdn.net/ce123_zhouwei/article/details/8976652)
