---
layout: article
title: Asp.Net的Web开发
---
曾经一段时间，我主要的工作是将一个用C#写的web系统翻译到SpringMVC,在翻译的过程中，我发现微软其实在Web开发上的很多方案是值得学习的，有时候我明显的感觉到用SpringMVC所实现
的代码比较明显的啰嗦，本文记录下ASP.NET的一些细节.

## 布局
{% highlight groovy %}

Layout.cshtml:

//留一个洞，用来渲染样式或者脚本
@RenderSection("HeaderCSS", false)

@{
    Layout = "~/Views/Shared/_Layout.cshtml";
}

@section HeaderCSS {
    <style>
    </style>
}
{% endhighlight %}


## 视图对象
{% highlight C# %}

public class BindEmailViewModel
{
        [Display(Name = "邮箱地址")]
        [Required]
        [EmailAddress(ErrorMessage="请您填写有效的邮箱地址。")]
        public string Email { get; set; } 

 }
{% endhighlight %}

## 控制器

//构造器注入，略显臃肿
{% highlight C# %}
public CouponController(IUserService userService,
            ICouponService couponService,
            IManualTransferService manualTransferService,
            IManualTransferPayService manualTransferPayActivityService,
            IInvestmentService investmentService)
{
            this.userService = userService;
            this.couponService = couponService;
            this.manualTransferService = manualTransferService;
            this.manualTransferPayActivityService = manualTransferPayActivityService;
            this.investmentService = investmentService;
}
{% endhighlight %}

//Java中的FLash Scope，在SpringMVC中叫RedirectAttribute

{% highlight C# %}

public string Info
        {
            get
            {
                return TempData["Message"] as string;
            }
            set
            {
                TempData["Message"] = value;
            }
        }
{% endhighlight %}

下面这段代码，我在SpringMVC中根本翻译不过来

{% highlight C# %}

public ActionResult Index(int? id, int? md){

      if (id.HasValue && md.HasValue){
            User user=userService.GetUser(id.Value);
            return View("Hello");
      }
      return new RedirectResult(AppConfig.BASE_URL);
}
{% endhighlight %}


## DB操作
{% highlight C# %}

using (MySqlConnection conn = new MySqlConnection(DBConfig.ConnectionString))
{
    using (MySqlCommand cmd = conn.CreateCommand())
    {
        cmd.Connection = conn;
        cmd.CommandTimeout = DBConfig.TimeOutSeconds;

        cmd.CommandText = GET_DOCUMENTS;
        cmd.Parameters.AddWithValue(@"EntityID", entityID);
        conn.Open();
        MySqlDataReader reader = cmd.ExecuteReader();
        while (reader.Read())
        {
            evidences.Add(BuildDocument(reader));
        }
    }
}

//事务处理，相比Spring，这种写法比较丑陋
using (MySqlConnection conn = new MySqlConnection(DBConfig.ConnectionString))
{
    conn.Open();
    MySqlTransaction tran = conn.BeginTransaction();
    try
    {
        MySqlBindParametersHelper.ExecuteNonQuery(conn, tran, DELETE_NODES, DBConfig.TimeOutSeconds, tree.TreeID, tree.Node, BindNode);
        SaveNode(tree.Node, tree.TreeID, conn, tran);
        tran.Commit();
    }
    catch
    {
        tran.Rollback();
        throw;
    }
} 
            
 {% endhighlight %}

## IOC

{% highlight C# %}
public static void AddBindings(IKernel kernel)
{
            kernel.Bind<ISequenceRepository>().To<SequenceRepository>().InSingletonScope();
            kernel.Bind<ISequenceService>().To<SequenceService>().InSingletonScope();
            kernel.Bind<ITreeService>().To<TreeService>().InSingletonScope();
}
            
{% endhighlight %}
