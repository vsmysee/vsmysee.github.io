---
layout: article
title: 用Java实现各种排序
---

排序算法有一个基本的交换步骤，所以我提取这个基本步骤到父类，父类中同时也加入打印输出这个功能以便查看排序结果
排序算法的父类代码如下

{% highlight java %}

class SortBase {

    protected void swap(int[] array, int i, int j) {
        if (i != j) {
            int temp;
            temp = array[i];
            array[i] = array[j];
            array[j] = temp;
        }
    }

    protected void printArray(int[] array) {
        for (int i : array) {
            System.out.print(i + " ");
        }
    }

}
{% endhighlight %}

 


(1) 冒泡排序
{% highlight java %}
    public class BubbleSort extends SortBase {

        // 冒泡是一种简单的交换排序[O(n*n)]
        public void bubbleSort(int[] array) {
            for (int i = 0; i < array.length; i++)
                for (int j = 0; j < array.length - i - 1; j++)
                    if (array[j] < array[j + 1])// 小的往上冒,由大到小
                        swap(array, j, j + 1);
        }

    }
{% endhighlight %}

(2) 插入排序
{% highlight java %}
    //复杂度平方阶
    public class InsertSort extends SortBase {

        // 直接插入排序,默认第一个有序，然后像打扑克那样插入[O(n*n)]
        public void insertSort(int[] array) {
            for (int i = 1; i < array.length; i++) {
                for (int j = 0; j < i; j++) {
                    if (array[j] < array[i])
                        swap(array, i, j);// 使用交换技术，也可依次后移
                }
            }
        }

        //另外一种实现,见shell插入部分
        public void insertionSort(int[] a) {
            for (int p = 1; p < a.length; p++) {
                int tmp = a[p];
                int j = p;

                for (; j > 0 && tmp < a[j - 1]; j--)
                    a[j] = a[j - 1];//如果小就往后移动
                a[j] = tmp;//将待插入元素插到移动完的空位处
            }
        }

    }
{% endhighlight %}

(3) 选择排序
{% highlight java %}
    //复杂度，平方阶
    public class SelectSort extends SortBase {

        // 直接选择排序，先默认第一个最大，然后在后面的序列中找出比他大的来交换，这样不停的重复
        public void selectSort(int[] array) {
            for (int i = 0; i < array.length; i++) {
                int max_potion = i;
                for (int j = i + 1; j < array.length; j++)
                    if (array[max_potion] < array[j])
                        max_potion = j;
                if (i != max_potion)// 如果默认失效
                    swap(array, i, max_potion);

            }
        }

    }
{% endhighlight %}

(4) 快速排序
{% highlight java %}
class QuickSort extends SortBase {

    // 快速排序时获取轴点
    public int partition(int[] array, int left, int right) {

        //假定第一个是轴点
        int point = left;


        int compare = array[left];


        //从第二个开始向后看，如果发现比第一个小就要移动轴点同时做交换
        for (int j = left + 1; j <= right; j++) {
            if (array[j] < compare) {
                point++;
                swap(array, point, j);
            }
        }

        //经过上述循环可能在其他地方找到了轴点,把第一个数交换到轴点处
        swap(array, point, left);

        return point;
    }

    // 对冒泡的改进，快速排序,原理就是递归的分段，左端----轴点----右端,左<轴<右，或者左>轴>右
    public void quickSort(int[] array, int left, int right) {
        if (left < right) {
            int pivot = partition(array, left, right);
            quickSort(array, left, pivot - 1);
            quickSort(array, pivot + 1, right);
        }

    }

}

{% endhighlight %}

(5) 希尔排序
{% highlight java %}
//希尔排序 O(n的1.x次方)
    public class ShellSort {

        //按照增量进行直接插入
        public void shellInsert(int[] array, int gap) {
            for (int i = gap; i < array.length; i++) {
                int temp = array[i];
                int j = i;
                for (; j >= gap && temp > (array[j - gap]); j -= gap)
                    array[j] = array[j - gap];
                array[j] = temp;
            }
        }


        public void shellSort(int[] array) {
            for (int gap = array.length / 2; gap > 0; gap /= 2)//取增量
                shellInsert(array, gap);
        }

    }
{% endhighlight %}


(6) 归并排序
{% highlight java %}

    //归并排序[O(nlogn)] 分而治之,分解再合并，map reduce?
    public class MergeSort extends SortBase {
        public void mergeSort(int[] a) {
            int[] tmpArray = new int[a.length];
            mergeSort(a, tmpArray, 0, a.length - 1);
        }

        //分割
        private void mergeSort(int[] a, int[] tmpArray, int left, int right) {
            if (left < right) {
                int center = (left + right) / 2;
                mergeSort(a, tmpArray, left, center);
                mergeSort(a, tmpArray, center + 1, right);
                merge(a, tmpArray, left, center + 1, right);
            }
        }

        //归并
        private void merge(int[] a, int[] tmpArray, int leftPos,
                           int rightPos, int rightEnd) {
            int leftEnd = rightPos - 1;
            int tmpPos = leftPos;
            int numElements = rightEnd - leftPos + 1;

// Main loop
            while (leftPos <= leftEnd && rightPos <= rightEnd)
                if (a[leftPos] <= (a[rightPos]))
                    tmpArray[tmpPos++] = a[leftPos++];
                else
                    tmpArray[tmpPos++] = a[rightPos++];

            while (leftPos <= leftEnd)
// Copy rest of first half
                tmpArray[tmpPos++] = a[leftPos++];

            while (rightPos <= rightEnd)
// Copy rest of right half
                tmpArray[tmpPos++] = a[rightPos++];

// Copy tmpArray back
            for (int i = 0; i < numElements; i++, rightEnd--)
                a[rightEnd] = tmpArray[rightEnd];
        }

        public static void main(String args[]) {
            int a[] = {9, 8, 6, 7, 5, 4, 3, 2, 1, 0};
            new MergeSort().mergeSort(a);
            new MergeSort().printArray(a);
        }

    }

{% endhighlight %}


(7) 堆排序
{% highlight java %}
//堆排序,复杂度是线性对数,是一种树形选择排序
    public class HeapSort extends SortBase {

        public void heapsort(int[] a) {
            for (int i = a.length / 2; i >= 0; i--)
                percDown(a, i, a.length);//从层次最高的非叶子节点开始建堆，这样从下到上，就可以利用堆的性质，可做部分记忆
            for (int i = a.length - 1; i > 0; i--) {
                swap(a, 0, i); //每次调整都把最大或者最小输出到了a[0]处，把它交换到最后
                percDown(a, 0, i);
            }
        }

        private int leftChild(int i) {
            return 2 * i + 1;
        }

        private void percDown(int[] a, int i, int n) {
            int child;
            int tmp;
            for (tmp = a[i]; leftChild(i) < n; i = child) {
                child = leftChild(i);
                if (child != n - 1 && a[child] < a[child + 1])//比较左右节点
                    child++;
                if (tmp < a[child])
                    a[i] = a[child];//把从左右节点选出来的值赋值到根
                else
                    break;
            }
            a[i] = tmp;
        }

        public static void main(String args[]) {
            int a[] = {0, 5, 4, 3, 2, 1, 10, -1};
            new HeapSort().heapsort(a);
            new HeapSort().printArray(a);
        }
    }
{% endhighlight %}
