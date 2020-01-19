---
layout: article
title: 好码农坏测试
---

[原文](https://mtlynch.io/good-developers-bad-tests/)


Good production code achieves encapsulation. It allows the reader to navigate large systems with ease, diving down into the details or rising to a higher level of abstraction, as needed.

```
好的产品代码实现了封装。它允许读者轻松地浏览大型系统，根据需要深入到细节或上升到更高的抽象级别。
```

It would be absurd to add a layer of abstraction to a tool that gives clear, unambiguous information.

Good test code is no different. It should produce clear results without forcing the reader to jump through multiple levels of indirection. Developers often lose sight of this because it differs from how they learned to write production code.


在提供清晰，明确信息的工具上添加抽象层是荒谬的。

好的测试代码也不例外。它应该产生清晰的结果，而不会强迫读者跳过多个间接级别。开发人员常常对此视而不见，因为它不同于他们学习编写生产代码的方式。



Test code is a different beast. A good unit test is often small enough that a developer can conceptualize all the logic at once. Adding layers of abstraction to test code increases its complexity. Tests are a diagnostic tool, so they should be as simple and obvious as possible.

```
向测试代码添加抽象层会增加其复杂性。测试是一种诊断工具，因此它们应该尽可能简单和明显。
```


Good production code is well-factored; good test code is obvious.

```
好的产品代码是经过良好分解的;好的测试代码是显而易见的。
```

The reader should understand your test without reading any other code.

读者应在不阅读任何其他代码的情况下理解您的测试。


Accept redundancy if it supports simplicity.

如果它支持简单性，请接受冗余。


When tempted to write test helper methods, try refactoring your production code instead.

如果想编写测试助手方法，请尝试重构生产代码。


