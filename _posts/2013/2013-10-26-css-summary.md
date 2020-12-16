---
layout: article
title: CSS摘要
---
http是一个超文本传输协议，刚开始只是用来做非常简单的文档请求响应服务，无状态，html也还完全是一个文档标记语言，比如标记标题，段落或者基本的表格列表结构，那个年代实现一个浏览器真的是相当简单，
可是网页最终是要呈现的，我们的眼睛始终不知足，于是我们不单纯只追求文本内容而是要求网页更加漂亮，于是图片，声音，视频等多媒体数据被加入了进来，浏览器呢从刚开始只负责呈现数据到现在又被要求能够实现用户提交数据，于是http协议又开始支持表单。

网页的元素多了就必须考虑怎么布局这些元素，这个时候人们把table这个本应负责呈现结构性数据的标签挖了出来，让他既负责呈现又负责布局，后来人们发现，通过table搞出来的网页越来越乱，不可维护，改动一处动全身，这是懒人程序员不可
原谅的，所以人们开始构思引入简介层，通过单一职责原则引入了css，html应该回到原始的只负责提供数据而不需要负责数据的呈现方式和布局，table只应负责显示表格数据，所有的样式呈现都通过css来解决。

样式可以写在head中，可以在元素标签上，可以通过外部文件载入，那么就涉及到优先级的问题，从低到高排列是:

1. 浏览器缺省设置
2. 外部样式表
3. 内部样式表（位于 head 标签内部）
4. 内联样式（在 HTML 元素内部）
由于js可以操作元素的样式，这部分的样式是必须内联的，所以优先级最高。

css的目的是将内容和表现分离，而内容由html负责标记，html目前有两个版本，一个是html4,一个是html5，前者单纯是标记语言，后者引入了更多元素以更好的语义化网页，比如本博客就使用section,article等语义化标签，html所标记的元素
我们通过分析，有些是唯一的，所以要分配一个ID身份证号给它，以便样式和脚本能够准确高效的找到它，有些我们发现一批元素的样子可以统一归为一类，比如都有有相同的字号，相同的颜色，相同的加粗样式和相同的边框，这个时候我们就统一为这些
元素的html标记上加入一个类名，ID在css中用#作为前缀，类名用.作为前缀。

html元素分为两类，一类是块(block)结构，一类是行(inline)结构，他们在css中表现的都是一个矩形框，块框在浏览器中占据整行，行框在浏览器一行内排列，块元素有h[1-6],p, ul, table，pre,form,ol。行元素有b, td, a, img,
注意两个特殊的元素div,span，前者用来对块框分组，后者用来对行框分组。使用div要根据条目的意义和功能而不是它的表现方式和布局，没有必要这样写
{% highlight html %}
<div><ul></ul></div>
{% endhighlight %}

因为ul本身是一个块框，如果这样写了就得了多div症，如果一个html文档中ID和类都很多，则可能是文档结构不合理的信号，ID请确保元素是唯一的，类名应该放置在div,span这种分组元素上，然后子元素不要再起类名，而是通过css的子选择器来应用样式。相对于html，css也有两个版本，一个是css2,一个是css3，css3用声明式的方式完成了以前css2需要得配合脚本或者需要很复杂的实现方式的样式。
当一个行内标签与块级标签相邻的时候，行内标签也表现为像块级一样可以独占一行，这时的行内标签称之为“隐式块级”。

一个html文档中的元素要么指定了ID或者类名，要么什么都没指定，我们怎么通过css选择这些元素来应用表现样式呢？也许你应该想到了，也就是三种，类似如下结构
{% highlight css %}
/** 直接选定html标签，这个范围很大 */
div { color:black;}
/** 通过ID选择，精确定位 */
#main {color:black }
/** 选定一类对象，范围也很大 */
.profile {color:black}
{% endhighlight %}
这三种选择是所有复杂选择的基础，其他的选择都是通过组合这三种的，找准基本规则，然后再组合这是计算机科学的基本原理，屡试不爽，比如你可以用三种程序结构实现任何程序，你可以只用布尔方程实现任何算法。物理世界也一样，
我们通过红，绿，蓝可以组合任何的颜色。那么样式可以怎样组合呢？
{% highlight css %}
div#main { color:black;}
div#profile { color:black;}
#main div {color:black }
#main .profile {color:black}
.profile div {color:black}
.profile#main{color:black}
{% endhighlight %}
当两个选择器用空格分开，表示后代选择器，也就是前面那个选择器先选择范围，范围内的所有后代满足第二个选择器的就应用此样式，后代的意思是子子孙孙，除了用空格组合，还可以用通过,>,+这三个符号组合，比如
{% highlight css %}
#nav>li /** 只选择儿子 */
h2+p /**选择h2之后的第一个的同胞 */
h2,p /** 表示h2,p应用相同的样式 */
{% endhighlight %}
有一个特殊的选择器叫做*，他是通配，比如 * {padding:0}，复杂的还有基于属性的就不介绍了

上面的所有选择器都是静态应用，而还有一种需要动态应用，比如我鼠标悬停在某个元素上用什么样式，这需要用伪类，比如a:link,a:visited,a:hover,a:focus,a:active。link和visited只能用在锚元素上。伪类
又可以组合，比如a:visited:hover {color:olive;}


