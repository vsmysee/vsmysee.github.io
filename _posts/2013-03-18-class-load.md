---
layout: article
title: Class.forName与ClassLoader
---

[原文](https://javabeat.net/class-forname-classloader-loadclass-difference/)


## Class.forName()

By default the classes are initialized at the time of loading. It means that static variables in the classes are initialized.

Also the class is loaded from the current class loader. When you invoke the Class.forName for loading the JDBC driver class, it is loaded to the same class loader from where it is invoked. In short, it is loaded to the caller’s class loader.

Class.forName is overloaded method. Invoking with single string parameter is equivalent of Class.forName(className, true, currentLoader). Optionally you can pass the second and third parameters to change the behavior.

className – Fully qualified name of the class to be loaded

initialize – Whether to initialize the class or not. By default the value is “true”

classLoader – By default the value is current class loader. Optionally you can change the class loader name.

## ClassLoader.loadClass()

By default, the classes are not initialized. The classes are loaded and made available in the classpath, the variables are initialized only when it is first time invoked by the caller.

Another advantage of this class is that you can load the classes to any specific class loader. Which may or may not be the loader that loads that calling code. If picking a specific loader to load the class is important to your design, you should ClassLoader.loadClass().