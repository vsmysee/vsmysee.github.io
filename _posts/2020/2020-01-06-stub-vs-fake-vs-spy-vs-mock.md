---
layout: article
title:  stub fake spy mock区别
---

![](https://aws1.discourse-cdn.com/standard10/uploads/ministryoftesting/original/2X/9/9a0fc261409b85a3492265ba4d84c3571703b5e5.png)


Stub

* 轻量和静态
* 返回预定义的值
* 不控制行为
* 通常用来模拟数据库

```
public class StubUserStore : IUserStore  
{  
    public string GetUserRole(string username)  
    {  
        return "contributor";  
    }  
  
    public List<UserDetail> GetAllUsers()  
    {  
        return new List<UserDetail>()  
        {  
            new UserDetail{ Role = "administrator", Name = "admin"},  
            new UserDetail(){ Role = "contributor", Name = "User 1"}  
        };  
    }      
}  
public interface IUserStore  
{  
    string GetUserRole(string username);  
}  
  
public class UserDetail  
{  
    public string Name { get; set; }  
    public string Role { get; set; }  
}  
```

Fake

* 可以根据输入改变行为

```
public class FakeUserStore : IUserStore  
{  
    public string GetUserRole(string username)  
    {  
        if (username == "admin")  
            return "administrator";  
        else  
        return "contributor";  
    }      
}   
public interface IUserStore  
{  
    string GetUserRole(string username);  
}  
```

Spy

Fake的高级版本，具备状态存储

```
public class SpyUserStore : IUserStore  
{  
    private static int Counter { get; set; }  
  
    public SpyUserStore()  
    {  
        Counter = 0;  
    }  
  
    public string GetUserRole(string username)  
    {  
  
        if (Counter >= 1)  
            throw new Exception("Function called more than once");  
  
Counter++;  
       
    if (username == "admin")  
            return "administrator";  
        else  
            return "contributor";     
     }  
}   
```

Mock

* 功能最强大
* 行为动态控制
* 可以使用各种断言

```
mockedUserStore=new Mock<IUserStore>();  
mockedUserStore.Setup(func => func.GetUserRole("admin")).Returns("administrator");  
mockedUserStore.Setup(func => func.GetUserRole("user1")).Returns("contributor");  
mockedUserStore.Setup(func => func.GetUserRole("user2")).Returns("basic");  
```

[原文](https://www.c-sharpcorner.com/article/stub-vs-fake-vs-spy-vs-mock/)