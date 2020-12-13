---
layout: article
title: 有人不喜欢SpringBoot
---

[原文](https://medium.com/@lusardichristian/java-microservices-the-right-way-8f9d9ea2715a)

```

We noticed that Spring Boot applications deployed on CloudFoundry or OpenShift with k8s suffered an Out of Memory error and crash if they weren’t set to 1GB minimum.
```

期望：

- Java compliant
- lightweight
- without useless libraries
- small memory footprint
- fast to serve request

于是：

选择SparkJava