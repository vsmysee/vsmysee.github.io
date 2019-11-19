---
layout: article
title:  使用boot的正确姿势
---
看看官网怎么说的

[地址](https://docs.spring.io/spring-boot/docs/2.2.1.RELEASE/gradle-plugin/reference/html/)

```
Each Spring Boot release is designed
and tested against a specific set of third-party dependencies. 
Overriding versions may cause 
compatibility issues and should be done with care.
```

如果用中文来翻译，可以简洁的这样表达：

```
boot是一坨
没事别乱搞
```

所以在使用springboot的时候一定要注意他内部强耦合的版本号，不要轻易替换，应该怎么配呢？

maven:
```
<parent>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-parent</artifactId>
        <version>2.2.0.RELEASE</version>
</parent>

<dependency>
       <groupId>org.springframework.boot</groupId>
       <artifactId>spring-boot-starter-web</artifactId>
</dependency>

```
注意依赖不要指定版本，要继承


gradle:

```
plugins {
	id 'org.springframework.boot' version '2.2.1.RELEASE'
	id 'io.spring.dependency-management' version '1.0.8.RELEASE'
}

dependencies {
	implementation 'org.springframework.boot:spring-boot-starter-web'
	testImplementation 'org.springframework.boot:spring-boot-starter-test'
}

```
要引入依赖插件，不要指定版本


如果再加上spring cloud的依赖，则要明确boot的版本和cloud的版本是否能够愉快的玩耍

[依赖查看](https://start.spring.io/actuator/info)

```
"spring-cloud":{
            "Finchley.M2":"Spring Boot >=2.0.0.M3 and <2.0.0.M5",
            "Finchley.M3":"Spring Boot >=2.0.0.M5 and <=2.0.0.M5",
            "Finchley.M4":"Spring Boot >=2.0.0.M6 and <=2.0.0.M6",
            "Finchley.M5":"Spring Boot >=2.0.0.M7 and <=2.0.0.M7",
            "Finchley.M6":"Spring Boot >=2.0.0.RC1 and <=2.0.0.RC1",
            "Finchley.M7":"Spring Boot >=2.0.0.RC2 and <=2.0.0.RC2",
            "Finchley.M9":"Spring Boot >=2.0.0.RELEASE and <=2.0.0.RELEASE",
            "Finchley.RC1":"Spring Boot >=2.0.1.RELEASE and <2.0.2.RELEASE",
            "Finchley.RC2":"Spring Boot >=2.0.2.RELEASE and <2.0.3.RELEASE",
            "Finchley.SR4":"Spring Boot >=2.0.3.RELEASE and <2.0.999.BUILD-SNAPSHOT",
            "Finchley.BUILD-SNAPSHOT":"Spring Boot >=2.0.999.BUILD-SNAPSHOT and <2.1.0.M3",
            "Greenwich.M1":"Spring Boot >=2.1.0.M3 and <2.1.0.RELEASE",
            "Greenwich.SR3":"Spring Boot >=2.1.0.RELEASE and <2.1.11.BUILD-SNAPSHOT",
            "Greenwich.BUILD-SNAPSHOT":"Spring Boot >=2.1.11.BUILD-SNAPSHOT and <2.2.0.M4",
            "Hoxton.RC2":"Spring Boot >=2.2.0.M4 and <2.2.2.BUILD-SNAPSHOT",
            "Hoxton.BUILD-SNAPSHOT":"Spring Boot >=2.2.2.BUILD-SNAPSHOT"
}
```

## 总结

软件开发真的越来越难