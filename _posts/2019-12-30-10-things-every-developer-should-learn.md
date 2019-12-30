---
layout: article
title:  10个好建议
---
[原文](https://medium.com/better-programming/10-things-every-developer-should-learn-72697ed5d94a)

I’m a Python+ Go developer who’s also been operating global-scale applications for the past few years. My team and I handle about two million customers a day; 
that kind of scale isn’t easy. I’d like to share a few tips that I’ve learned over the years.

我是一个 Python + Go 开发者，过去几年一直从事于全球范围内的应用开发。我和我的团队每天要应对大约 200 万的客户，处理这种规模级别的事务其实是不太容易的，所以，我想分享一下过去几年我的一些经验和技巧。


## Security Should Never Be an Afterthought

安全问题绝不能是马后炮

Application security should never be an afterthought or relegated to “we’ll add security later.” Strong application security requires it be a part of the conversation, and development pipeline, from Day 1 — not Day 300. Leaving security until the last minute will actually increase your development time now that you have to go back and refactor to accommodate for it. Or worse, you have less time to work out any holes, and you end up shipping vulnerable code. Just ask companies like Yahoo how that worked out for them.

应用的安全问题绝不应该是马后炮或者降级成为“稍后再考虑的事儿”。我们需要从应用开发的第一天起，就将强有力的安全性考量贯穿到每次讨论和开发流程中去，而不是开发到第 300 天才开始考虑。将安全问题放到最后考虑，反而会增加开发的时间，需要回炉重构以适应安全问题。更糟的情况是，你没有足够的时间来解决任何漏洞，最终只能交付易受攻击的代码。可以去了解下雅虎（Yahoo）这样的公司，他们是如何做到这一点的。


## Every Application Is Different and Has Different Needs, Choose According to the Application Needs, Not Political Pressure or Market Popularity

应用不同，需求也不同。按需为应用做技术选型，而不是迫于行政压力或市场热度

This really shouldn’t need to be said, but every application is different. There’s no one sacred set of rules that apply to all applications (these rules included). When starting a new application, it’s the application and its architecture that should dictate what technologies to use or what platforms to standardize on. Deciding you’re going to use gRPC or Kubernetes before asking the question “What does my application need?” only does one thing: It puts roadblocks in your way before you write even a single line of code. This is how we get into ludicrous situations where companies like Canonical are offering Kubernetes for IoT devices. 
To quote Jeff Goldblum, “Your scientists were so preoccupied with whether or not they could, they didn’t stop to think if they should.”

每个应用都不尽相同，这一点其实无须赘述。没有任何一套神圣的准则可以应用于所有应用（当然也包含本条）。当开始开发一个新的应用时，是应用本身及其架构决定了它要使用哪种技术或者基于哪个平台。在思考“我的应用需要什么？”这个问题之前，就决定使用 gRPC 或者Kubernetes 只会造成一种后果：在你开始动手写代码之前，就为以后设置了路障，这也是为什么我们会陷入像 Canonical 这样公司会为物联网设备提供 Kubernetes 服务的可笑境地。引用 Jeff Goldblum 的话，“你们的科学家如此醉心于他们能够干什么，却不会停下来想一想是否应该这样做”


## You Probably Don’t Need to “Do Microservices”

你可能不需要微服务

Microservices are sexy. I get it. The idea of being able to independently scale various bits and bobs in your application is exciting, and so is justifying your continued work on that particular codebase. But let’s be honest with ourselves — you probably don’t need to “do microservices.” Reasons like “I want to be able to decouple feature X code from feature Y code,” “keep bad code from creeping into other parts of the app,” or “minimize the blast radius should the app get compromised” aren’t reasons for moving to microservices; 
they’re symptoms of bad development practices (stay in your lane, touch only what’s necessary), code review standards that need to be more strict (bad code shouldn’t be merged, period), and a lack of fine-grained security controls, respectively.

Do you need to independently scale various parts of your application and are currently having capacity issues with one or more components, such as a login flow? 

Then you should probably explore breaking out those components that need to scale into separate services, if possible.
Are you running a virtual-server-based architecture and want to cut costs? Then you should not explore microservices. At best you’re going to break even. At worst you’re going to end up needing to spin up additional instances. Let’s say you have a monolith with five services in it that you then break apart into microservices. Now, you have five apps that either a) you spin up dedicated instances for, multiplying your initial footprint by five, or b) you use your existing footprint and now simply incur greater operational costs to manage it.

