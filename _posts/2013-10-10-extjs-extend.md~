---
layout: article
title: 从Java角度理解ExtJs的extend函数
desc: 继承在OO语言中可以很自然的表达，但是在Js这种原型语言中表达需要有另类的方式
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
{% highlight javascript %}
var sbm= { XYZ  : function() {

    alert(this.x * this.y * this.z);

}
{% endhighlight %}

把这个sbm也传递给extend，extend在替换完原型后将sbm上的所有方法复制到Space的原型上即可,sbm是一个对象直接量，用json语法。现在的extend就变为了三个参数，即extend(sb,sp,sbm)，sb是子类，sp是超类，sbm是子类要放到原型上的方法。


对于第二个问题，本质原因是Plane这个函数要完成一些数据初始化，它是超类，我们不能控制，我们只关心Plane的原型而不关心它构造什么数据，所以我们可以把它的原型单独拿出来，再定义一个干净的函数，这个函数不做任何事，将这个干净函数的原型设置为Plane的原型，再用这个干净函数构造一个对象，这样出来的对象就是是干净的，也完成了_proto_指向了Plane.prototype，完美！有了这两个方法，我们就可以开始实现这个extend，代码如下：
{% highlight javascript %}
var extend = function(sb, sp, sbm) {
    var F = function() {
    },sbp,spp = sp.prototype;

    F.prototype = spp;

    //用干净函数嫁接得到子类原型
    sbp = sb.prototype = new F(); 

    sbp.constructor = sb; //然后指定一个constructor指回子类 

         //把sbm的上的属性拷贝到子类的原型上
        for (var p in sbm) {
        sbp[p] = sbm[p];
    }
};
{% endhighlight %}

那么完成Space继承Plane的代码如下：
{% highlight javascript %}
extend(Space, Plane, {
            XYZ : function() {
                alert(this.x * this.y * this.z);
            }
        });

var spaceObject = new Space(2, 3, 4);

spaceObject.XY();//成功调用超类方法
spaceObject.XYZ();
{% endhighlight %}

OK，到了这里，我们基本上就完成任务了，完全从java的方向搞定的。我们现在利用js的特性来优化，让使用extend更加简单。


我们说在java中必须写两个类，每个类都写自己的字段 ，构造函数，方法等，在我们实现的extend函数中也确实把子类，父类都传递了进来，但是我们多了一个参数，那就是子类的方法集合即sbm，第一个参数sb本身也是函数，那是不是可以将这个函数也放进sbm传进来呢？这样extend就变为两个参数，即extend(sp,sbm)，现在extend返回一个函数，返回的这个函数就是sp的子类，这是完全可行的，我们叫做extend2吧。
{% highlight javascript %}
var extend2 = function(sp, sbm) {
    var sb = sbm.constructor;
    //如果说没有显式的构造函数，那么子类就是直接调用超类构造函数
    if (sb == Object) {
        sb = function() {
            sp.apply(this, arguments);
        };
    }
    extend(sb, sp, sbm);
    return sb;
}
{% endhighlight %}
我们说要把子类的构造函数放到sbm上，放上去的key叫做constructor，就表示构造器，js中每一个对象都一个constructor属性，它指向构造了这个对象构造函数。sbm本来是个Object对象，它的constructor就指向Object，这个constructor是在sbm关联的那个原型上的，现在我们在sbm上设置某个子类的构造函数，这个时候表示sbm有个自己的constructor。

现在我们在extend2中要做的事情就是提取出构造函数，然后还原为三个参数去调用之前的extend，在java中我们的子类是可以不用构造器的，只要父类也有默认的构造器，那么在这里一样，sbm可能不包含constructor，那么我们需要做一个函数，它调用父类的构造函数，在java中这种情况过程是自动的。所以当sbm.constructor为Object的时候表示sbm没有指定构造函数，这个时候将
{% highlight javascript %}
sb = function() {

            sp.apply(this, arguments);

        };
{% endhighlight %}

即调用父类构造函数。这样将sb,sp,sbm传递给extend就可以了。

这个时候我们新的继承语法如下：
{% highlight javascript %}
var NewSpace = extend2(Plane, {
            constructor : function(x, y, z) {
                Plane.call(this, x, y);
                this.z = z;
            },
            XYZ : function() {
                alert(this.x * this.y * this.z);
            }
        });

var newObject = new NewSpace(3, 4, 5);
newObject.XY();
newObject.XYZ();
{% endhighlight %}
和prototype.js和mootolls的实现比较，大同小异
{% highlight javascript %}
// properties are directly passed to `create` method
var Person = Class.create({
  initialize: function(name) {
    this.name = name;
  },
  say: function(message) {
    return this.name + ': ' + message;
  }
});

var Animal = new Class({
                initialize: function(age) {
                    this.age = age;
                },
                say : function() {
                    alert(this.age);
                }
            });

    var Cat = new Class({
                Extends: Animal,
                initialize: function(name, age) {
                    this.parent(age); // calls initalize method of Animal class
                    this.name = name;
                }
            });
{% endhighlight %}

到了这里其实已经差不多了，但是细心的读者会发现，我们在extend中会把sbm的所有属性拷贝到子类的原型上，这里岂不是就要把constructor也拷贝到原型上？如果sbm包含了这个constructor其实就无所谓，因为子类的原型的constructor本来就是需要指向这个构造函数的，但是sbm上没有constructor那岂不是要把Object拷贝到子类原型上，答案是不会的，我们在拷贝的时候用的for in循环是迭代不出默认的那个constructor的。
 

现在我们来看看Ext.extend，应该完全没有问题了。我们用了两个方法extend,extend2，Ext把它合并为了一个方法Ext.extend，所以它会判断传进来的参数然后进行变换，这样Ext.extend就支持两个参数和三个参数进行调用。对于前面用到拷贝属性，Ext做了一个工具函数叫做Ext.apply，对于将一个对象的属性拷贝到一个类的原型上，Ext做了一个工具类叫做Ext.override。
{% highlight javascript %}
Ext.extend = function() {
    // inline overrides 把传入的对象属性复制到到this中
    var io = function(o) {
        for (var m in o) {
            this[m] = o[m];
        }
    };
    //oc其实就是Object函数
    var oc = Object.prototype.constructor;

    return function(sb, sp, overrides) {
        //如果第二个参数是个对象而不是类，那么是用两个参数调用的，第一个参数是父类，第二个参数是对象
        if (typeof sp == 'object') {
            overrides = sp;  //将第三个参数换为对象
            sp = sb; //把第一个参数赋值第二个当成父类
            sb = overrides.constructor != oc ? overrides.constructor : function() {
                sp.apply(this, arguments);
            }; //子类这个构造函数要么是外界传入的名字为constructor，要么就是直接调用超类构造函数的一个函数
            //传入的constructor除了构造自己还要调用超类的构造函数
        }

        /**
         * 继承的两种参数
         * 1,自己写一个构造函数，初始化一些字段，然后调用超类构造函数，再写一个json对象，里面是要覆盖超类的方法或者追加的方法
         *   然后这样调用extend(sub,sup,{over1:f,over2:f,addf:f})，就像java的语法
         *   SubClass extend SuperClass {
         *      SubClass(){
         *        super();
         *      }
         *   }
         *
         *   2,第一种可以理解为模拟java，但是因为构造函数也是数据，所以完全可以把构造函数也放进那个jdon对象，只不过约定好一个名字
         *   比如constructor,然后这样调用
         *   extend(sup,{constructor:f,over1:f,over2:f,addf:f})
         */
        var F = function() {
        },
                sbp,
                spp = sp.prototype;

        F.prototype = spp;
        sbp = sb.prototype = new F();
        //以上用干净函数嫁接得到子类原型

        sbp.constructor = sb; //然后指定一个constructor指回子类,这样就大工告成

        sb.superclass = spp; //在子类上指定一个静态字段指向超类原型,这样在子类构造函数中可访问超类构造函数sub.superclass.constructor.call(this, config)

        /**
         * 这段代码是防御性的，在自己实现继承的时候，可能会出现原型上的构造函数指向问题，所以如果发现某个超类
         * 的构造函数是object，要么这个超类却是Object，要么出现了失误，所以这里再一次重设置一下，以防万一，这个代码我们在分析Ext的Observable的时候会提到的它的作用
         */
        if (spp.constructor == oc) {
            spp.constructor = sp;
        }

        //子类上方一个静态的重写方法，注意js没有重载，可以用来重写子类原型上的函数
        sb.override = function(o) {
            Ext.override(sb, o);
        };

        //用一个闭包在子类原型上引用一个超类原型,引用的是一个函数
        sbp.superclass = sbp.supr = (function() {
            return spp;
        });

        //子类原型上放置一个重写函数，可以用来覆盖具体实例对象
        sbp.override = io;

        //在子类原型上重写或添加函数
        Ext.override(sb, overrides);

        //子类上直接放一个静态继承方法，貌似实现多继承
        sb.extend = function(o) {
            return Ext.extend(sb, o);
        };

        return sb;
    };
}();
{% endhighlight %}

现在使用Ext的extend来实现我们之前的继承代码就如下
{% highlight javascript %}
var Plane = function(o) {
        this.x = o.x;
        this.y = o.y;
    };


    Plane.prototype.XY = function() {
        alert(this.x * this.y);
    };

    var Space = Ext.extend(Plane, {
                constructor : function(o) {
                    Space.superclass.constructor.call(this, o);
                    this.z = o.z;
                },
                XYZ : function() {
                    alert(this.x * this.y * this.z);
                }
            });

    var space = new Space({ x:2,y:3,z:4});

    space.XY();
    space.XYZ(); 
{% endhighlight %}

这就是extjs的继承函数的本质，明白它的前提是对js原型链条的理解和函数可以像变量一样传递的函数性。

