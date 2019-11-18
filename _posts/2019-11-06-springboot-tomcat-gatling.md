---
layout: article
title:  SpringBoot压测基准
---
对springboot的一个简单接口做的压测数据，作为基准参考

机器配置: 4 core, 16G

JVM: -Xms2G -Xmx2G


tomcat:

```
server:
  port: 8080
  tomcat:
    max-threads: 200
```


Gatling压测脚本:150个并发，持续5分钟

{% highlight scala %}
package perf

import io.gatling.core.Predef._
import io.gatling.http.Predef._
import scala.concurrent.duration._

class PerfSimulation extends Simulation {

  val httpProtocol = http
    .baseUrl("http://localhost:8080")
    .acceptHeader("text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8") // Here are the common headers
    .doNotTrackHeader("1")
    .acceptLanguageHeader("en-US,en;q=0.5")
    .acceptEncodingHeader("gzip, deflate")
    .userAgentHeader("Mozilla/5.0 (Macintosh; Intel Mac OS X 10.8; rv:16.0) Gecko/20100101 Firefox/16.0")

  val scn = scenario("Scenario Name").during(300) {
    exec(http("request_1").get("/Status/Version"))
  }

  setUp(scn.inject(atOnceUsers(150)).protocols(httpProtocol))
}

{% endhighlight %}


控制器逻辑:

{% highlight java %}
@RestController
@RequestMapping("/Status")
public class StatusController {

    @RequestMapping(value = "/Version")
    public String version() {
        return "OK";
    }
    
}    

{% endhighlight %}


结果：
```
================================================================================
---- Global Information --------------------------------------------------------
> request count                                    3040769 (OK=3040769 KO=0     )
> min response time                                      0 (OK=0      KO=-     )
> max response time                                    436 (OK=436    KO=-     )
> mean response time                                    15 (OK=15     KO=-     )
> std deviation                                         19 (OK=19     KO=-     )
> response time 50th percentile                         11 (OK=11     KO=-     )
> response time 75th percentile                         16 (OK=16     KO=-     )
> response time 95th percentile                         41 (OK=41     KO=-     )
> response time 99th percentile                        113 (OK=113    KO=-     )
> mean requests/sec                                10102.223 (OK=10102.223 KO=-     )
---- Response Time Distribution ------------------------------------------------
> t < 800 ms                                       3040769 (100%)
> 800 ms < t < 1200 ms                                   0 (  0%)
> t > 1200 ms                                            0 (  0%)
> failed                                                 0 (  0%)
================================================================================
```


jvm:
![](/images/perf-jvm.png)


## 压测ng的静态页作为对比

```
location / {
            root   html;
            index  index.html index.htm;
}
```


```
================================================================================
---- Global Information --------------------------------------------------------
> request count                                     963338 (OK=963338 KO=0     )
> min response time                                      0 (OK=0      KO=-     )
> max response time                                    275 (OK=275    KO=-     )
> mean response time                                    19 (OK=19     KO=-     )
> std deviation                                          8 (OK=8      KO=-     )
> response time 50th percentile                         17 (OK=17     KO=-     )
> response time 75th percentile                         19 (OK=19     KO=-     )
> response time 95th percentile                         28 (OK=28     KO=-     )
> response time 99th percentile                         53 (OK=53     KO=-     )
> mean requests/sec                                15792.426 (OK=15792.426 KO=-     )
---- Response Time Distribution ------------------------------------------------
> t < 800 ms                                        963338 (100%)
> 800 ms < t < 1200 ms                                   0 (  0%)
> t > 1200 ms                                            0 (  0%)
> failed                                                 0 (  0%)
================================================================================
```


## 结论

10000 QPS左右


