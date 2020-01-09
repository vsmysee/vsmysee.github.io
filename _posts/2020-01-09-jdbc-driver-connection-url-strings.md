---
layout: article
title:  各种JDBC URL
---

[原文](https://vladmihalcea.com/jdbc-driver-connection-url-strings/)


## Oracle

{% highlight java %}

OracleDataSource dataSource = new OracleDataSource();
dataSource.setDatabaseName("high_performance_java_persistence");
dataSource.setURL("jdbc:oracle:thin:@localhost:1521/orclpdb1");
dataSource.setUser("oracle");
dataSource.setPassword("admin");

{% endhighlight %}

## Mysql

{% highlight java %}
MysqlDataSource dataSource = new MysqlDataSource();
dataSource.setURL(
    "jdbc:mysql://localhost/high_performance_java_persistence"
);
dataSource.setUser("mysql");
dataSource.setPassword("admin");

{% endhighlight %}

## PostgreSQL

{% highlight java %}

PGSimpleDataSource dataSource = new PGSimpleDataSource();
dataSource.setDatabaseName("high_performance_java_persistence");
dataSource.setServerName("localhost");
dataSource.setUser("postgres");
dataSource.setPassword("admin");

{% endhighlight %}

## SQL Server

{% highlight java %}

SQLServerDataSource dataSource = new SQLServerDataSource();
dataSource.setURL(
    "jdbc:sqlserver://localhost;instance=SQLEXPRESS;" +
    "databaseName=high_performance_java_persistence;"
);
dataSource.setUser("sa");
dataSource.setPassword("adm1n");

{% endhighlight %}


## MariaDB

{% highlight java %}

jdbc:mariadb://localhost/high_performance_java_persistence

{% endhighlight %}

## Db2

```
jdbc:db2://localhost/high_performance_java_persistence
```

## Informix

```
jdbc:informix-sqli://localhost:9088/sysuser:INFORMIXSERVER=hpjp
```

## HSQLDB

{% highlight java %}

JDBCDataSource dataSource = new JDBCDataSource();
dataSource.setUrl("jdbc:hsqldb:mem:test");
dataSource.setUser("sa");
dataSource.setPassword("");

{% endhighlight %}


## H2

```
jdbc:h2:mem:high_performance_java_persistence
```

## Derby

```
jdbc:derby:target/tmp/derby/hpjp;databaseName=high_performance_java_persistence;create=true
```




