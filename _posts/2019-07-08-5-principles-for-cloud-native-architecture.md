---
layout: article
title: 云原生架构5原则
---

[原文](https://cloud.google.com/blog/products/application-development/5-principles-for-cloud-native-architecture-what-it-is-and-how-to-master-it)

[翻译](https://www.infoq.cn/article/B5Zk1p*8SGk5ZIVk27gv)


架构师的考虑

```
The functional requirements of a system (what it should do, e.g 'process orders in this format...')
The non-functional requirements (how it should perform e.g. 'process at least 200 orders a minute')
Constraints (what is out-of-scope to change e.g. 'orders must be updated on our existing mainframe system').
```


```
系统的功能需求（它应该做什么，例如“以这种格式处理订单…”）；
非功能性要求（如“每分钟至少处理 200 个订单”）；
约束（超出变更范围的内容，例如“订单必须在我们现有的大型机系统上更新”）
```

```
原则 1：自动化设计
原则 2：善用状态
原则 3：支持托管服务
原则 4：深入实践防御
原则 5：架构不止
```


## The only constant is change

In the animal kingdom, survival favors those individuals who adapt to their environment. This is not a linear journey from 'bad' to 'best' or from 'primitive' to 'evolved', rather everything is in constant flux. As the environment changes, pressure is applied to species to evolve and adapt. Similarly, cloud-native architectures do not replace traditional architectures, but they are better adapted to the very different environment of cloud. Cloud is increasingly the environment in which most of us find ourselves working, and failure to evolve and adapt, as many species can attest, is not a long term option.
The principles described above are not a magic formula for creating a cloud-native architecture, but hopefully provide strong guidelines on how to get the most out of the cloud. As an added benefit, moving and adapting architectures for cloud gives you  the opportunity to improve and adapt them in other ways, and make them better able to adapt to the next environmental shift. Change can be hard, but as evolution has shown for billions of years, you don't have to be the best to survive—you just need to be able to adapt.

## 唯一不变的是变化

在动物界，生存有利于那些适应环境的个体。这不是从“坏”到“最佳”或从“原始”到“进化”的线性旅程，而是所有事物都在不断变化。随着环境的变化，对物种施加压力以进化和适应。同样，云原生架构并不能取代传统架构，但它们更适合于非常不同的云环境。云正日益成为我们大多数人工作的环境，许多物种都证明，不能发展和适应的都不是长期的选择。

上面描述的原则并不是创建云原生架构的神奇公式，但希望能为如何充分利用云提供强有力的指导。作为额外的一个好处，云架构的变化和调整给了我们以其他方式改进和调整的机会，并使它们能够更好地适应下一次环境的变化。改变可能是困难的，正如十几亿年的进化所展示的那样，不必是生存得最好的，只需要能够去适应。






