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
![](/images/boot-perf.png)


jvm:
![](/images/perf-jvm.png)
