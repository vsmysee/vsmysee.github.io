---
layout: article
title: 那些中国程序员
---
这篇文章搜集了我已知范围内的中国程序员简介，这些人有些开源了自己的程序作品，有些是写了牛逼的书，了解这些人的牛逼之处方可反衬自己的不足，这些人有些我是看到真人的，有些只能通过互联网默默瞻仰.

### 彭晨阳(banq)
见过真人，对我职业生涯影响最大，让我认识到独立思考的重要性

* 开源作品 JdonFramework/JiveJdon
* 网站(www.jdon.com)

{% highlight java %}
public interface ComponentVisitor extends Serializable{
  Object visit();
  SessionContext createSessionContext();
}
{% endhighlight %}

### 周爱民
见过真人，读他的书让我对程序的三观有很多改变

* JavaScript语言精髓与编程实战作者
* Qomo框架开源程序

{% highlight javascript %}
 _import.OnSysInitialized = function() {
    delete _import.set;
    delete _import.get;
    delete _import.OnSysInitialized;

    if (typeof($profilers) !== 'undefined' && $profilers.ResetImport) $profilers.ResetImport();

    _import.setActiveUrl('');
  }
  {% endhighlight %}


### 郑晖

* 冒号课堂一书作者
* 个人博客(http://blog.zhenghui.org/)

{% highlight javascript %}
var app = {
    name: "1Pass4All",
    // the following may be modified by Makefile
    version: "0.2.x",
    homeUrl: "http://hzheng.github.com/1pass4all"
};
var debug = true; // will be turned off by make
{% endhighlight %}


### 郑晔
见过真人

* Moco框架作者
* http://dreamhead.blogbus.com/

{% highlight java %}
public final class Moco {
    public static HttpServer httpServer(final int port, final MocoConfig... configs) {
        checkArgument(port > 0, "Port must be greater than zero");
        return ActualHttpServer.createQuietServer(of(port), configs);
    }
}
{% endhighlight %}


### 王保平
见过真人,阿里花名玉伯，是淘宝前端类库 KISSY 的创始人，也是前端模块化开发框架 SeaJS 的创始人

* https://github.com/lifesinger

{% highlight javascript %}
var seajs = global.seajs = {
  // The current version of Sea.js being used
  version: "@VERSION"
}
var data = seajs.data = {}
{% endhighlight %}


### 江南白衣
SpringSide项目创始人

{% highlight java %}
@SpringBootApplication
public class BootApiApplication {
	public static void main(String[] args) throws Exception {
		SpringApplication.run(BootApiApplication.class, args);
	}
}
{% endhighlight %}


### 章文嵩
LVS作者

{% highlight c %}

int root_mountflags = MS_RDONLY | MS_SILENT;
static char * __initdata root_device_name;
static char __initdata saved_root_name[64];
static int __initdata root_wait;

dev_t ROOT_DEV;
{% endhighlight %}


### 司徒正美

* JavaScript框架设计作者
* https://github.com/RubyLouvre

{% highlight javascript %}
var VText = require('../vdom/VText')
var parseView = require('../strategy/parser/parseView')
var resolvedComponents = avalon.resolvedComponents
var skipArray = require('../vmodel/parts/skipArray')

var componentContainers = {wbr: 1, xmp: 1, template: 1}
var events = 'onInit,onReady,onViewChange,onDispose'
var componentEvents = avalon.oneObject(events)
var protected = events.split(',').concat('is','diff','define','cached')
{% endhighlight %}


### 温少

* 数据库连接池Druid
* Fastjson作者

{% highlight java %}
protected SQLTableConstraint parseConstraint() {
        if (lexer.token() == Token.CONSTRAINT) {
            lexer.nextToken();
        }

        if (lexer.token() == Token.IDENTIFIER) {
            this.exprParser.name();
            throw new ParserException("TODO");
        }

        if (lexer.token() == Token.PRIMARY) {
            lexer.nextToken();
            accept(Token.KEY);

            throw new ParserException("TODO");
        }

        throw new ParserException("TODO");
}
{% endhighlight %}


### 王志亮

* https://github.com/Qieqie
* Rose框架作者

{% highlight java %}
protected void supportsRosepipe(final HttpServletRequest httpRequest) {
        // 这个代码为rosepipe所用，以避免rosepipe的"Cannot forward after response has been committed"异常
        // @see net.paoding.rose.web.portal.impl.PortalWaitInterceptor
        Object window = httpRequest.getAttribute(RoseConstants.WINDOW_ATTR);
        if (window != null && window.getClass().getName().startsWith("net.paoding.rose.web.portal")) {
            httpRequest.setAttribute(RoseConstants.PIPE_WINDOW_IN, Boolean.TRUE);
            if (logger.isDebugEnabled()) {
                try {
                    logger.debug("notify window '"
                            + httpRequest.getAttribute("$$paoding-rose-portal.window.name") + "'");
                } catch (Exception e) {
                    logger.error("", e);
                }
            }
            synchronized (window) {
                window.notifyAll();
            }
        }
}
{% endhighlight %}


### 吴祖洋

### 云风

### 梁飞

### 赵劼

### 蔡景现

### 阳振坤

### 林昊

### 许世伟

### 林峰

### 李成银

### 尤雨溪

### 阮一峰

### 陈硕


### 田春冰河

### 王垠

### 陈皓

### 赵海平

### 余锋

### 刘未鹏 

### 王巍

### 朱照远

### 潘爱民


### 四火的唠叨

### 庄周梦蝶

### 程序人生

### James Zhan



