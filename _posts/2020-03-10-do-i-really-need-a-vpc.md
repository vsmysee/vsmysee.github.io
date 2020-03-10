---
layout: article
title: 需要VPC吗
---

[原文](https://arthurchiao.github.io/blog/do-i-really-need-a-vpc-zh/)


cloud-native applications increasingly run on higher-level managed services --  like Lambda, API Gateway, and DynamoDB -- that communicate with each other via API. In AWS, that might mean securing the interaction between microservices using IAM for both authentication and authorization. 

人们越来越倾向于将云原生应用（cloud-native applications）直接部署在更 高层的托管服务之上 —— 例如 Lambda、API Gateway 和 DynamoDB —— 这些服务通过 API 与彼此进行通信。在 AWS上，这种情况下的最佳实践是 使用 IAM 做认证和鉴权，以保障微服务间的通信安全。


“The VPC doesn’t do anything, really,” she points out. “You need a proper network architecture with NACLs, subnets, and security groups. You need to know how to build the architecture so you can monitor for attacks. People need to understand network layers, attacks, and how attackers pivot through networks.” 

VPC 并没有什么神奇之处。“VPC 实际上并没有做任何 事情”，她指出。“你真正需要的是一个包含 NACL、子网和安全组的合理网络架构。你 需要知道如何构建这样的架构，然后才能针对攻击做好监控。此外，你还要理解网络的各个 分层、攻击的种类，以及攻击者是如何渗透网络的。”



more is not always better. If you’re not good at configuring IAM roles yet, what makes you think you’ll be better at VPC security? If you are leaving S3 buckets publicly exposed, are you sure you can police the web of security groups, ACLs, and subnets that a VPC brings in?

对于安全配置来说，越多并非永远意味着越好（more is not always better） 。如果你连配置 IAM 角色都还没搞熟，那又如何相信你能做好 VPC 安全？如果你连S3 bucket 的 public 属性都不清楚，那又如何确定你能管好安全组、ACL 以及 VPC 引入的 subnets？


I’m certainly not making an argument that you should punt on security in the cloud because it’s too hard. On the contrary, I’m saying that precisely because network security is both hard and important, you should rely on secure defaults wherever you can, instead of brewing your own soup of network controls.

云安全太难了！但我显然不是在鼓励大家因此而放弃。相反，正是因为云安全如此困难且重 要（both hard and important），我才建议你不要轻易引入自己的网络控制方案，而 应该尽可能用好平台提供的安全能力




remember: sometimes, great power comes from less responsibility.

***牢记：有时候，责任越小，能力越大***

