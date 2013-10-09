---
layout: article
title: 各种排序算法的Java实现
desc: 排序算法是学习编程的基础，它可以很复杂也可以很简单
---

排序算法有一个基本的交换步骤，所以我提取这个基本步骤到父类，父类中同时也加入打印输出这个功能以便查看排序结果
排序算法的父类代码如下

{% highlight java %}
public class SortBase {
	
	protected void swap(int[] array, int i, int j) {
		int temp;
		temp = array[i];
		array[i] = array[j];
		array[j] = temp;
	}

	protected void printArray(int[] array) {
		for (int i : array) {
			System.out.print(i + " ");
		}
	}

}
{% endhighlight %}

