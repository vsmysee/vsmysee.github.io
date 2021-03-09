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

```java
Object getBean(String name) throws BeansException;
Object getBean(String name, Class requiredType) throws BeansException;
boolean isSingleton(String name) throws NoSuchBeanDefinitionException;
```

抛出的异常时运行期异常。


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

```java
public interface FactoryBean {
	
	Object getObject() throws Exception;
	
	Class getObjectType();

	boolean isSingleton();
}

```

实现这个接口，我们可以编程式的构造对象，然后再配置到xml中.


XmlBeanFactory是spring的心脏，但是在应用中我们一般使用ApplicationContext这个接口，它更靠近应用层，比如在web环境中使用。根据应用环境的不同，ApplicationContext还可形成层次结构。

如何使用呢

```java
ClassPathXmlApplicationContext ctx = new ClassPathXmlApplicationContext("/org/springframework/context/support/simpleContext.xml");
```

面向对象编程模型中，我们有些需求需要横切一批对象的某些方法，比如我想透明的拦截一些方法进行耗时统计，业界叫做AOP技术.

因为我们的bean是从容器中获取的，于是需要引入某种代理技术把真实的对象替换掉，于是有了一个新的接口


```java
public interface AopProxy {

	Object getProxy();

	Object getProxy(ClassLoader classLoader);

}
```

广义的AOP技术拦截点是很多的，spring只做到了方法级别

以上就是spring的内核，后面的所有故事都是围绕以上接口展开的。

## 实例化

配置文件中配置类的路径，由框架来初始化，初始化的时机可以选择框架启动的时候也可以延迟到获取bean的时候，初始化示例的核心代码是BeanUtils

```java
	public static Object instantiateClass(Constructor ctor, Object[] args) throws BeansException {
		Assert.notNull(ctor, "Constructor must not be null");
		try {
			if (!Modifier.isPublic(ctor.getModifiers()) ||
					!Modifier.isPublic(ctor.getDeclaringClass().getModifiers())) {
				ctor.setAccessible(true);
			}
			return ctor.newInstance(args);
		}
		catch (InstantiationException ex) {
			throw new BeanInstantiationException(ctor.getDeclaringClass(),
					"Is it an abstract class?", ex);
		}
		catch (IllegalAccessException ex) {
			throw new BeanInstantiationException(ctor.getDeclaringClass(),
					"Has the class definition changed? Is the constructor accessible?", ex);
		}
		catch (IllegalArgumentException ex) {
			throw new BeanInstantiationException(ctor.getDeclaringClass(),
					"Illegal arguments for constructor", ex);
		}
		catch (InvocationTargetException ex) {
			throw new BeanInstantiationException(ctor.getDeclaringClass(),
					"Constructor threw exception", ex.getTargetException());
		}
	}
```

当得到一个类的实例之后，接下来就是要进行初始化，初始化是个非常关键步骤，所以留下了扩展点

```java
public interface BeanPostProcessor {


	Object postProcessBeforeInitialization(Object bean, String beanName) throws BeansException;


	Object postProcessAfterInitialization(Object bean, String beanName) throws BeansException;

}
```

初始化过程中，又有一个扩展点，如果类实现了InitializingBean接口，则先执行

```java
public interface InitializingBean {
	
	void afterPropertiesSet() throws Exception;

}
```

## 存储

默认bean的生命周期是单例，需要有个地方存起来，这个版本是放在HashMap中的，由于HashMap不是线程安全的，所以在加入的时候加了锁

```
	private final Map singletonCache = CollectionFactory.createLinkedMapIfPossible(16);

```

```java
protected void addSingleton(String beanName, Object sharedBean) {
		Assert.hasText(beanName, "Bean name must not be empty");
		Assert.notNull(sharedBean, "Singleton object must not be null");
		synchronized (this.singletonCache) {
			this.singletonCache.put(beanName, sharedBean);
		}
}
```

同时get实例的时候也是加锁的

```java
	public Object getSingleton(String beanName) {
		synchronized (this.singletonCache) {
			return this.singletonCache.get(beanName);
		}
	}
```

构造过程中为了为了避免并发问题，用了一个同步的HashSet来拦截并发操作

```java
	private final Set singletonsCurrentlyInCreation = Collections.synchronizedSet(new HashSet());


    protected void beforeSingletonCreation(String beanName) {
		if (!this.singletonsCurrentlyInCreation.add(beanName)) {
			throw new IllegalStateException("Singleton '" + beanName + "' is already in creation");
		}
	}
```

 单例容器主要由DefaultSingletonBeanRegistry来完成，XmlBeanFactory会继承这个类。


 另外一种生命周期是prototype，每次都创建新的示例 

 ```java
            // Create bean instance.
			if (mergedBeanDefinition.isSingleton()) {
				sharedInstance = getSingleton(beanName, new ObjectFactory() {
					public Object getObject() throws BeansException {
						try {
							return createBean(beanName, mergedBeanDefinition, args);
						}
						catch (BeansException ex) {
							// Explicitly remove instance from singleton cache: It might have been put there
							// eagerly by the creation process, to allow for circular reference resolution.
							// Also remove any beans that received a temporary reference to the bean.
							destroySingleton(beanName);
							throw ex;
						}
					}
				});
				bean = getObjectForBeanInstance(sharedInstance, name, mergedBeanDefinition);
			}

			else if (mergedBeanDefinition.isPrototype()) {
				// It's a prototype -> create a new instance.
				Object prototypeInstance = null;
				try {
					beforePrototypeCreation(beanName);
					prototypeInstance = createBean(beanName, mergedBeanDefinition, args);
				}
				finally {
					afterPrototypeCreation(beanName);
				}
				bean = getObjectForBeanInstance(prototypeInstance, name, mergedBeanDefinition);
			}

 ```


## 动态代理

IOC容器默认生成的Bean示例对象在被使用的时候和我们平时构造的对象没有什么不一样，但是如果这些示例是由接口的，那么JDK提供了一个机制，可以生成一个和某个实例相同接口的对象，然后调用这个对象的方法的时候，我们可以植入一段拦截

Proxy类
```java
 public static Object newProxyInstance(ClassLoader loader,
					  Class<?>[] interfaces,
					  InvocationHandler h)
	throws IllegalArgumentException
    {}
```

传入一个接口数组，然后实现一个InvocationHandler，就生成了一个实现了这些接口的对象，对象调用某个方法的时候，代码会走到InvocationHandler里面

```java
public Object invoke(Object proxy, Method method, Object[] args) throws Throwable;
```

于是我们就可以拦截java由接口的类了。

要为一个容器中的对象，生成代理怎么在spring里配置呢？

```
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
```

所以AOP的代理是通过一个FactroyBean创建出来的，ProxyFactoryBean创建代理的时候需要传入接口数组，代理目标和拦截器，对应JDKProxy类，拦截器最终会实现InvocationHandler