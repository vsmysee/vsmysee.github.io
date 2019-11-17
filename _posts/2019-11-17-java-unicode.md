---
layout: article
title:  Java编码很复杂
---

输入很复杂

输出很复杂

内部要纯洁


Java其实不知道怎么理解原文件，他依赖下面这段代码

```
public static Charset defaultCharset() {
          if (defaultCharset == null) {
              synchronized (Charset.class) {
                  String csn = AccessController.doPrivileged(
                      new GetPropertyAction("file.encoding"));
                  Charset cs = lookup(csn);
                  if (cs != null)
                      defaultCharset = cs;
                  else
                     defaultCharset = forName("UTF-8");
             }
         }
         return defaultCharset;
}
```

所以无论任何系统，你把文件设置为UTF-8编码就绝对安全


### 基本常识

Unicode和UTF-8/UTF-16/UTF-32之间是字符集和编码的关系

不要再说Unicode是一种编码

### 内部表示

class文件,java是用UTF-8编码保存的

jvm加载class文件运行时，内部的编码是UTF-16，所以char占用两个字节的空间

但是又会出问题，因为有些unicode字符超过了两个字节，所以又引入了codepoint,codeunit的概念


而不同语言对于内部编码的处理是不同的，比如go语言，内部编码就是UTF-8



