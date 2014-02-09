---
layout: article
title: 规则引擎的思考
---

语言是由命题构成的，世界是由事实构成的，这是天才哲学家维特根斯坦说的，我们在生活中也经常说，事实上怎么怎么，事实上的标准等等。计算机试图不放过这个世界的任何一个领域，那么计算机是如何理解世界由事实构成这句话呢？

### 数学和事实
大家可能知道有一本很古老的书叫几何原本，里面假设了这个世界的5条公理，我们可以认为这是一种基本事实，通过这5条公理，不断的演绎推理得到了大量美丽的定理，这是数学中我发现的和事实相关的东西，基于一些基本事实得到更多的事实，从基本到更多的过程
需要遵循逻辑规则，逻辑规则本身其实是一个组合基本事实的过程。

### 计算
图灵机和递归函数都可以有效的表达计算，同样一个计算问题我们发现可以用图灵机械模型来完成，也可以用函数递归来完成，现在我们发现它还可以通过事实和规则通过推理来完成，我们以Fibonacci数列为例，数列如下：
0, 1, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89, 144, 233, 377, 610, 987, 1597, 2584, 4181, 6765, 10946，………………，数列的第一个和第二个数字比较特殊，就单纯是0,1，但是从第三个数字开始，它就等于前两个数字的和，现在得到一个计算问题，假如给定一个位置请计算出这个位置的Fibonacci数，
对于这个问题，用图灵机械步骤会得到下面的程序，我们用一条长长的纸带来存储：
{% highlight javascript %}
var position = 10; //位置
var fib = []; //存储

fib[0] = 0;fib[1] = 1;
for(i=2; i<=position; i++) {
    fib[i] = fib[i-2] + fib[i-1];
}

var result = fib[position]; //得到这个位置的数
{% endhighlight %}

不使用机械步骤，用函数来写，会得到这个样子：
{% highlight javascript %}
function fib(n){
  return n<2 ? n: fib(n-1)+fib(n-2);
}
var result = fib(10);
{% endhighlight %}

这不是我们的目的，怎么用规则和事实的角度来表达呢？Fibonacci数列中的事实有三条：

1. 第一个数字是0
2. 第二个数字是1
3. 从第三个数字开始，这个数字是前两个数字的和

第三条明确一点应该是一中规则，基于这个规则可以把已经存在的事实组合出新的事实，所以严格按照规则来定义事实，我们仿照几何原本设定两个公理，第一个是位置是1的值是0，位置是1的值是1，然后设定一个逻辑规则：其他位置的值是前两个位置的值的和。
世界由事实构成，完整的Fibonacci就由下面的事实构成:

Fact(seq:1,value:0),Fact(seq:2:value1),Fact(seq:3:value:1),Fact(seq:4,value:2) ………………

如何实现计算呢？比如我要计算fib(10)，计算过程需要完成的就是宣布位置1到位置10的所有事实，完成这个过程在计算机领域就是规则引擎，我们只要设定规则对已存在的事实进行演绎即可，fib(10)必然对应10个事实，每个事实有一个位置seq和一个值value，我们事先需要
将这10个事实插入规则引擎，由于除了前两个事实的value是确定的，我们假设其他事实的value是-1，这些为-1的value会在规则演绎的时候进行计算，接下来我们编写一个规则提交给规则引擎即可：
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

没有机械过程和函数递归，有的就是一个说明，一种逻辑规则，它也同样表达了这个世界，神奇的地方就在这里，以下是Java领域开源规则引擎Drools对Fibonacci计算的完成代码，各位体会吧！
{% highlight ruby    %}
rule Recurse
    salience 10
    when
        f : Fibonacci ( value == -1 )
        not ( Fibonacci ( sequence == 1 ) )
    then
        insert( new Fibonacci( f.sequence - 1 ) );
        System.out.println( "recurse for " + f.sequence );
end

rule Bootstrap
    when
        f : Fibonacci( sequence == 1 || == 2, value == -1 ) // this is a multi-restriction || on a single field
    then
        modify ( f ){ value = 1 };
        System.out.println( f.sequence + " == " + f.value );
end

rule Calculate
    when
        f1 : Fibonacci( s1 : sequence, value != -1 ) // here we bind sequence
        f2 : Fibonacci( sequence == (s1 + 1 ), value != -1 ) // here we don't, just to demonstrate the different way bindings can be used
        f3 : Fibonacci( s3 : sequence == (f2.sequence + 1 ), value == -1 )
    then
        modify ( f3 ) { value = f1.value + f2.value };
        System.out.println( s3 + " == " + f3.value ); // see how you can access pattern and field  bindings
end
{% endhighlight %}

{% highlight java    %}
public class FibonacciExample {

    public static void main(final String[] args) {
        KieContainer kc = KieServices.Factory.get().getKieClasspathContainer();
        KieSession ksession = kc.newKieSession("FibonacciKS");

//        KnowledgeRuntimeLogger logger = KnowledgeRuntimeLoggerFactory.newFileLogger(ksession, "log/fibonacci.log");

        ksession.insert( new Fibonacci( 50 ) );
        ksession.fireAllRules();

//        logger.close();
        ksession.dispose(); // Stateful rule session must always be disposed when finished
    }

    public static class Fibonacci {
        private int  sequence;

        private long value;

        public Fibonacci() {

        }

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

        public String toString() {
            return "Fibonacci(" + this.sequence + "/" + this.value + ")";
        }
    }

}
{% endhighlight %}