我知道，微服务很迷人。能够在应用程序中独立地伸缩各种组件是令人兴奋的，这也合理化了基于特定代码库的持续工作。但如果诚实地想一想，你可能没有必要“微服务化”，像诸如此类的原因，“我想将 X 功能和 Y 功能解耦”，“避免坏代码污染应用的其他部分”，亦或是 “应用程序崩溃时，最小化受影响的半径”，这些都不是微服务化的借口，反而是坏的开发实践（保持你现在，需要时再去触及），code review 标准需要更加严格（不满足要求的代码暂时不要 merge），缺乏细粒度的安全控制的表现。

你真的需要独立伸缩应用的不同部分，并且目前有能力解决一个或更多的组件问题（如登录流程）吗？

你的应用是运行在基于虚拟服务器的架构上并且想要缩减开支吗？那么你不应该去探索微服务。

在最好的情况下，你能做到收支相抵。在最坏的情况下，需要启动额外的实例。假设你有一个包含五个服务的整体应用，然后你将其分解为多个微服务。现在，你有5个应用程序，要么a)为其启动专用实例，使初始内存占用增加5倍，要么b)使用现有内存占用，只需增加管理它的操作成本。

## Have a Standardized Development Environment

拥有标准的开发环境

One of the most beneficial things you can do when working with more than one developer is to standardize your development environment across your team. Now, this doesn’t mean you have to hack together some container-based, virtual-development environment wizard magic. You can if you want, but something as simple as using the same language version can work wonders on your team’s sanity. Attempting to diagnose bugs on Go 1.12 while your coworker is writing code on Go 1.11 will only make you cry. Coordinating when to upgrade versions can be difficult, but if you get it right things can flow smoothly.

当你与多个开发者协作时，其中一件最有裨益的事情就是在团队中标准化开发环境。这其实并不意味着非得一起使用基于容器，虚拟化开发环境的“巫术”。当然了，如果你想这么做也可以。但像使用相同版本的开发语言这种简单的标准，有时就会在团队中创造奇迹。当同事基于 Go 1.11 版本开发时，你去尝试基于 Go 1.12 版本去定位 bug 时，你会哭的。在协作中升级版本是有难度的，但如果操作正确升级也可以很顺滑。

## Configuration Is Harder Than It Seems; Plan Accordingly

配置比看起来要困难，按需计划

Contrary to what some popular websites say, configuration is a bit more complicated than “put everything in environment variables.” It’s my opinion that there should be no less than four ways to configure an app: 

```
in-code defaults, 
local config file, 
command-line flags, 
environment variables, 
remote configuration source (such as Hashicorp’s Consul). 
```

I would consider remote configuration optional; however, the other four are necessary. 
For development, relying on putting 27 different config values into environment variables just to run your app locally can be frustrating, to say the least. Also, maybe you need better automation and a Makefile? Providing a way to have a local config source, like an application.yaml, allows you to set a default “dev” config. Additionally, having in-code defaults means that you only need to set the values you want to change from their defaults. 
Command-line flags are very useful when running an application via an init system like systemd, as it makes seeing the configuration easier when tracing a process. 
Environment variables are very useful when running in a container, yes, but there are some things they’re not suited for, like secrets.
You should never put secrets — things like passwords, authentication tokens, certificates, and generally anything you don’t want leaking out to the general public — into environment variables, as they are not secure and can be read by literally any process on the host machine. You should always use some sort of secrets manager for your secrets. My personal pick is Vault by Hashicorp, but use what works best for your app.

与一些热门网站所说的相反，配置其实要比“把所有东西扔进环境变量”复杂的多。在我看来，配置一个应用程序应该至少有四种方式：

