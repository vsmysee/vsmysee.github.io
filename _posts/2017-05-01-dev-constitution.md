---
layout: article
title: 收集的开发章程
---
我们看一个开源软件，或者参与一个开源项目的开发，必须得先了解这个软件的设计准则或者开发章程，应为这里面体现出阿里的是软件作者的品味，哲学，风格。
有些人被linux作者骂的原因估计都是风格和哲学不匹配


[开源行为准侧](https://www.contributor-covenant.org/)

## Elasticsearch

[原文](https://github.com/elastic/engineering/blob/master/development_constitution.md)

```
团队希望尽可能快地向可靠，健壮，安全，可扩展且易于使用的系统迁移
删除脆弱的代码，并致力于改善用户体验
过程优于结果

为今天设计！谨慎使用抽象
开始简单; 不要聪明
注意：删除代码很困难
严格，明确，可靠，简单
坚守核心职责 我们的系统坚持 稳固 和 可靠 特性至关重要
你是专家; 就表现得像一名专家
独立构建功能
先移除再修复
默认速度很快; 慢是可选的
关注升级体验
突破主要的，而不是小的
自下而上测试
考虑Java API 专家 API 
重要的是，对所有的代码保持质疑，并拥抱错误 
不要害怕犯错
不要害怕重大改变 
不要害怕说不
只接受可扩展的功能
始终从梦想出发
关注错误报告
为代码提供文档
默认为私有
每一个变化都值得审阅
敢于打破规则 
精确和尊重地表达你的意见
保持友善
权力随之而来的是责任
珍惜激情
对压力感同身受
对我们的行为准则小组报告滥用评论
如有疑问，请提问
通过相互交谈来解决冲突
```


## Python
```
优美胜于丑陋（Python 以编写优美的代码为目标）
明了胜于晦涩（优美的代码应当是明了的，命名规范，风格相似）
简洁胜于复杂（优美的代码应当是简洁的，不要有复杂的内部实现）
复杂胜于凌乱（如果复杂不可避免，那代码间也不能有难懂的关系，要保持接口简洁）
扁平胜于嵌套（优美的代码应当是扁平的，不能有太多的嵌套）
间隔胜于紧凑（优美的代码有适当的间隔，不要奢望一行代码解决问题）
可读性很重要（优美的代码是可读的）
即便假借特例的实用性之名，也不可违背这些规则（这些规则至高无上）
不要包容所有错误，除非你确定需要这样做（精准地捕获异常，不写 except:pass 风格的代码）
当存在多种可能，不要尝试去猜测
而是尽量找一种，最好是唯一一种明显的解决方案（如果不确定，就用穷举法）
虽然这并不容易，因为你不是 Python 之父（这里的 Dutch 是指 Guido ）
做也许好过不做，但不假思索就动手还不如不做（动手之前要细思量）
如果你无法向人描述你的方案，那肯定不是一个好方案；反之亦然（方案测评标准）
命名空间是一种绝妙的理念，我们应当多加利用（倡导与号召）
```


## Python & Ruby

```

Beautiful is better than ugly.	Beauty is in the eye of the beholder.
Explicit is better than implicit.	Implicit is preferable to explicit.
Simple is better than complex.	Simple is boring.
Complex is better than complicated.	Complex is interesting.
Flat is better than nested.	Delegate the details to someone else.
Sparse is better than dense.	If possible, make it a one-liner.
Readability counts.	Readability is sometimes nice.
Special cases aren't special enough to break the rules.	Special cases are everywhere; the rules can't cover them all.
Although practicality beats purity.	When in doubt, monkeypatch.
Errors should never pass silently.	Errors should be suppressed.
Unless explicitly silenced.	Unless whiny nils is turned on.
In the face of ambiguity, refuse the temptation to guess.	When in doubt, make assumptions about what the user wanted.
There should be one-- and preferably only one --obvious way to do it.	There should be many-- preferably dozens --of non-obvious ways to do it.
Although that way may not be obvious at first unless you're Dutch.	What's obvious to you may be completely unintuitive to someone else.
Now is better than never.	Now is better than later.
Although never is often better than *right* now.	And later is better than never.
If the implementation is hard to explain, it's a bad idea.	If the design is flawed, explain why in the implementation docs.
If the implementation is easy to explain, it may be a good idea.	If the design is good, don't bother with implementation docs.
Namespaces are one honking great idea -- let's do more of those!	Namespaces are completely unnecessary -- let's make everything global!
```



## Redis

[英文连接](http://oldblog.antirez.com/post/redis-manifesto.html)

```
操作数据结构的语言工具
定位于一个内存数据库，正是由于内存的快速访问特性，才使得 Redis 能够有如此高的性能
使用基础的 API 操作基础的数据结构
有着诗一般优美的代码
始终避免复杂化，我们认为设计一个系统的本质，就是与复杂化作战
支持两个层面的 API，第一个层面包含部分操作 API，但它支持用于分布式环境下的 Redis。第二个层面的 API 支持更复杂的 multi-key 操作
我们以优化代码为乐，我们相信编码是一件辛苦的工作，唯一对得起这辛苦的就是去享受它


```
