---
layout: article
title:  不确定，预测和计划
---

[原文](https://www.infoq.com/articles/uncertainty-prediction-planning/?itm_source=infoq&itm_campaign=user_page&itm_medium=link)

[翻译](https://www.infoq.cn/article/ZIPhHYEc0J3qmZgboQS1)


Key Takeaways

* The software industry has a dismal track record when it comes to predicting and planning in the face of uncertainty.
* There are a significant number of biases that prevent us from learning, including cognitive biases and compensation structures.
* Statistical approaches to predictions can be successful if we expend the effort to create learning-based models such as Monte Carlo simulations.
* Highly uncertain environments are best exploited using the iterative learning models inherent to Agile methods.
* Extremely uncertain, non-deterministic environments are best exploited by the incremental learning model of hypothesis testing (Hypothesis-Driven Development) and learning to embrace the discomfort associated with uncertainty.

* 在面对不确定性时，说到预测和规划，软件行业一直以来的记录都不太靠谱。
* 阻碍我们学习的偏误有很多，包括认知偏差和薪酬结构。
* 使用统计协助预测有可能成功，只要我们努力创建基于学习的模型，比如蒙特卡罗模拟。
* 使用作为敏捷方法本质的迭代学习模型，是处理高度不确定性环境的最佳手段。
* 面对极端不确定、难以找到决定因素的环境，最佳手段是使用假设检验（假设驱动开发）这样的增量式学习方法，并且努力接受不确定性带来的不适感。

## 规划好的最佳方案……

```
预测很难，尤其是预测未来的时候。
```

```
Prediction is very difficult, especially about the future
```

This quote is often attributed to physicist Neils Bohr. It is also variously attributed to one or all of the following: Mark Twain, Yogi Berra, Samuel Goldwyn, politician Karl Kristian Steincke, or simply an old Danish proverb. That’s a healthy warning that things are rarely as simple as they seem and they usually get more complicated the deeper we go into them. If we can’t even determine who actually cautioned us about the difficulty of predictions then perhaps it’s an indicator that predictions themselves are even trickier.

人们常常认为这句话来自物理学家尼尔斯·玻尔。还有人将其归到下列名人之一：马克·吐温、棒球明星尤吉·贝拉（Yogi Berra）、著名电影制作人萨缪尔·高德温（Samuel Goldwyn)、政治家卡尔·克里斯丁·思丹克（Karl Kristian Steincke），或者就是那么一句丹麦老话。这是一句有益的警告：很多时候，事物不是看上去那么简单，当我们了解不断深入，它们会变得越来越复杂。如果我们甚至无法判断是谁提醒我们预测有多难，也许这表示预测本身更让人挠头。

The software industry operates on predictions at nearly every turn. Yet our track record of success with them is dismal. Depending on which metrics we choose to quote, between 60-70% of software projects are delivered over-budget, over-schedule, or canceled outright 1, often after large amounts of money have been spent.

软件行业几乎完全依赖预测。然而，我们却没有多少靠谱的成功。在不同评判标准下 [1]，大约 60% 到 70% 的软件项目交付时预算超标、时间延期、或是直接取消，而且常常是在花费了大量资金之后。

What causes this and what can be done to increase the odds of success? Before we get into that, let’s review the reasons for making software predictions.

此种情形原因何在？应该怎么做才能增加预测成功概率？讨论它们之前，我们先看看预测软件开发的原因。

Businesses need to budget and plan. Capital, the lifeblood of a business, must be allocated sensibly toward efforts that will provide the best return. We need to answer questions such as: How much should we spend? Which projects get approval to proceed? Over what time horizon are we allocating? Is it the two weeks of the next sprint or the twelve months of the next fiscal year?

商业需要预算和规划。资本，作为商业的血脉，必须理性分配给提供最佳回报的工作。我们需要回答这样的问题：应该花费多少资金？哪些项目可以批准启动？我们需要分配多少时间？是下次冲刺迭代的两周时间，还是下个财年的 12 个月？

Traditionally, allocation questions were answered by first creating some kind of estimate regarding long-range project cost and scope, formulating a schedule and plan around that, and then deciding whether the plan was worthy of capital. For many reasons, some of which we discuss below, a plan often started unraveling even before its ink was dry.

传统而言，要回答资源分配问题，首先需要根据长期项目成本和范围加以估算，围绕估算形成时间表和计划，然后决定哪个计划值得投入资本。出于多种原因，我们下面会讨论一些，一个计划常常在墨水未干之前就已经展开了。

With the advent of Agile methods such as Scrum, the planning cycle has been reduced to as little as two weeks. Even so, the questions remain about which stories in our backlog are worthwhile. But even shortened release cycles still result in disappointment at least 60% of the time 1. So what is wrong? Why aren’t we improving things? Why can’t we seem to learn how to make things better?

有了诸如 Scrum 这样的敏捷方法，工作规划周期已经减少到两周这么短。既便如此，待办事项列表中哪些故事值得开发，仍然是个问题。但是，即便缩短发布周期，仍旧导致至少 60% 的失望率 [1]。那么，到底出了什么问题？为什么我们不能取得进步？为什么我们似乎无法学会做得更好？


## 为什么我们没有吸取教训

Let’s examine what mechanisms drive us to continue with strategies that often fail and leave us stuck in a non-learning cycle. If we can understand the motivations for our actions then it might make it easier to change them and learn something along the way.

让我们看看，是什么机制让我们继续采取常常失败的策略，从而陷于无法学习改进的死循环中。如果我们可以理解自己行为背后的驱动因素，也许要改变它们就更容易，从而不断学习。

### 我们不学习也能拿钱

In much of the corporate world, job security and incentives are tied to making accurate predictions, formulating a plan to achieve them, allocating scarce capital, and then delivering on the plan. Additionally, there are often financial incentives to deliver at less than the predicted cost and completion date. As long as pay incentives are tied to predicting and planning the future, predictions and plans will be the bread and butter of business activity, whether they produce the desired outcome or not. In fact, convoluted conclusions likely will be derived that prove their validity, regardless of whether such validity exists.

企业中的常见情况是，工作保障和激励与下列因素有关：预测准确、制定规划达成预测、分配稀缺资本、然后按计划交付。而且，要是能低于预测成本、早于预定日期完成，常常能得到财务激励。只要金钱激励与预测和规划未来相关，预测和规划就是商业活动的必备行为，无论是否能产出预期成果。实际上，人们得到复杂的结果，常常是为了证明它的有效性，而不管这样的有效性是否合理。

Unfortunately, the solution to failed predictions is often taken to be the alluringly plausible "we’ll do better next time." It’s natural to wonder: how many attempts does it require to achieve mastery? At some point, we should realize that a strategy isn't working and something else needs to be tried. What slows the learning is that compensation is tied to not understanding it. Upton Sinclair captured the essence of this when he wrote (in gender-specific terms):

然而，面对失败的预测，人们的解决方法经常是听上去诱人而又可行的“我们下次会做的更好”。很容易想到的是：要尝试多少次才能彻底掌控？到了某个时点，我们应该意识到：这种策略不成功，应该试试其他办法。之所以不能吸取教训，是因为薪酬常常与不理解背后原因相关联。美国作家 Upton Sinclair 抓住了这种想法的精髓，他写道（性别用词中立）：

```
当一个人的工资取决于他不能理解某件事物的时候，那就很难让他理解该事物。
```

```
It is difficult to get a man to understand something, when his salary depends on his not understanding it.
```


If we want to improve our outcomes then we need to change our compensation structures into something that rewards us for learning and move away from structures that reward us for not understanding things.

如果我们希望改善产出，那就需要改变我们的薪酬结构，奖励我们的学习过程，远离奖励我们不去理解事物的薪酬结构。

An anecdote: Once, when describing to an executive how uncertain completion dates are in non-deterministic systems, he turned to me in exasperation and, holding his thumb and forefinger a fraction of an inch apart, said, "You’re telling me that you don’t know when you will finish until you are this close to being done? That’s nonsense." It's hard to say who was more disappointed in the conversation. The executive, because to him I seemed to lack a basic understanding of how business works, or me, because the executive seemed to lack a basic understanding of the mathematics of his business. In reality, we were both right, at least from our respective viewpoints. The real problem lay in the architecture of our compensation system that forced us into incompatible beliefs.

小故事：有一次，我在向一位公司高管讲述非确定性系统中的不确定截止日期是怎么回事，他看着我，满脸怒气，大拇指和食指分开一英寸，然后说：“你说你不知道何时能完成，直到你距离完成这么近的时候才知道？这是胡说！”这次对话中谁更失望，很难说。是高管吗？因为在他眼中，我看上去不能理解最基本的商业理念和活动。是我吗？因为高管似乎不能理解他的公司的基本数学逻辑。实际上 ，我们都是对的，至少从我们的出发点看来如此。真正的问题，在于我们的薪酬结构系统，迫使我们有彼此不兼容的想法。

### 简单的诱惑力

The Allure Of Simplicity

No matter how we practice it, software engineering is a difficult business undertaking. It was always thus. Fred Brooks, writing decades ago, concluded that there was "No Silver Bullet" 2 that would eliminate the inherent complexity and difficulty of developing software. And yet here we are, so many years later, still seeking a solution to the complexity, something that will make it simple. This desire for simplicity drives us to create oversimplified plans that discount the likelihood of the unknowns that will derail our project when they suddenly appear, often late in the plan after considerable sums have been spent.

无论我们如何实践，软件工程都是一项复杂的商业行为。它一直如此。Fred Brooks 多年前就写过，结论是“没有银弹”[2] 可以消除软件开发的内在复杂性和困难。可这么多年过去了，我们还在这里，仍然想要找到复杂性的解决方案，能让它变得更简单的方案。对于简单的渴求让我们制定过于简化的计划，其中低估了出现未知因素的可能性，而当它们突然现身，就会让我们的项目偏离正轨，导致花费大量资金，然后还计划延期。

When it comes to predictions, it is alluring to believe that there is a simple, one-size-fits-all solution that will work for everyone and all that is required is rigid adherence to its practices. Yet history shows us that a never-ending parade of simple solutions come and go, falling into and out of fashion with regular occurrence. What this suggests is that the software industry has complex needs and there is no simple, "Silver Bullet" solution that addresses them. From that wondrous wit, H.L. Mencken, we have this admonition to warn us about the allure of simplicity:

说到预测，我们很容易相信：存在某种简单的、一劳永逸的解决方案，可以满足所有人的要求，需要做的，就是要严格按照它的实践要点。然而，历史告诉我们：简单方案的队伍来来去去，永无休止，定期出现，此起彼伏。这其中需要理解的是：软件行业的要求复杂，没有简单的“银弹”方案可以满足。作家门肯的奇妙智慧给我们这样的告诫，警告我们简单的诱惑力：

```
每一种人类的问题，总有一个众所周知的解决方法：优雅、可行，而且错误。
```

```
... there is always a well-known solution to every human problem — neat, plausible, and wrong.
```



### 沉没成本谬误

The Sunk Cost Fallacy

Once we have invested time and money to create a prediction then the sunk cost fallacy rears its head. The sunk cost fallacy boils down to this: money already spent cannot be recovered but we are often unable to see that and spend additional money seeking a return on our initial outlay. We are prone to this because our job security usually requires us to prove that we are making wise financial decisions that turn out to be profitable. Worse, the more we spend the more we feel the need to justify our investment, putting us on a spiraling path of ever greater cost. All of this means that we will too often spend money to defend a failed prediction long after it would be better abandoned and the money reallocated to a more sensible idea.

只要我们投入了时间和金钱来建立预测，沉没成本谬误就开始抬头了。沉没成本谬误可以归结为：已经花出去的钱无法收回来，但我们常常看不到这一点，然后继续花更多钱，希望能从前面的开销中获得一些回报。我们倾向于这么做，因为我们的工作保障常常需要我们证明：我们做出了明智的财务决策，可以带来利润回报。更糟糕的是，钱花得越多，我们就越觉得有必要证明这些投入的价值，这就让我们走上越花越多的漩涡之路。所有这样意味着，我们常常花钱来为失败的预测辩护，而此时早已过了放弃的最佳时机，后面的开销本来可以用在更理性的想法上。

There is an instructive example in the natural world, which has no sunk costs. If something doesn't work, if it's maladaptive to its environment, it is dealt a swift and pitiless blow that ends its reign and a new idea quickly replaces it. It’s an example worth remembering next time we find ourselves believing our prediction will come true if we just invest a bit more into it.

自然界中没有沉默成本谬误，可以找到一个有教益的例子。如果某个物种出现问题，如果它无法适应环境，就要承受迅疾、无情的打击——绝灭，被新的物种快速取代。这个例子值得铭记，特别是下一次我们相信自己的预测可以成功的时候，只要再多投点钱进去。

### 教条的陷阱

The Dogma Trap

Any successful business has, deliberately or accidentally, discovered a set of practices that allow it to exploit a niche in its environment. These practices become codified into a system of rules and organizational hierarchies that are intended to preserve and perpetuate the success of the business. The longer the success, the easier it is for profitable practices to become encoded as dogma. If any of these successful practices involve predictions, then belief in the efficacy of predictions may become dogma as well.

无论是有意还是偶然，任何成功的公司都能找到一系列成功的实践，让自己可以开拓市场环境中的某个利基市场。这些实践就会作为规范进入一系列规则系统和组织管理层级中，后者想要保持公司的成功，直到永远。成功时间越长，它的盈利实践就越容易变成教条。如果这些成功实践中存在预测，那么相信预测有效的信念就可能变成教条。

Of course, the cardinal problem with dogma is that, by definition, it is unchanging, thereby blinding us to a changing environment, which has no such definition. And when the environment changes but the dogma doesn't then it’s a short step to extinction. Avoiding this requires us to reject the formulation of dogma.

当然，教条的主要问题在于：就其定义而言，教条是无法改变的，从而让我们在变动的环境中视而不闻，而市场环境不存在无法改变的定义。那么，当市场环境变化时，教条不改，那就离消亡更近了一步。要想避免，我们就得拒绝制订教条。

But rejecting dogma is often an unwelcome practice in an organization. Those who question it are often labeled as someone who "isn't a team player" or someone who needs to "get with the program." Sidelining or removing such people is the typical response. After all, dogma exists in a business because it codifies a strategy that led to success and protecting that success is a principal mission of the organization. When it comes to predictions, however, a reasoned approach would suggest that thoughtfulness, not dogma, should guide decision making.

但是在组织中，拒绝教条常常不受欢迎。质疑它的人常被打上“不合群”的标签，或被视为需要“跟上队伍”。典型反应是让他们靠边站，或是除掉这样的人。毕竟，教条在公司内存在，是因为它定下的策略曾指向成功，保护这个成功是组织的主要任务。然而，说到预测，理性的方法建议：指导决策过程的应该是深思熟虑，而不是教条。

### 残忍的随机性

The Cruelty of Randomness

Prediction typically has two troubling beliefs inherent to it. One, that the future will proceed much like the past and, two, that all past events were expected. In reality, at the moment they were occurring, events that reshaped the future were often entirely unexpected. By forecasting the future we are often assuming that there will be no unknowable and, therefore, unexpected future events. The cognitive trap is that new endeavors seem to be similar to those in the past, making us believe that we have advance knowledge of events that would otherwise surprise us. The problem is that each new endeavor unfolds according to its own internal, and usually unknowable, set of unique characteristics.

预测常常有两个内在的错误信念。第一，未来与过去差不多；第二，所有过去的事件都在期望之中。实际上，当过去的事件发生时，塑造将来的那些常常是不可预期的。预测未来时，我们常常假定不存在未知因素，因此不存在未知的未来事件。其中的认知陷阱是：由于新付出的努力和过去类似，这就让我们相信，自己已经事先了解了可能出乎意料的事件。问题在于， 每次新付出的努力在显现时，都是根据自身内在的、而且常常是不为人知的、一系列独特因素。

If we know what we don't know then we can simply apply an appropriate fudge factor to account for it and proceed on our way, satisfied that our plan accounts for unknowns. Unfortunately, we are too often unaware of our own ignorance, much less how to plan for it. Additionally, we are incentivized to find reasons that it "failed last time because of X but we have accounted for that this time." While we may have accounted for X in the latest prediction it's never X that surprises us the next time. It's Y or Z or any other unknown. While there are a finite number of alphabetic characters such that we can eventually account for all of them, there is no such upper limit in the possible range of real-world unknowns.

如果我们知道自己不知道什么，只要增加一个合适的软性因子，就能对付它，然后继续前行，同时满足于自己的规划可以应对未知。不幸的是，我们常常不知道自己的无知，更不用说如何应对未知了。此外，外界鼓励我们找到这样的原因，是它“上次由于 X 因素导致的失败，但我们这次已经留心了”。虽然我们已经留心了上次预测中的 X 因素，但下一次绝不是 X 因素烦恼我们。将会是 Y 或者 Z，或者其它未知原因。虽然字母表是有限的，我们可以覆盖所有原因，但在现实世界中，未知因素可没有上限。

But what if we get lucky and are rewarded with a random success for one of our predictions? If we don’t realize that it’s random, it will inevitably reduce our inclination to try a new strategy because of our natural belief that success was due to our skill instead of chance. That makes it more likely that random successes will be elevated to the status of perfect execution and repeated failures will be rationalized as poor execution. But it’s the randomness of reward we get from the lucky prediction that causes us to try ever harder to reproduce it. Studies show that the humble pigeon will quickly learn the pattern required to peck a lever to release food 3. And if no food ever arrives they will quickly give up. But if the reward is random, if there is no discernible pattern to when pecking the lever releases food, then the pigeons soon are driven into a superstitious frenzy of pecking in trying to determine the pattern. This behavior doesn’t seem terribly dissimilar from repeated attempts to make our predictions come true.

可要是我们运气好，而且因为自己的预测取得偶然的成功呢？ 如果无法认识到它的偶然性，那么我们必将倾向于避免采取新策略，因为我们自然相信：成功是源于我们的技能，而不是偶然机会。接下来更有可能发生的是：偶然成功将会被抬高到完美执行了策略和计划的地位，而重复的失败将被合理化为策略和计划执行糟糕。可是，是随机性让我们从幸运的预测得到回报，而我们将会更加努力试图重现这样的预测。研究显示：小小的鸽子很快就能识别出模式——用嘴啄杠杆，就能得到食物 [3]。如果没有食物出现，它们很快就会放弃。但要是奖励是随机的，如果没有可以辨识的模式，不知道何时啄杠杆可以得到食物，鸽子很快就会进入迷信的疯狂状态，使劲啄杠杆，想要判断模式。比起我们想要反复让自己的预测成真，这样的行为似乎并无天壤之别。


### 魅力型人格

The Charismatic

Add in another human bias: we like confident and charismatic people. Confident, certain, and assertive people are promoted quickly and rise to positions where they influence a company. From there, they orchestrate activities to show that they can predict the future, formulate a plan, and execute on it. When faced with an unknown, they have a certain answer and a plan of action at the ready even if the plan might represent a mismatch between their confidence and their competence. So we marshal resources under their leadership and move ahead full of certitude. Contrast that to those who are uncertain and when asked about an unknown, shrug their shoulders and reply "I don’t know. Let’s do an experiment and see if we can figure it out," leading us to turn to the charismatic individuals instead of the cautious ones.

再看看另一个人类偏误：我们喜欢自信、有魅力的人。自信、果断的人升职更快，他们会坐到影响整个公司前途的位子上。在那里，他们安排活动，表明自己可以预测未来，制订规划，再按其执行。面对未知因素时，他们手边总有答案和行动规划，即便这样的规划表明他们的能力和信心并不相符。然后，我们就在他们的领导下安排资源，对他们确信无疑，全速前进。相比而言，有的人没那么确信，被问到面对未知因素怎么办时，他们会耸耸肩，回答道：“不知道。咱们做个实验，看看能不能找出办法。”比起他们，我们更容易转向有魅力的人，而不是谨慎的人士。

An overconfidence bias also comes into play. Charismatic and confident people are likely to be imbued with a sense of superior predictive ability over their compatriots. Rationally, we might look at the 70% failure rate of predictions and decide that we are better off avoiding them because we stand only a 30% chance of success. Highly confident people are instead likely to take a different view, discount years of statistics from many projects, and believe that their efforts will somehow succeed where others failed.

过度自信偏误就是在这时候生效的。相对同伴而言，魅力型人格和自信的人们更容易认为，自己拥有超出常人的预测能力。理性来看，瞧瞧 70% 的预测失败率，我们还是最好躲开他们，因为我们只有 30% 的成功几率。相反，极其自信的人看法不同，他们无视众多项目的多年统计数据，坚信自己的努力总能在别人失败的地方成功。

An anecdote: Many years ago, at the tail end of the dot-com bubble, I worked in a startup as a software developer. We were led by a young, energetic, and charismatic CEO who exuded confidence and mastery. At the time, we leased office space in a building that had been shedding software tenants one after the other as each one failed like so many dominoes. There were only a few of us left and the nearly-empty building and parking lot had the eerie feel of a post-apocalyptic setting. It was in this environment that our CEO called an all-hands meeting to reassure the anxious staff that our future was promising. I recall him making an eloquent and impassioned case that filled the room with the belief that we might make it.

小故事：多年前，在互联网第一次泡沫的尾声，我在一家创业公司担任软件开发工作。带领我们的是一个年轻的、能量满满的、充满魅力的 CEO，他浑身散发着自信和掌控力。当时，我们租的办公楼已经见证了一家又一家软件公司租户的倒下，像多米诺骨牌一般。后来，只剩我们少数几个人留下了，整栋楼几乎空无一人，停车场有种诡异的后末世之感。就是在这种情形下，我们的 CEO 召开了全员大会，向焦虑的员工们保证，我们的未来是光明的。我想起他口若悬河，激情四射，充满整个房间，让我们相信可以得偿所愿。

in the end, of course, we were no different than any other of the innumerable dot-coms that failed in the wake of the bubble’s bursting. Indeed, our denouement arrived shortly after our CEO’s rousing speech when we failed to receive another round of financing and joined the exodus of the building’s tenants.

当然，最后我们跟其他无数 dot-com 公司一样，泡沫破灭，我们关门。实际上，就在 CEO 激昂的演讲后不久，我们的结局就降临了，当时我们无法拿到另一轮融资，从而加入了大楼租客离去的行列。

Blinkered by confidence and faith in a charismatic leader, many in the company were unable to see what was obvious: we could not survive if we were not profitable. This was clear in hindsight but beforehand it seemed reasonable to believe that we were different and would succeed where so many others recently had failed. It was an instructive lesson in maintaining a reserve of skepticism around charisma.

被魅力型领袖的自信和理念所蒙蔽，公司的很多人无法看到显而易见的事实：如果无法盈利，我们就不能生存。事后看来很清晰，但在当时，相信我们跟其他人不同，相信虽然那么多人刚刚失败了但我们终将成功，这好像很合理。这是很有教益的例子，让我面对魅力型人格的时候心存怀疑。

### 犯错，经常性地

Being Mistaken, Usually

"Well, we won't make that mistake again. We even fired some people to make sure it never recurs." That's probably true. We won't make the same mistake because we are prepared for it on the next attempt. The problem is that the first mistake was unknowable before it occurred and the same thing will happen again but this time with a different set of mistakes. The set of new mistakes, to which we will fall victim, is an inexhaustible supply because they are always unknowable in advance. Winston Churchill perfectly described this scenario while addressing Parliament at the dawn of World War II. Members were concerned about repeating the mistakes of World War I and wanted assurance that they would be avoided. Churchill replied:

“哎，我们将来不会再犯这样的错误了。我们甚至炒了某些人的鱿鱼，确保它不再出现。”也许如此。我们不会犯同样的错误，因为下一次我们就有所准备了。问题在于，第一个错误出现之前，没人知道它，同样的事情还会发生，不过这次是另一些错误了。使我们成为牺牲品的新的错误，将会不断出现，因为之前没有人知道它们。第二次世界大战即将开始之前，丘吉尔在对议会发言时完美描述了此种情形。当时议员们担心重复一战的错误，希望确保不要再犯。丘吉尔的回答是：

```
我保证当时的错误不会再重复了；我们也许会犯下新的错误。
```

```
I am sure that the mistakes of that time will not be repeated; we should probably make another set of mistakes.
```

We are often mistaken and simply don't yet know it. And being wrong and not knowing it feels just like being right 4. Actually, being right and being wrong are indistinguishable until the moment we are proven wrong. That should sound a note of caution about the inevitability of mistakes.

我们常常出错，而且不知道自己犯错。出了错还不知道，感觉上就像自己完全正确 [4]。实际上，对错常常无法区分，直到证明我们错了。这应该让人们警觉起来，明白错误的不可避免。

There is an expression often heard in management meetings and boardrooms: "failure is not an option." While this is usually intended to discourage half-hearted efforts, it excludes learning and discovery because failure is a necessary ingredient in learning. It also suggests that to admit a mistake means to admit incompetence and possibly lose one’s job. Once this belief system is in place and cemented by financial incentives, it can lead to the idea that failure indicates a historically successful practice is going through a temporary rough patch and we simply need to redouble our efforts so it will once again be successful, even if the real lesson is that we need to change course. Under these conditions, admitting an error and changing course is a difficult thing to do because we are irreversibly invested in our belief system. History is filled with examples of businesses that failed to learn and continued to feed ever greater amounts of precious capital into failed strategies even as those strategies drove them right off a cliff. A moment’s reflection will disabuse us of the notion that we are somehow immune to such folly.

在管理层会议和董事会中，常常能听到这样的说法：“决不允许失败。”虽然这么说常常是为了让人们不要敷衍工作，但的确排斥了学习和探索的机会，因为失败是学习的必要过程。这句话同时让人觉得，承认过程意味着承认能力不足，也许会导致失去工作。一旦这样的思考方式固定下来，再加上财务激励的巩固，就会让人们认为：失败，意味着过去一直成功的做法现在临时面临某些问题，我们只要付出双倍努力，它将来就能成功，即便真正的教训是，我们应该换条路走。在这些情形下，承认错误并改变做法，就变得很难了，因为我们坚持过去的思考方式，不可逆转。历史中充满了这样的例子，公司失去学习能力，持续投入越来越多宝贵资本到错误的策略中，即便这些策略把它们拖下悬崖。停下来反思一下，就能让我们醒悟，知道我们并非对此种愚蠢免疫。

## 利用学习的策略

Strategies That Use Learning

So that’s a rundown of some of the reasons why we are often unable to learn and continue with strategies that fail us. But what if we can avoid these pitfalls? Are there strategies that focus on learning? As it happens, there are.

前面列举的这些原因，说明我们为什么无法学习，而且继续采取让我们失败的策略。但要是可以避免这些陷阱呢？是否有策略把学习作为重点呢？实际上，当然有。

### 决定性的方法

A Deterministic Approach

Historically, software projects used a Waterfall model of development. Requirements were gathered, estimates were made from the requirements, and schedules were created from the estimates. This approach is based on a deterministic view of software projects and that with enough upfront data and analysis, we can make accurate predictions about cost and delivery dates. These projects often began failing early, usually due to inadequate requirements and inaccurate estimates. In the latter case, estimates were often faulty because they were not based on statistically rigorous methods but instead gathered from methods that were little more than guessing.

过去，软件项目使用瀑布开发模型。先收集需求，再根据需求做估算，再从估算创建时间表。这种方法以决定性的观点看待软件项目，认为只要收集足够的数据和分析，我们就能准确预测成本和交付日期。这些项目常常在早期就开始出问题了，需求不足和估算不准是主要原因。对于后者，估算常常出错，是因为它们不是根据严格的统计方法，而是从某些类似于拍脑袋的做法中收集得来。

It turns out, though, that a deterministic view can succeed by using calibrated statistical models gathered from a company’s historical software projects. One common statistical method is a Monte Carlo analysis 5 6. The underlying mathematics are rather complicated but it boils down to this: we gather a set of historical data that typically include parameters like effort and duration. We then run scenarios thousands of times where we randomly vary input parameters to produce a probability distribution that a given amount of work will be completed in a given amount of time. For example, we might derive a distribution that indicates a certain amount of staff effort has a 25% probability of being completed within a month, a 50% probability within two months, and a 90% probability within five months. The key point is that we use historical data, unique to our organization, to calibrate our model and produce probability ranges for outcomes instead of single-point values. Notice how rigorous this approach is compared to someone’s unsubstantiated claim that "I can do that in a week."

不过，决定性的观点也有可能成功，只要使用校准过的统计模型，并且从公司的历史软件项目中收集数据。蒙特卡洛分析是常见的统计方法。[5] [6] 该方法背后的数学原理非常复杂，不过可简单概括如下：我们收集一系列历史数据，其中常常包括诸如工作量和持续时间这样的参数。然后，我们模拟这个场景几千次，其中随机输入不同参数，以产生概率分布，表明给定数量的工作可以在给定的时间内完成。比如，我们会得到一个分布，表明某个定量工作有 25% 的机率在一个月内完成，50% 机率两个月内完成，90% 的机率在五个月内完成。这里的重点是：我们使用的历史数据，是我们这个组织独有的，用它来校准我们的模型，产生结果机率范围，而不是单一的值。注意，这种方法是很严谨的，而不是像某个人随口一说：“我一个星期就能做完。”

With this approach, we are also choosing to learn. We gather data over time and use it iteratively to teach us about our organization’s capabilities and the cost and time required to perform work. Of course, our model is only as good as the data we use to calibrate it. Vague requirements specifications, poor record-keeping for completed work, and other such shortcomings will yield disappointing results.

使用此方法，我们就是在选择学习。我们随时间推移收集数据，然后迭代地使用这些数据，并从中了解我们组织的能力如何，以及完成工作需要的成本和时间。当然，模型的准确性，与用来校准它的数据相关。模糊的需求说明、糟糕的工作完成记录，以及其他类似问题会产生让人失望的结果。

### 伪决定性方法

A Pseudo-Deterministic Approach

A fully-deterministic approach as described above works well if requirements can be specified in advance and are not subject to frequent revision but this type of project is rarely seen. What if we are working on more typical projects with unclear goals, uncertain specifications, and unknown market needs? Deterministic predictions under those conditions are unlikely to yield satisfactory results.

上述这样的完全决定性的方法要想成功，前提条件是所有的需求都能提前说明，而且不会经常变更，不过这样的项目可不常见。如果我们开发的是更典型的项目，目标不是很明确，需求说明不确定，市场需求也未知，那该怎么办？这些条件下，决定性的预测不太可能产生让人满意的结果。

Enter Agile methods.  

这就要说到敏捷方法了。

Agile methods take a pseudo-deterministic approach to software delivery. Born out of the frustration with repeated failures in traditional Waterfall projects, Agile methods abandon the belief in long-term predictions and planning and instead focus on short-term delivery of working software and adapting to change as it occurs. By using Agile methods, we adopt the philosophy that requirements cannot be determined far in advance but must instead emerge over time.

敏捷方法采取伪决定性的手段来交付软件。它脱胎于传统瀑布项目反复失败带来的沮丧之中，放弃采信长期预测和规划，而是聚焦于短期内交付可以用的软件，同时适应不断出现的变化。使用敏捷方法，我们接受这样的思想：需求无法过于提前确定，但必须随着时间不断演化。

One of the more popular Agile methods is Scrum 7. Its two-week sprint minimizes project tracking error and drift by shortening timeframes for releases. We reprioritize with every sprint and in so doing effectively reset our project clock, giving us the flexibility to adapt to change.

Scrum [7] 是常见的敏捷方法。它的两周冲刺迭代缩短了发布的时间周期，从而将项目的错误和偏移降到最低。我们在每个冲刺前重新设定优先级，这么做有效地重置了项目的时钟，让我们可以灵活适应变化。

We can still use Monte Carlo-type methods to predict the volume of stories we can produce 6 but we surrender our belief of one aspect of determinism: that we can generate long-term plans that determine project schedules. Instead, we once again focus on learning by iteratively discovering what we need to deliver.

我们仍然可以使用蒙特卡洛方法，来预测蕴含需求的故事的大小 [9]，但我们放弃了决定主义的一个表现：用长期规划来决定项目日程。相反，我们用迭代方法发现需要交付的东西，从而再次将重点放在学习上。

But have we actually solved the problem of predictions and plans or have we just minimized the impact of being wrong about them? It seems we might still carry with us the same problem but at a smaller scale.

但这样做是不是就解决了预测和规划的问题？还是只是将错误预测和规划的影响最小化了？看上去我们还会有同样的问题，只是规模变小了。


### 演化式的方法

An Evolutionary Approach

We have progressed from the long-term release cycles of traditional methods to the much shorter cycles of Agile methods. We also abandoned the belief in long-term, fixed requirements and chose instead to focus on smaller stories. Both of these changes help us iteratively discover requirements and produce better results. This leads to an obvious question: if a little discovery is a good thing, is more discovery an even better thing?

我们从传统方法的长发布周期出发，前进到了敏捷方法的短周期，而且短得多。我们还放弃了长期、固定需求的理念，转而选择关注更小的故事。这些改变可以帮我们迭代式地探索需求，得到更好的结果。这就带来一个明显的问题：如果一小点探索是好事，那么更多的探索是不是要好得多？

Enter hypothesis testing.

这就要说到假设检验。

Hypothesis testing (also called Hypothesis-Driven Development) takes its cues from the greatest experimental laboratory ever devised: evolution. Evolution makes no pretense at being able to predict what the future holds. It simply responds to change by constant experimentation. An experiment that produces a better outcome is rewarded with longevity. A worse outcome is quickly subjected to an ignominious end. If we are willing to surrender our predictive beliefs then evolution has a lot to teach us.

假设检验（又称为假设驱动测试）的灵感，来源于史上最伟大的实验室：自然演化。自然演化不会假装自己可以预测未来的样子。它只是以频繁实验来应对变化。产生好结果的实验，其奖赏是更长的寿命。糟糕的结果很快就会导致屈辱的灭绝。如果我们愿意放弃自己的预测式思维，就能从自然演化中学习到很多。

With hypothesis testing, we take a slightly more deliberate approach than the pure randomness of evolution. We proceed as scientists do when faced with the unknown: formulate a hypothesis and subject it to measurement and failure in the real world. If it is falsifiable and can't be proven false, at least not yet, then it has merit.

使用假设检验，我们就能采用更深思熟虑的做法，而不是单纯依赖演化的随机性。面对未知情况，我们就像科学家一样：形成某个假设，然后在真实世界中度量、失败。如果它是可以被证伪的，但还没有被证伪，至少目前如此，那么它就有价值。

There are many ways to implement hypothesis testing 8 9 10 but here is a simple example. We formulate a hypothesis such as "We believe that our customers want a left-handed widget feature on our data portal. We declare our hypothesis to be true if traffic to our portal increases by 5% in one week." If our hypothesis is correct then we should see at least a 5% bump in traffic within a week. If not, we were wrong and reject our hypothesis and possibly remove the feature. We then reformulate our hypothesis or move on to another one. It’s beyond the scope of this article to provide a detailed how-to of hypothesis testing but the references provide links to articles with instructive examples and best-practices.

实施假设检验有很多方法 [8] [9] [10]，不过这里有一个简单的例子。我们形成一个假设，比如“我们相信，客户在数据门户上需要方便左撇子可以用的小部件。如果一周内门户的流量可以增加 5%，我们就认为这个假设是正确的。”如果假设正确，那么我们就会在一周内看到至少 5% 的流量增加。如果没有，我们就错了，应该拒绝假设，同时有可能移除该功能。然后，我们调整该假设，或是考虑其他假设。讨论如何完成假设检验已经超出本文范围，不过文末的资源参考有一些文章链接，其中有手把手的例子和最佳实验。

With hypothesis testing, we surrender our predictive beliefs that envision how the future will unfold. Instead, we build from the bottom up, testing each small piece as we go, minimizing the risk to capital and cutting losses early. In effect, we make ourselves intellectually humble and admit we have little knowledge of the future. We accept that we don’t know what we don’t know and are unlikely to ever really know much in advance. We can only discover it through experimentation.

使用假设检验，我们放弃了预测将来的想法，不去想未来如何展开。相反，我们从底层开始，一边往前走，一边测试每个小部分，将资本风险降到最低，同时可以尽早减少损失。实际上，我们让自己在智识上更谦卑，承认自己对未来的了解不足。我们可以接受：我们不知道自己不知道的事物，而且不太可能提前知道多少东西。我们只能借助实验去探索。

Most importantly, hypothesis testing minimizes the biases described above that slow our learning. With it, we actually get paid to learn and use objective data to validate or falsify our ideas. We minimize sunk costs thereby making it less likely to cling to a failed idea. We use randomness to help us learn instead of fooling us into seeking a reward where none is to be found. Charismatic personalities have less sway when objective data is the measuring tool. And finally, being wrong is accepted as the normal state and part of the experiment. In effect, we are using an evidence-based decision system over one based on omnipotence and superstition.

更重要的是，假设检验可以尽可能减少前面提到的偏误，不再让它们耽误我们的学习。有了假设检验，我们挣的钱就是靠学习得来的，而且可以使用客观数据来验证或是证伪我们的想法。我们将沉没成本降至最低，因此就不太可能抱着错误想法不放。我们借助随机性辅助学习，而不是欺骗自己寻找并不存在的奖励。有了客观数据作为度量工具，魅力型人格就没那么有影响了。最后，大家认可错误是一种正常状态，也是实验的一部分。实际上，我们使用的是基于证据的决策系统，而不再是依靠全知全能或者迷信。

We can further inoculate ourselves against bias by placing strict, consistent limits on the amount of capital allocated to hypotheses and requiring short timeframes for proving them true. Otherwise, we are right back to endeavors that need "just a little more time" or "just a little more money." Evolution allows no such exemptions. Ultimately, we need to decide if we want to be "right" or make money. We sometimes seek the former while claiming to seek the latter.

我们可以进一步让自己免于偏误，这需要针对假设可以使用的资本，施加严格的、一致的限制，同时要求在短时间周期内验证它们。否则，我们就又回到了老路上：需要“再多那么一点点时间”，或是“再多那么一点点钱”。自然演化不允许这样的豁免。归根结底，我们需要判断：是想自己“正确”，还是要赚钱。有时候，我们想达成前者，而口头上说是要追求后者。

Admittedly, this approach doesn’t yield a particularly motivating rally cry like that of the predictive approach’s "Full speed ahead!" By contrast, "Let’s run an experiment" is hardly as energizing. But it has the potential to be more profitable which, perhaps, carries its own motivation.

不可否认，这种方法不会激发能让鼓舞人的激情演讲，比如前文预测式方法的“全速前进”！相比而言，“咱们做个实验吧”，听上去不那么热血澎湃。但这么做有可能带来更多利润，也许这样自有其鼓舞作用。

## 常见的错误策略

A Common and Misguided Strategy

```
亲爱的勃鲁托斯，那错处并不在我们的命运，
而在我们自己。
莎士比亚《裘力斯·凯撒》，第一幕，第二场（译注：朱生豪译本）
```

```
"The fault, dear Brutus, is not in our stars,
But in ourselves…"

Julius Caesar (Act 1, Scene 2)
```

Perhaps we have a biased sample set in our industry and hear only the stories of predictive planning nightmares and not the successes, making us believe that the nightmare scenario is the common one. But given so many stories from so many people over so many years, it seems that the scenario is probably representative for many work environments. It contains the worst possible choices and almost always leads to failed outcomes.

也许我们在自己的行业里选取了有偏差的例子，只听到噩梦般的预测和规划，而无视成功案例，从而使我们相信，噩梦场景比比皆是。可是，这么多年来，有这么多人讲出这么多故事，看来那是可以代表很多工作环境的。其中含有最差的选择，几乎必将带来失败的结果。

Here’s how it occurs: We have a generic, somewhat vague goal like "increase revenue from our website by ten percent next year." Or maybe it’s more specific like "add a left-handed widget to our data portal because customers will buy it."  Whatever it is, it typically isn’t well-specified and the assumptions underlying the premise are just that: assumptions. And hidden details will surely appear as we begin work. We have done similar features in the past but, crucially, we have never done exactly the same thing before. But that should be "good enough" for the basis of our prediction. We then have one, perhaps two, developers provide a prediction that is little more than an off-the-cuff guess. And then we are off to the races. It often goes like this in predictive environments:

事情是这样发生的。我们有一个泛泛的、很是模糊的目标，诸如：“明年网站带来的收入增长 10%”。抑或是更明确的：“在我们的数据门户上加入一个左撇子用户的小部件，因为客户会为之买单。”不管是什么，它经常没有明确说明，在前提之下的假设只是假设而已，没有依据。当然，只要我们开始干活了，任何隐藏的细节都会跳出来。我们在过去开发过类似功能，但是，关键在于，我们过去没有做过完全类似的事情。但这作为预测的依据就已经“足够好”了。然后，我们就有了一个，或者两个，开发人员做出预测，跟随意的瞎猜差不多。然后，我们就开工了。在预测性的工作环境中，常常是这样的：

```
Manager: "How long will it take to write the Widget feature?"
Programmer: "I don’t know, maybe a month."
Manager: "What? That’s ridiculous! There’s no way it will take that long!"
Programmer: "Well, OK, I can probably do it in a week."
Manager: "That’s more like it. I’ll put it in the schedule. Do it next week."
```


```
经理：开发那个小部件需要多久？
程序员：我不知道，大概一个月吧。
经理：什么？开玩笑！不可能需要那么久！
程序员：呃，好吧，也许我一周能完成。
经理：这还差不多。我会放到日程表里。下周做吧。
```

In an Agile environment it might look like this:

在敏捷环境中，差不多是这样的：

```
Manager: "How many story points are you estimating for the Widget story?"
Programmer: "I don’t know, maybe it's a thirteen."
Manager: "What? That’s ridiculous! There’s no way it’s that big!"
Programmer: "Well, OK, it’s probably a three."
Manager: "That’s more like it. I’ll update the backlog. Do it in the next sprint."
```

```
经理：那个小部件的故事，你估计要几个故事点？
程序员：不知道，也许是 13 吧。
经理：什么？开玩笑！不可能那么大！
程序员：呃，好吧，也许是 3 点。
经理：这还差不多。我会更新到待办任务列表里。下个冲刺迭代做吧。
```

This is little more than random guessing under extreme duress and creates the worst possible conditions: vague specifications, no rigorous collection of historical data upon which to draw for a careful, statistical analysis, off-the-cuff predictions from one or two programmers, and turning the guess into a commitment to deliver according to a schedule. To this mix, add incentives for managers to "hold developers accountable" for failing to deliver what they never realized was a promise instead of a guess and the understandable fear of punishment for being wrong about their guess once it becomes a commitment. Is it any wonder that failure is an inevitable outcome? They only way it is delivered is by cutting features, heroic overtime, and sacrificing quality. And yet, the lesson is rarely "this isn’t working so we need to try something else." Instead, it’s often "we need to get better at predictions."

这跟处于强大压力下的瞎猜差不多，而且会营造出最糟糕的情况：模糊的需求说明；没有认真收集的历史数据，无法勇气做出用心的统计分析；来自一两个程序员的武断猜测，然后将猜测变为承诺，要根据时间表交付。不但如此，一旦程序员无法交付，经理还有理由去“拿程序员是问”，而程序员没有意识到自己给出的是一个承诺，而不是猜测，同时，程序员还会担心受到惩罚，因为怕自己的猜测变为承诺后出现错误，这种担心也是可以理解的。那么，要是失败不可避免，这还有什么奇怪的吗？唯一能够按时交付的方法，就是砍功能、狂加班、舍质量。然而，吸取的教训很少是：“这样干不行，我们得试试别的办法。”相反，常常是：“我们得把预测做得更好。”

We get what we pay for. If we are required to use predictions to derive plans then we must invest the time and money to do it right. If we use Agile methods then the delivery of working software must take precedence over predictions. To do otherwise is wishing to get something for nothing. As the Second Law of Thermodynamics makes clear, "There’s no free lunch."

人们让我们付钱做什么，我们就会做什么。如果要求我们必须用预测制定计划，那我们就必须投入时间和金钱把它做好。如果我们使用敏捷方法，那么交付可用的软件必须优于做出预测。其他做法相当于希望天上掉馅饼。正如热力学第二定律所明言：“世上没有免费的午餐。”（译注：热力学第二定律是表述热力学过程的不可逆性——孤立系统自发地朝着热力学平衡方向──最大熵状态──演化，也表明第二类永动机永不可能实现。来自维基百科。）


## 了解汝之环境

Know Thine Environment

It is imperative to know the environment in which our businesses are operating. If we work on large, contract-driven projects where timelines are extended and the specifications are well-defined in advance, then quantitative prediction is usually a required skill to survive. On the other hand, if we operate in the more common environment where specifications are vague or non-existent, the market needs are unclear or unknowable, timelines are short and urgent, and competition for market share is fierce, then we should consider a hypothesis-driven approach.

了解自己的业务开展的环境，很有必要。如果我们开发的是合同驱动的大型项目，时间表已经展开，而且需求已经明确定义，那么定量的预测是生存的必要条件。然而，要是我们身处的环境更常见，需求模糊甚至不存在，市场需求不明确甚至是未知的，时间要求很短而且紧迫，市场份额的竞争很激烈，那么我们就应该考虑使用假设检验方法。

A key problem is that we often misunderstand the mathematical underpinnings of our environment. We often believe that we operate in a deterministic world where more effort will reward us with a successful result. In fact, we often are operating in a non-deterministic, highly empirical world with an unstable foundation that changes with time. Statisticians call this a problem with "a non-stationary base" where the mathematical foundation is not stable and there is no base upon which to anchor our assumptions. Under these conditions, fixed, deterministic methods will not succeed outside of sheer, random luck. For all of the biases listed above, it’s nearly irresistible to believe that we can predict and plan even when we can’t.

关键问题在于，我们常常误解自己所在环境的底层数学逻辑。我们常常相信，自己处于决定性的世界，付出更多努力就能得到满意的结果。实际上，我们常常是在非决定性的、高度实验性的世界中，它的基础不稳固，会随时间变化。统计学家称这样的问题有“非平稳基数”（non-stationary base），也就是其基本数学逻辑不稳定，而且没有可以落地假设的基础。在这些情况下，固定的、决定性的方法无法成功，除非有十足的运气。由于上面列出的各种偏误，我们几乎无法抗拒这样的想法：我们可以预测并规划，即便实际上做不到。

Unfortunately, if we are not operating under stable conditions then greater effort put into a prediction has a higher chance of increasing our confidence in its accuracy than it does in improving the accuracy itself. And so we become more certain of our wisdom than we do of our doubt. We are then prone to commit ever more capital to prove that we are right instead of cautiously guarding our resources and applying them when the data tell us we are on the right path.

然而，如果我们不是处于稳定的情况中，那么付出更多努力预测，就会让我们更加相信它的准确性，而不是去改善准确性本身。这样一来，我们就更仰仗自己的智慧，而不是选择自己的疑问。我们更倾向于付出更多资本，以此证明我们的正确，而不是小心保护我们的资源，并且只在数据告诉我们方向正确的时候再去运用这些资源。

Knowing the environment in which we operate means that pay incentives are aligned with methods that produce successful outcomes for that environment. We are incentivized to learn, in whatever form it may take for our environment.

了解我们所处的环境，意味着薪酬激励要与在这个环境中成功产出结果的工作方法相一致。我们应该因为学习而受到激励，无论学习在环境中如何体现。

## 结语

Final Thoughts

One of the key difficulties with predictions lies in our natural human reluctance to accept uncertainty. Being in a state of uncertainty and doubt is an extremely uncomfortable place. So we are much more inclined to embrace those who are full of confidence than we are those who shrug and prefer to run an experiment to verify a hypothesis.

The external reality is that the business environment is often governed by uncertainty, unknowable unknowns, and darkness that we must navigate with only the faintest of lights. Our challenge is to accept the disquieting nature of that environment instead of clinging to the comfort of a belief system that provides us with a reassuring but misleading picture.

The road to knowledge is paved with the embrace of uncertainty. If we can learn to live with its discomfort then we open the path to learning. To paraphrase a famous saying: The price of learning is eternal unease.


预测的关键困难，在于我们人类不愿意接受不确定性。处于不确定状态中，并由此产生疑问，这让我们极为不适。因此，我们更倾向于拥抱那些信心满满的人，而不是耸耸肩、更愿意做实验验证假设的人。

身边的现实情况是：商业环境常常受制于不确定性、未知的未知因素，还有我们必须依靠最微弱的光芒才能看清方向的黑暗。我们的挑战在于，接受这个环境令人不安的本质，而不是抱着某些舒适的想法不放，这些想法让我们更安心，但却充满误导。

通往知识的路是由不确定性铺成的，必须拥抱它们，才能获得知识。只要我们可以接受它们的不适，就能打开学习之路。改换一句名言：恒久不适乃学习的代价


参考资料

```
参考资料

[1]  Standish Group 2015 Chaos Report.  
[2] 《没有银弹：软件工程的本质性与附属性工作》 
[3] ‘SUPERSTITION’ IN THE PIGEON", B.F. Skinner, Journal of Experimental Psychology, 38, 168-172. 
[4] 《犯错的价值》 by Kathryn Schulz 
[5] “A Gentle Introduction to Monte Carlo Simulation for Project Managers” by Kailash Awati. 
[6] “Web-Based Monte Carlo Simulation for Agile Estimation” by Thomas Betts 
[7] “The Scrum Primer” by Pete Deemer and Gabrielle Benefield. 
[8] 《如何实现假设驱动开发》 by Barry O’Reilly 
[9] “ Why hypothesis-driven development is key to DevOps ” by Brent Aaron Reed and Willy-Peter Schaub 
[10] “ Hypothesis-driven development ” by Adrian Cho
```
