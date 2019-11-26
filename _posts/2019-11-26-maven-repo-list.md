---
layout: article
title:  maven仓库列表
---

```
http://repo.maven.apache.org/maven2
```


```
http://repo1.maven.org/maven2/
```


```
http://maven.aliyun.com/nexus/content/groups/public/
```

```
repositories {
    mavenCentral()
}
```


```
https://jcenter.bintray.com/
```


```
repositories {
    jcenter()
}
```



```
repositories {
    google()
}
```



```
http://repo.spring.io/release/
```


```
https://app.camunda.com/nexus/content/groups/public
```


```
https://repository.jboss.org/nexus/content/repositories/
```


```
https://repository.sonatype.org/content/groups/public/
```


```
https://nexus.pentaho.org/repository/omni/
```


## 如何搭建一个私服

下载:

https://www.sonatype.com/nexus-repository-oss

解压:

nexus-3.19.1-01-mac.tgz

启动:

bin/nexus run


访问：

http://localhost:8081/


仓库:

![](/images/nexus.png)

```
group表示分组
proxy表示代理
hosted表示本地
```
