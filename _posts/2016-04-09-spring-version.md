---
layout: article
title: 追踪spring的各版本
---
Spring已经是做项目的必选框架了，几年前还有SSH，Seam，现在似乎只有SpringMVC+Spring+Mybatis了，这样就只能简称SM,人们似乎已经淡忘Struts,没听说过JSF,Wicket,Vraptor，好吧，也许人们在这几年已经把焦点放到了新的SSH(Spark,Storm,Hadoop),或者Play,Grails，我还是希望能够好好掌握Spring，所以用这篇文章记录他的版本。

## Spring1.x
这个版本持续到2006年，那时候我还在念大二，首先我们在这个版本总结spring的很多核心概念：
![Spring](http://docs.spring.io/spring/docs/1.2.x/reference/images/spring-overview.gif)

### DTD配置
{% highlight java %}
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE beans PUBLIC "-//SPRING//DTD BEAN//EN" "http://www.springframework.org/dtd/spring-beans.dtd">
<beans>
</beans>
{% endhighlight %}
这是有严格按照dtd定义来配置的，不可扩展。

### IOC
从1.x时代开始，Spring的内核已经定格在了BeanFactory和ApplicationContext,这个时候Bean的生命周期只有Singleton和Prototype。配置方式为<bean id="exampleBean" class="examples.ExampleBean"/> singleton="false"/>

ApplicationContext 相比BeanFactory多了很多特性，我们一般不会使用BeanFactory

* MessageSource, providing access to messages in, i18n-style
* Access to resources, such as URLs and files
* Event propagation to beans implementing the ApplicationListener interface
* Loading of multiple (hierarchical) contexts, allowing each to be focused on one particular layer, for example the web layer of an application


生命周期回调接口是InitializingBean，DisposableBean，BeanPostProcessors,BeanFactoryPostProcessor.

对属性文件的站位符支持PropertyPlaceholderConfigurer

如果想在Web容器中使用Spring

{% highlight java %}
<context-param>
  <param-name>contextConfigLocation</param-name>
  <param-value>/WEB-INF/daoContext.xml /WEB-INF/applicationContext.xml</param-value>
</context-param>
<listener>
  <listener-class>org.springframework.web.context.ContextLoaderListener</listener-class>
</listener>
{% endhighlight %}

### 资源抽象

{% highlight java %}
public interface Resource extends InputStreamSource {
    boolean exists();
    boolean isOpen();
    URL getURL() throws IOException;
    File getFile() throws IOException;
    Resource createRelative(String relativePath) throws IOException;
    String getFilename();
    String getDescription();
}
public interface InputStreamSource {
    InputStream getInputStream() throws IOException;
}
{% endhighlight %}

URL，Classpath,FileSytem,ServletContext,Inputstram,ByteArray,加载spring配置文件支持classpath*前缀.

我们可以便捷的加载资源

{% highlight java %}
Resource template = ctx.getResource("classpath:some/resource/path/myTemplate.txt);
￼￼￼￼￼Resource template = ctx.getResource("file:/some/resource/path/myTemplate.txt);
Resource template = ctx.getResource("http://myhost.com/resource/path/myTemplate.txt);
{% endhighlight %}
￼￼

### AOP

{% highlight java %}
切面(Aspect) 一个关注点，比如事务管理
连接点(JoinPoint) Spring AOP只能作用在方法调用
通知(Advise) 连接点上执行的动作
切入点(PointCut) 一个在连接点上的匹配，比如某个方法执行
引入（Introduction） Spring可以给代理类引入一个接口
目标对象(Target Object) 代理对象
AOP代理,Spring用Cglib和JDK Proxy实现
织入(Weaving) 编译期或者运行期
{% endhighlight %}

Introduction这个东西其实就是差不多动态语言的This illustrates a mixin

* Specify the target you want to proxy
* Specify whether to use CGLIB

这个时候配置一个aop是这个样子的,需要显式创建代理
{% highlight java %}

<bean id="personTarget" class="com.mycompany.PersonImpl">
    <property name="name"><value>Tony</value></property>
    <property name="age"><value>51</value></property>
</bean>
<bean id="myAdvisor" class="com.mycompany.MyAdvisor">
    <property name="someProperty"><value>Custom string property value</value></property>
</bean>
<bean id="debugInterceptor" class="org.springframework.aop.interceptor.DebugInterceptor">
</bean>
<bean id="person"
    class="org.springframework.aop.framework.ProxyFactoryBean">
    <property name="proxyInterfaces"><value>com.mycompany.Person</value></property>
    <property name="target"><ref local="personTarget"/></property>
    <property name="interceptorNames">
        <list>
            <value>myAdvisor</value>
            <value>debugInterceptor</value>
        </list>
    </property>
</bean>

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

AspectJ是一个全功能的AOP实现，Spring这个版本已经集成了aspectJ
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

* Transaction isolation:
* Transaction propagation:
* Transaction timeout:
* Read-only status:

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

* Extensible XML authoring
* Spring 2.0 integrates with the AspectJ
* pointcut language and @AspectJ aspect declaration style
* NamedParameterJdbcTemplate
* this theme of convention-over-configuration now has explicit support in Spring MVC
* Dynamic language support
* The Spring TaskExecutor abstraction

## Spring3.x
全面泛型

慎重选择日志
{% highlight java %}
Not Using Commons Logging
Using SLF4J
Using Log4J
{% endhighlight %}

* Spring's TaskExecutor abstraction has been updated for close integration with Java 5's java.util.concurrent facilities. We provide first-class support for Callables and Futures now, as well as ExecutorService adapters, ThreadFactory integration, etc. This has been aligned with JSR-236 (Concurrency Utilities for Java EE 6) as far as possible. Furthermore, we provide support for asynchronous method invocations through the use of the new @Async annotation (or EJB 3.1's @Asynchronous annotation).

* Spring Expression Language
* Comprehensive REST support

* Embedded database support
* New Java 5 based converter API and SPI:
* Java based bean metadata
* Web Tier is the support for building RESTful web services and web applications.
* RestTemplate
* Cache Abstraction
* TestContext framework support for @Configuration classes and bean definition profiles

* Support for Servlet 3 code-based configuration of Servlet Container
* Support for Servlet 3 MultipartResolver
* Flash Attributes and RedirectAttributes
* Support for Servlet 3 based asynchronous request processing
* New Gradle-based build and move to GitHub

## Spring4.x
* Java 8 (as well as 6 and 7)
* Groovy Bean Definition DSL
* WebSocket, SockJS, and STOMP Messaging
* Async RestTemplate has been added, allowing non-blocking asynchronous support when developing REST clients.
* AMQP
* Scripted Spring MVC Controllers
* CGLIB-based proxy classes no longer require a default constructor
* @RestController annotation
* OkHTTP integration with the RestTemplate.


## Spring生态
* Spring Boot
* Spring Web Flow
* Spring Security
* Spring Batch
* Spring AMQP
* Spring Data
* Spring WebService
* Spring Session
* Spring Shell
* Spring Mobile
* Spring Integration
* Spring Cloud
