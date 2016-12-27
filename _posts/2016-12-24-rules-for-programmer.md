---
layout: article
title: 优秀程序员原则
---
好的编程原则跟好的系统设计原则和技术实施原则有着密切的联系。下面的这些编程原则在过去的这些年里让我成为了一名优秀的程序员，我相信，这些原则对任何一个开发人员来说，都能让他的编程能力大幅度的提高，能让他开发出可维护性更强、缺陷更少的程序。

{% highlight scheme %}
我不要自我重复 — 这也许是在编程开发这最最基本的一个信条，就是要告诉你不要出现重复的代码。我们很多的编程结构之所以存在，就是为了帮助我们消除重复(例如，循环语句，函数，类，等等)。
一旦程序里开始有重复现象的出现(例如很长的表达式、一大堆的语句，但都是为了表达相同的概念)，你就需要对代码进行一次新的提炼，抽象。
{% endhighlight %}


{% highlight scheme %}
提炼原则 — 跟“不要自我重复原则”相关，这一原则是说“程序中任何一段具有功能性的代码在源代码文件中应该唯一的存在。”
保持简单 — 简单化(避免复杂)永远都应该是你的头等目标。简单的程序让你写起来容易，产生的bug更少，更容易维护修改。
不要开发你目前用不到的功能 — 除非你真正需要用到它，否则不要轻易加上那些乱七八糟用不到的功能。
用最简单的方法让程序跑起来 — 在开发时有个非常好的问题你需要问问自己，“怎样才能最简单的让程序跑起来？”这能帮助我们在设计时让程序保持简单。
不要让我动脑子 — 这实际上是Steve Krug 关于web界面操作的一本书的书名，但也适用于编程。主旨是，程序代码应该让人们花最小的努力就能读懂和理解。如果一段程序对于阅读者来说需要花费太多的努力才能理解，那它很可能需要进一步简化。
开放/封闭原则 — 程序里的实体项(类，模块，函数等)应该对扩展行为开放，对修改行为关闭。换句话说，不要写允许别人修改的类，应该写能让人们扩展的类。
为维护者写程序 — 任何值得你编写的程序在将来都是值得你去维护的，也许由你维护，也许由他人。在将来，当你不得不维护这些程序时，你对这些代码的记忆会基本上跟一个陌生人一样，所以，你最好还是当成一直在给别人写程序。一个有助于你记住这个原则的办法是“写程序时时刻记着，这个将来要维护你写的程序的人是一个有严重暴力倾向，并且知道你住在哪里的精神变态者”。
最少意外原则 — 最少意外原则通常是使用在用户界面设计上，但这个原则同样适用于编写程序。程序代码应尽可能的不要让阅读者感到意外。也就是说应该遵循编码规范和常见习惯，按照公认的习惯方式进行组织和命名，不符常规的编程动作应该尽可能的避免。
单一职责原则 — 一个代码组件(例如类或函数)应该只执行单一的预设的任务。
最小化耦合关系 — 一个代码片段(代码块，函数，类等)应该最小化它对其它代码的依赖。这个目标通过尽可能少的使用共享变量来实现。“低耦合是一个计算机系统结构合理、设计优秀的标志，把它与高聚合特征联合起来，会对可读性和可维护性等重要目标的实现具有重要的意义。”
最大化内聚性 — 具有相似功能的代码应该放在同一个代码组件里。
隐藏实现细节 — 隐藏实现细节能最小化你在修改程序组件时产生的对那些使用这个组件的其它程序模块的影响。
笛米特法则(Law of Demeter) — 程序组件应该只跟它的直系亲属有关系(例如继承类，内包含的对象，通过参数入口传入的对象等。)
避免过早优化 — 只有当你的程序没有其它问题，只是比你预期的要慢时，你才能去考虑优化工作。只有当其它工作都做完后，你才能考虑优化问题，而且你只应该依据经验做法来优化。“对于小幅度的性能改进都不该考虑，要优化就应该是97%的性能提升：过早优化是一切罪恶的根源”—Donald Knuth。
代码复用 — 这不是非常核心的原则，但它跟其它原则一样非常有价值。代码复用能提高程序的可靠性，节省你的开发时间。
职责分离 — 不同领域的功能应该由完全不同的代码模块来管理，尽量减少这样的模块之间的重叠。
拥抱变化 — 这是Kent Beck的一本书的副标题，它也是极限编程和敏捷开发方法的基本信条之一。很多的其它原则都基于此观念：面对变化，欢迎变化。事实上，一些经典的软件工程原则，例如最小化耦合，就是为了让程序更容易面对变化。不论你是否采用了极限编程方法，这个原则对你的程序开发都有重要意义
{% endhighlight %}

{% highlight scheme %}
从长远角度思考。放慢脚步，才能跑得更快

这可能是最重要的一点了。作为工程师，我们享受于高效的工作效率：喜欢不断地创建、创建、创建。但是如果我们不能用长远的角度看问题，只会作茧自缚，使得最后越来越难构建任何东西。

有时候，我们还没理解问题就直接去写代码，最后导致不得不放弃。有时候我们的方案虽然对局部问题很有疗效，可却能让事情变得更糟或造成更严重的后果。有时候我们匆匆忙忙没有完成设计，从而导致后期别人需要花更多的时间来修复。有时候我们只是懒得用正确的方式写，直接就复制或者借鉴了别人的内容，原因可能是因为忙着赶项目进度不想花时间去好好思考。……

上面这些情况举不胜举。也有人说，这可比我碰到的情况好多了，呵呵。但是我还是想重复一下——我们的目标是建设最多最强大的功能，拥有最广泛的用户。所以，目光要看得长远。
{% endhighlight %}

{% highlight scheme %}
不要仅仅修复bug；要修复所有可能发生bug的地方

对于自己犯的错误，没必要耿耿于怀。每个人都讨厌出现bug，我也是。

