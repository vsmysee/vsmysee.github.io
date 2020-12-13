---
layout: article
title:  最忌错误抽象
---

[原文](https://www.sandimetz.com/blog/2016/1/20/the-wrong-abstraction)


```
duplication is far cheaper than the wrong abstraction
重复的代码远比错误的抽象便宜
```

```
prefer duplication over the wrong abstraction
重复优于错误抽象
```

事情是如何做错的 

```
Programmer A sees duplication.

Programmer A extracts duplication and gives it a name.

This creates a new abstraction. It could be a new method, or perhaps even a new class.

Programmer A replaces the duplication with the new abstraction.

Ah, the code is perfect. Programmer A trots happily away.

Time passes.

A new requirement appears for which the current abstraction is almost perfect.

Programmer B gets tasked to implement this requirement.

Programmer B feels honor-bound to retain the existing abstraction, but since isn't exactly the same for every case, they alter the code to take a parameter, and then add logic to conditionally do the right thing based on the value of that parameter.

What was once a universal abstraction now behaves differently for different cases.

Another new requirement arrives.
Programmer X.
Another additional parameter.
Another new conditional.
Loop until code becomes incomprehensible.

You appear in the story about here, and your life takes a dramatic turn for the worse.
```


应该怎么做？

```
Re-introduce duplication by inlining the abstracted code back into every caller.
Within each caller, use the parameters being passed to determine the subset of the inlined code that this specific caller executes.
Delete the bits that aren't needed for this particular caller.
```