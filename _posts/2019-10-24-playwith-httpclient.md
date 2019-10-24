---
layout: article
title: 和httpclient玩耍
---
本文是对各种httpclient的玩耍总结，不同的client表现出来的是不同的使用风格，我们在使用时需要注意对client对象生命周期和线程安全性的关注
文中包含使用代码和对于源码的部分提取

## Java Lib
{% highlight java %}

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
String text = HttpRequest.get(urlStr).timeout(3000).connectionTimeout(3000).send().bodyText();
System.out.println(text);
{% endhighlight %}

## Apache
安全性，可单例
@Contract(threading = ThreadingBehavior.SAFE)
public abstract class CloseableHttpClient implements HttpClient, Closeable

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
final static PoolingHttpClientConnectionManager CONNMGR;
final static HttpClient CLIENT;
    
{% highlight java %}
System.out.println(Request.Get(urlStr).connectTimeout(3000).socketTimeout(3000).execute().returnContent().asString());
{% endhighlight %}

## Unirest
这个库是对apache的封装
{% highlight java %}
System.out.println(Unirest.get(urlStr).connectTimeout(3000).socketTimeout(3000).asString().getBody());
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
{% endhighlight %}


## asynchttpclient
Dsl类创建出来的DefaultAsyncHttpClient是线程安全的
{% highlight java %}
Future<Response> responseFuture = Dsl.asyncHttpClient()
        .prepareGet(urlStr)
        .execute();
String res = responseFuture.get().getResponseBody();
{% endhighlight %}

## ApacheHttpAsyncClient
{% highlight java %}
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

//异步
Mono<String> mono = WebClient.create().method(HttpMethod.GET).uri(urlStr).retrieve().bodyToMono(String.class);
System.out.println(mono.block());
{% endhighlight %}
