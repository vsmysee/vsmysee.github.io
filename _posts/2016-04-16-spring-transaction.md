---
layout: article
title: spring的事务管理
---
一直比较好奇spring是如何在数据库连接上实现各种事务传播行为的,最近抽空看了他的源码,做个简单的笔记,spring是一个典型的无状态事务管理框架,在一次请求过程中
事务被界定在业务service的执行边界,这个和数据源配合得很好,可是类似hibernate和jpa的事务会破坏这个抽象,有osiv等问题,发现大量的公司都是采用mybatis或者jdbc template,所以很少有人知道这些问题了.

## 无框架事务
首先我们看看在不用任何框架的前提下,如果使用原生的jdbc api实现事务代码的编写,jdbc规范是一个典型的API和SPI设计,代码中省去try catch,第一步是加载驱动
{% highlight java %}
Class.forName("com.mysql.jdbc.Driver").newInstance();
//取得连接,这一步是比较耗服务器资源
Connection connection = DriverManager.getConnection("jdbc:mysql://localhost/test", "root", "root");
//关闭自动提交
connection.setAutoCommit(false);
PreparedStatement stmt = connection.prepareStatement(sql);
stmt.execute();

dbConnection.commit();
stmt.close();

//如果出问题回滚
dbConnection.rollback();
{% endhighlight %}

如果不关闭自动提交,jdbc的sql每次在连接上执行都会产生一个事务.
jdbc的设计会引入大量的check exception,所以我们必须要写大量的模板代码,spring使用匿名内部类的方法是在内部模拟了类似ruby的代码块闭包行为类优雅的处理了这类问题.
数据库连接是一个昂贵的服务器资源,所以我们要基于连接池技术来优化,使用连接池,我们需要知道另外一个借口DataSource,它可以从应用服务器中通过JNDI查找出来,或者使用第三方的数据源软件.

{% highlight java %}

//连接池软件
BasicDataSource ds = new BasicDataSource();
Connection con = ds.getConnection();

//JNDI
Context initContext = new InitialContext();
Context webContext = (Context)initContext.lookup("java:/comp/env");
DataSource ds = (DataSource) webContext.lookup("jdbc/myJdbc");
Connection dbCon = ds.getConnection();

{% endhighlight %}

## 核心接口
org.springframework.transaction.PlatformTransactionManager
org.springframework.transaction.TransactionDefinition
org.springframework.transaction.TransactionStatus

{% highlight java %}
//通过事务定义生成事务状态实例
TransactionStatus getTransaction(TransactionDefinition definition) throws TransactionException;
//传入当前事务状态提交事务
void commit(TransactionStatus status) throws TransactionException;
//传入当前事务状态回滚事务
void rollback(TransactionStatus status) throws TransactionException;

//抽象重点,所有事务逃不脱这个框架
AbstractPlatformTransactionManager

abstract Object doGetTransaction()
abstract void doBegin()
abstract void doCommit()
abstract void doRollback()

{% endhighlight %}

## Datasource事务分析
org.springframework.jdbc.datasource.DataSourceTransactionManager

{% highlight java %}
DataSourceTransactionObject txObject = new DataSourceTransactionObject();
txObject.setSavepointAllowed(isNestedTransactionAllowed());
ConnectionHolder conHolder = (ConnectionHolder) TransactionSynchronizationManager.getResource(this.dataSource);
txObject.setConnectionHolder(conHolder, false);
return txObject;


//打开事务
Connection newCon = this.dataSource.getConnection();
txObject.setConnectionHolder(new ConnectionHolder(newCon), true);
if (con.getAutoCommit()) {
	con.setAutoCommit(false);
}
{% endhighlight %}


## 资源管理

TransactionSynchronizationManager

{% highlight java %}
ThreadLocal<Map<Object, Object>> resources =
			new NamedThreadLocal<Map<Object, Object>>("Transactional resources");
ThreadLocal<Set<TransactionSynchronization>> synchronizations =
			new NamedThreadLocal<Set<TransactionSynchronization>>("Transaction synchronizations");
ThreadLocal<String> currentTransactionName =
			new NamedThreadLocal<String>("Current transaction name");
ThreadLocal<Boolean> currentTransactionReadOnly =
			new NamedThreadLocal<Boolean>("Current transaction read-only status");
