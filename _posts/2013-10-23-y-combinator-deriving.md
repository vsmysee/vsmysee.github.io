---
layout: article
title: 我来推导Y combinator
---

计算机科学的两大难题，第一个是缓存失效，第二个是命名。
以英语为母语的程序员都会觉得命名是个难题，更何况我们这些龙的传人，如果一个程序员的职业生涯没有发现命名的窘迫可能它的程序还写得不够。不知道我们的老子说的名可名，非常名是否能用在这里。
既然命名困难，那么我们就干脆不命名吧，于是我们有了匿名函数，匿名内部类等办法。

在我[如何让快速排序一行写完](http://www.codingbaby.com/blog/2013/10/17/quicksort-on-one-line/)一文中有这样一段代码

{% highlight ruby%}
{|array| that(array.select(it < array[0])) + [array[0]] + that(array.select(it > array[0]))}.run([3,0,1,2,3,6,7])
{% endhighlight %}
我们写了一个函数然后让它立即执行，减少了对这个函数命名的步骤，因为这个快速排序要用递归来实现，那么我怎么在函数没有名字的前提下引用当前函数呢，这就是那个that在起作用，在JavaScript中我们
可以用arguments.callee来引用当前函数以实现递归，可是假如有一种语言没有提供这样的机制从函数内部引用自己，我们怎么实现这个快速排序？或者怎么实现匿名函数递归？

比如，ruby的快速排序，你可以给写一个匿名版本吗？
{% highlight java%}
def quicksort a
  (pivot = a.pop) ? quicksort(a.select{|i| i < pivot}) + [pivot] + quicksort(a.select{|i| i > pivot}) : []
end
{% endhighlight %}

在函数式编程中，函数是可以作为数据来传递的，那么是可以通过某种机制来实现即便语言本身不提供函数内部引用自身也可以实现匿名递归，我们以JS的阶乘函数为例子，来一步一步的见证奇迹：

先写一个最普通的写法
{% highlight javascript%}
var factorial = function(x) {
  return x == 0 ? 1 : x * factorial(x-1)
};

factorial(3)
{% endhighlight %}

阶乘函数的本质运算是x == 0 ? 1 : x * factorial(x-1)，我们最终目的是不要在这个运算体中通过名字factorial来引用函数本身，我们引入间接层，写成这样:x == 0 ? 1 : x * that(x-1),你只要记住that表示函数本身
你可以理解为这是一个语言的关键字,它的语义就是在函数内部引用函数自身，那么怎么让一个表达式能够引用一个值呢？那就是闭包，我们只要通过某种机制，把x == 0 ? 1 : x * that(x-1)放进闭包，然后闭包环境中放入一个变量that表示这个函数本身就可以了，
这个变换机制我们通过一个函数来实现，它大概就可以这样写：

{% highlight javascript%}

var Y = function(f) {
};

var factorial = Y(function(that){
    return function(x){
        return x == 0 ? 1: x * that(x-1)
    }
})
{% endhighlight %}

我们把阶乘传递给了一个叫做Y的函数，它返回了函数，这个函数内部通过闭包又引用到了自身，我们只要想办法在Y里面完成这个变换就行了，我们把焦点放到如下这个函数上
{% highlight javascript%}
function(x){
   return x == 0 ? 1: x * that(x-1)
}
{% endhighlight %}
它如果要成功执行，必须要在参数中有that,于是我们变换一下，让这个函数参数里面接收自身，每次函数的执行都需要传入自身
{% highlight javascript%}
function(that,x){
   return x == 0 ? 1: x * that(that,x-1)
}
{% endhighlight %}
那么我们就可以实现函数不依赖函数名字来实现递归，请看如下代码，我们每次调用函数的时候把函数传进去
{% highlight javascript%}
var f = function(that,x){
   return x == 0 ? 1: x * that(x-1)
}
f(f,3)
f(f,4)
f(f,5)
{% endhighlight %}
但是每次都要传入f是个重复代码，我们可以利用函数curry化这样写：
{% highlight javascript%}
var f = function(that) {
    return function(x) {
        return x ==0 ? 1 : x * that(that)(x-1)
    }
}

f(f)(3)
f(f)(4)
f(f)(5)
{% endhighlight %}

好，到了这里我们发现这个阶乘函数和我们传给Y的那个函数有点相似了,所以Y函数只要把传进来的f函数变换成内部用that(that)来引用自身的函数，然后返回一个自身调用自身的结果给客户端就可以了。所以Y的伪代码应该这样写：

{% highlight javascript%}
var Y = function(f){

   //变化成g函数
    var g = doSth(f);

    return g(g)
}
{% endhighlight %}

我们又把中心放到that(that)这里，把它想像成一个整体通过外部传入，于是又得到这样的代码
{% highlight javascript%}
var f = function(that) {
    return function(x) {
        var baby = function(q,x) {
            return x ==0 ? 1 : x * q(x-1)
        }
        return baby(that(that),x)
    }
}

//把中间的baby函数curry一下得到
var f = function(that) {
    return function(x) {
        var baby = function(q) {
            return function(x){
                return x ==0 ? 1 : x * q(x-1)
            }
        }
        return baby(that(that))(x)
    }
}

f(f)(3)
f(f)(4)
f(f)(5)

{% endhighlight %}

奇迹产生了，在f函数内部，我们发现出现了阶乘函数的本质定义,也就是我们传递给Y的那个函数，所以我们便得到了Y函数的实现
{% highlight javascript%}
var Y = function(f){
    var g = function(that){
        return function(x) {
            return f(that(that))(x);
        }
    }
    return g(g);
}
{% endhighlight %}

那么一个阶乘函数不依赖于函数名字的递归就可以通过Y函数来变换了
{% highlight javascript%}
var factorial = Y(function(that) {
  return function(x) {
    return x == 0 ? 1 : x * that(x-1);
  };
});

factorial(5); // -> 120
{% endhighlight %}

这便是计算机科学中的Y combinator，也是黑客与画家的作者Paul Graham创建的一个公司。

为什么可以这样，我们需要追究内部是什么在起作用?就像牛顿发现了重力公式，但是爱因斯坦却要问为什么会产生重力，我们要向爱因斯坦学习，所以让我来揭开Y的神秘面纱，甚至可以用更简单的方式来推导它
待续.........


[参考资源](http://blog.jcoglan.com/2008/01/10/deriving-the-y-combinator/)