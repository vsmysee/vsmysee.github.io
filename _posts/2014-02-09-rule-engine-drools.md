---
layout: article
title: 规则引擎的思考
---

语言是由命题构成的，世界是由事实构成的，这是天才哲学家维特根斯坦说的，我们在生活中也经常说，事实上怎么怎么，事实上的标准等等。计算机试图不放过这个世界的任何一个领域，那么计算机是如何理解世界由事实构成这句话呢？

### 数学和事实
大家可能知道有一本很古老的书叫几何原本，里面假设了这个世界的5条公理，我们可以认为这是一种基本事实，通过这5条公理，不断的演绎推理得到了大量美丽的定理，这是数学中我发现的和事实相关的东西，基于一些基本事实得到更多的事实，从基本到更多的过程
需要遵循逻辑规则，逻辑规则本身其实是一个组合基本事实的过程。

### 计算
图灵机和递归函数都可以有效的表达计算，同样一个计算问题我们发现可以用图灵机械模型来完成，也可以用函数递归来完成，现在我们发现它还可以通过事实和规则通过推理来完成。

以Fibonacci数列为例，数列如下：
0, 1, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89, 144, 233, 377, 610, 987, 1597, 2584, 4181, 6765, 10946，………………
数列的长度是无限的。

数列的第一个和第二个数字比较特殊，就单纯是0,1，但是从第三个数字开始，它就等于前两个数字的和，现在可以提出一个计算问题，假如给定一个数列位置请计算出这个位置的Fibonacci数，
对于这个问题，用图灵机械步骤会得到下面的程序，我们用一条长长的纸带来存储，然后计算质量不断的在纸带上读写：
{% highlight javascript %}
var position = 10; //位置
var fib = []; //存储

fib[0] = 0;fib[1] = 1;
for(i=2; i<=position; i++) {
    fib[i] = fib[i-2] + fib[i-1];
}

var result = fib[position]; //得到这个位置的Fibonacci数
{% endhighlight %}
上面这个程序完全是平铺的，没有任何抽象，赤果果的计算和存储，不过还有另外一种方法，那就是不使用机械步骤，用函数来写，会得到这个样子：
{% highlight javascript %}
function fib(n){
  return n<2 ? n: fib(n-1)+fib(n-2);
}
var result = fib(10);
{% endhighlight %}
你会发现这种写法足够的声明式，它只强调了计算，在代码中根本没有表示存储的语句。这还不是我们的目的，其面我们提到了规则和事实也可以用来做计算，怎么用规则和事实的角度来表达呢？

Fibonacci数列中的事实有三个：

1. 第一个数字是0
2. 第二个数字是1
3. 从第三个数字开始，这个数字是前两个数字的和

第三条明确一点应该是一种推理规则，基于这个规则可以把已经存在的事实组合出新的事实，所以严格按照规则引擎来定义事实应该定义两个基本事实，它有点类似几何原本的公设，第一个是位置是1的值是0，第二个是位置是1的值是1，然后设定一个逻辑规则：其他位置的值是前两个位置的值的和。
世界由事实构成，完整的Fibonacci就由下面的事实构成:

Fact(seq:1,value:0),Fact(seq:2:value1),Fact(seq:3:value:1),Fact(seq:4,value:2) ………………

如何实现计算呢？比如我要计算fib(10)，计算过程需要完成的就是宣布位置1到位置10的所有事实，完成这个过程在计算机领域就是规则引擎，我们只要设定规则对已存在的事实进行演绎即可，fib(10)必然对应10个事实，每个事实有一个位置seq和一个值value，我们事先需要
将这10个事实插入规则引擎，由于除了前两个事实的value是确定的，其他事实都是要待推理的，我们假设其他事实的value是-1，这些为-1的value会在规则演绎的时候进行计算，接下来我们编写一个规则提交给规则引擎即可：
{% highlight javascript %}
rule FebCalculate
    when
        f1 : Fact( s1 : seq, value != -1 ) //如果有一个事实的值不是-1
        f2 : Fact( seq == (s1 + 1 ), value != -1 )  //如果后继事实值也不是-1
        f3 : Fact( s3 : seq == (f2.seq + 1 ), value == -1 )//如果再后继的事实的值是-1
    then
        modify ( f3 ) { value = f1.value + f2.value }; //则进行计算，将两个事实的值求和复制给第三个事实的value属性
