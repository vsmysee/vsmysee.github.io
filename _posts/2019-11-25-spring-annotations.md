---
layout: article
title:  Spring注解演化
---

## 1.0时代

```
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE beans PUBLIC  "-//SPRING//DTD BEAN//EN" "http://www.springframework.org/dtd/spring-beans.dtd">

<beans>
</beans>
```
所有的抽象都用xml来表达，虽然原始，但是装配过程极度透明


## 2.0

XML 命名空间和 AspectJ 支持，还好，xml现在更易用


## 2.5

annotation-driven 用来改善繁琐的配置，开始不透明

这个版本，有这样一些注解可以标记在类上：

```
Component
Controller
Repository
Service
```

类上有了标记，就可以不用在xml里配置了，直接这样声明下，扫描注入就可以了：

```
<context:component-scan base-package="com.yourpackage"/>
```

在这个版本，还引入了一些其他标记，比如
```
Autowired
Qualifier
```
这些标记也需要有相应的机制来识别处理，所以需要加上这段配置

```
<context:annotation-config/> 
```

如果用了context:component-scan，就不需要这个配置，默认引入了


context:annotation-config到底对你的代码做了什么黑魔法，有非常明显的机制能得知吗？ 


## 3.0

到了3.0 引入一个叫做JavaConfig的东西, 有下面这些注解：

```
@Configuration
@Bean
@DependsOn
@Primary
@Lazy
@Import
@ImportResource
@Value
```
他们都位于这个Package下：org.springframework.context.annotation

@Configuration标记的类表示是一个配置类，负责生产出真正的Bean， @Bean标记在配置类的方法上，而Configuration又被Component标记了，所以配置类本身也是一个Bean，必须先注册到容器里
可以显式配置，或者通过扫描。

DependsOn可以用对Bean的加载定制依赖。

既然有了配置的类，那么可以直接基于配置了启动一个上下文，所以有了：

AnnotationConfigApplicationContext


从3.0开始，这个注解包开始不断的加入新成员，3.1加入了一个ComponentScans,这个标记可以让容器扫描各种注解的Bean，取代了context:component-scan，于是结合AnnotationConfigApplicationContext，xml的时代就可以结束了.


前面提到的annotation-config的取代方式开始被Enable*这样的注解, 比如tx:annotation-config被EnableTransactionManagement取代了。

@Enable这类的注解依赖一个Import注解，导入了一堆Bean,同样，这种方式没有使得透明性有改善，Import进来的那个类也极度复杂。


## 4.0

引入Conditional注解，允许构建Bean的时候依赖于某种条件，于是给SpringBoot的诞生打下了基础


## SpringBoot

```
2012年10月，Mike Youngstrom在Spring jira中创建了一个功能需求，要求在Spring框架中支持无容器Web应用程序体系结构。他建议通过main方法引导的Spring容器内配置Web容器服务。
```

2014年4月，Spring Boot 1.0.0发布，基于了spring4.0

@SpringBootApplication本身是一个Configuration,同时还是ComponentScan，这是可以理解的，巨大的不透明在于EnableAutoConfiguration

```
attempting to guess and configure beans that you are likely to need.
```

**也就是说，我们已经进入了面向猜测编程的时代了。**