```
代码中的默认配置
本地配置文件
命令行标记
环境变量
远端配置源（如 Hashicorp 的 Consul）
```

我将远端配置当做是可选的，但其他四种是必要的。

开发过程中，将依赖的 27 个配置值扔到环境变量中，仅仅是为了在本地运行应用程序，这一点至少是令人沮丧的。或者你可能需要更好的自动化以及一个 Makefile？可以提供一种方式如一个application.yaml文件来访问本地配置源，允许你设置默认的 “dev” 配置。另外，代码中的默认配置意思是你只需要设置需要修改的默认配置。当通过像 systemd 这样的初始系统运行应用时，命令行标记会非常有用，因为它可以在追踪进程时，更加容易的看到配置信息。当应用运行在容器中时，环境变量会非常实用，但像秘钥这种配置不适合放在环境变量中。

绝不要将秘钥如密码、认证token、证书等一些你不想泄露出去的东西放到环境变量中，因为这样很不安全，有可能被宿主机上的任何进程读到。你应该总是使用秘钥管理器来管理秘钥，我个人的选择是Vault by Hashicorp，你可以选择最适合你的。

## Use Packages When You Need to, Not Just Because You Can

按需使用包管理，而不是仅仅因为能用

We all know about the left-pad apocalypse right? How one 11-line NPM package getting removed from the repository broke, well, everything on the internet? Don’t do that. Packages should be used when there’s a legitimate need to import one, like a vendor-specific SDK (AWS’ SDK, for example), an abstraction on a highly verbose set of standard libraries (that’s why people like using Python’s Requests instead of urllib), or a widely used framework such as Go’s Echo HTTP server or Python’s Flask WSGI server. Some convenience libraries are OK too, like JavaScript’s Lodash that provides some common functionality and extras not found in the standard library. 
These external dependencies should make developing easier and not require you to write boilerplate or integration code by hand — this is the benefit of package systems. 
But, like left-pad, it’s easy to fall into the trap of “oh, there’s a library for this, I’ll just use that.” 

For every dependency you import, you increase the risk that dependency will introduce instability, insecurity, or just simply not be maintained.
The risk also increases with every package your new dependency itself imports — also known as a transitive dependency. If you import a single package that, in turn, imports five packages, you have now inherited those five dependencies and all of the risk and hazards that come with them. I and many others in this industry would argue that packages shouldn’t introduce transitive dependencies. This isn’t always possible, but at the very least packages should be as lean as possible and, if greater functionality is desired, provide a way for the user to explicitly extend it.

A simple rule that I try to follow with importing libraries is if I can write it on my own in about 10–15 minutes, then I do. Otherwise, I’ll use an external library for it if one is available. Developing with this rule in mind will save you from importing unnecessary cruft into your application but is lenient enough where you’re not expected to write a new HTTP server from scratch every time you want to serve an API.

我们都知道 “left-pad” 事件，一个只有 11 行代码的 NPM 包从仓库中移除，为何给全网造成了影响？我们不要这样做。有合理的导包需求时，才应该使用 package，如特定供应商的SDK（例如 AWS 的 SDK），是一组非常详细的标准库的抽象（这就是为什么大家喜欢用 Python 的 Requests 库而不使用 urllib），或者导入被广泛使用的框架如 Go 语言的 Echo HTTP server 或者 Python 语言的 Flask WSGI server。一些方便的库也可以，比如 JavaScript 的 Lodash，它提供了一些标准库中没有的公共功能和附加功能。这些外部依赖应该让开发更容易，并且不需要手工编写样板或集成代码 -- 这些是包管理的益处，但是，像 left-pad 这种，很容易陷入这种陷阱--“这正好有一个能解决问题的库，直接用旧行了”。每一个你导入的依赖，都会增加不稳定、不安全或者仅仅不可维护的风险。

每导入一个包，新的依赖项本身的风险就会增加——这也称为传递依赖项。如果你导入一个单独的包，而这个包又导入了五个包，那么你现在就继承了这五个依赖项以及它们所带来的所有风险和危险。我和很多业内人士都认为包不应该引入传递依赖关系，但这是不现实的，至少包应该尽可能精简，如果需要更强大的功能，则为用户提供显式扩展它的方法。

