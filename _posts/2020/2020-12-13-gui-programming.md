---
layout: article
title: GUI编程的进化
---


[原文](https://ewind.us/2019/gui-and-ui/)


```
过程化绘制时代 - 直接调用 drawLine / drawRect 风格的 API 来绘制像素。在我的树莓派里，只要 include X11 的头文件，就能用 C 语言体验这种硬派的 GUI 开发了。HTML5 中的 Canvas，其实也属于这种风格。

面向对象抽象时代 - 纯粹过程化的代码，并不利于维护事件驱动的业务逻辑。比如，你需要自行计算来判断出某次点击应该选中哪个 UI 元素。在 MFC 和 GTK 的时代，人们实现了面向对象风格的 UI 框架。按钮、输入框等 UI 控件具备了实例方法，能更好地组织代码。

界面与样式分离时代 - 用 C++ 系语言的代码来描述 UI，很容易写出面条式的丑陋代码。因此人们又引入了 XML 风格的语言，专门来表达嵌套式的界面。DirectUI 和 HTML / CSS / JS 基础上的经典 Web，都是这个时代的产物。

MVC 与 MVVM 时代 - 如何维护日益复杂的 UI 交互逻辑？许多框架引入了软件工程中的 MVC 和 MVVM 等设计模式。这个时代的代表产物有苹果的 Cocoa 和微软的 WPF，以及 Web 上的 Angular 1 框架。

声明式组件化时代 - 为什么我们必须编写连接 UI 布局语言和业务逻辑的面条代码呢？Facebook 的 React 提出了新的 UI 开发思路。通过 JSX，很容易用 JS 来编写嵌套的、声明式的、更易维护的 UI 组件，并借助 JavaScript 的动态性来实时调试 UI。当前风口上的 Vue，Flutter 和 SwiftUI，都明显地借鉴了这种思想。
```