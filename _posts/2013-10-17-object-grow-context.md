---
layout: article
title: 面向对象中的对象是可以生长的
tags:
- jekyll
- code
---

曾经看过一个js牛人写的悟透JavaScript博文，我虽没深入研究过Js，但是被里面的一段代码震撼了，同时又结合Jdon上的DCI讨论，我渐渐的明白，贴近用户的心智模型，这个理念，很雅很强大，我的思维方式也在这个地方小小的转了个弯。

在JS中是不需要类而直接写出对象直接量的，比如 

{% highlight javascript %}
var me = {
	name : 'oojdon',
	email:'vsmysee@gmail.com'
}
{% endhighlight %}

喂点食物让这个对象长大
{% highlight javascript %}
var life = {};
for(life.age = 1; life.age <= 3; life.age++) {
        switch(life.age)
        {
            case 1: life.body = "卵细胞";
                    life.say = function(){alert(this.age+this.body)};
                    break;
            case 2: life.tail = "尾巴";
                    life.gill = "腮";
                    life.body = "蝌蚪";
                    life.say = function(){alert(this.age+this.body+"-"+this.tail+","+this.gill)};
                    break;
            case 3: delete life.tail;
                    delete life.gill;
                    life.legs = "四条腿";
                    life.lung = "肺";
                    life.body = "青蛙";
                    life.say = function(){alert(this.age+this.body+"-"+this.legs+","+this.lung)};
                    break;
        };
        life.say();
};
{% endhighlight %}

也许这样才叫写程序吧，表达得酣畅和干脆


###没有类

object就是对象的类型。在JavaScript中不管多么复杂的数据和代码，都可以组织成object形式的对象。

但JavaScript却没有 “类”的概念！

对于许多面向对象的程序员来说，这恐怕是JavaScript中最难以理解的地方。是啊，几乎任何讲面向对象的书中，第一个要讲的就是“类”的概念，这可是面向对象的支柱。这突然没有了“类”，我们就象一下子没了精神支柱，感到六神无主。看来，要放下对象和类，达到“对象本无根，类型亦无形”的境界确实是件不容易的事情啊。

这段JavaScript程序一开始产生了一个生命对象life，life诞生时只是一个光溜溜的对象，没有任何属性和方法。在第一次生命过程中，它有了一个身体属性body，并有了一个say方法，看起来是一个“卵细胞”。在第二次生命过程中，它又长出了“尾巴”和“腮”，有了tail和gill属性，显然它是一个“蝌蚪”。在第三次生命过程中，它的tail和gill属性消失了，但又长出了“四条腿”和“肺”，有了legs和lung属性，从而最终变成了“青蛙”。如果，你的想像力丰富的话，或许还能让它变成英俊的“王子”，娶个美丽的“公主”什么的


###我们一定需要类吗？

还记得儿时那个“小蝌蚪找妈妈”的童话吗？也许就在昨天晚，你的孩子刚好是在这个美丽的童话中进入梦乡的吧。可爱的小蝌蚪也就是在其自身类型不断演化过程中，逐渐变成了和妈妈一样的“类”，从而找到了自己的妈妈。这个童话故事中蕴含的编程哲理就是：对象的“类”是从无到有，又不断演化，最终又消失于无形之中的...

“类”，的确可以帮助我们理解复杂的现实世界，这纷乱的现实世界也的确需要进行分类。但如果我们的思想被“类”束缚住了，“类”也就变成了“累”。想象一下，如果一个生命对象开始的时就被规定了固定的“类”，那么它还能演化吗？蝌蚪还能变成青蛙吗？还可以给孩子们讲小蝌蚪找妈妈的故事吗？

所以，JavaScript中没有“类”，类已化于无形，与对象融为一体。正是由于放下了“类”这个概念，JavaScript的对象才有了其他编程语言所没有的活力。如果，此时你的内心深处开始有所感悟，那么你已经逐渐开始理解JavaScript的禅机了。

