---
layout: article
title:  maven仓库与私服
---

## 中央

```
http://repo.maven.apache.org/maven2
```


```
http://repo1.maven.org/maven2/
```

## 地方镜像

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
https://repository.sonatype.org/content/groups/public/
```



```
repositories {
    google()
}
```

## 私有

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

现在就可以使用本地私服地址了: http://localhost:8081/repository/maven-public/


## 如何deploy jar到私服

maven:

```
<distributionManagement>
    <repository>
        <id>nexus-release</id>
        <name>nexus-release</name>
        <url>http://localhost:8081/repository/maven-releases/</url>
    </repository>
    <snapshotRepository>
        <id>nexus-snapshot</id>
        <name>nexus-snapshot</name>
        <url>http://localhost:8081/repository/maven-snapshots/</url>
    </snapshotRepository>
</distributionManagement>
```

然后在settings.xml中加入认证

```
<servers>
    <server>
        <id>nexus-snapshot</id>
        <username>admin</username>
        <password>admin</password>
    </server>
    <server>
        <id>nexus-release</id>
        <username>admin</username>
        <password>admin</password>
    </server>
</servers>
```

gradle:

```

plugins {
	id 'maven-publish'
}


publishing {

	publications {
		mavenJava(MavenPublication) {
			from components.java
		}
	}

	repositories {
		maven {
		
			credentials {
				username "admin"
				password "admin"
			}

			if (project.version.endsWith('-SNAPSHOT')) {
				url "http://localhost:8081/repository/maven-snapshots/"
			} else {
				url "http://localhost:8081/repository/maven-releases/"
			}
		}
	}
}

```