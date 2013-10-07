---
layout: article
title: 理解Extjs的Ext.extend函数
desc: 继承是面向对象的核心概念，在js中来实现很有意思，我从java这门OO语言开始说明继承，然后再用js来实现
---

在Java中，我们在实现继承的时候存在下面几个事实：

1， 准备两个类，他们用extends关键字链接起来

2， 如果超类没有默认构造函数，需要在子类构造函数中显式的super并传参，如果都是默认构造函数也可以super，不super虚拟机是自动的

3， 子类可追加，覆盖，重载方法，子类可以有自己的私有属性，他们在子类构造函数中被构造

4， 字段是数据，方法在代码区，和类建立方法表，同一个类的对象有自己的数据但是共享方法代码

 

比如有两个类，Plane和Space，Plane表示平面，Space表示空间，Space是Plane的子类，在java中
{% highlight java %}
/**
 * 根据字段数量分配内存块
 * 实例化的时候虚拟机调用Plane.Plane方法把这个内存块作为this和构造参数传进去，初始化完数据字段。
 * 建立方法表映射
 */

class Plane {

    protected int x;

    protected int y;

    Plane(int x, int y) {
        this.x = x;
        this.y = y;
    }

    public void XY() {
        System.out.println(x * y);
    }
}
/**
 * 自动拥有了超类的行为，但是超类的属性需要超类去构造
 * 子类可构造自己的属性，添加自己的方法，覆盖超类的方法
 * <p/>
 * 按照继承结构的所有字段分配内存块，调用Space.Space将这个内存块作为this和参数一起传进去
 * 把超类的那部分给超类，然后自己初始化自己的。
 * <p/>
 * 建立方法表
 */
class Space extends Plane {

    private int z;

    Space(int x, int y, int z) {
        super(x, y);
        this.z = z;
    }

    public void XYZ() {
        System.out.println(x * y * z);
    }
}

public class Test {

    public static void main(String[] args) {
        Plane plane = new Plane(2,3);
        plane.XY();

        Space space = new Space(2, 3, 4);
        space.XYZ();

    }
}
{% endhighlight %}

那么在js中也一样，区别是代码要放到构造函数（可以理解为Java中的类）的原型上，原型是放置方法和不变属性的理想场所，原型是一个对象，它和普通对象唯一不同的就是他有一个constructor属性指向它所依附的构造器，在java中子类查找属性和方法是通过虚拟机来完成，但是在js中需要通过原型链来完成。也就是说继承关系对程序员是不透明的，需要了解这个原型机制，原型机制上存在两条链，一是原型链，二是构造函数链。
仿照上面java的代码，我们可以完成js的写法，如下：
{% highlight javascript %}
var Plane = function(x, y) {
    this.x = x;
    this.y = y;
};

Plane.prototype.XY = function() {
    alert(this.x * this.y);
};

var Space = function(x, y, z) {
    //用this调用超类构造函数,没有java的super自动调用，所以要手动调用
    Plane.call(this, x, y);
    //Space.superclass.constructor.call(this, x, y); 可以用一个统一的语法
    //构造自己的数据
    this.z = z;
};

Space.prototype.XYZ = function() {
    alert(this.x * this.y * this.z);
}
{% endhighlight %}

JS中函数的this指函数的调用者，不管是java还是js，this都可理解为新分配的那段容纳对象的内存。在java 中通过Space extends Plane，虚拟机就维护好了他们的继承关系以完成继承关系的自动查找，但是在js中需要我们手动的处理，在这个时候Space是调用不到XY这个方法的，因为他们没有在原型链上。我们可以开发一个函数来模拟java的关键字extends，比如这个函数叫做extend,通过执行extend(Plane,Space)完成原型链的组装。

那么extend怎么实现呢?首先要明白原型链，子类和父类在原型链上的关系是Space.prototype._proto_ == Plane.prototype，如果你理解不了，那就看String这个类吧，String.prototype._proto_ == Object.prototype，即String的原型会链接到Object的原型上，链接是通过_proto_这个属性来完成的。_proto_是一个只读的属性，只能通过构造函数写入，所以String是Object的子类。

现在Plane的prototype._proto_ 等于Object，Space的prototype._proto_也等于Object，我们要在extend函数变换这个关系，即完成Space.prototype._proto_ == Plane.prototype，我们知道一个对象的_proto_要指向某个构造函数的原型，需要让这个对象由那个构造函数构造，那么我们只需要让Space.prototype = new Plane()就可以了，这个时候Space.prototype._proto_ == Plane.prototype，而不再指向Object，原型还有一个属性constructor指向原型所在的构造器，由于Space.prototype刚被Plane创建出来，还没有这个属性，我们要手动赋值上去，代码是Space.prototype. constructor = Space。这样extend的责任就完成了。


但是这里有两个问题：

1， 由于Space的原型在extend中被替换了，那么它原有的方法就没有了。

2， Space的原型是Plane构造的，虽然做到了Space.prototype._proto_ == Plane.prototype，但是Plane也在原型上写入了x,y这两个垃圾数据，他们都是undefined，没有意义，所以要手动删除掉，这样extend这个方法就不能通用了。

 

首先解决第一个问题，我们要变化一点思路，利用js中函数也是数据的特性，我们把Space的那些方法拷贝到一个对象中，比如
var sbm= { XYZ  : function() {

    alert(this.x * this.y * this.z);

}

 };

把这个sbm也传递给extend，extend在替换完原型后将sbm上的所有方法复制到Space的原型上即可,sbm是一个对象直接量，用json语法。现在的extend就变为了三个参数，即extend(sb,sp,sbm)，sb是子类，sp是超类，sbm是子类要放到原型上的方法。


对于第二个问题，本质原因是Plane这个函数要完成一些数据初始化，它是超类，我们不能控制，我们只关心Plane的原型而不关心它构造什么数据，所以我们可以把它的原型单独拿出来，再定义一个干净的函数，这个函数不做任何事，将这个干净函数的原型设置为Plane的原型，再用这个干净函数构造一个对象，这样出来的对象就是是干净的，也完成了_proto_指向了Plane.prototype，完美！有了这两个方法，我们就可以开始实现这个extend，代码如下：