我讨厌会让我犯错的系统。而且我真的非常非常讨厌去修复同样的bug，所以为了避免这种情况，每当我修复一个bug时，我就会思考以下问题：这种bug现在还有可能出现在哪里？以后又比较容易出现在什么地方？是什么原因造成了这种模式的bug？我能不能一下子一网打尽呢？
{% endhighlight %}

{% highlight scheme %}
简单就好

我们喜欢创建一些新事物、解决一些疑难杂症。这也是为什么我们干这一行的原因。但是很多时候，我们发现某个问题可以解决，却并不意味着现在就是解决它的好时机。

我总是觉得自己是个爱自找麻烦的程序员——我喜欢干净简单易于理解的设计。别以为这很容易，相反这是一个难度不小的挑战——以一种复杂的方式解决问题谁都能办到，但是只有优秀的程序员才能用一种既简单又易于理解的方式解决问题。特别是要真正直截了当地思考出问题的关键就更是难上加难了。

理解是重点，要知道程序员大部分时间是在维护代码，而不是写代码。
{% endhighlight %}

{% highlight scheme %}
寻找自己的兴趣点

学习应当是一件有意思的事情，当你的大脑排斥它的时候，我不相信可以很容易地掌握这门新技术。如果你找不到兴趣点，那么，不妨回到我前文对于新技术是否值得你学习的观点上去，既然你没有什么兴趣，你学它干嘛？
{% endhighlight %}

{% highlight scheme %}
保持初学者的思维 | Beginner’s Mind
还记得你作为一个新兵时候的日子吧。如果你仍旧还是个新人，就记住这个时候吧。你时刻渴望新知。每天都想象自己是一个新人。试着以一个新人的角度来看那些技术。这样你能更好的接受指正，或者不按常规出牌，推陈出新。也可以从一些新人身上学到许多好的想法。

{% endhighlight %}


{% highlight scheme %}
没有什么东西是不可取代的 | There is nothing special
一朵花很美丽，但它仅仅是一朵漂亮的花朵，没有什么更特别的了。它一点也不稀奇。你是一个会编程的生命体，可能你很棒，但也没有什么稀奇的了。你仅仅和我一样是这个星球上存在的一个生命体而已。

你要上厕所，你要吃饭，你要睡觉。很久以后（希望如此）你会死去，你所创造的一切将会随之而去。就算是金字塔很久以后也会消失。你知道建造金字塔的人的名字吗？如果你知道，那么这很重要么？不重要。金字塔在或是不在，都没什么特别的。

同样你写的程序也一样。银行通过你写的软件赚钱。但当你离开之后，没人会记住你。这不是谁的错，这是时间的规律。你不需要担忧。如果你相信这一条规律，你会意识到上一个项目是非常有趣的项目。现在仅仅需要继续，专注的去看其他的什么事情。

如果你的公司因为财政原因倒闭了，不要担心。生命还会继续。我们不是真的需要一个xbox，一辆车或是什么其他的。这个世界上大部分人都生活中水生火热中。他们不在乎xbox，因为他们对于食物和水更加渴望。

所以，为什么只有你是独一无二的？仅仅因为你很幸运的生活在这个世界？因为你会编程？不，你没有什么特别的。你应该让你的自我感消失，放松的生活。享受花朵的香气和颜色吧，当冬天来临时不要过于杯水，春天到来时不要过于高兴。这是自然规律。当别人否认你的程序时也要这么宠辱不惊。因为公司并没有那么重要。
{% endhighlight %}

{% highlight scheme %}
如果你决定开始工作，请尽力的做好它。不要同一时间做几件事情。一次只做一件事情。如果你多线程工作的话，你不一定会更快。多线程会让你精疲力尽，出错，转换任务时消耗更多的时间。这不是仅限于编程，这是个普遍的法则。

Kodo Sawaki说过：如果你需要睡觉，去睡吧。当你试图睡觉的时候，不要想着程序，单纯的睡觉。如果你在编程，就专注编程吧，不要做白日梦。如果你很累的话，不能再编程的时候，就睡觉吧。就算是著名的多线程超人Stephan Uhrenbacher也决定以后单线程工作。我也有与Stephan类似的经历，最后我写了Time & Bill，一个追踪时间的工具。目的是想只需要点一个键，就能追踪我的时间。结果很糟糕：我经常在一个任务只专注了几分钟就转移到另外一个任务去了。现在我好多了。类似于Pomodoro technique，我计划了一些工作时段，专注于它们。不聊天，不睡觉，不查看Appstore里的新游戏。

{% endhighlight %}


## 学无止境。
就算是你有了10年以上的程序员经历，你也得要使劲地学习，因为你在计算机这个充满一创造力的领域，每天都会有很多很多的新事物出现。你需要跟上时代的步伐。你需要去了解新的程序语言，以及了解正在发展中的程序语言，以及一些编程框架。还需要去阅读一些业内的新闻，并到一些热门的社区去参与在线的讨论，这样你才能明白和了解整个软件开发的趋势。在国内，一些著名的社区例如：CSDN，ITPUB，CHINAUINX等等，在国外，建议你经常上一上digg.com去看看各种BLOG的聚合。

## 掌握多种语言
程序语言总是有其最适合的领域。当你面对需要解决的问题时，你需要找到一个最适合的语言来解决这些问题。比如，如果你需要性能，可能C/C++是首选，如果你需要跨平台，可能Java是首选，如果你要写一个Web上的开发程序，那么PHP，ASP，Ajax，JSP可能会是你的选择，如果你要处理一些文本并和别的应用交互，可能Perl, Python会是最好的。所以，花一些时间去探索一下其它你并熟悉的程序语言，能让你的眼界变宽，因为你被武装得更好，你思考问题也就更为全面，这对于自己和项目都会有好的帮助。