end
{% endhighlight %}

没有机械过程和函数递归，有的就是一个说明，一种逻辑规则，它也同样表达了计算，神奇的地方就在这里。

以下是Java领域开源规则引擎Drools对Fibonacci计算的完成代码，各位体会吧！
{% highlight ruby    %}
rule Recurse
    salience 10
    when
        f : Fibonacci ( value == -1 )
        not ( Fibonacci ( sequence == 1 ) )
    then
        insert( new Fibonacci( f.sequence - 1 ) );
end

rule Bootstrap
    when
        f : Fibonacci( sequence == 1 || == 2, value == -1 ) // this is a multi-restriction || on a single field
    then
        modify ( f ){ value = 1 };
end

rule Calculate
    when
        f1 : Fibonacci( s1 : sequence, value != -1 ) // here we bind sequence
        f2 : Fibonacci( sequence == (s1 + 1 ), value != -1 ) // here we don't, just to demonstrate the different way bindings can be used
        f3 : Fibonacci( s3 : sequence == (f2.sequence + 1 ), value == -1 )
    then
        modify ( f3 ) { value = f1.value + f2.value };
end
{% endhighlight %}

{% highlight java    %}
public class FibonacciExample {

    public static void main(final String[] args) {
        KieContainer kc = KieServices.Factory.get().getKieClasspathContainer();
        KieSession ksession = kc.newKieSession("FibonacciKS");
        ksession.insert( new Fibonacci( 50 ) );
        ksession.fireAllRules();
        ksession.dispose();
    }

    public static class Fibonacci {
        private int  sequence;
        private long value;

        public Fibonacci(final int sequence) {
            this.sequence = sequence;
            this.value = -1;
        }

        public int getSequence() {
            return this.sequence;
        }

        public void setValue(final long value) {
            this.value = value;
        }

        public long getValue() {
            return this.value;
        }
    }

}
{% endhighlight %}

### 规则引擎用在哪里
我们平时基于通用编程语言来对问题领域建模，但是有些领域如果使用通用语言会发现相当的繁琐或者不好维护，于是程序员开始创造各种DSL，规则引擎其实就是一中dsl，它用来解决一些简单用逻辑声明来对问题建模的领域。
事实上，对于这些领域甚至有专门的编程语言，例如prolog。

在我们一般web系统，基本上有一条很标准的主线流程，比如电商系统的下订单，但是网站运营会在主线流程上加入很多具备活动特性的支线流程和支线条件，比如只有金牌会员才能享受某次订单的8折，这些条件和计算如果每次都侵入
主线流程，维护将是一个噩梦，这就是规则引擎发挥作用的地方了，我们可以将这些支线流程全部抽象为规则并指定一个失效性，系统开单独的模块来维护这些规则既可。

Drools中我们要编写的就是各种rule,每个rule分为条件和执行两部分，条件部分就是一阶逻辑，使用存在，否定，与或非等逻辑断言，这部分代码写在when关键字之后，执行部分就是业务，这部分代码写在then关键字之后，下面是一个寻在整数事实的规则：

{% highlight ruby %}
rule "find integer" date-effective "06-一月-2014"  date-expires "10-一月-2014"
    when
       exists Integer()
    then
        puts("发现有整数");
end
{% endhighlight %}

date-effective和date-expires可以设置规则的失效性。exists表示存在的意思，还可以用not来否定。具体可参考drools官方文档