---
layout: article
title:  spring记事
---
开始细度spring代码，选择版本2.0，基于jdk1.5，不为别的，只为寻找大师的笔法。

## 背景

Java定义了一个名词叫做javabean

```
JavaBeans是Java中一种特殊的类，可以将多个对象封装到一个对象（bean）中。特点是可序列化，提供无参构造器，提供getter方法和setter方法访问对象的属性。名称中的“Bean”是用于Java的可重用软件组件的惯用叫法
```
JavaBean的种类按照功能可以划分为可视化和不可视化两类。可视化的JavaBean就是拥有GUI图形用户界面的，对最终用户是可见的，不可视化的JavaBean通常情况下用来封装业务逻辑、数据分页逻辑、数据库操作和事物逻辑等。

我们主要关注这些不可视的bean,因为spring解决的是服务端的问题。

使用一个JavaBean，需要解决构造问题，生命周期管理问题，初始化问题，于是业界发展出了IOC容器，把这些过程框架化。

## 核心接口

管理这些Bean的核心接口诞生了,构造和生命周期都在里面了

BeanFactory

```
Object getBean(String name) throws BeansException;
Object getBean(String name, Class requiredType) throws BeansException;
boolean isSingleton(String name) throws NoSuchBeanDefinitionException;
```

实现这个接口的类是XmlBeanFactory，表示我们用xml来通过配置的方式进行bean管理，如何配置呢？

```
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE beans PUBLIC "-//SPRING//DTD BEAN 2.0//EN" "http://www.springframework.org/dtd/spring-beans-2.0.dtd">
<beans>
	<bean id="aliased" class="org.springframework.beans.TestBean" name="myalias">
		<property name="name"><value>aliased</value></property>
	</bean>
</beans>
```

代码中加载xml

```
new XmlBeanFactory(new ClassPathResource("test.xml", getClass()), parent);
```


这里包含了一个隐含的假设，难道所有的bean都能通过xml配置出来吗？不是的，所以我们需要另一个接口

```
public interface FactoryBean {
	
	Object getObject() throws Exception;
	
	Class getObjectType();

	boolean isSingleton();
}

```

实现这个接口，我们可以编程式的构造对象，然后再配置到xml中.


XmlBeanFactory是spring的心脏，但是在应用中我们一般使用ApplicationContext这个接口，它更靠近应用层，比如在web环境中使用。根据应用环境的不同，ApplicationContext还可形成层次结构。

如何使用呢

```
ClassPathXmlApplicationContext ctx = new ClassPathXmlApplicationContext("/org/springframework/context/support/simpleContext.xml");
```

面向对象编程模型中，我们有些需求需要横切一批对象的某些方法，比如我想透明的拦截一些方法进行耗时统计，业界叫做AOP技术.

因为我们的bean是从容器中获取的，于是需要引入某种代理技术把真实的对象替换掉，于是有了一个新的接口


```
public interface AopProxy {

	Object getProxy();

	Object getProxy(ClassLoader classLoader);

}
```

广义的AOP技术拦截点是很多的，spring只做到了方法级别

以上就是spring的内核，后面的所有故事都是围绕以上接口展开的。