我现在遵循的一个简单原则是，如果导入的库，我自己可以在 10-15 分钟实现，就自己实现。否则，如果有可用的外部库，我就使用外部库。开发过程中谨记这个规则可以让你避免导入一些不必要的包。如果你不希望每次都从头开始编写新的 HTTP 服务器来提供 API，那么这种方法就足了。

## You Don’t Need to Abstract That Bit of Code Until You Do

如无必要，无需抽象

One big pitfall that’s super easy to fall in to is the “abstract everything” hole. The thought of “oh, but I might need to reuse this later” can lead down some dark and scary object-oriented paths. And I get why. The DRY principle (don’t repeat yourself) is drilled into our heads, and with good reason. But there’s a limit to where you’re spending too much time abstracting and not enough time writing logic. Just write your code! If you find you need to implement a method or a function that’s similar to something else you’ve already done, then you can go back and abstract it — but again, with limits. 
A personal rule that I tend to go by is if it’s a simple three-line function before abstraction, then maybe it’s fine to leave it as is and just repeat it. And if it is just 3 lines, maybe ask if it needs to be a function at all.

一个极易陷入的大陷阱就是“抽象所有”的黑洞。“这个我后面可能会复用”的想法可能会使你误入一些黑暗和可怕的面向对象歧途，我弄清了其中的个中缘由，DRY 原则已经深入人心且理由充分。但是你花太多时间去抽象反而没有足够的时间写逻辑。只需安心编写代码，如果你发现需要实现一个与之前完成的其他工作类似的方法或函数，那么你可以返回并抽象它——但同样要有节制。我个人倾向于遵循的原则是，如果在抽象之前它是一个简单的三行函数，那么最好保持不变，然后重复它。如果只是 3 行代码，也许可以自问，它是否需要变成一个函数？

## You Should “Phoenix” Your Project From Time to Time

你应该时不时地“涅槃”你的项目

This one is the scariest of all. It makes managers nervous, it makes product owners cranky, and it makes developers angry, but you absolutely need to do it. Starting over from the beginning every once in a while is a good thing. It allows you to remove the crap from your code, implement new ideas without retrofitting half the existing codebase, and forces everyone to re-evaluate the project.
Think of your project as a forest, each line of code a mighty pine tree in a vast forest stretching for miles. As the forest ages, it becomes littered with undergrowth, cast-off pine needles, pine cones, dead branches, and a host of other debris. This is your cruft; your technical debt. It piles up and up, never stopping until some radical change is affected. For the forest that change comes in the form of a wildfire. The fire sweeps through the forest burning up the unwanted grift that has accumulated. 
The trees whose bark is thick enough remain, with the immature or underdeveloped trees being consumed in the fire. While this might seem like an end for the forest, it holds a great secret: It was waiting for the fire. 
Patiently, for years, the forest has been hoping for a fire to cleanse it and bring about change, because as the fire rages below the canopy, the next generation of towering trees is germinating in their pine cones. As the fire marches across the forest floor, it makes way for tender vulnerable saplings to emerge and take their place next to the fire-blackened survivors. This is how your application must be: the resilient, well-written parts survive the purge while the rest make way for new ideas and new code to emerge from the charred remains — like a phoenix rising from the ashes.

本条准则是最可怕的，它让管理者紧张，让产品经理气急败坏，让开发者愤怒，但是你绝对需要它。

每隔一段时间就从头开始是一件好事，它允许你代码中删除垃圾，实现新的想法，而不需要改造现有的代码库，并迫使每个人重新评估项目。

