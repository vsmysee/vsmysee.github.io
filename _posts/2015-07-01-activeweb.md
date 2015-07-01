---
layout: article
title: 小清新框架activeweb
---
项目趋于稳定，用spring+spring jdbc的时候为了实现一个新需求，需要写一大堆模板化代码，我始终坚信：消除重复是技术升级的重要要素，而懒的本性驱动优秀程序员的成长，activeweb为懒程序员而生

###一、activeweb是什么
这是一个full stack的java web框架，COC标配，类似的框架在java领域还有play,grails,scooter,stripes，我为什么喜欢activeweb呢? 这个框架把我们遇到的重复劳动编程问题简化到了极致，简单得你可以猜测到他得源码是如何实现的，以前我认为play已经做得很好了，可是基于jpa的play和最新的scala重度集成的play已经
让我丧失了学习他得兴趣。

activeweb的团队首先实现的是active record模式的持久框架activejdbc,使用方法就类似ruby on rails, 这个框架当然能够非常友好的在activeweb中使用， 模板使用的freemarker，通过自定义的部分指令来实现了web编程的各种必要组件，flash scope, restful, 上传，下载等都完美封装。



###二、如何启动框架
通过一个filter全局拦截，静态资源放过，注意encoding参数避免乱码问题
{% highlight java %}

 <filter>
        <filter-name>dispatcher</filter-name>
        <filter-class>org.javalite.activeweb.RequestDispatcher</filter-class>
        <init-param>
            <param-name>exclusions</param-name>
            <param-value>jpg,js,css,gif,png,ico,swf,otf,svg,eot,ttf,woff,images</param-value>
        </init-param>
        <init-param>
            <param-name>root_controller</param-name>
            <param-value>home</param-value>
        </init-param>
        <init-param>
            <param-name>encoding</param-name>
            <param-value>utf8</param-value>
        </init-param>

    </filter>


    <filter-mapping>
        <filter-name>dispatcher</filter-name>
        <url-pattern>/*</url-pattern>
    </filter-mapping>

 {% endhighlight %}

root_controller表示默认的首页是哪个简写类名，上面我们配置的是home表示是HomeController，框架默认在app/controllers这个包中寻找控制器。



###三、路由原理

通过类名和方法名，index方法是只指定类名而不指定方法名的默认路由方法，/home/show表示请求到HomeController的show方法上，每一个方法执行完默认对应的视图是WEB-INF/views下对应类名目录下的方法名文件，比如home/show执行就对应WEB-INF/views/home/show.ftl，activeweb的controller是prototype模式，每次请求
都会实例化，所以天然多线程安全。


###四、框架的的周期钩子

在app/config下放一个AppBootstrap类并继承Bootstrap,可以在init和destroy这两个方法上重载以获得框架声明周期的回调，通过这个类我们可以在项目中集成spring等容器
{% highlight java %}
public class AppBootstrap extends Bootstrap {

    @Override
    public void init(AppContext context) {
        context.set("spring", new ClassPathXmlApplicationContext("spring.xml"));
    }

    @Override
    public void destroy(AppContext context) {
        ApplicationContext spring = (ApplicationContext) context.get("spring");
        if (spring instanceof ConfigurableApplicationContext) {
            ((ConfigurableApplicationContext) spring).close();
        }
        super.destroy(context);
    }

}
 {% endhighlight %}


###四、拦截器

任何一个设计优良的框架都会在重要的执行流程留下切入点让程序员可以自由发挥，有些框架叫拦截器，有些叫过滤器，当然和专业的aop都是差不多的意思，activeweb的实现依赖于ControllerFilter

{% highlight java %}
public interface ControllerFilter {

    void before(); //在action调用之前

    void after(); //在action调用并渲染完页面之后

    void onException(Exception e);//在action执行报错之后
}

其实更完美的做法应该是在action执行完在提供一个切入点，比如我希望写一个filter在action执行完之后关闭连接就实现不了，按照目前的做法，连接会在after之后关闭，页面渲染期间连接也是打开的，如果渲染期间发生异常我的连接可能关闭不掉，不过数据库的连接管理在web层来做本身可能就是一个问题，我们从spring的osiv,seam的有状态session管理就可以看到复杂性。

 {% endhighlight %}


###五、flash生命周期
flash貌似是ROR发明的，他得生命周期大于request但是小于session，我们为了防表单重复提交会在一个post完成之后重定向，如果重定向需要传点数据给页面就依赖于flash,flash中得数据被读取之后就消失，springmvc也在3.0之后支持这个周期，可是用起来不是那么好用,activeweb的写法如下
{% highlight java %}

 User user = User.findFirst("company_name=?", companyName);
 if (user == null) {
      flash("message", "您输入的用户不存在");
      redirect(DashController.class, "uploadProject");
      return;
}

{% endhighlight %}


###六、web中得layout
奇怪的是，好多web框架这个非常重要的东西没有实现，我们的网页通常都是由头部，中部，尾部组成，每个页面其实本身就只应该包括中间那一段的dom,同时这段dom还可以自己声明css,script以插入到外层layout的css,script站位中，在activeweb中的写法非常好看
{% highlight java %}
//layout
<html>
<head>
    <@yield to="css_define_default"/>
</head>
<body>

${page_content}

</body>

<@yield to="js_define"/>
</html>



//各个模板
<@content for="css_define">
<link rel="stylesheet" type="text/css" href="/Public/dist/styles/project/detail.css?${static_resource_version!}"/>
</@content>

<@content for="js_define">
<script src="/Public/bower_components/jquery/dist/jquery.min.js?${static_resource_version!}"></script>
<script src="/Public/bower_components/bootstrap/dist/js/bootstrap.min.js?${static_resource_version!}"></script>
<script src="/Public/scripts/project/detail.js?${static_resource_version!}"></script>
</@content>
{% endhighlight %}



###七、表单急速保存
数据库本质是kv,表单本质是kv，他们通过一个hash map映射一下不就行了？
{% highlight java %}
 User user = new User();
 user.fromMap(params1st());
 user.saveIt();
{% endhighlight %}

当然数据校验是在模型上

{% highlight java %}
public class User extends Model {
    static {

        validatePresenceOf("company_name", "user_name").message("此项必填");

        validateRegexpOf("user_name", "(?!^\\d[A-Za-z0-9]*$)^[A-Za-z0-9_-]{6,25}$").message("用户名格式不对");

        validateWith(new UniquenessValidator("user_name","user_id")).message("用户名重复");

    }
 }
{% endhighlight %}
