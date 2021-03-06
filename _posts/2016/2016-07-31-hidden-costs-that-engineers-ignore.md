---
layout: article
title: 工程师忽略的隐形成本
---
有时候我们说，“实现这个功能，我只花了几个小时”。但是完成之后，我们发现每隔几周，我们要么在修复该功能的bug、向另一个工程师解释，要么做客服回答问题、以解释其工作原理。维护该功能总的投入时间要远远超过最初开发的几个小时


[英文版](http://www.theeffectiveengineer.com/blog/hidden-costs-that-engineers-ignore)


软件开发中内化的最艰难教训之一就是额外复杂度所带来的隐形成本。有时候，复杂度在问题领域只是固有的。为了匹配乘客和司机，通过调整价格来平衡供求是一个复杂和痛苦的问题。因此，在扩大一个社区和维护社区质量的时候，把问题和答案疏通到喜欢回答和看问题的人们那里，也是如此。
或者像是开发一个兼容所有设备的富文档编辑器以支持实时协作。这是固有的复杂度，我们需要根据产品做出调整以取得成功。但是其它时候，和我们较劲的复杂度恰恰是我们自己产生的复杂度。

我们用新编程语言写代码，很少人了解它，现在我们不得不维护它。或者我们增加了额外的基础架构，因为我们尝试从Hacker News看到的、热门新技术，但是它失败了，这是我们当初没有想到的。
或者我们引入了一个很少人使用的功能，但是修复和bug报告就花掉了极不对称的大把时间。额外的复杂度暴露了很多隐形成本。在开发软件时，我们所做的决定不只是决定了我们当前的开发速度。它们还要反映出我们花在维护上的时间和努力程度。


### 复杂度的隐形成本
太多复杂度增加了认知负荷，并产生了做完事情的额外阻力。它以很多不同的方式渗入到团队里——大部分是直接渗入到代码、系统和产品复杂度里，但是间接地渗入到了组织的复杂度里。
我们逐个看看这几种不同类型复杂度的隐形成本。


### 代码复杂度
代码复杂度不只是随着代码行数的线性函数而增长——它组合式地增长。在复杂的代码库里，每行代码可能与其它很多行代码交互和影响。我们对于组合式增长难以有足够的认识，这就是为什么我们倾向于严重低估完成大型软件项目所需要的时间。
这也是重写项目有时候会大幅延期的主要原因。

当代码过于复杂的时候，它将变得难以扩展、难以理清其中缘由、难以修复bug，很难理清追踪错误来源的依赖和数据流向。工程师或许会积极地避免代码库最复杂的部分，即使它是可以做某种修改的、最有逻辑的地方，也要选择绕弯来解决。
他们或许避免把那些地方都组合起来，即使这项工作有着很大的影响。


### 系统复杂度
工程师喜欢摆弄新玩具，要么因为好奇，要么因为他们认为新技术可能为解决他们的紧迫问题提供了银弹。当Pinterest在2011年刚开始扩容网站以应对快速增长时，他们只有3个工程师的后端小组却使用了6种不同的存储技术（MySQL、Cassandra、Membase、Memcache、Redis和MongoDB）。他们实验每项新技术的诺言都是解决现有系统的某些限制。但是，每种新解决方案都以其自身特定方式失败了，为了管理和维护而投入了更多时间和努力。
最终，团队明白了，增加更多机器而不是更多技术，更能简化扩容，因此他们消除了Cassandra和MongoDB之类的系统，强化了架构的已有组件。
把基础架构切分为太多系统，会带来很多隐形成本。注意力被分散到了多个系统。对于每个系统来说，更难以整合资源以开发可复用的资源库，更难以为日常工作招聘新人，更难以理解具体的失败模式和每个系统的性能特点。每个系统的抽象最终变得更弱，因为没有可投入的太多时间。当工具和抽象太复杂、或太多的时候，让团队去理解和探索将变得困难。


### 产品复杂度
产品复杂度可以导致一个不明确的版本、或引发缺乏产品聚焦的无节制野心。它希望在很多地方是优秀的，而不只是在一个核心领域，这种欲望使其不能向新用户明确地解释产品的意图。
产品复杂度引发了更多的代码和系统复杂度——团队增加更多代码、更多基础架构以支持新功能。当产品外围宽泛时，增加一个新功能或修改现有功能，将需要放大很多的努力来理解和适应旧的功能。
过于复杂的产品意味着有更多的代码分支，更多要考虑的问题、更多的需要团队解决的bug反馈。工程师和数据科学家需要分析更多的变量、做更多的一次性的报表，而不是集中于核心用户行为的理解上。
工程师需要投入更多时间来提供功能空间和提高效率。每个人最终在更多的项目中进行切换。投入在维护所有这些功能上的时间，并不是重新投入代码、偿还技术债务、加固抽象的时间。


### 组织的复杂度
代码、系统和产品复杂度，依次产生了组织的复杂度。团队需要雇佣更多人来处理和维护已开发的所有东西。越大的团队意味着越多的沟通成本、越多的协调和和越低的总体效率。
招聘过程本身，涉及的所有面试和汇报，消耗了团队很大比例的时间。当然，所有新员工不得不被培训才能上岗。
雇佣更多人的替代方法，就是将工程师组成划分成更小的团队——或许甚至创建了一人小组——来承担较多代码、系统和产品外围的工作。这降低了沟通成本，但是一人小组有他们自己的成本。
一旦遇到难题，就完全拖延了项目中的唯一人手，因为有更少的人来分享这些低谷期，这种体验对于士气是有害的。与其他人合作的机会少了，会伤害到工作场所的快乐和员工的留任。除非每个人比较自觉，而且主动询问反馈，否则个人收到的工作反馈将更少，因为分享相同项目上下文的人更少了。减少的反馈能够降低代码质量、或因疏忽导致的复杂度引入到代码库或基础架构里。


### 如何应付复杂度
Tony Hoare在1980年图灵奖的演讲中建议，“构造软件设计有两种方法：一种是简单，明显地没有缺陷；另一种方法是使其复杂，却没有明显的缺陷。”提到了由于复杂度而导致的非明显的缺陷是如何伤害我们的，以及我们该如何应对这些成本？

下面是你能够用到的一些策略：

* 为简单而优化。抵制增加更多复杂的主张。深思维护成本。要自问，为了解决20%的问题而引入的复杂是否值得，或者80%的解决方案已经足够了。

* 为你的团队或产品定义一种任务说明以统一思想。在Team Geek，Brian W. Fitzpatric和Ben Collins-Sussman解释了他们是如何辅导Google Web Toolkit（GWT）团队、并鼓励他们写下任务说明的。接下来发生的、对于任务说明的内容和形式的争论，表明了首席工程师并不真正认同产品方向！他们被迫面对、协调不同、并最终达成了，“GWT的任务是为用户彻底提升web体验，让开发者使用现有的Java工具在任意现代浏览器里构建高性能的AJAX。
  ”如果他们不能尽早找出这些区别，随之而来的努力上的分散又有多少呢？

* 用较小的构建块组成大型系统。Google就是个例子，致力于构建健壮的核心抽象，然后被非常宽泛的应用程序广为使用。他们有基础的构建块，像Protocol Buffers、Google File System和远程程序调用的Stubby服务器。基于这些构建块之上，他们还建立了其它抽象，比如MapReduce和BigTable。在此之上，包括大型web索引、Google Analytics站点追踪、Google News聚合、Google Earth数据处理、Google Zeitgeist数据分析在内的数以千计的应用程序，还有很多程序都是这样构建的。

* 清晰地定义模块和服务之间的接口。模块和服务的退耦，将减少能够产生一堆代码的组合复杂度。在Amazon，Jeff Bezos于2002年宣称，公司将转向面向服务的架构，所有团队只能通过服务层级的接口彼此交流。虽然这个转变造成了本身巨大的开发成本，但是它强制分离了代码和服务背后的逻辑，为现在极度成功的Amazon Web Services的建立提供了便利。

* 优先偿还技术债务。我们总是在信息不完全的条件下开发软件。做为条件变化的响应，代码库在增大，熵也在增大。增加的复杂度成为了未来开发的代价。在开发日常上预算时间可以减少这项成本。很多工程师和团队在项目之间预算这项时间，不过召开一次性的会议会有帮助。我过去在Quora组织过一次Code Purge Day（代码消除日）活动，工程师在这一天全部关注删除无用代码的工作。我们在积分牌上追踪代码消除的进度，这使得删除你自己的代码更有趣味。

* 使用数据修剪没用的功能。在Yammer，当工程师或产品经理发现在代码重构时，强化或保留一个功能将花费不菲的时间时，他们将查看使用数据，以确定这项功能是否真正被使用了。如果没有，他们将和团队一起决定，他们是否应该只是砍掉这个功能以降低总体工作量。与简化的代码是怎样减少技术债务一样，这个策略也减少了技术债务。

* 基于主题对进行中的项目分组。使同事彼此分享同样的环境，更容易地参与到设计讨论、代码评审或构建可复用的资源库。所有这些活动有助于提供检查和平衡掉单个人或其他人所引发的问题。

当我们为学校课程开发软件时，我们有着世界的过于简单的视角——维护任意复杂度的成本随着下课而消失了。但是在我们的职业生涯中，糟糕的软件决定将产生数年负担的影响。不要使事情复杂化。
