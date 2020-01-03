---
layout: article
title:  函数式groovy
---

[原文](https://mariogarcia.github.io/functional-groovy/)

闭包语法

{% highlight groovy %}
d ef closure = { -> }

def closureWithArgs = { arg1, arg2 -> 
    println "statements" 
}

def closureWithImplicit = {
    println it 
}

Closure<?> typedClosure = {-> } 

{% endhighlight %}


使用闭包

{% highlight groovy %}
void 'Declaring and executing a closure'() {
    given: 'a variable and a closure'
        def x = 1 
        def c = { ->
            def y = 1 
            x + y 
        }
    when: 'executing the closure'
        def result = c() 
    then: 'the value should be the expected'
        result == 2
}

{% endhighlight %}


集合中的典型使用

{% highlight groovy %}

void 'Using closures with collections (I)'() {
    given: 'a collection of numbers'
        def numbers = [1, 2, 3, 4]
    when: 'collecting the double of each of them'
        def doubledNumbers = numbers.collect { it * 2 } 
    then:
        doubledNumbers == [2, 4, 6, 8]
}

{% endhighlight %}


组合

{% highlight groovy %}

Double calculate3(Integer... numbers) {
    def twoTimes = { it * 2 } 
    def divideByTen = { it / 10 } 
    def composedFn = twoTimes >> divideByTen 

    return numbers
        .collect(composedFn) 
        .sum()
}

void 'Composition: Calculation gets bigger. Composing (I)'() {
    given: 'two numbers as input'
        def first = 10
        def second = 20
    when: 'invoking the function'
        def result = calculate3(first, second)
    then: 'the result should be the expected'
        result == 6
}

{% endhighlight %}

科里化

{% highlight groovy %}

void 'curry(...): partial application'() {
    given: 'a function taking a certain number of args'
        def fn1 = { a, b, c -> a + b + c } 
    when: 'producting another functions'
        def fn2 = fn1.curry(1) 
        def fn3 = fn1.curry(1, 2, 3) 
    then: 'different applications'
        fn2(4, 5) == 10
        fn3() == 6
}

{% endhighlight %}


委托策略

```
OWNER_FIRST
OWNER_ONLY
DELEGATE_FIRST
DELEGATE_ONLY

```


记忆

{% highlight groovy %}

void 'Using a memoized closure'() {
     given: 'a list of words'
         def words = [\
             'car','peter','maggie',
             'ronnie','book','peter',
             'road','car','ronnie'
         ]
     and: 'building the memoized closure'
         def md5fromWord = { String word ->
             println "Word: $word" 
             java.security.MessageDigest
                 .getInstance("MD5")
                 .digest(word.getBytes("UTF-8"))
                 .encodeHex()
                 .toString()
         }.memoize() 
     when: 'collecting their md5 hashes'
         def md5Hashes = words.collect(md5fromWord) 
     then: 'checking figures'
         md5Hashes.size() == 9
         md5Hashes.unique().size() == 6
     // Word: car
     // Word: peter
     // Word: maggie
     // Word: ronnie
     // Word: book
     // Word: road
}

{% endhighlight %}


互递归

```

void 'Trampoline: Adding up numbers recursively'() {
    given: 'a closure prepared to call itself recursively'
        def sumRecursively 
        sumRecursively = { List<Integer> numbers, aggregator = 0 ->
            if (!numbers) {
                return aggregator
            } else {
                sumRecursively.trampoline( 
                        numbers.tail(),
                        aggregator + numbers.head())
            }
        }
    when: 'usisng the transformed version of closure'
        sumRecursively = sumRecursively.trampoline() 
        def result = sumRecursively(1..10000)
    then: 'we should get the result without the stackoverflow exception'
        result == 50005000
}

```
