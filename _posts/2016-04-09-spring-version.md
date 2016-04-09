---
layout: article
title: 追踪spring的各版本
---
Spring已经是做项目的必选框架了，几年前还有SSH，Seam，现在似乎只有SpringMVC+Spring+Mybatis了，这样就只能简称SM,人们似乎已经淡忘Struts,没听说过JSF,Wicket,Vraptor，好吧，也许人们在这几年已经把焦点放到了新的SSH(Spark,Storm,Hadoop),或者Play,Grails，我还是希望能够好好掌握Spring，所以用这篇文章记录他的版本。

## Spring1.x
这个版本持续到2006年，那时候我还在念大二，首先我们在这个版本总结spring的很多核心概念：

### DTD配置
{% highlight java %}
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE beans PUBLIC "-//SPRING//DTD BEAN//EN" "http://www.springframework.org/dtd/spring-beans.dtd">
<beans>
</beans>
{% endhighlight %}
这是有严格按照dtd定义来配置的，不可扩展。

### IOC
从1.x时代开始，Spring的内核已经定格在了BeanFactory和ApplicationContext,这个时候Bean的生命周期只有Singleton和Prototype。生命周期回调接口是InitializingBean，DisposableBean.BeanPostProcessors。

### 资源抽象：
URL，Classpath,FileSytem,ServletContext,Inputstram,ByteArray,加载spring配置文件支持classpath*前缀.

### AOP
这个时候配置一个aop是这个样子的
{% highlight java %}
<bean id="petStore" class="org.springframework.transaction.interceptor.TransactionProxyFactoryBean">
<property name="transactionManager" ref="transactionManager"/>
<property name="target" ref="petStoreTarget"/>
<property name="transactionAttributes">
<props>
<prop key="insert*">PROPAGATION_REQUIRED</prop>
<prop key="update*">PROPAGATION_REQUIRED</prop>
<prop key="*">PROPAGATION_REQUIRED,readOnly</prop>
</props>
</property>
</bean
{% endhighlight %}

这个版本已经集成了aspectJ
{% highlight java %}
<bean id="securityAspect"
class="org.springframework.samples.aspectj.bank.BalanceChangeSecurityAspect"
factory-method="aspectOf"
>
<property name="securityManager" ref="securityManager"/>
</bean>
{% endhighlight %}
### 事务抽象
org.springframework.transaction.PlatformTransactionManager

• Transaction isolation:
• Transaction propagation:
• Transaction timeout:
• Read-only status:

本地事务class="org.springframework.jdbc.datasource.DataSourceTransactionManager">
开始支持. The Transactional Annotation

### Web MVC
DispatcherServlet


### 远程调用
RMI，Hessian和Burlap通过Http,Http Invoker,Xfire WebService


### Email和Schedule Job和TEST
public abstract class AbstractClinicTests extends AbstractTransactionalDataSourceSpringContextTests

## Spring2.x
不再支持jdk1.3, 在2006年的10月发布
Spring 2.5 introduces support for a complete set of configuration annotations: @Autowired in combination with
support for the JSR-250 annotations @Resource, @PostConstruct and @PreDestroy .

Autodetecting components in the classpath @Component, @Repository,@Service, @Controller

Java 5 (Tiger) support

Spring 2.5 introduces explicit support AspectJ load-time weaving, as alternative to the proxy-based AOP
framework. The new context:load-time-weaver configuration element automatically activates AspectJ
aspects as defined in AspectJ's META-INF/aop.xml descriptor

Spring 2.5 introduces an annotation-based programming model for MVC controllers, using annotations such as
@RequestMapping, @RequestParam, @ModelAttribute

{% highlight java %}
<?xml version="1.0" encoding="UTF-8"?>
<beans xmlns="http://www.springframework.org/schema/beans"
xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
xsi:schemaLocation="
http://www.springframework.org/schema/beans http://www.springframework.org/schema/beans/spring-beans-2.0.xsd">
</beans>
{% endhighlight %}


of Spring had IoC container level support for exactly two distinct bean scopes (singleton and
prototype). Spring 2.0 improves on this by not only providing a number of additional scopes depending on the
environment in which Spring is being deployed (for example, request and session scoped beans in a web
environment), but also by providing 'hooks' (for want of a better word) so that Spring users can create their own
scopes.

Extensible XML authoring
Spring 2.0 integrates with the AspectJ
pointcut language and @AspectJ aspect declaration style
NamedParameterJdbcTemplate
this theme of convention-over-configuration now has explicit support in Spring MVC
Dynamic language support
The Spring TaskExecutor abstraction

## Spring3.x
全面泛型

慎重选择日志
{% highlight java %}
Not Using Commons Logging
Using SLF4J
Using Log4J
{% endhighlight %}

Spring's TaskExecutor abstraction has been updated for close integration with Java 5's java.util.concurrent facilities. We provide first-class support for Callables and Futures now, as well as ExecutorService adapters, ThreadFactory integration, etc. This has been aligned with JSR-236 (Concurrency Utilities for Java EE 6) as far as possible. Furthermore, we provide support for asynchronous method invocations through the use of the new @Async annotation (or EJB 3.1's @Asynchronous annotation).

Spring Expression Language
Comprehensive REST support

Embedded database support
New Java 5 based converter API and SPI:
Java based bean metadata
Web Tier is the support for building RESTful web services and web applications.
RestTemplate
Cache Abstraction
TestContext framework support for @Configuration classes and bean definition profiles

Support for Servlet 3 code-based configuration of Servlet Container
Support for Servlet 3 MultipartResolver
Flash Attributes and RedirectAttributes
Support for Servlet 3 based asynchronous request processing
New Gradle-based build and move to GitHub

## Spring4.x
Java 8 (as well as 6 and 7)
Groovy Bean Definition DSL
WebSocket, SockJS, and STOMP Messaging
Async RestTemplate has been added, allowing non-blocking asynchronous support when developing REST clients.
AMQP
Scripted Spring MVC Controllers
CGLIB-based proxy classes no longer require a default constructor
@RestController annotation
OkHTTP integration with the RestTemplate.


## Spring生态
