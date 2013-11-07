---
layout: article
title: Extjs和Prototype的类实现对比
---

通过对javascript原型链条的深入分析，我已经明白了Brendan Eich表达这个世界的方式，各大js框架都基于原型链设计了自己的api来帮助用户建立类以及类与类的继承，本文主要对比extjs和prototype的实现方式，extjs在4.0版本之前使用
传统了单根继承，也就是java的方式，但是通过阅读代码，我总感觉这种继承方式不能很好的表达对象自然继承关系，感觉设计者必须扭曲某些抽象，到了extjs4版本，extjs团队去掉了单根继承，而是引入了混入法，这样才得到了更加可维护和可理解的代码，
至于prototype框架，它是伴随Ruby On Rails诞生的，从它可以看到大量的ruby元素。

首先我们看看两个框架在做类和继承的代码，他们分别必须表达构造函数，类函数，以及如何调用超类方法。
Extjs的方式如下：
{% highlight javascript %}
SubClass = Ext.extend(SuperClass, {
    //子类构造函数
    constructor: function(config) {
    },

    //子类扩展方法
    subFunction: function() {
    }
});
{% endhighlight %}

Prototype的方式如下：
{% highlight javascript %}
SubClass = Class.create(SuperClass, {
    //子类构造函数
    initialize: function(config) {
    },

    //子类扩展方法
    subFunction: function() {
    }
});
{% endhighlight %}
调用超类方法的代码我们在后面再写，我们发现两种写法神奇的相似，只不过是把Ext.extend替换为Class.create而已，但是要注意在Prototype中，每一个类都需要用Class对象创造出来，但是在Extjs中，一个类可以自己手写，然后要用到继承的时候才用Ext.extend函数，比如extjs中有一个类是这样手写的：
{% highlight javascript %}
Ext.util.Observable = function(){
    var me = this, e = me.events;
    if(me.listeners){
        me.on(me.listeners);
        delete me.listeners;
    }
    me.events = e || {};
};
{% endhighlight %}
在Prototype中，每一个类都在类的原型上放置了一个initialize函数，构造函数每次调用的时候都委托到了原型上的initialize函数，在它源代码中是这样写的:function klass() {this.initialize.apply(this, arguments);}。

我们在Java等语言中做继承的时候是需要存在两个类的，然后在两个类之间用语言的关键字来建立继承关系，Extjs支持这样的写法，但是Prototype不支持，Prototype的子类永远是从Class的create方法中返回的，所以Ext的继承写法有两种：
{% highlight javascript %}
Ext.extend(superClass,overrides)
Ext.extend(subClass,superClass,overrides)
{% endhighlight %}

可是通过查看Extjs的源代码，我发现子类如果之前原型上有方法会丢失，因为在执行extend函数之后，子类的原型被替换了，而之前原型上的数据没有备份下来，所以在extjs中要传两个类来继承的时候必须保证子类之前原型上没有数据,从extjs中的源码类的实现中可以看到这一点：
{% highlight javascript %}
    Ext.data.Connection = function(config){
        Ext.apply(this, config);
        this.addEvents(

            BEFOREREQUEST,

            REQUESTCOMPLETE,

            REQUESTEXCEPTION
        );
        Ext.data.Connection.superclass.constructor.call(this);
    };

    Ext.extend(Ext.data.Connection, Ext.util.Observable, {
    });
{% endhighlight %}
上面代码中Connection类是不能在它的prototype中放入数据的。
所以在extjs中没有必要用三个参数来调用extend，直接传入超类，然后在第二个参数的Json里面写一个子类的构造函数constructor就可以了。

在上面的代码中我们没有写子类如何调用超类的方法，extjs把超类的原型放在了子类的superclass属性中，而Prototype是直接把超类放在子类的superclass中，所以在extjs中要访问超类构造函数用SubClass.superclass.constructor，访问原型上的其他方法就用SubClass.superclass.otherMethod，
在prototype中似乎就可以使用Subclass.superclass来访问超类构造函数，其他方法用Subclass.superclass.prototype.otherMethod，这是不行的，因为构造函数用了委托，导致this.initialize无限递归,所以在prototype中用了另外一个技巧来实现，请看：
{% highlight javascript %}
var SubClass = Class.create(SuperClass, {
  subMethod: function($super) {
    return $super();
  }
});
{% endhighlight %}
子类方法如果希望访问父类的方法就在参数中加入一个$super变量，prototype内部把函数变形了，将和子类同名的超类函数直接在运行时通过变量传递了进来。

对于Ext.extend和Class.create的源代码都有惊人的相似之处，我们简单对比一下：

{% highlight javascript %}

//extjs中用干净函数嫁接原型的代码
var F = function(){},sbp,spp = sp.prototype;
F.prototype = spp;
sbp = sb.prototype = new F();
sbp.constructor=sb;

//prototype中对应的代码
function subclass() {};
subclass.prototype = parent.prototype;
klass.prototype = new subclass;
klass.prototype.constructor = klass;

//extjs中建立父子关系的代码
sb.superclass=spp;
sbp.superclass = sbp.supr = (function(){return spp;});

//prototype中对应的代码
klass.superclass = parent;
f (ancestor && Object.isFunction(value) && value.argumentNames()[0] == "$super") {
     var method = value;
     value = (function(m) {
       return function() { return ancestor[m].apply(this, arguments); };
     })(property).wrap(method);
}

//extjs中提供自扩展的代码
sb.override = function(o){
   Ext.override(sb, o);
};
//prototype中相应的代码
Object.extend(klass, Class.Methods);
Methods: {
      addMethods: addMethods
}
{% endhighlight %}

