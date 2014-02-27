---
layout: article
title: Shell 编程
---

操作系统都提供了通过各种命令访问系统功能的方法，linux的命令尤为众多和强大，我们会经常遇到一些任务需要组合大量的命令，这就需要一种组织这些命令的软件来完成，在window系统中我们可以编写批处理程序，而在linux中，完成这件事的就是编
写shell脚本，解析shell脚本的有各种shell程序，在命令终端可以用$SHELL查看当前使用的何种sheel。


###Shell的分类
最基本的shell是Bourne Shell和Bourne Again Shell，前者对应/bin/sh，后者对应/bin/bash，前者先出生，不过我们现在已不做区分，bash shell是最快和轻便的shell所以最常用，后来出现了C shell，常用在交互模式下，而bash常用于系统
管理，再后来出现了K shell，这中shell是bash的超集，它兼容bash程序，相比C shell又q更加先进，本文主要学习的是bash。

###基本概念
shell是图灵完备的，它就是一种编程语言，同时它的主要工作就是组合系统的命令完成一个任务，所以必然也是命令式的，它有变量，有赋值，有分支，有循环,它是弱类型的。要编写一个shell程序，直接用vi建立一个文本文件，比如test.sh，程序第
一行必须写入#!/bin/bash或者#!/bin/sh，然后给这个文件加上执行权限chmod +x test.sh就可以执行了。我们学习任何一种语言，首先就是在终端打印一个hello world，比如java的System.out.print，ruby的puts，而shell就是echo，它其实
就是系统的一个命令，负责打印文字到终端。语句是不需要分号的，注释采用#开始的文字

###普通变量
变量是一个字符串，我们分配一个值。分配的值可以是一个数字，文本，文件名，设备，或任何其他类型的数据。
变量是没有超过实际数据的指针。 shell可以创建，分配和删除变量。
shell的变量没有var和类型声明，直接写一个标识符就可以了，标识符必须是以字母或者下划线开始，如果要取出某个变量的值，在前面加上$符号，类似velocity等模板引擎，如果$取值产生二义型就用${}选择边界，于是我们得到了第一个程序：
{% highlight bash %}
#!/bin/bash
echo $SHELL
a="hello"
readonly a
a="hello world" #符号两边不能有空格
b=1
echo $a
echo $b+1
echo "print" $a
echo "print $a"
echo "print ${a}"
unset a
echo $a
{% endhighlight %}

上面的程序我们发现变量出现了作用域，变量可以设置为只读，变量可以被注销。shell的变量赋值默认都是字符串赋值,所以上述程序会输出1+1,而不是输出2，对于求值我们用expr，或者$((...))语法对括号内的表达式求值:
{% highlight bash %}
echo 2+3 #2+3
echo `expr 2+3` #5
echo $((2+3)) #5
{% endhighlight %}

###特殊变量
shell中的变量有一部分是环境中的，我们需要用特殊的语法把它提取出来，对于已定义的比如$SHELL就用$取出就可以了，但是一般执行shell的时候需要提供一些参数，我们需要用$1,$2的语法来按位置取出这些参数，注意是从1开始，$0表示的当前执行shell的文件名，
另外的就比较特殊，需要强制记住，$$表示当前shell的进程号，$#表示参数的个数，$*和$@会把参数转为列表结构,前者是("$1 $2")，后者是("$1""$2")，$?表示上一个命令的返回状态,$!表示一个后台命令的进程数。

###控制结构
程序不可能就是单条语句这样写下去，我们需要引入分支和循环结构，在shell中分支有if和case，循环有for,while,do while,select,循环支持break,continue。
if和else,elif,fi形成边界，循环用do和done来表达边界,case用in和esac来表达边界，循环和if都涉及到条件判断，linux中有一个test命令专门来完成这个事，比如test -b test.sh测试文件是否是块设备，如果为真返回0，为假返回1，test的别名是方括号，所以刚才这个测试的简写就是[ -b test.sh ]，注意方括号中的空格。test命令有相当多的使用方法。
有了真假判断我们就可以来写各种控制结构程序了