css负责表现的一个重要基础，盒模型，我们知道所有元素都是一个矩形框，我们自己画一个矩形，线条的粗细表示这个矩形的边框，在css模型中，边框的里外还有一个内边距和外边距，内边距之内才是
元素真正的内容空间，看下图：
![css 盒模型](/images/cssbox.gif)
css2.1还有一个轮廓outline，这个不影响盒模型的大小和定位，内外边距和边框默认是0，css中width和height表示内容区域的宽度和高度，整个矩形框的高度和宽度由三者加起来，外边距甚至可以为负值。
但是在IE6中，它有自己的盒模型，它的width不是指内容宽度，而是总和，所以要解决这个问题就是不要给元素指定宽度和内边距来绕过。

普通文档流中的块框的垂直外边距会发生叠加，边距由大的一个决定，这样做是有道理的，假如p上边距是20px，因为p是块框，多个p如果不叠加就会拉长整个文档。注意行框，浮动框和绝对定位框是不会出现叠加的。
明白了网页由矩形构成我们就可以来做定位了，所有的矩形会按照的默认的定位布局，也就是说块框垂直向下，行框按行定位，行框和块框我们可以通过css的display属性值block和inline-block进行切换，如果把display设置为none就表示
这个元素没有了框，不再显示同时不占用文档空间，和display对比有一个visibility属性，它如果设置为hidden表示隐藏，但是它还是会占据空间。

行框的高度由行高决定，它的真实高度是行内框最高的那个，行框元素的垂直边框，内边距，外边距都不起作用，修改行框的尺寸只能通过行高和水平边框，内外边距，但是inline-block块又可以使用垂直属性。一个框可以在普通流中被浏览器布局，我们也可以手动指定某种定位，
有四种方法，分别是固定，相对，绝对和浮动，单纯通过字面意思还不能理解的，我们分别解释：

相对，绝对和固定其实都是相对，因为他们都需要找一个相对对象，相对定位的相对对象是自己，通过设置top,left来相对自己的原位置偏移，固定定位相对于浏览器的可视窗口而不是文档，我们通常看到浏览器旁边
无论鼠标怎么滚动，他们都稳坐钓鱼台的就是固定定位，绝对定位相对于包含它已经有定位的最近的块框，注意是已定位，如果它外层都没有定位的块框，那么它就会相对于初始包含块，因为绝对定位非常有用，我们经常为了利用它而把一个祖先设置为相对定位，其实这这个祖先
不要相对移动，绝对定位的块脱离了文档流，所以可能重叠在其他元素上，所以要注意z-index。我们甚至可以只用绝对定位而创建整个设计，但是浮动定位比它更灵活。

浮动框也不在文档流中，所以文档中普通框感知不到浮动框的存在，浮动框左右飘动，直到碰到其他浮动框或者包含框的边缘，就像流动的物体，像一个方向流动，直到碰到阻碍，浮动框虽然脱离了文档流，但是如果周围框有文本内容，那么文本内容会感知到它，浮动框会把行框缩短这样可创建文本围绕图像的效果。
也就是说浮动层的投影位置不能放内容，要想阻止行框围绕在浮动框周围，需要对包含这些行框的元素应用clear属性，值可以取left,right,both,none,对元素进行清理的本质是对前面的浮动元素留出垂直空间。浮动框不是重叠的，它会占用行框而绝对定位框是重叠的。
浮动能使得块级标签排在同一行，但由于浮动脱离了文档位置，因为假如浮动层有一个不浮动的父亲层，父亲层是包不住浮动层的，就得清除浮动。


***知道定位之后，通常单独使用left、right、top、bottom均无效，因为如果一个框在普通流没有定位，那么就像人潮中的人，推推嚷嚷，自己选择left,right偏移首先自己确定了定位才有意义。同时z-index这个属性也实在矩形块有了定位之后才有意义***

对于浮动清理，一般有四种方法，

1. 给父亲层加一个子层div class="clear"  其中 .clear{clear:both;}
   缺点：多一个空节点
2. 给父亲层加一个高度
   缺点：不适合内容高度不确定的情况
3. 给父亲层加一个float属性
   缺点：不适合父亲层需要居中的情况
4. 给父亲层加 overflow:hidden; _height:1%;
   缺点：_height:1%;的写法不符合W3C规范
以上四种方法，假如内容确定的话，优先考虑方法 2, 然后才是方法 1和方法 4一般不考虑方法 3


还有一种方法是使用一种伪类和内容声明技术来写一个类，所以要执行清理的元素只要加上这个类就可以清理两旁的浮动框，本博客使用的就是这样的写法，代码如下
{% highlight css %}
.clearfix:after, .clearfix:before {
    clear: both;
    content: ".";
    display: block;
    font-size: 0;
    height: 0;
    visibility: hidden;
}
.clearfix {
    zoom: 1;
}
{% endhighlight %}

明白了块和盒子模型，我们就可以总结其他细节了，浏览器以盒子为单位通过样式定义控制各种表现细节，首先可以给这个盒子上背景，背景应用在盒子的内容和内边距组成的区域，背景可以用背景色和背景图，当背景图用在框上的时候就会出现
如果背景图大于框和小于框的情况，如果大于框，我们要用坐标来取部分区域，如果是小于框的就要考虑重复以及居中，重复又氛围垂直和水平，背景图默认会平铺，背景色可以设置透明度。


设置好盒子的背景色表现之后就是设置真正盒子内容的表现，内容就是网页的信息，包括文本，图片，音频，视频，同时这些信息还可能存在结构，比如列表，表格，列表又分为无序和有序，通常我们用列表来实现网站的导航条，还有一类特殊的元素
那就是表单元素，他们被form这个块元素分组。