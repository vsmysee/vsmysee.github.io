---
layout: article
title: JS的原型链和OO模拟
---

原型Prototype是一个设计模式，但是也可用来设计继承，它有自己的简单性，可以模拟出面向对象功能，但是在设计
复杂的继承层次的时候比较蹩脚。
在JS中要实现复杂的面向对象模型，需要自己做大量的工作，先研究和检验JS的原型链和构造函数，原则上不需要构造函数和类也是可以OO的

1，定义一个类,在JS中，定义类，是定义一个函数，最重要的是函数的原型，如果这个函数被new了一下，原型就起作用

{% highlight javascript %}
/**
 * 定义一个构造函数Plane，这个时候Plane的prototype指向了一个Object构造出来的对象，同时有一个constructor属性指回Plane
 * 这个构造函数在和new一起被执行的时候，会传入一个由Object构造的干净对象作为this，当然还有其他参数，在真正执行代码之前
 * 就已经介绍构造函数的prototype给新对象让他们关联起来，然后执行构造函数中的代码，一般做数据初始化而不放置方法
 * @param x
 * @param y
 */

var Plane = function(x, y) {
    //检验是否设置原型 true
    alert(this.__proto__ == Plane.prototype);
    this.x = x;
    this.y = y;
};

//静态字段
Plane.STATIC_FIELD = 2;

//静态方法
Plane.staticFunction = function() {
    alert(Plane.STATIC_FIELD);
}

//检验构造函数上的prototype的constructor是否等于构造函数  true
alert(Plane.prototype.constructor == Plane);

/**
 * 在原型上设定一个方法，这样每个实例都共享这些方法
 */
Plane.prototype.XY = function() {
    alert(this.x * this.y);
};

//实例化对象
var planeObject = new Plane(2, 3);

//Object的protype上的原型链为空 true
alert(Object.prototype.__proto__ == null);

//检验构造函数的prototype上的对象的原型是否是Object的prototype上的对象  true
alert(Plane.prototype.__proto__ == Object.prototype);

//检验实例对象的原型是否是构造函数的prototype   true
alert(planeObject.__proto__ == Plane.prototype);

planeObject.XY();
Plane.staticFunction();
{% endhighlight %}

2，继承这个类

{% highlight javascript %}
/**
 * 如果要实现继承结构，超类的不变量需要维护，在JS中，如果只是从Object继承，不需要维护，因为Object中根本没有属性，当然除了那个constructor
 * Java的Object也是只有方法，没有属性的
 * 现在如果我们要继承Plane，首先构造对象的时候需要调用超类的构造函数构造超类那一部分
 * 上面我们可以认为Plane是Object的子类，特点就是Plane的prototype是Object构造的，那么要让一个类成为Plane的子类，新类的prototype也需要是Plane构造的
 * 问题来了，从Plane构造出来那个对象_proto_肯定指向Plane.prototype，但是可能会在对象上设置Plane初始的一些数据，而我们只希望继承行为，所以存在两种方法：
 * 1，手动delete掉
 * 2，用一个干净函数做嫁接，我们的最终目的是:要一个新对象，它的_proto_指向Plane的prototype,它的 constructor指向新构造函数,我们当然希望
 直接将Plane的原型设置在_proto_上，但是js是不允许的，所以要通过函数构造的方式，第一种会留有垃圾数据，采用第二重把Plane的prototype取出来放到一个干净的函数上，用那个函数
 构造一个对象，然后再对构造出来的对象设置constructor就完美了，这也是Ext的做法
 */

var Space = function(x, y, z) {
    //用this调用超类构造函数
    Plane.call(this, x, y);
    //this.super(x, y);

    this.z = z;
};


/**
 * 要让Space继承Plane，需要让Space的原型是Plane的实例,现在我们是在手动设置原型，这原本JS引擎做的事
 *
 */
Space.prototype = new Plane();

//在子类的原型上放一个不变的属性指向超类，这种方法，如果多于两次继承，当this.super走到超类构造函数，因为this.super始终指向这个超类，所以会无限递归
Space.prototype.super = Plane;

/**
 * 我们只希望继承方法和不变量，所以要删除超类自身的数据字段，虽然那些字段的值是undefined
 */

alert(Space.prototype.x); //undefined

delete Space.prototype.x;

delete Space.prototype.y;


/**
 * 原型除了是个对象，还有个constructor指向它所在的函数，所以要设置这个值
 */
Space.prototype.constructor = Space;

/**
 * 子类覆盖父类进行装饰
 */
Space.prototype.XY = function() {
    alert("Before Invoke Super Method");
    Plane.prototype.XY.call(this);

}

Space.prototype.XYZ = function() {
    alert(this.x * this.y * this.z);
}

var spaceObject = new Space(2, 3, 4);

//调用覆盖的方法
spaceObject.XY();

//调用自身的方法
spaceObject.XYZ();
{% endhighlight %}


3，使用干净函数做嫁接实现原型继承

{% highlight javascript %}
//一个干净函数做嫁接，第二种方法
var F = function() {
}
//嫁接过去
F.prototype = Plane.prototype;
Space.prototype = new F();
{% endhighlight %}

