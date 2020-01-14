---
layout: article
title: 谣言八卦gossip
---

[原文](https://managementfromscratch.wordpress.com/2016/04/01/introduction-to-gossip/)


```

Riak uses a gossip protocol to share and communicate ring state and bucket properties around the cluster.


In CASSANDRA nodes exchange information using a Gossip protocol about themselves and about the other nodes that they have gossiped about, so all nodes quickly learn about all other nodes in the cluster. [9]


Dynamo employs a gossip based distributed failure detection and membership protocol. It propagates membership changes and maintains an eventually consistent view of membership. Each node contacts a peer chosen at random every second and the two nodes efficiently reconcile their persisted membership change histories [6].
Dynamo gossip protocol is based on a scalable and efficient failure detector introduced by Gupta and Chandra in 2001 [8]


Consul uses a Gossip protocol called SERF for two purposes [10]:

   – discover new members and failures 
   – reliable and fast event broadcasts for events like leader election.
   
The Gossip protocol used in Consul is called SERF and is based on “SWIM:  Scalable Weakly-consistent Infection-style Process Group Membership Protocol”


Amazon s3 uses a Gossip protocol to spread server state to the system [8].

```

