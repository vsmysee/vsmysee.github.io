---
layout: article
title:  RestTemplate负载均衡
---

今天看了下SpringCloud的客户端负载均衡代码

```
    @Bean
    @LoadBalanced
    RestTemplate restTemplate() {
        return new RestTemplate();
    }
```
我就纳闷了，RestTemplate是一个Spring自带的一个古老玩意，Cloud是什么魔法可以加个注解就具备了负载均衡能力的？

通过过跟踪发现，在RestTemplate的3.1版本的时候加入了一个类:

InterceptingHttpAccessor

原本RestTemplate是从HttpAccessor继承的，现在继承了InterceptingHttpAccessor，这个类有一个属性

```
private final List<ClientHttpRequestInterceptor> interceptors = new ArrayList<>();
```


拦截器的代码

```
 * @author Arjen Poutsma
 * @since 3.1
 */
@FunctionalInterface
public interface ClientHttpRequestInterceptor {

	ClientHttpResponse intercept(HttpRequest request, byte[] body, ClientHttpRequestExecution execution)
			throws IOException;
			
}

```

所以真相大白了，Cloud实现了一个拦截器，对RestTemplate在执行请求前进行了处理，太巧妙了。

这充分说明了一个设计上的常识：**在一个重要的处理过程前后留下拦截面以获得扩展性**

Spring Boot就通过这个拦截器实现了Metrics的功能，具体的类是：MetricsClientHttpRequestInterceptor

当然，设计也是演化出来的，比如这个InterceptingHttpAccessor在3.0的时候其实没有，也是下一个版本演化来的。
