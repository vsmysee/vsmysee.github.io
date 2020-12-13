---
layout: article
title: 编程风格要素
---

[原文](http://pippinlee.com/2016/02/16/The-Elements-of-Programming-Style.html)


## Introduction

Write clearly- don’t be too clever.

清楚地写-但是不要过于聪明

## Expression

Say what you mean, simply and directly.

简单，明了地表达你想要表达的

Use library functions.

使用库函数

Avoid temporary variable

避免临时变量

Write clearly – don’t sacrifice clarity for “efficiency”

写清楚-不要为了“效率”牺牲清晰性

Let the machine do the directly work

让计算机去做复杂的事情

Replace repetitive expressions by calls to ca common function

使用通用的函数调用来代替重复的代码

Parenthesize to avoid ambiguity

使用括号来避免歧义

Choose variable names that won’t be confused

选择没有歧义的变量名称

Avoid the Fortran arithmetic IF

避免使用Fortran中的IF

Use the good features of a language; avoid the bad ones

使用语言的好特性，而不是相反

Use the “telephone test” for readability


## Control Structure

Follow each decision as closely as possible with its associated action

Don’t stop with your first draft

## Program Structure

Modularize

模块化

Make the coupling between modules visible

使模块间的耦合可见

Each module should do one thing well

每个模块只做好一件事

Make sure every module hides something

确保每个模块都隐藏了些东西

Let the data structure the program

让数据将程序变得结构化

Don’t patch bad code – rewrite it

不要修补糟糕的代码-重写吧

## Input and Output

Test input for validity and plausibility
Make sure input cannot violate the limits of the program
Identify bad input; recover if possible
Make input easy to prepare and output self-explanatory
Make input easy to proofread

## Common Blunders

Don’t stop at one bug
Watch out for off-by-one errors
Avoid multiple exits from loops
Make sure your code “does nothing” gracefully
Test programs at their boundary values
Program defensively
10.0 times 0.1 is hardly ever 1.0

## Efficiency and Instrumentation

Make it right before you make it faster
Keep it right when you make it faster
Make it clear before you make it faster
Don’t sacrifice clarity for small gains in “efficiency”
Let your compiler do the simple optimizations
Don’t strain to re-use code; reorganize instead
Keep it simple to make it faster
Don’t diddle code to make it faster – find a better algorithm
Instrument your programs. Measure before making “efficiency” changes

## Documentation and readability

Make sure comments and code agree
Don’t just echo the code with comments – make every comment count
Don’t comment bad code – rewrite it
Use variable names that mean something
Format a program to help the reader understand it
Document your data layouts
Don’t over-comment