if else fi:
{% highlight bash %}
#!/bin/bash
if test -b test.sh; then #使用测试命令
   echo "test.sh is block device"
else
   echo "test.sh is not block device"
fi

if [ ${SHELL} = "/bin/bash" ]; then #使用方括号
   echo "your login shell is the bash (bourne again shell)"
else
   echo "your login shell is not bash but ${SHELL}"
fi

if [ -z "$JDK" -a -x "$READLINK" ]; then #-a表示and
{% endhighlight %}

while do done: 如果参数个数大于0就打印参数列表，shift使得参数列表向左移动
{% highlight bash %}
while [ "$#" -gt 0 ]; do #如果do放在这里前面要有分号
        echo $*
        shift
done

while [ "$#" -gt 0 ]
do
    echo $*
    shift
done

n=1
while [ $n -le 6 ]; do
	echo $n
	let n++ #注意要用let来运算，不能n++和$n++
done
{% endhighlight %}

for do done:
{% highlight bash %}
#!/bin/bash
for var in A B C ; do
   echo "var is $var"
done

for ((  i = 0 ;  i <= 5;  i++  )) #多条语句的写法
{% endhighlight %}

select表达式是bash的一种扩展应用，擅长于交互式场合。用户可以从一组不同的值中进行选择：
{% highlight bash %}
#!/bin/bash
echo "What is your favourite OS?"
select var in "Linux" "Gnu Hurd" "Free BSD" "Other"; do
  break;
done
echo "You have selected $var"
{% endhighlight %}

case表达式可以用来匹配一个给定的字符串，而不是数字，下面是一个根据文件类型解压文件的脚本
{% highlight bash %}
 #!/bin/bash
 ftype="$(file "$1")"
 case "$ftype" in
 "$1: Zip archive"*)
    unzip "$1" ;; ##注意是两个分号
 "$1: gzip compressed"*)
    gunzip "$1" ;;
 "$1: bzip2 compressed"*)
    bunzip2 "$1" ;;
 *) echo "File $1 can not be uncompressed";;
 esac
{% endhighlight %}

###函数
有了控制结构，我们可以开始编写模块化代码了，这个时候就必须使用函数了，函数的行为终于和js差不多一样了，但是没有关键字:
{% highlight bash %}
#!/bin/bash
help()
{
   echo "help"
}
help #这就是调用函数
{% endhighlight %}

###测试命令
循环和分支都要用到测试，现在我们已经知道了控制结构的语法，那么测试条件的写法则有很多。
测试文件就下面这些,注意测试都要写一个横线:
{% highlight bash %}
-b file 如果文件为一个块特殊文件，则为真
-c file 如果文件为一个字符特殊文件，则为真
-d file 如果文件为一个目录，则为真
-e file 如果文件存在，则为真
-f file 如果文件为一个普通文件，则为真
-g file 如果设置了文件的 SGID 位，则为真
-G file 如果文件存在且归该组所有，则为真
-k file 如果设置了文件的粘着位，则为真
-O file 如果文件存在并且归该用户所有，则为真
-p file 如果文件为一个命名管道，则为真
-r file 如果文件可读，则为真
-s file 如果文件的长度不为零，则为真
-S file 如果文件为一个套接字特殊文件，则为真
-t fd 如果 fd 是一个与终端相连的打开的文件描述符（fd 默认为 1），则为真
-u file 如果设置了文件的 SUID 位，则为真
-w file 如果文件可写，则为真
-x file 如果文件可执行，则为真
{% endhighlight %}

比较测试有：
{% highlight bash %}
num1 –eq  num2                  如果num1等于 num2，测试结果为0
num1 –ge num2                   如果num1大于或等于 num2，测试结果为0
num1 –gt num2                   如果num1大于 num2，测试结果为0
num1 –le num2                   如果num1小于或等于 num2，测试结果为0
num1 –lt  num2                  如果num1小于 num2，测试结果为0
num1 –ne num2                   如果num1不等于 num2，测试结果为0
{% endhighlight %}

例子：
num1=13
[ “$num1” –eq 13 ]     测试num1是否等于13

