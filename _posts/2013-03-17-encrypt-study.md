---
layout: article
title: 加密解密学习笔记
---

这个世界因为各种利益问题，人与人在互相的窥探，怎么保护自己的数据从人这个动物产生开始就在研究了，所以安全问题可以说是独立于计算机的，只不过计算机发明之后，大量的信息被计算机管理和
处理，这个问题变得尤为严重。我们给门上一把锁，养一条狗，买个超重的保险柜都是平常生活中解决安全问题的手段，在计算机中要解决安全问题需要用到数学的方法。

计算机表示数据都是二进制的，所以我们用计算机在解决数据安全问题的时候核心就在分析这些二进制数据，有一种方法被很多人说是一种加密算法，那就是MD5和SHA，请看他们的英文全名：Message-Digest Algorithm，Secure Hash Algorithm，他们不是加密算法，它只是对数据做摘要
的算法而已，摘要的目的是防止数据被篡改，数据一旦被篡改就会得到不同的摘要序列，他们之所以被用来做加密密码，可能是当初我们做认证系统的时候随便选择的一个工具，它比明文密码存储要好一点点而已
为什么？摘要算法可以处理任何数据量的文件，通过摘要之后得到的序列是不可逆的，也就是说不可能从摘要序列反推原始被摘要的数据，而我们对密码做摘要，这个密码的本身组合范围是相对有限的，那么如果
基于摘要来做所谓的加密是不安全的，我们可以用强大的字典来破解，因为密码就是数字，字母的组合，而且因为人的记忆缺陷，它的长度也不是很长，所以是可以破解的，如果要做一个安全的密码加密程序，不
要用MD5,SHA。

实现MD5,SHA需要用位补齐和分组，我们一般用Java的API，如下：
{% highlight java %}
MessageDigest md = MessageDigest.getInstance("MD5");
MessageDigest md = MessageDigest.getInstance("SHA");
{% endhighlight %}


加密和解密是对应的，而MD5,SHA不能解密，那么真正的加密和解密算法是什么呢？它分为两种：

1. 对称机密
2. 非对称机密

解密需要钥匙，对称机密就是加和解都用相同的钥匙，这样问题如果钥匙被泄露问题就严重了，非对称有两把钥匙，需要这两把钥匙配对才能解密,我们通过java中的api来直接看代码吧

DES（Data Encryption Standard）
{% highlight java %}
KeyGenerator gen = KeyGenerator.getInstance("DES");
Key key = gen.generateKey();//生成钥匙

ipher cipher = Cipher.getInstance("DES");
cipher.init(Cipher.ENCRYPT_MODE, key); //指定是加密模式和钥匙进行加密
cipher.update(Constant.DATA.getBytes());

{% endhighlight %}


RSA非对称加密，利用目前数学上没有解决的问题来加密，如果数学上的问题被解决了，那么这个算法就不安全了，这是网络上的说明：

RSA算法是第一个能同时用于加密和数字签名的算法，也易于理解和操作。RSA是被研究得最广泛的公钥算法，从提出到现在已近二十年，经历了各种攻击的考验，逐渐为人们接受，普遍认为是目前最优秀的公钥方案之一。
RSA的安全性依赖于大数的因子分解，但并没有从理论上证明破译RSA的难度与大数分解难度等价。即RSA的重大缺陷是无法从理论上把握它的保密性能如何，而且密码学界多数人士倾向于因子分解不是NPC问题。


{% highlight java %}
KeyPairGenerator gen = KeyPairGenerator.getInstance(“RSA”);
KeyPair pair = gen.generateKeyPair();//得到一对钥匙
Cipher cipher = Cipher.getInstance("RSA");
cipher.init(Cipher.ENCRYPT_MODE, pubkey);//用公钥加密

c.init(Cipher.DECRYPT_MODE, prikey);//用私钥解密
{% endhighlight %}


RSA可以用来加密也可能用来做数字签名,数字签名算法还有DSA(Digital Signature Algorithm)，DSA的数学背景是基于整数有限域离散对数难题的，其安全性与RSA相比差不多。DSA的一个重要特点是两个素数公开,在Java中如果不加密，单纯签名的话，代码这样写
{% highlight java %}
KeyPairGenerator gen = KeyPairGenerator.getInstance(“DSA”);
KeyPair pair = gen.generateKeyPair(); //一对钥匙
Signature signature = Signature.getInstance("DSA");
signature.initSign(prikey);
signature.update(Constant.DATA.getBytes());
{% endhighlight %}


RSA的签名代码如下

{% highlight java %}
Signature sig = Signature.getInstance("SHA1withRSA");
Signature sig.initSign(pk);
{% endhighlight %}
