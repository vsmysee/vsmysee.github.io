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

比如，ruby的快速排序，你可以写一个匿名版本吗？
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

这种递归之所以可行，是因为js全局环境中有一个变量factorial指向了函数，现在我们假设没有这个变量，那么这段程序要执行必须外面传入函数自身，所以代码也很简单，我们用一个单词that表示外部传入的函数自身
{% highlight javascript%}
var f = function(that,x) {
  return x == 0 ? 1 : x * that(that,x-1)
};

//调用的时候必须把自己当作参数传进去
f(f,3)
f(f,4)
f(f,5)

//把函数curry一下我们得到这样一种方式
var f = function(that) {
    return function(x) {
        return x ==0 ? 1 : x * that(that)(x-1)
    }
}

f(f)(3)
f(f)(4)
f(f)(5)
{% endhighlight %}

奇迹在出现，如果语言不支持函数内部引用函数自身，我们可以通过把递归变换一种写法，然后就可以顺利的使用递归函数了，比如阶乘函数我们就可以这样写了:
{% highlight javascript%}
var f = function(that) {
    return function(x) {
        return x ==0 ? 1 : x * that(that)(x-1)
    }
}
var factorial = f(f);
factorial(5)
{% endhighlight %}
我们现在只是在函数内部摆脱了依赖函数名字，可是外部又引入新的名字，比如var f，也就是说我们每写一个递归函数，必须在外部命名，然后自己把自己当作一个参数传入返回另一个函数，换汤不换药，我们还是在不断的取名字，
通过观察我们发现每写一种递归都要遵从相同的模式，是不是可以通过写一个工厂函数来来生产呢？假设我们有个函数叫做RecursiveFactory,它负责生产递归函数，参数是正常的但是不能执行的递归版本，比如阶乘我们希望这样写：

{% highlight javascript%}

var RecursiveFactory = function(inputFunc) {

};

RecursiveFactory( function(that){
                      return function(x){
                          return x == 0 ? 1: x * that(x-1)
                      }
                  })

{% endhighlight %}

注意看阶乘的变换模式:
{% highlight javascript%}

var f = function(that) {
    return function(x) {
        return x ==0 ? 1 : x * that(that)(x-1)
    }
}

//f(f) 就表示RecursiveFactory要返回的结果

{% endhighlight %}

通过反curry它等价于如下的写法：
{% highlight javascript%}

var f = function(that) {
    return function(x) {
        var baby = function(q,x) {
            return x ==0 ? 1 : x * q(x-1)
        }
        return baby(that(that),x)
    }
}

//f(f) 就表示RecursiveFactory要返回的结果

{% endhighlight %}

再把里面的baby函数curry化又得到：
{% highlight javascript%}

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
//f(f) 就表示RecursiveFactory要返回的结果

{% endhighlight %}

奇迹产生了,变换代码出现了原始函数的样子，其他都是一样的写法，这也就是RecursiveFactory的实现，让我们把它写出来吧
{% highlight javascript%}
var RecursiveFactory = function(inputFunc) {
    var f = function(that) {
        return function(x) {
            return inputFunc(that(that))(x)
        }
    }
    return f(f)
}
{% endhighlight %}


这个RecursiveFactory便是计算机科学中的Y combinator，也是黑客与画家的作者Paul Graham创建的一个公司。更标准的写法:
{% highlight javascript%}
var Y = function(f) {
  var g = function(h) {
    return function(x) {
      return f(h(h))(x);
    };
  };
  return g(g);
};

var factorial = Y(function(recurse) {
  return function(x) {
    return x == 0 ? 1 : x * recurse(x-1);
  };
});

factorial(5)  // -> 120
{% endhighlight %}

由于代码中我们有一个x变量，只是因为我们用阶乘来推导的，所以一直用一个参数，其实函数是可以有很多参数的，那么更一般的版本就是把所有参数都要传递给f(h(h))函数，看看ruby的实现吧：
{% highlight ruby%}
def y(&f)
  lambda { |g| g[g] } [
    lambda do |h|
      lambda { |*args| f[h[h]][*args] }
    end
  ]
end

factorial = y do |recurse|
  lambda do |x|
    x.zero? ? 1 : x * recurse[x-1]
  end
end

{% endhighlight %}


为什么可以这样，我们需要追究内部是什么在起作用?就像牛顿发现了重力公式，但是爱因斯坦却要问为什么会产生重力，我们要向爱因斯坦学习，所以让我来揭开Y的神秘面纱，甚至可以用更简单的方式来推导它
待续.........


[参考资源](http://blog.jcoglan.com/2008/01/10/deriving-the-y-combinator/)