## 理性面对不同的操作系统或技术
程序员们总是有自己心目中无可比拟的技术和操作系统，有的人喜欢Ubuntu，有的人喜欢Debian，还有的人喜欢Windows，以及FreeBSD，MacOSX或Solaris等等。看看我的BLOG(http://blog.csdn.net/haoel)中的那篇《其实Unix很简单》后的回复你就知道程序员们在维护起自己的忠爱时的那份执着了。只有一部分优秀的程序员明白不同操作系统的优势和长处和短处，这样，在系统选型的时候，才能做到真正的客观和公正，而不会让情绪影响到自己。同样，语言也是一样，有太多的程序员总是喜欢纠缠于语言的对比，如：Java和Perl。哪个刚刚出道的程序员没有争论去类似的话题呢？比如VC++和Delphi等等。争论这些东西只能表明自己的肤浅和浮燥。优秀的程序并不会执着于这些，而是能够理性的分析和理心地面对，从而才能客观地做出正确的选择。

## 别把自己框在单一的开发环境中
再一次，正如上面所述，每个程序员都有自己忠爱的工具和技术，有的喜欢老的（比如我就喜欢Vi编辑程序），而有的喜欢新的比如gedit或是Emacs等。有的喜欢使用像VC++一样的图形界面的调试器，而我更喜欢GDB命令行方面的调式器。等等等等。程序员在使用什么样的工具上的争论还少吗？到处都是啊。使用什么样的工具本来无所谓，只要你能更好更快地达到你的目的。但是有一点是优秀程序员都应该了解的——那就是应该去尝试一下别的工作环境。没有比较，你永远不知道谁好谁不好，你也永远不知道你所不知道的。

## 使用版本管理工具管理你的代码
千万不要告诉我你不知道源码的版本管理，如果你的团队开发的源代码并没有版本管理系统，那么我要告诉你，你的软件开发还处于石器时代。赶快使用一个版式本管理工具吧。CVS 是一个看上去平淡无奇的版本工具，但它是被使用最广的版本管理系统，Subversion 是CVS的一个升级版，其正在开始接管CVS的领地。Git 又是一个不同的版本管理工具。还有Visual SourceSafe等。使用什么样的版本管理工具依赖于你的团队的大小和地理分布，你也许正在使用最有效率或最没有效率的工具来管理你的源代码。但一个优秀的程序员总是会使用一款源码版本管理工具来管理自己的代码。如果你要我推荐一个，我推荐你使用开源的Subversion。

## 是一个优秀的团队成员
除非你喜欢独奏，除非你是孤胆英雄。但我想告诉你，今天，可能没有一个成熟的软件是你一个人能做的到的，你可能是你团队中最牛的大拿，但这并不意味着你就是好的团队成员。你的能力只有放到一个团队中才能施展开来。你在和你的团队成员交流中有礼貌吗？你是否经常和他们沟通，并且大家都喜欢和你在一起讨论问题？想一想一个足球队吧，你是这个队中好的成员吗？当别人看到你在场上的跑动时，当别人看到你的传球和接球和抢断时，你的团员成员能因为你的动作受到鼓舞吗？

## 把你的工作变成文档
这一条目当然包括了在代码中写注释，但那还仅仅不够，你还需要做得更多。有良好的注释风格的代码是一个文档的基础，他能够让你和你的团队容易的明白你的意图和想法。写下文档，并不仅仅是怕我们忘了当时的想法，而且还是一种团队的离线交流的方法，更是一种知识传递的方法。记录下你所知道的一切会是一个好的习惯。因为，我相信你不希望别人总是在你最忙的时候来打断你问问题，或是你在休假的时候接到公司的电话来询问你问题。而你自己如果老是守着自己的东西，其结果只可能是让你自己长时间地深陷在这块东西内，而你就更本不可以去做更多的事情。包括向上的晋升。你可能以为“教会徒弟能饿死师父”，但我告诉你，你的保守会让你失去更多更好的东西，请你相信我，我绝不是在这里耸人听闻。

## 注意备份和安全
可能你觉得这是一个“废话”，你已明白了备份的重要性。但是，我还是要在这里提出，丢失东西是我们人生中的一部份，你总是会丢东西，这点你永远无法避免。比如：你的笔记本电脑被人偷了，你的硬盘损坏了，你的电脑中病毒了，你的系统被人入侵了，甚至整个大楼被烧了，等等，等等。所以，做好备份工作是非常非常重要的事情，硬盘是不可信的，所以定期的刻录光盘或是磁带可能会是一个好的方法，网络也是不可信的，所以小心病毒和黑客，不但使用软件方面的安全策略，你更需要一个健全的管理制度。此外，尽量的让你的数据放在不同的地方，并做好定期（每日，每周，每月）的备份策略。

## 设计要足够灵活
可能你的需求只会要求你实现一个死的东西，但是，你作为一个优秀的程序，你应该随时在思考这个死的东西是否可以有灵活的一面，比如把一些参数变成可以配置的，把一些公用的东西形成你的函数库以便以后重用，是否提供插件方面的功能？你的模块是否要以像积木一样随意组合？如果要有修改的话，你的设计是否能够马上应付？当然，灵活的设计可能并不是要你去重新发明轮子，你应该尽可能是使用标准化的东西。所谓灵话的设计就是要让让考虑更多需求之外的东西，把需求中这一类的问题都考虑到，而不是只处理需求中所说的那一特定的东西。比如说，需要需要的屏幕分辨率是800×600，那么你的设计能否灵活于其他的分辨率？程序设计总是需要我们去处理不同的环境，以及未来的趋势。我们需要用动态的眼光去思考问题，而不是刻舟求剑。也许有一天，你今天写的程序就要移植到别的环境中去，那个时候你就能真正明白什么是灵活的设计了。

## 不要搬起石头砸自己的脚
程序员总是有一种不好的习惯，那就是总是想赶快地完成自己手上的工作。但情况却往往事已愿违。越是想做得快，就越是容易出问题，越是想做得快，就越是容易遗漏问题，最终，程序改过来改过去，按下葫芦起了瓢，最后花费的时间和精力反而更多。欲速而不达。优秀程序员的习惯是前面多花一些时间多作一些调查，试验一下不同的解决方案，如果时间允许，一个好的习惯是，每4个小时的编程，需要一个小时的休息，然后又是4个小时的编码。当然，这因人而异，但其目的就是让你时常回头看看，让你想一想这样三个问题：1）是否这么做是对的？2）是否这么做考虑到了所有的情况？3）是否有更好的方法？想好了再说，时常回头看看走过的路，时常总结一下过去事，会对你有很大的帮助。


## 良好的时间管理
迟到对于任何一家公司都是个头痛的问题。作为一个程序员，有时候为了完成任务常常不得不熬夜，从而导致第二天上班就迟到了。但是我们忽略了这一点，我们的工作时间至关重要，因为在这段时间里我们要和客户同步，也要与团队其他成员一齐协作。

## 深入理解客户需求
仅仅了解单一用户的表面意思是远远不够的。一个伟大的程序员应该具备能把繁琐的要求理解并分解成项目的技术任务或子任务的能力，并且最后拿到的成果应精确满足客户的需求。

## 在编程之前准备好全套算法
案例、伪代码和流程图统统都是非常重要的软件开发手段。一个伟大的程序员如果没有先准备好算法，那么他是不会像傻小子一样兴冲冲地开工写代码的。写代码实际上只是一个编码任务。

## 理解并帮助定义验收标准
是否需要高层次测试脚本是由产品所有者决定的，但是一个伟大的程序员必须能够编写技术测试脚本，并且深刻认识到跳过这些步骤可能会带来的后果。

## 绞尽脑汁还是“NO”
假如抓耳挠腮还是找不出解决办法，我们该如何是好？一个伟大的程序员应该足智多谋，能灵活应对困境。他们会去询问同事，或者是向团队领导者请教；在互联网上面搜索，然后耐下心来一遍又一遍地试验。相信山穷水尽疑无路，柳暗花明又一村，投降两个字从未出现在他们的字典上。

## 承认自己的缺陷
性格内向就是其中一个对于我们大多数程序员而言很常见的软技能问题。但是一个伟大的程序员一旦知道自己的不足之处之后，会立刻主动改善自我，并且积极执行“客户第一”的服务理念。

## 主动
优秀的程序员不需要别人告诉他怎么做，他的主动性更强。他有这个自觉，会主动去关注流程；改善能增强软件开发生产力的工具，例如SVN；提高应用程序的灵活性以及解决软件开发中发现的Bug。
最后，我想说的是，无论你是职工还是自由职业者，要明确一点——软件开发的目的是为客户服务。一个伟大的程序员深刻明白每一个任务的价值并且尊重他人的成果，对其呕心沥血的过程感同身受！


## 积极使用搜索工具
作为开发人员，你需要了解如何利用搜索解惑，查看其他人对你正在研究的主题所讨论的话题和内容，并将学到的知识应用于手头的项目。

当面临一个问题，优秀的程序员应该知道如何花很少时间去查验和解决手头的问题。

## 保持初学者心态
技术发展如此之快，需要不断地学习新技术。 因此，当没有经验的时候，你需要适当地用新的视角看待事情。优秀的开发人员享受作为新技术的初学者的过程，并掌握自我教育的节奏，以尽快自给自足。

每个专家在某个时间点都可能是一个初学者。 而且有这么多的技术，即使在某个技术领域是专家，在另一个可能就是菜鸟。

## 将小事做好
当编写程序时，它通常会让你觉得需要做出十亿个决定，即使你只是添加一个小功能。 你需要考虑诸如命名变量、调用函数、命名CSS属性、使用hash与使用数组、命名事物等等。

为你干的事情做好命名是编程中一个重要的部分。 这不容易， 但很重要。有开发人员还开玩笑说，在计算机科学领域有两个难题：缓存无效+命名。

新程序员通常不会对变量和函数命名足够重视， 普通程序员会花更多的时间去思考它，而优秀的程序员已经通过之前遇到错误和问题学到了经验。 他们找到了来帮助他们命名变量的模式，他们甚至不需要再去考虑它，因为一直沿用相同的方式命名就好。

## 收放自如
在构建应用程序的过程中，往往需要做出重大决策，这将影响你如何编写大多数代码。例如，在ruby中，你可能需要权衡MiniTest和RSpec之间的区别。 人们对于这些类型都有着强烈的自我意见和看法，因此容易引起争执。 但是优秀的开发人员想法不同，往往不太在意这些，他们重视编写、测试的习惯，他们知道你使用的具体工具其实不那么重要。

优秀的程序员往往不参与其他开发者的相互争执和指责中，他们更收放自如。

## 使用正确的工具
在编程中，有许多不同的开源库、工具和框架可供使用。 优秀的程序员不断地评估他们正在使用的工具，并找出为工作选择正确工具的方法。 由于他们习惯自给自足，他们愿意承受学习新东西的痛苦，只要它们能帮其提升效率。

有很多的开发人员喜欢去搜索和查看相关的文档、博客文章来比较工具，并最终选择一个单一的工具。但优秀的开发人员会将他们的研究缩小到2-3个选项，并迅速将这些工具应用到他们的项目，以了解它们是如何在他们的环境中工作的。

## 理解“code is cheap”

优秀的程序员往往可以产生更多的产出，因为他们不会被沉没成本误导。这些东西很容易导致人们做出不合理的行为，特别是在编写代码的时候……

在编码中，沉没成本的误导涉及到花费在解决某个问题上的时间。例如，考虑一个场景，其中某人开始为项目编写代码，并预计需要大约一个星期。他们根据这个预期做出决定，在完成项目一整个星期后，他们意识到它实际上需要一个月。大多数开发人员将继续他们已经开始的路径走下去，证明他们的决定，并展示已经做了一个星期的进展来进行说服自己。

但是优秀的开发者思考方向不同：

“有一种其它的方法，我认为只需要半个月就能搞定。这意味着如果采取这种方法，它将可能比我保持现在的路径一直走到底要快两倍。”

## 使用正确的技术
一群人在屋里评估技术，然后忽略掉一个在特定技术里的大拿这种情况并不罕见。

例如，我非常有声望，我对 Elixir 编程语言很是看好。但是这项技术很新，如果想要实际构建复杂的功能，可能会相对其它更难找到相应的开源技术，这将提升团队构建的难度。

解决问题需要最实际的决定，使用的技术应该是基于它能够很容易在2016年，在目前实现。在2017年、2018年、2020年，技术可能会有所不同，那时候再根据需要进行调整。

## 不知道就说“不知道”
拒绝承认你不知道的东西是很容易导致浪费你时间的事情。 作为一个优秀的程序员，你要明白你的自我价值并不受那些你不懂的东西束缚。

初学者经常难以发现最新技术的发展趋势，优秀的开发者会意识到，他们所知道的每一种技术（编程语言，框架，库等）都可能不再是明天的可行选择。 他们会提前考虑更高级别的编程方式和问题解决方式。

## 始终分析错误消息中提示的线索
传统教育告诉我们，失败是不可取的。当学习代码时，错误消息通常与失败相关联。学习如何排除故障和调试错误消息是一个重要的技能。

还值得注意的是，开发人员可能会再次遇到类似的错误消息。你应该专注于学习如何解决问题，以及为什么你需要解决它们。这样做将允许你以更快的速度修复类似的错误。

## 不安于目前的成功
错误往往是最好的学习机会， 所以不要把错误当作失败。 相反，将他们当作可学习的机会，并评估如何防止情况下一次发生。成长的关键是理解如何使同样的错误只有一次。

编程，就像生活中的许多事情一样。这就是为什么这么多的行为，能帮助你做好一名优秀的程序员，也能帮你在日常生活中做一个优秀的人。


## 估算解决问题所需要的时间
为自己定一个时间限制，如果在这期间未能解决问题，那就去寻求帮助，或到网上找答案，而不是尝试去做“超级堆码员”，因为很多问题，你很少会是这个世界上唯一一个遇到的人。站在别人的肩膀上，会让你的形象变得高大、伟岸。

##  理解编程语言的原理
三流的人才懂应用，二流的人才懂开发，一流的人才懂原理，要想学好一门编程语言，掌握语言的原理是必不可少的。各种语言之间存在相似之处，你所选择的语言，你应该觉得“舒服”，并且能够写出有效（而且简洁）的代码。最重要的，让语言去适应项目，反之亦然。
重视，但不过于注重程序的设计模式。在大中型系统中，引入设计模式，往往能极大地提高系统研发的效率。但设计模式并非万金油，有时候，写一个简单的算法，要比引入某种模式更容易。如果一个100行就能写完的脚本，最终却使用了8个类，10个接口，外加一大堆范式和标记符，结果导致97%的代码不做任何事情，这种优化又有什么意义？在多数情况下，程序代码应是简单易懂，而不应该是老太婆的裹脚布—又臭又长。

##  做好版本控制
并及时备份代码。编码时，最痛苦的事情不是有多少bug没解决，而是突然停电了，一天的工作却没有保存。版本控制时，最好使用版本控制软件。无论什么时候改变自己的程序，它们都会将其保存为.bak文件。

## 对项目文件归类保存
可以把项目文件放到SOURCE、HEADERS、MAKE、EXES等不同的文件夹中。如果工程包含多个源文件，则可以建立一个README文件，注明每个源文件、数据文件、临时文件以及日志文件(如果有的话)的作用。还可以注明编译和运行步骤。

## 动手编码之前
先做好分析和设计。项目开始之初，不要急于编码，而应该做好详细的需求与设计。做需求确实很难，不然也不会有程序员发出这样的牢骚：需求无非两种，一种是“你妹的，这还用做？”，另一种是“你妹的，这也能做？”不仅如此，实践和分析设计过程也可存在很大的矛盾，但是好的分析会避免过早走向一个错误的方向，好的设计可以避免混乱，否则，很有可能忙活了很久，最后发现方向错了或是架构错了，需要不断的监测、修改与调试，甚至是完全推翻以前的工作，重新设计，工作的成果看起来更像一个三岁小孩的涂鸦，而不是意见艺术作品，“捡了芝麻却丢了西瓜”。永远不要在没有任何设计的前提下就开始编码，除非所编代码不重要。

## 多向其他优秀程序员学习
你有一个苹果，我也有一个苹果，我们交换苹果，你我还是有一个苹果；你有一种思想，我也有一种思想，我们交换思想，你我就有了两种思想。其实，一个人能走多远，要看他与谁同行；一个人有多优秀，要看他有谁指点；一个人有多成功，要看他有谁相伴，更何况“一山总比一山高”。休息放松固然重要，但需要适可而止，生命不息，奋斗不止，尤其是年轻的时候，更是如此。时间的强大是不可逆转，再繁华的都会归于尘土，与其把大把大把的时间浪费在打dota、玩三国杀或是无聊发呆上，还不如与其他优秀程序员坐在一起边喝咖啡边交流或是研究他们编写的代码，吸收他们的经验转化为自己所用。在与这些人的沟通中，学习他们解决和自己相同的任务时所使用的方法，在此过程中所学知识可能会帮你省下几个星期的时间。我们不赞成与臭棋佬下棋，棋会越下越臭的观点，但不可否认这样一个事实：和什么样的人在一起，就会有什么样的人生，和勤奋的人在一起，你不会懒惰；和积极的人在一起，你不会消沉；与智者同行，你会不同凡响；与高人为伍，你能登上巅峰。

## 优化代码
优雅的代码非常的易读，所以如果时间允许，应该尽可能地优化代码，对时间和空间进行合理分配与使用。之前声明的一些变量，现在可能没用了。同样，并不依赖循环的一些声明可以移到循环模块之外去。否则后续开发或是技术提供会比较困难。但也需要注意，优化后的代码并不是越简短越好，用的语法越偏僻越好，因为晦涩的代码，维护成本会非常高，而且好的代码不但要实现功能，更要好维护，最好是A写的代码让B能很轻易的理解和修改。

## 加强测试
测试的重要性并不亚于开发，所以要非常注重程序自测试。测试时，一般使用工具为主，人工为辅的策略，工具包括用单元测试，assert语句，代码测试容器，人工指用 print 和debugger 一行一行跟踪。

## 使用输出日志
打印输出函数可以跟踪变量的执行，但频繁地插入打印会使得屏幕的输出很乱，而写一个日志函数，可以保证 Debug 的时候的输出以一种统一的，可管理的方式出现，这样在最后发布稳定版本的时候，只需要简单的几行命令就可以从代码中剔除所有的日志打印行。

## 检查代码
代码要经常检查（包括自查和其他同事检查）。在提交代码前，找个同事一起坐下来，向他解释代码做了哪些修改。这样做的过程中通常能够发现代码中的错误，而不需要同事说一句话。这比自己审查自己的代码要有效的多。将代码的bug发现的越早，成本越低。

## 回顾代码
在看到自己以前的代码时，通常会有两种矛盾不同的想法：第一种：我怎么写了这么烂的代码；第二种，我写的代码还是挺有成就感的。其实，经常回顾以前的代码，往往会触发新的想法，以及对以前编码更深层次的思考。

## 编码不能想当然
任何时候都要严谨。一个简单的项目，表面上看可能可以轻松完成，其实不然，一个使用Microsoft Access的、只有3个页面的网站，最后很有可能会变成一个有30个页面并使用SQL Server作为数据库的网站。所以除非有一个类、组件或者一段已经写好的代码，并且在现有的项目已经测试通过，否则，切不可掉以轻心。

## 任何软件都会有BUG
BUG像幽灵一样，它是永远也改不完的，所以关键是要修复严重的、影响业务的、显眼的Bug。一个软件项目，参与的人数越多，并不代表软件可靠性越好，相反，“人多手杂”，而且需求越变更，潜在的Bug会越来越多，很多时候，也许只是修改了一行代码，其很有可能影响到很多关键流程的执行。

##  养成耐心、冷静的好习惯
作为一名程序员，不能像普通人一样被计算机掌控，而应该作为计算机的主人，去掌控计算机。所以，一定要有足够的耐心，当程序运行不正确时，要冷静下来，站在计算机的角度去看问题、分析问题。

##  遵循编程规范
例如“==”与“=”的区别；合理使用缩进；使用循环和条件语句时，先把左右括号对应起来，然后再在里面写其他语句；避免使用幻数（magic numbers）；使用有意义的变量和函数名称，例如，使用‘radius’来代替圆的半径，而不是用‘r’来表示。

## 了解底层知识
优秀的程序员不会只关注程序如何实现，而会深层次地剖析其实现机理，所以，程序员要对自己的操作系统和硬件要有足够的了解，从CPU的执行方法，到操作系统的运转，到程序的编译链接，到代码的加载与运行，到程序的调试，最后到实现的功能这一整套的内容，只有做到这样，才能真正提高。

## 要聪明但不要“小聪明”
不反对走捷径，但是一定要论证充分，否则，可能会产生很多潜在的bug。编码中走捷径也许能够提高程序的可读性以及效率，但是如果论证不充分，不能把所有的潜在问题考虑周全，很有可能犯了丢了西瓜拣了芝麻的错误。最好的论证方法是多和他人商量，请别人检查自己的工作，将问题提早暴露。所以，不要为了做成某件事却忽略过程的连带效应，也许有一天你会为你当初的“小聪明”买单。

## 要有创新的想法
对于大型企业而言，离开了创新，就等于失去了生命力，对于程序员个人而言，离开了创新，就等于停止了进步的脚步。虽然说天下学术全是抄，俨然一副“君不见创新项目一大堆，都被抄死化成灰”架势，但是不能因此而放弃创新，因为大地不可以因为有畜牲吃草而不复生机，山泉也不会因为有王八偷水而不冒活水。所以，无论工作有多忙，生活有多艰辛，都要尽可能地保持有一颗生机灵动的心。因为这个东西是别人偷不走的，也是最大的财富。即使暂时不具备这个东西，也要在生活中用心经营、好好培养。创新不一定要是改变全世界的大举，也不一定非得是世界上第一个做这件事的人，任何一种能改善生活的行为都可以认为是一种创新。例如写一个脚本去改变重复劳动或是采用什么方式解放自己。

##  对待知识要刨根问底
要有“打破沙锅问到底”的决心。“知识就像内裤，看不见却很重要”，在工作中，不能只知其然，不知其所以然，要不懈追求对细节一丝不苟的实干作风与敬业精神，而不是浮于表面，满足于填鸭，满足于考试交差或随便应付，请记住，这个世界牛逼的人少，装逼的人多，要从深层次去想其背后的思想和原理是什么。任何行业都有核心技术，掌握某一项核心技术，就可以让你进入这个行业并在其中生存，反之仅仅浅尝辄止，就会让你遭遇失败，抱怨不公。例如学会了C++面向对象程序设计，就应该弄清楚一个对象在编译后，在汇编代码中是如何被初始化的；就应该弄清楚这个对象的各个成员在内存中是如何存放的；就应该弄清楚当一个成员函数被调用时，编译器在汇编代码中加入了哪些额外的动作；就应该弄清楚虚函数的调用是如何实现的，而这些东西没有人强迫你去弄懂，只有你自己。想得多了，自己的层次才有可能提高，如果只是停留在被动的接受，那很难有所提高。

## 尽可能复用成熟代码
如果有现成的允许使用的经过测试的代码或程序库，并且有人维护或维护成本可以接受，程序员应该尽量使用现有代码和库来节省时间和开发测试成本。

## 多一份追求完美的执着
人是不完美的，但人们都在追求完美，程序也一样，所以程序员要去追求完美。追求完美的人更容易出色、更具责任心，做事往往也显得更专业。

## 不要心存侥幸
可能出错的地方一定会出错，偶尔发生偶尔不发生的问题就是大问题。所以，对于一些常见的问题，一定做到防微杜渐：每个变量都做初始化；每个函数都做声明；引用每个参数都会做有效性检查；在可能出错的每个地方都会做边界条件检查等等。这样开发出来的程序一定会稳固很多，就是出错也会很容易修改。而一些没经过正规培训或是半路出家的所谓的高手，一般开发速度很快，三下两除二的就开发完成了，结果很可能出现“功能大体实现，bug总是在变”的情况，最后花费很长的时间来修改代码中的bug，总时间甚至会大大延期。而真正的高手，追求的境界是零缺陷代码。


## Remove distractions form your environment
Plenty of time in work is spend on facebook, twitter, hallway discussion, etc Get rid of this and focus on work only. Avoid meetings as well. When work make breaks, but use them to standup a move around a bit. That will keep you more focused and therefore better performing.

## Work less
Once you focus better, you don't need to work that much. In many companies you can actually work for less then 8 hours if you perform well. It is best to work 3-4 hours in row (in high focus state), in practice 5-7 hours day of work is a huge improvement over 8+ hour day of work. Once you have more time, take better care of yourself (see next point).

## Stay fit
Stay in good shape, sleep enough, exercise, meet with friends. Programming is a cognitive skill and your body and mind state will affect your performance.


## Don't under or overdesign
Don't spend too much time on simplifying or complicating design (playing with a code; play a little bit with it, but not too much). Web is not a rocket science and at all times just keep it simple (take a look at next point).

## Keep the code simple
Less code is less opportunity for making a bug.
Don't code frameworks, don't extract level of abstractions when you need to get simple work done.

## Stay on technological edge
Use new technologies. New libs, coding environments, frameworks, deployment tools etc. They will save your time and effort. Note: It doesn't mean use unstable versions.


## Make stable moves and remove blockers
Check if you're on the right track every couple minutes. You can use TDD, you can print how the function works, or you can just check if the screen you're coding looks like the one on design. Just make sure you have a short feedback loop for yourself. If you have a problem, take a break, discuss it with a friend, take another approach. Don't dig into it for to long.

## Fix the bugs immediately when they are reported
That is the simplest way to make sure, you stay on good quality code.
If you have to many bugs to fix or they take too much time - stop coding and figure out why they are showing up. You might need to take significant effort over time to remove technical debt, but do it if you need.


## Establish good communication with your management/customer
The worst you can do is to reimplement same features over and over again, just because there is a bad communication in your work environment. Make sure both sides understand what needs to be done (sometimes PO might think he/she understands, but developer can show him consequences that he is not able to see by himself).


## Be agile
Agile practises already solve a bunch of problems for you. Just use it to your benefit.


{% highlight scheme %}
 Use your keyboard, not your mouse: The mouse is for designers, not programmers. Learn your shortcuts.

 Automate: If you find yourself doing a set of steps all the time, see if you can find a way to automate that. If there's a tool that automate that, prefer to use that tool instead of wasting your time re-inventing the wheel.

 Close unnecessary windows and tabs: Only have the windows and tabs open in front of you that you really need. You won't need more than 5 browser tabs, or 5 code windows at a time in 90% of the cases. The more windows and tabs you have open, the more distractions you'll have, plus more chance for errors.

 Aim for simplicity: If your application requires a reference list that gets updated once a year, you can write a SQL script to update the reference data. No need to waste your time creating an administration panel with security that's going to be used once a year! If your website requires a page to display the list of recent news, no need to go down the route of using design patterns to design something like Facebook's news feed, with lots of flexibility! A simple flat list would do the job.

 Use design patterns "wisely": I've made this mistake numerous times for the sake of "flexibility". Flexibility comes at a cost. Not every application requires flexibility. Add that when it's required. Refactor with design patterns only when required, not right from the get go!

 Use TDD "wisely": TDD is great, but it's very costly if done the wrong way. If you do it religiously, you'll get distracted from the original problem at hand and get obsessed with modifying and refactoring your tests more than the production code.

 Reduce distractions: switch off your mobile, close your email client, don't answer phone calls, don't go to meetings, etc.
{% endhighlight %}



## Technology is how you get to the solution, it is not THE solution
We can get really carried away with the latest JavaScript framework—ahem, Angular—IoC container, programming language or even operating system, but all of these things are not actually solutions to the problems we are trying to solve as programmers, instead they are simply tools that help us solve the problems.

We have to be very careful not to get too crazy about a particular technology that we happen to like or that happens to be oh so popular right now, lest we run the risk of thinking about every problem as a nail, just because we happen to be holding a shiny hammer we just learned about.

## Clever is the enemy of clear
When writing code, we should strive to write code that is clear and easy to understand.

Code that clearly communicates its purpose is much more valuable than code that is obscure—no matter how clever it may be.

It’s not always true, but in general, clever is the enemy of clear.

It’s usually true that when we write code that is “clever,” that code isn’t particularly clear.

It’s important to remember this rule whenever we think we are doing something particularly clever.

Sometimes we write clever code that is also clear, but usually that is not the case.

If you’re interested in writing clean code I highly recommend you check out The Clean Coder: A Code of Conduct for Professional Programmers (Robert C. Martin)

code

## Only write code if you absolutely have to
This one might seem a little contradictory, after all, isn’t our job as programmers to write code?

Well, yes and no.

Our jobs may involve writing code, but we should still strive to write as little of it as possible to solve the problem we are trying to solve.

This doesn’t mean we should make our code as compact as possible and name all our variables using single letters of the alphabet. What it does mean is that we should try to only write code that is actually necessary to implement the functionality that is required.

Often it is tempting to add all kinds of cool features to our code or to make our code “robust” and “flexible” so that it can handle all different kinds of situations. But, more often than not, when we try to guess about what features would be useful or we try to pave the road to solve for problems that we think might exist in the future, we are wrong.

This extra code may not add any value, but it can still do a lot of harm. The more code there is, the more chances for bugs and the more code that has to be maintained over time.

Good software engineers don’t write code unless it’s absolutely necessary.

Great software engineers delete as much code as possible.

## Comments are mostly evil
I’m not a big fan of writing comments in code. I’m with Bob Martin, when he says:

“Every time you write a comment, you should grimace and feel the failure of your ability of expression.”

—Clean Code: A Handbook of Agile Software Craftmanship

This doesn’t mean that you should never write comments, but for the most part they can be avoided and instead you can focus on doing a better job of naming things.

Comments should only really be written when it’s not possible to clearly communicate the intent of a variable or method by using a name. The comment then serves an actual purpose that could not be easily expressed in the code.

For example, a comment could tell you that this strange order in which some operation was occurring in the code was not a mistake, but was intentional because of a bug in the underlying operating system.

In general though, comments are not only evil because in many cases they are necessary, but also because they lie.

Comments don’t tend to get updated with the rest of the code and this results in the comments actually becoming dangerous, because they very well could steer you in a completely wrong direction.

Do you check every single comment against the code to make sure the code is actually doing what the comment says? If so, what is the point of having the comment? If not, how can you trust that the comment is telling you the truth?

It’s a pickle, so it’s best to avoid it as much as possible.

Ok, haters, go ahead and leave your torrent of “comments” in the comment section below, but I’m not changing my stance on this one.

## Always know what your code is supposed to do before you start writing it
It seems obvious, but it isn’t.

How many times have you sat down to write code without fully understanding what the code you were writing was actually supposed to do?

I’ve done it more times than I’d like to admit, so this is a rule that I need to read often.

Practicing test driven development (TDD) can help here, because you literally have to know what the code is going to do before you write it, but it still doesn’t stop you from creating the wrong thing, so it’s still important to make sure you absolutely, 100% understand the requirements of the feature or functionality you are building before you build it.

## Test your sh—code before you ship it
Don’t just toss your code over the wall and have QA pound on it only to send it back to you so that you can waste a bunch of everyone’s time with unnecessary bug reports and resolutions.

Instead, take a few minutes to run through the test scenarios yourself, before you call your code done.

Sure, you won’t catch every bug before you pass your work on to QA, but you’ll at least catch some of the stupid and embarrassing mistakes that we all make from time-to-time.

Too many software developers think that it is only QA’s job to test their stuff. It’s simply not true. Quality is everyone’s responsibility.

Stack of open books

## Learn something new every day
If you didn’t learn something new today, you just made backwards progress, because I can guarantee you forgot something.

It doesn’t take a lot of time to learn something new each and every day.

Try spending just 15 minutes or so reading a book—I read a whole lot of books last year, just reading about 45 minutes each day on average.

The little advances you make each and every day add up over time and will greatly shape your future. But, you have to start investing now if you want to reap the rewards later.

Besides, today technology is changing so rapidly that if you aren’t continually improving your skills and learning new ones, you are going to be left behind very quickly.

## Writing code is fun
That’s right. You probably didn’t get into this profession just because it pays well.

I mean, there is nothing wrong with picking a job that pays well, but doctor or lawyer would have probably been a better choice.

Most likely you became a software developer, because you love writing code. So, don’t forget that you are doing what you love.

Writing code is a lot of fun. I wish I could write more code.

I’m usually too busy keeping this business going to spend much time writing code these days, which is one of the reasons why I so clearly remember how much fun it is.

Perhaps you forgot that writing code is fun. Perhaps it’s time to remember how much fun it is again, by starting a side project or just changing your mindset and realizing that you get to write code and you are even paid for it. (Hopefully)

## You can’t know it all
As much as you learn, there is still going to be a lot you don’t know.

It’s important to realize this because you can drive yourself nuts trying to know everything.

It’s OK to not have all the answers.

It’s OK to ask for help or to speak up when you don’t understand something.

In many cases, you can learn what you need to know pretty darn close to when you need to know it—believe me, I do it all the time.

My point is, don’t get caught up in trying to learn it all, when that is an impossible task. Instead, focus on learning what you need to know and building the skills that enable you to learn things quickly.

## Best practices are context dependent
Is test-driven development, the best way to write code?

Should we always pair program?

Are you a scrub if you don’t use IoC containers?

The answer to all of these questions is “it depends.”

It depends on the context.

People will try to shove best practices down your throat and they’ll try to tell you that they always apply—that you should always do this or that—but, it’s simply not true.

I follow a lot of best practices when I am writing code, but I also conditionally don’t follow them as well.

Principles are timeless, best practices will always be situational.

## Always strive to simplify
All problems can be broken down.

The most elegant solutions are often the most simple ones.

But, simplicity doesn’t come easy. It takes work to make things simple.

The purpose of this blog is to take some of the complexities of software development, and life in general, and make them simple.

Believe me, this isn’t an easy task.

Any fool can create a complex solution to a problem. It takes extra effort and care to refine a solution to make it simple, but still correct.

Take the time. Put forth the effort. Strive for simplicity.
