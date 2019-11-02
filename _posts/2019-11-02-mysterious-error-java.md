---
layout: article
title:  Java中一段诡异的代码
---
这段代码直接影响了我对Java的认知，也影响了我部分同事的认知，问题原因待分析

{% highlight java %}
import java.util.ArrayList;
import java.util.List;

public class Hello {

    public static void main(String[] args) {

        List<String> list = getList(getAnotherList());

        for (String src : list) {
        }

        //这里居然报错了
        for (String src : getList(getAnotherList())) {
        }

    }


    private static List<String> getList(List<String> input) {
        return new ArrayList<>();
    }


    public static List getAnotherList() {
        return new ArrayList();
    }

}
{% endhighlight %}


错误：

```
Hello.java:14: 错误: 不兼容的类型: Object无法转换为String
        for (String src : getList(getAnotherList())) {
                                 ^
注: Hello.java使用了未经检查或不安全的操作。
注: 有关详细信息, 请使用 -Xlint:unchecked 重新编译。
1 个错误
```
