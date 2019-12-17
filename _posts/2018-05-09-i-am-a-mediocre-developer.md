---
layout: article
title: 我们都是平庸的程序员
---

[原文](https://dev.to/sobolevn/i-am-a-mediocre-developer--30hn)


软件一定会出错

https://m.signalvnoise.com/software-has-bugs--this-is-normal/


有一个框架可以保持不出错

https://github.com/kelseyhightower/nocode


不要信任自己


How to write simple things from the beginning:

```
Use correct names for variables, functions, and classes
Make sure that every part of your program does only one thing
Prefer pure functions over regular functions
Prefer regular functions over classes
Fallback to classes only in a strong need
```


How to survive:

Write tests. Write a lot of tests. Starting from integration tests down to unit tests. Run it in the CI before each pull request. This will protect you from some logical errors

Use static typing or optional static typing. For example, we use mypy with python and flow with javascript. Positive effects: cleaner design and "compile time" checks

Use automated style checks. There are tons of the style checkers for every language

Use quality checks. Some tools run some complex heuristic algorithms on your code base to detect different problems like this line has too many logics inside, this class is not needed, this function is too complex

Review your code. Review it before merging to master. And sometime after the merge

Pay other people to audit your code. This technique has a huge positive influence! Because when developers look at your code for the first time it is easier for them to spot inconsistencies and bad design decisions


使用Docker

使用CICD


发布到生产，一定持续的监控