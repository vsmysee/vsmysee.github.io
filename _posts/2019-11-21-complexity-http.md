---
layout: article
title:  好复杂的http
---
看了Oracle官网上关于http连接管理的文章后，我都不敢写http调用的代码了，好复杂

[原文](https://docs.oracle.com/javase/8/docs/technotes/guides/net/http-keepalive.html)


## 复用连接的好处

- Network friendly. Less network traffic due to fewer setting up and tearing down of TCP connections.
- Reduced latency on subsequent request. Due to avoidance of initial TCP handshake
- Long lasting connections allowing TCP sufficient time to determine the congestion state of the network, thus to react appropriately.

特别是对于https:

persistent connections may reduce the number of costly SSL/TLS handshake to establish security associations, in addition to the initial TCP connection set up.


## 连接如何能重用

Since TCP by its nature is a stream based protocol 

TCP本质上是一个流式协议
你必须有办法识别消息的结束,不管是Content-Length header,还是chunked transfer encoded entity body

it is required that all messages on the connection MUST have a self-defined message length 

## 如果经过了代理怎么办？

From a HTTP client or server's perspective, as far as persistence connection is concerned, the presence or absence of proxy servers is transparent.

## JDK

The JDK supports both HTTP/1.1 and HTTP/1.0 persistent connections

不是随便就能重用的

when the application calls close() on the InputStream returned by URLConnection.getInputStream(), the JDK's HTTP protocol handler will try to clean up the connection and if successful, put the connection into a connection cache for reuse by future HTTP requests


两个重要属性
```
The system properties that control the behavior of Keep-Alive are:

http.keepAlive=<boolean>
default: true

Indicates if keep alive (persistent) connections should be supported.

http.maxConnections=<int>
default: 5
```

**所以默认HttpURLConnection是开启了连接复用的**


## Buffer

The current implementation doesn't buffer the response body. Which means that the application has to finish reading the response body or call close() to abandon the rest of the response body, in order for that connection to be reused. 
Furthermore, current implementation will not try block-reading when cleaning up the connection, meaning if the whole response body is not available, the connection will not be reused.


## 400，500了呢

When the application encounters a HTTP 400 or 500 response, it may ignore the IOException and then may issue another HTTP request. 
In this case, the underlying TCP connection won't be Kept-Alive because the response body is still there to be consumed, so the socket connection is not cleared, therefore not available for reuse. 


照顾错误流getErrorStream：

What the application needs to do is call HttpURLConnection.getErrorStream() after catching the IOException , read the response body, then close the stream. However, some existing applications are not doing this. As a result, they do not benefit from persistent connections. To address this problem, we have introduced a workaround.


对连接做清理的属性控制:
```
sun.net.http.errorstream.enableBuffering=<boolean>
default: false

sun.net.http.errorstream.timeout=<int> in millisecond
default: 300 millisecond

sun.net.http.errorstream.bufferSize=<int> in bytes
default: 4096 bytes

```

## 可靠的代码

{% highlight java %}

try {
        URL a = new URL(args[0]);
        URLConnection urlc = a.openConnection();
        is = conn.getInputStream();
        int ret = 0;
        while ((ret = is.read(buf)) > 0) {
          processBuf(buf);
        }
        // close the inputstream
        is.close();
} catch (IOException e) {
        try {
                respCode = ((HttpURLConnection)conn).getResponseCode();
                es = ((HttpURLConnection)conn).getErrorStream();
                int ret = 0;
                // read the response body
                while ((ret = es.read(buf)) > 0) {
                        processBuf(buf);
                }
                // close the errorstream
                es.close();
        } catch(IOException ex) {
                // deal with the exception
        }
}
{% endhighlight %}


## JDK版本改变

Prior to JDK 6, if an application closes a HTTP InputStream when more than a small amount of data remains to be read, then the connection had to be closed, rather than being cached. 
Now in JDK 6, the behavior is to read up to 512 Kbytes off the connection in a background thread, thus allowing the connection to be reused. The exact amount of data which may be read is configurable through the http.KeepAlive.remainingData system property.


## 总结

看懂了吗？太复杂了吧，所以使用http的核心原则就是不要使用原生http，一定要使用开源封装库，比如RestTemplate,Apache Http Components。

同样的道理，Jdbc连接也很复杂，一定要使用可靠的连接池，比如hikariCP，不要逞强，试图自己去发明连接管理的库，因为有太多太多的细节了。