把项目想象成森林，每一行代码都是绵延数英里的大森林中的一棵巨大松树。随着森林的演化，灌木丛、丢弃的松针、松果、枯死的树枝和其他杂物散布于森林之中。这是你厌恶的东西，你的技术债。它会一直不断堆积，直到某些巨变发生。对于森林而言，这种变化是以野火的形式出现。大火横扫森林，烧毁了堆积起来的无用垃圾。树皮足够厚的树会留下来，未成熟或未发育完全的树会在火灾中被烧毁。虽然这看起来是森林的尽头，但它隐藏了一个巨大的秘密：森林一直在等待这场火。耐心地，年复一年地，森林一直在期待这场大火来净化自己，并带来变化。因为当大火在树冠下肆虐时，下一代的参天大树正在松果中发芽。当大火蔓延到森林地面时，脆弱的幼树就会冒出来，与被大火熏黑的幸存者为伴。这也是你的应用程序该有的样子：有弹性的、在清除过程中，编写良好的部分幸存下来，而其他部分则为新思想和新代码让路——就像凤凰涅槃一样。

## You’re Not Google

你不是 Google

Unless you are. But if that’s the case then why are you reading this? The point is that you’re most likely not Google, or Microsoft, or Amazon, or Twitter, or Facebook. You don’t have a need to orchestrate 150,000 containers across 10,000 bare-metal servers in 17 different data centers around the world. Your problems aren’t typically impacts-every-single-person-in-the-world big. Why are we talking about this? Because your scale should determine your operational platform. If you’re running a few hundred containers, do you really need Kubernetes? And do you really need to run it yourself, or are you just trying to add it to your résumé? Something like HashiCorp Nomad is perfect for those small-to-mid scale problems: 
It’s easy to set up, requires little to no maintenance, is well documented, and is really easy to transition your applications to since it works with containers as well as system processes and JVM applications natively. 
And if you really want to run Kubernetes, why not do it under the management of something like Rancher that abstracts all the messy crap away? The headache and overhead of running a complex system like Kubernetes, that was designed at and for companies like Google, is too much for a single team to manage. I would even flat out say that startups should avoid it at all costs unless their product is specifically targeted to Kubernetes. A caveat is using managed services like those offered by Google, Amazon, and Microsoft in their respective cloud offerings. Because they manage all of the ugly, a lot of that overhead isn’t there for you to take on yourself. 

But never, ever, ever let me catch you using Kubernetes on IoT devices. Please, just don’t.

除非你是 Google，但如果你真的是 Google，为何你还在读这篇文章呢？关键是你大概率不是 Google，不是 Microsoft，不是 Amazon，不是 Twitter，不是 Facebook。你不需要在全世界 17 个不同的数据中心的 10,000 个裸机服务器上编排 150,000 个容器。你的问题通常不会对世界上每一个人造成很大的影响。我们为什么要讨论这个？因为你的规模决定了你的操作平台。如果你正在运行几百个容器，那么你真的需要 Kubernetes 吗？你真的需要自己运行 Kubernetes，还是只是想把它添加到你的简历中？HashiCorp Nomad 之类的工具非常适合解决中小型问题：它易配置，几乎不需要维护，有良好的文档，并且非常容易就可以把应用程序迁移过去，因为它可以与容器、系统进程和 JVM 应用程序一起工作。如果你真的想使用 Kubernetes，为什么不基于把繁杂细节都抽象好的 Rancher 来管理呢？运行 Kubernetes 这样的复杂系统（它是为谷歌这样的公司设计的）所带来的麻烦和开销对于一个团队来说是难以承受的。我甚至会直截了当地说，初创公司应该不惜一切代价避免使用它，除非他们的产品是专门针对 Kubernetes 的。需要注意的是，要使用 Google、Amazon 和 Microsoft 在各自的云产品中提供的托管服务。因为他们管理着所有的丑陋的东西，很多管理费用并不是由你来承担的。

但千万别让我抓到你在物联网设备上使用 Kubernetes，千万不要。

## Don’t Form Your Development Philosophy Entirely From Strangers on the Internet

不要照搬网上陌生人的开发哲学

You should make up your own mind about what rules apply to your application and to your development style. Even these ten things are up for debate. I’m just a guy on the internet.

对于开发风格和要遵循的原则，你应该形成自己的想法。即使是上面的 10 条建议也只是仅供讨论，我只是网上的过客。