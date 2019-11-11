---
layout: article
title: 和httpclient玩耍
---
本文是对各种httpclient的玩耍总结，不同的client表现出来的是不同的使用风格，我们在使用时需要注意对client对象生命周期和线程安全性的关注
文中包含部分使用代码和对于库源码的部分提取。推荐一个测试http的站点:https://httpbin.org/headers

## JDK自带
{% highlight java %}

//最原始的调用
URL url = new URL(urlStr);
HttpURLConnection conn = (HttpURLConnection) url.openConnection();
conn.setConnectTimeout(3000);
conn.setReadTimeout(3000);
conn.setRequestMethod("GET");

InputStream is = conn.getInputStream();

StringBuilder sb = toStr(is);
System.out.println(sb.toString());


//Java9

HttpClient client = HttpClient.newHttpClient();
HttpRequest request = HttpRequest.newBuilder()
    .uri(new URI("https://labs.consol.de/"))
    .build();
HttpResponse<String> response = client.send(request, HttpResponse.BodyHandler.asString());

{% endhighlight %}

## Jodd
没有连接池，直接在socket上解析
{% highlight java %}

<dependency>
    <groupId>org.jodd</groupId>
    <artifactId>jodd-http</artifactId>
    <version>5.0.13</version>
</dependency>

String text = HttpRequest.get(urlStr).timeout(3000).connectionTimeout(3000).send().bodyText();
System.out.println(text);


HttpRequest httpRequest = HttpRequest
        .post("http://srv:8080/api/dlapp/add-file-entry")
        .form(
            "repositoryId", "10178",
            "folderId", "11219",
            "sourceFileName", "a.zip",
            "mimeType", "application/zip",
            "title", "test",
            "description", "Upload test",
            "changeLog", "testing...",
            "file", new File("d:\\a.jpg.zip")
        );

HttpResponse httpResponse = httpRequest.send();
    
{% endhighlight %}

## Apache
安全性，可单例
```
@Contract(threading = ThreadingBehavior.SAFE)
public abstract class CloseableHttpClient implements HttpClient, Closeable
```

{% highlight java %}
RequestConfig config = RequestConfig.custom().setConnectTimeout(3000).setSocketTimeout(3000).setConnectionRequestTimeout(3000).build();
CloseableHttpClient client = HttpClients.custom().build();
HttpGet httpGet = new HttpGet(urlStr);
httpGet.setConfig(config);
HttpEntity entity = client.execute(httpGet).getEntity();
System.out.println(EntityUtils.toString(entity));

{% endhighlight %}

## Apache fluent

默认的连接池
```
final static PoolingHttpClientConnectionManager CONNMGR;
final static HttpClient CLIENT;
```
    
{% highlight java %}
System.out.println(Request.Get(urlStr).connectTimeout(3000).socketTimeout(3000).execute().returnContent().asString());
{% endhighlight %}

## Unirest
这个库是对apache的封装
{% highlight java %}

<dependency>
    <groupId>com.konghq</groupId>
    <artifactId>unirest-java</artifactId>
    <version>3.1.02</version>
</dependency>
        
System.out.println(Unirest.get(urlStr).connectTimeout(3000).socketTimeout(3000).asString().getBody());

CompletableFuture<HttpResponse<JsonNode>> future = Unirest.post("http://httpbin.org/post")
  .header("accept", "application/json")
  .field("param1", "value1")
  .field("param2", "value2")
  .asJsonAsync(response -> {
        int code = response.getStatus();
        JsonNode body = response.getBody();
    });
    
{% endhighlight %}


## OkHttp
核心对象OkHttpClient线程安全
{% highlight java %}
OkHttpClient client = new OkHttpClient.Builder().connectTimeout(30, TimeUnit.SECONDS).readTimeout(30, TimeUnit.SECONDS).build();

Request request = new Request.Builder()
        .url(urlStr)
        .get()
        .build();

String res = "";
try (Response response = client.newCall(request).execute()) {
    res = response.body().string();
} catch (IOException e) {
    e.printStackTrace();
}


RequestBody body = RequestBody.create(JSON, json);
Request request = new Request.Builder()
  .url(url)
  .post(body)
  .build();
try (Response response = client.newCall(request).execute()) {
return response.body().string();
}

{% endhighlight %}


## AsynchttpClient
Dsl类创建出来的DefaultAsyncHttpClient是线程安全的
{% highlight java %}


 <dependency>
            <groupId>org.asynchttpclient</groupId>
            <artifactId>async-http-client</artifactId>
            <version>2.2.0</version>
</dependency>



Future<Response> responseFuture = Dsl.asyncHttpClient()
        .prepareGet(urlStr)
        .execute();
String res = responseFuture.get().getResponseBody();


CompletableFuture<Response> whenResponse = asyncHttpClient
            .prepareGet("http://www.example.com/")
            .execute()
            .toCompletableFuture()
            .exceptionally(t -> { /* Something wrong happened... */  } )
            .thenApply(response -> { /*  Do something with the Response */ return resp; });
whenResponse.join(); 


{% endhighlight %}

## ApacheHttpAsyncClient
{% highlight java %}

<dependency>
            <groupId>org.apache.httpcomponents</groupId>
            <artifactId>httpasyncclient</artifactId>
            <version>4.1.4</version>
</dependency>
        
CloseableHttpAsyncClient client = HttpAsyncClients.createDefault();
client.start();

HttpGet httpGet = new HttpGet(urlStr);
client.execute(httpGet, new FutureCallback<HttpResponse>() {
    @Override
    public void completed(HttpResponse httpResponse) {
        HttpEntity entity = httpResponse.getEntity();
        try {
            System.out.println(EntityUtils.toString(entity));
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    @Override
    public void failed(Exception e) {
    }

    @Override
    public void cancelled() {
    }
});
{% endhighlight %}


## Spring Http
RestTemplate是线程安全的
{% highlight java %}
//同步
RestTemplate restTemplate = new RestTemplate();
String forObject = restTemplate.getForObject(urlStr, String.class);
System.out.println(forObject);

//Template with Apache Http
HttpComponentsClientHttpRequestFactory clientHttpRequestFactory = new HttpComponentsClientHttpRequestFactory();
clientHttpRequestFactory.setHttpClient(httpClient);
RestTemplate restTemplate = new RestTemplate(clientHttpRequestFactory);

//异步
Mono<String> mono = WebClient.create().method(HttpMethod.GET).uri(urlStr).retrieve().bodyToMono(String.class);
System.out.println(mono.block());
{% endhighlight %}


## Google http

```
 <dependency>
            <groupId>com.google.http-client</groupId>
            <artifactId>google-http-client</artifactId>
            <version>1.23.0</version>
 </dependency>
```

{% highlight java %}
HttpRequestFactory requestFactory
                = new NetHttpTransport().createRequestFactory();
HttpRequest request = requestFactory.buildGetRequest(
        new GenericUrl("https://httpbin.org/headers"));

String rawResponse = request.execute().parseAsString();
System.out.println(rawResponse);
{% endhighlight %}


[参考](https://github.com/eugenp/tutorials/tree/master/libraries-http)