字符串测试：
{% highlight bash %}
-n string                                 测试字符串string是否不为空
-z string                                 测试字符串string是否为空
string1=string2                           测试字符串string1是否与字符串string2相同
string1!=string2                          测试字符串string1是否与字符串string2不相同
string1                                   is NOT NULL or not defined
{% endhighlight %}


逻辑运算：
{% highlight bash %}
!expression                  如果expression为假，则测试结果为真
expression1 –a expression2   如果expression1和expression2同时为真，则测试结果为真
expression1 –o expression2   如果expression1和expression2有一个为真，则测试结果为真

{% endhighlight %}

其中expression为表达式，该表达式描述了一个测试条件。在逻辑运算符表达式中并不是所有的运算符都会被执行。
例：expr1 –a expr2 –a expr3
只有当expr1为真时，才会测试expr2，依次。逻辑或运算符类似。
例：[ -e file_exam –a –x file_exam ]
   [ “$integer1” –lt 20 –o “integer1” –gt 30 ]
注：当逻辑非运算符和表达式之间要有空格。

当然还支持&&和||操作符
{% highlight bash %}
#!/bin/bash
[ -f "/etc/shadow" ] && echo "This computer uses shadow passwords"
mailfolder=/var/spool/mail/james
[ -r "$mailfolder" ] || { echo "Can not read $mailfolder" ; exit 1; } #多行语句要用分号了
{% endhighlight %}


###特殊符号
在向程序传递任何参数之前，程序会扩展通配符和变量。这里所谓的扩展是指程序会把通配符（比如*）替换成适当的文件名，把变量替换成变量值
引号（单引号和双引号）可以防止通配符*的扩展：
{% highlight bash %}
#!/bin/bash
echo "*.jpg" #引号防止通配扩展
echo '*.jpg'

echo $SHELL
echo "$SHELL"
echo '$SHELL' #单引号更严格一些，它可以防止任何变量扩展

echo \*.jpg
echo \$SHELL #也可以用转义
{% endhighlight %}

当我们要在终端打印多条文本一般采用echo不断输出，其实可以用here document
{% highlight bash %}
#!/bin/bash
cat << HELP
one line
two line
HELP
{% endhighlight %}

反引号用于执行命令，`command`与$(command)的含义相同，都是返回当前执行命令的结果
{% highlight bash %}
#!/bin/sh
for file in $(ls f*.sh);do
    lpr $file
done
{% endhighlight %}

数组：
{% highlight bash %}
#!/bin/bash
a=(1 2 3)
echo $a
echo ${a[0]}
echo ${a[*]} #所有元素
echo ${#a[@]} #数组长度
{% endhighlight %}

###实例1，启动tomcat，杀死进程
{% highlight bash %}
#!/bin/bash
DEV_PROJECT_HOME="/home/asion/kariqu"
APPSERVER_HOME="/home/asion/appserver"
PROJECT_HOME="/home/asion"
##1.kill tomcat pid
appName=$1
#input var is null
if [ -n "$appName" ]; then
   echo "stop appServer $appName"
   #get app pid
   pid=`ps aux  |grep ${appName} |awk '{print $2 " " $11}' |grep java |awk '{print $1}'`
   if [ "$pid" != "" ]; then
      echo "kill pid $pid"
      kill -9 $pid
   else
      echo -e "appServer $appName is not yet start !"
   fi
else
  echo "please input appServer name !"
  exit
fi


###4.start tomcat
echo "starting tomcat ..."
$APPSERVER_HOME/${appName}/bin/startup.sh
sleep 3

###5. check tomcat service
newpid=`ps aux |grep ${appName} |grep -v "grep" | awk '{print $2}'`
if [ -n "$newpid" ]; then
    echo -e "${appName} tomcat service  success !"
else
    echo "start ${appName} tomcat service failed !"
fi

{% endhighlight %}


###实例2，批量签出代码
{% highlight bash %}
#!/bin/bash
for i in $(<project.txt)
do
    if [ -d "$i" ]; then
        svn update $i
    else
        mkdir $i
        svn checkout svn://172.16.0.88/kariqu/$i/trunk/$i $i
    fi
done
{% endhighlight %}
