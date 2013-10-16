---
layout: article
title: 各种语言的的四则运算AST实现
---

四则运算表达式，比如 12 * （24 - 5 ) / (17 + 6) 会得到如下的一个语法树
![抽象语法树](/images/ast.jpg)

我们可以用字母代替部分数字，比如 a + b * 2，这个表达式给一个环境,比如a =1,b=2 就可以得到最终运算结果,我们省略对语法树的构建，而是直接用语言支持的结构写出来，比如在ruby中，我们可以通过[:add, [:variable, :a], [:multiply, [:number, 2], [:variable, :b]]]数组来表达a + b * 2，现在让我们来看看各种语言怎么执行这些表达式，这个程序包括了结构，运算，递归。

ruby的第一版本，通过符号匹配，然后运算
{% highlight ruby %}
def evaluate(env, exp)
  keyword, a, b = exp
  case keyword
  when :number;   a
  when :variable; env[a]
  when :add;      evaluate(env, a) + evaluate(env, b)
  when :multiply; evaluate(env, a) * evaluate(env, b)
  end
end
 
ExpressionTree = [:add, [:variable, :a], [:multiply, [:number, 2], [:variable, :b]]]
Env = { a: 3, b: 4, c: 5 }
 
puts evaluate(Env, ExpressionTree)
{% endhighlight %}

ruby的第二版本，通过lambda表达式自执行
{% highlight ruby %}
Number   = lambda { |env, num| num }
Variable = lambda { |env, var| env[var] }
Add      = lambda { |env, a, b| evaluate(env, a) + evaluate(env, b) }
Multiply = lambda { |env, a, b| evaluate(env, a) * evaluate(env, b) }
 
def evaluate(env, exp)
  op, *args = exp
  op.(env, *args)
end
 
ExpressionTree = [Add, [Variable, :a], [Multiply, [Number, 2], [Variable, :b]]]
Env = { a: 3, b: 4, c: 5 }
 
puts evaluate(Env, ExpressionTree)
{% endhighlight %}

ruby的第三版本，通过闭包，语法树不再是一个结构，而是一个闭包函数
{% highlight ruby %}
def Number(num)      ->(env){ num } end
def Variable(var)    ->(env){ env[var] } end
def Add(f1, f2)      ->(env){ f1.(env)+f2.(env) } end
def Multiply(f1, f2) ->(env){ f1.(env)*f2.(env) } end

ExpressionTree = Add(Variable(:a), Multiply(Number(2), Variable(:b)))
Env = { a: 3, b: 4, c: 5 }

puts ExpressionTree.(Env)
{% endhighlight %}


JS版本，和上面类似
{% highlight javascript %}
var Number = function(n) { return function(env) { return n }};
var Add = function(e1, e2) { return function(env) { return e1(env) + e2(env) }};
var Variable = function(s) { return function(env) { return env[s] }};
var Multiply = function(e1, e2) { return function(env) { return e1(env) * e2(env) }};
var env = {a: 3, b: 4};
var result = Add(Variable("a"), Multiply(Number(2), Variable("b")))(env);
{% endhighlight %}


lisp方言racket的实现，它可以直接解析表达式，但是要写成前缀表达式，这是lisp方言的S表达式写法
{% highlight racket %}
(define (evaluate env exp)
  (match exp
    [(? number? x)   x                                    ]
    [`(+ ,x ,y)      (+ (evaluate env x) (evaluate env y))]
    [`(* ,x ,y)      (* (evaluate env x) (evaluate env y))]
    [(? symbol? v)   (hash-ref env v)                     ]))

(define environment (hash 'a 3 'b 4 'c 5))
(define expression-tree '(+ a (* 2 b)))
(define result (evaluate environment expression-tree))
{% endhighlight %}


erlang语言虚拟机上的语言elixir，看看那个case
{% highlight elixir %}
defmodule Ast do

  def eval(tree, env) do
      case tree do
        {:number, n}    -> n
        {:add, l, r}    -> eval(l, env) + eval(r, env)
        {:mul, l, r}    -> eval(l, env) * eval(r, env)
        {:variable, id} -> Dict.get(env, id)
      end
  end

  def start do
    env = HashDict.new [a: 1, b: 2, c: 3]
    tree = {:add, {:variable, :a}, {:mul, {:number, 2}, {:variable, :b}}}
    IO.puts  Ast.eval(tree, env)
  end

end

Ast.start
{% endhighlight %}

Scala的实现，也请注意那个case和match
{% highlight scala %}
abstract class Expression
 
case class Number(i: Int) extends Expression
case class Add(x: Expression, y: Expression) extends Expression
case class Multiply(x: Expression, y: Expression) extends Expression
case class Variable(id: Symbol) extends Expression
 
object Maths extends App {
  val environment = Map('a -> 1,
      'b -> 2,
      'c -> 3)
      
  def evaluate(env: Map[Symbol, Int], exp: Expression): Int = exp match {
    case Number(n: Int) => n    
    case Add(x, y) => evaluate(env, x) + evaluate(env, y)
    case Multiply(x, y) => evaluate(env, x) * evaluate(env, y)
    case Variable(id: Symbol) => env(id)
  }
      
  val expressionTree1 = Add(Variable('a), Multiply(Number(2), Variable('b)))
  
  println(evaluate(environment, expressionTree1))
}
{% endhighlight %}

[参考资源](https://gist.github.com/ckirkendall/2934374/) 
