---
layout: article
title:  为什么不推荐@Transactional
---

积郁心中久已，不吐不快，我们不应该用

```
@Target({ElementType.METHOD, ElementType.TYPE})
@Retention(RetentionPolicy.RUNTIME)
@Inherited
@Documented
public @interface Transactional {
}

```


人们常说，Spring的Sample是这样用的，所以需要这样用，Sample之所以为Sample，就是因为它太简单了，对比现实的复杂基本上不具备参考性。

@Transactional用来标记一个类或者一个方法具备事务边界，这是Spring提供的一个使用AOP的经典例子，可是我们需要想想：

```
事务是一个业务边界，他等于类边界和方法边界吗？
```

如果团队禁止在类上标记，获得了第一层进步，那么第二层进步就是禁止在方法上标记，理由是，事务边界往往不等于方法边界。事务是一个作用域，这个作用域需要精细管理。
需要明确的处理起止范围，明确的处理异常，以及明确的和哪个事务管理器协调。而编程语言的方法只是一个技术概念。


更何况@Transactional还有一堆的陷阱

```
1 注解指向Manager
@Transactional注解可以标注在类和方法上，也可以标注在定义的接口和接口方法上。
如果我们在接口上标注@Transactional注解，会留下这样的隐患：因为注解不能被继承，所以业务接口中标注的@Transactional注解不会被业务实现类继承。所以可能会出现不启动事务的情况。所以，Spring建议我们将@Transaction注解在实现类上

@Transactional在配置文件中，默认情况下，<tx:annotation-driven>会自动使用名称为transactionManager的事务管理器。所以，如果定义的事务管理器名称为transactionManager，那么就可以直接使用<tx:annotation-driven/>
如果我们要程序中使用多个事务管理器（主要是针对多数据源的情况）,要在注解上指定事务管理器

2 异常回滚行为
Spring框架的事务基础架构代码将默认地只在抛出运行时和unchecked exceptions时才标识事务回滚。 也就是说，当抛出一个RuntimeException 或其子类例的实例时。（Errors 也一样 - 默认地 - 标识事务回滚。）从事务方法中抛出的Checked exceptions将 不 被标识进行事务回滚

3 代理的问题
由于Spring事务管理是基于接口代理或动态字节码技术，通过AOP实施事务增强的。对于基于接口动态代理的AOP事务增强来说，由于接口的方法是public的，这就要求实现类的实现方法必须是public的（不能是protected，private等），同时不能使用static的修饰符。所以，可以实施接口动态代理的方法只能是使用“public”或“public final”修饰符的方法，其它方法不可能被动态代理，相应的也就不能实施AOP增强，也即不能进行Spring事务增强了。
基于CGLib字节码动态代理的方案是通过扩展被增强类，动态创建子类的方式进行AOP增强植入的。由于使用final,static,private修饰符的方法都不能被子类覆盖，相应的，这些方法将不能被实施的AOP增强。所以，必须特别注意这些修饰符的使用，以免不小心成为事务管理的漏网之鱼。
```

而这一堆陷阱，我看好多Java人员都不是很清楚，这不怪你，这是抽象必然泄露定律导致的，


## 该怎么办？

使用TransactionTemplate，手动控制

{% highlight java %}
transactionTemplate.execute(t -> {
});
{% endhighlight %}


```
<bean class="org.springframework.transaction.support.TransactionTemplate">
        <property name="transactionManager" ref="yourTm"/>
</bean>
```

你会发现作用域清晰，事务管理器配置清晰，异常处理清晰，一切尽在掌握。


Groovy的处理方式：

{% highlight groovy %}
try {
  sql.withTransaction {
    sql.execute "INSERT INTO Author (firstname) VALUES ('Dierk')"
    sql.eachRow "SELECT firstname FROM Author WHERE firstname = 'Dierk'", metaClosure, rowClosure
    sql.execute "INSERT INTO Author (firstname) VALUES (?)", 'X' * (maxFirstnameLength + 1)
  }
} 
{% endhighlight %}


Asp .Net的处理方式：

{% highlight C# %}

using (MySqlConnection conn = new MySqlConnection(DBConfig.ConnectionString))
{
    conn.Open();
    MySqlTransaction tran = conn.BeginTransaction();
    try
    {
        MySqlBindParametersHelper.ExecuteNonQuery(conn, tran, DELETE_NODES, DBConfig.TimeOutSeconds, tree.TreeID, tree.Node, BindNode);
        SaveNode(tree.Node, tree.TreeID, conn, tran);
        tran.Commit();
    }
    catch
    {
        tran.Rollback();
        throw;
    }
} 
            
{% endhighlight %}