ThreadLocal<Integer> currentTransactionIsolationLevel =
			new NamedThreadLocal<Integer>("Current transaction isolation level");
ThreadLocal<Boolean> actualTransactionActive =
			new NamedThreadLocal<Boolean>("Actual transaction active");
{% endhighlight %}

### 传播行为的实现

{% highlight java %}
int PROPAGATION_REQUIRED = 0;
int PROPAGATION_SUPPORTS = 1;
int PROPAGATION_MANDATORY = 2;
int PROPAGATION_REQUIRES_NEW = 3;
int PROPAGATION_NOT_SUPPORTED = 4;
int PROPAGATION_NEVER = 5;
int PROPAGATION_NESTED = 6;
{% endhighlight %}

如何实现挂起
{% highlight java %}
//挂起之前的事务
SuspendedResourcesHolder suspendedResources = suspend(transaction);

//连接从当前线程弹出来
DataSourceTransactionObject txObject = (DataSourceTransactionObject) transaction;
txObject.setConnectionHolder(null);
ConnectionHolder conHolder = (ConnectionHolder)
      TransactionSynchronizationManager.unbindResource(this.dataSource);
return conHolder;


//挂起资源保存器,包含之前的连接

String name = TransactionSynchronizationManager.getCurrentTransactionName();
TransactionSynchronizationManager.setCurrentTransactionName(null);
boolean readOnly = TransactionSynchronizationManager.isCurrentTransactionReadOnly();
TransactionSynchronizationManager.setCurrentTransactionReadOnly(false);
Integer isolationLevel = TransactionSynchronizationManager.getCurrentTransactionIsolationLevel();
TransactionSynchronizationManager.setCurrentTransactionIsolationLevel(null);
boolean wasActive = TransactionSynchronizationManager.isActualTransactionActive();
TransactionSynchronizationManager.setActualTransactionActive(false);
return new SuspendedResourcesHolder(
      suspendedResources, suspendedSynchronizations, name, readOnly, isolationLevel, wasActive);

return new SuspendedResourcesHolder(
      suspendedResources, suspendedSynchronizations, name, readOnly, isolationLevel, wasActive);


//新的事务会引用之前的资源保存器
DefaultTransactionStatus status = newTransactionStatus(
      definition, transaction, true, newSynchronization, debugEnabled, suspendedResources);
doBegin(transaction, definition);
{% endhighlight %}

## 陷阱

### 注解指向Manager
@Transactional注解可以标注在类和方法上，也可以标注在定义的接口和接口方法上。
如果我们在接口上标注@Transactional注解，会留下这样的隐患：因为注解不能被继承，所以业务接口中标注的@Transactional注解不会被业务实现类继承。所以可能会出现不启动事务的情况。所以，Spring建议我们将@Transaction注解在实现类上

@Transactional在配置文件中，默认情况下，<tx:annotation-driven>会自动使用名称为transactionManager的事务管理器。所以，如果定义的事务管理器名称为transactionManager，那么就可以直接使用<tx:annotation-driven/>
如果我们要程序中使用多个事务管理器（主要是针对多数据源的情况）,要在注解上指定事务管理器

### 异常回滚行为
Spring框架的事务基础架构代码将默认地 只 在抛出运行时和unchecked exceptions时才标识事务回滚。 也就是说，当抛出一个RuntimeException 或其子类例的实例时。（Errors 也一样 - 默认地 - 标识事务回滚。）从事务方法中抛出的Checked exceptions将 不 被标识进行事务回滚

### 代理的问题
由于Spring事务管理是基于接口代理或动态字节码技术，通过AOP实施事务增强的。对于基于接口动态代理的AOP事务增强来说，由于接口的方法是public的，这就要求实现类的实现方法必须是public的（不能是protected，private等），同时不能使用static的修饰符。所以，可以实施接口动态代理的方法只能是使用“public”或“public final”修饰符的方法，其它方法不可能被动态代理，相应的也就不能实施AOP增强，也即不能进行Spring事务增强了。
基于CGLib字节码动态代理的方案是通过扩展被增强类，动态创建子类的方式进行AOP增强植入的。由于使用final,static,private修饰符的方法都不能被子类覆盖，相应的，这些方法将不能被实施的AOP增强。所以，必须特别注意这些修饰符的使用，以免不小心成为事务管理的漏网之鱼。