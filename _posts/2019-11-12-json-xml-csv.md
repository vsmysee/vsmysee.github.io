---
layout: article
title:  Json,Xml,CSV
---
即便我们对这三个东西再熟悉不过了，但是也有很多的细节，这篇文章来自DDIA这本书

![](https://img10.360buyimg.com/n1/jfs/t10093/227/457902180/336713/42869596/59cf5461Ne65b8269.jpg)

Moving to standardized encodings that can be written and read by many programming languages, JSON and XML are the obvious contenders. 
They are widely known, widely supported, and almost as widely disliked. XML is often criticized for being too verbose and unnecessarily complicated [9]. 
JSON’s popularity is mainly due to its built-in support in web browsers (by virtue of being a subset of JavaScript) and simplicity relative to XML. 
CSV is another popular language-independent format, albeit less powerful.

谈到可以被许多编程语言编写和读取的标准化编码，JSON和XML是显眼的竞争者。它们广为人知，广受支持，也“广受憎恶”。 XML经常被批评为过于冗长和不必要的复杂【9】。
JSON倍受欢迎，主要由于它在Web浏览器中的内置支持（通过成为JavaScript的一个子集）以及相对于XML的简单性。 CSV是另一种流行的与语言无关的格式，尽管功能较弱。

JSON, XML, and CSV are textual formats, and thus somewhat human-readable (although the syntax is a popular topic of debate). 
Besides the superficial syntactic issues, they also have some subtle problems:

JSON，XML和CSV是文本格式，因此具有人类可读性（尽管语法是一个热门辩题）。除了表面的语法问题之外，它们也有一些微妙的问题：



- There is a lot of ambiguity around the encoding of numbers. In XML and CSV, you cannot distinguish between a number and a string that happens to consist of digits (except by referring to an external schema). 
  JSON distinguishes strings and numbers, but it doesn’t distinguish integers and floating-point numbers, and it doesn’t specify a precision.
  
- 数字的编码多有歧义之处。XML和CSV不能区分数字和字符串（除非引用外部模式）。 JSON虽然区分字符串和数字，但不区分整数和浮点数，而且不能指定精度。


- This is a problem when dealing with large numbers; for example, integers greater than 253 cannot be exactly represented in an IEEE 754 double-precision floating-point number, so such numbers become inaccurate when parsed in a language that uses floating-point numbers (such as JavaScript). 
  An example of numbers larger than 253 occurs on Twitter, which uses a 64-bit number to identify each tweet. The JSON returned by Twitter’s API includes tweet IDs twice, once as a JSON number and once as a decimal string, to work around the fact that the numbers are not correctly parsed by JavaScript applications [10].

- 当处理大量数据时，这个问题更严重了。例如，大于$2^{53}$的整数不能在IEEE 754双精度浮点数中精确表示，因此在使用浮点数（例如JavaScript）的语言进行分析时，这些数字会变得不准确。 Twitter上有一个大于$2^{53}$的数字的例子，它使用一个64位的数字来标识每条推文。 Twitter API返回的JSON包含了两种推特ID，一个JSON数字，另一个是十进制字符串，以此避免JavaScript程序无法正确解析数字的问题【10】。  


- JSON and XML have good support for Unicode character strings (i.e., human-readable text), but they don’t support binary strings (sequences of bytes without a character encoding). 
  Binary strings are a useful feature, so people get around this limitation by encoding the binary data as text using Base64. 

  The schema is then used to indicate that the value should be interpreted as Base64-encoded. This works, but it’s somewhat hacky and increases the data size by 33%.
  There is optional schema support for both XML [11] and JSON [12]. These schema languages are quite powerful, and thus quite complicated to learn and implement. 
  Use of XML schemas is fairly widespread, but many JSON-based tools don’t bother using schemas. 
  Since the correct interpretation of data (such as numbers and binary strings) depends on information in the schema, applications that don’t use XML/JSON schemas need to potentially hardcode the appropriate encoding/decoding logic instead.
  
- JSON和XML对Unicode字符串（即人类可读的文本）有很好的支持，但是它们不支持二进制数据（不带字符编码(character encoding)的字节序列）。
  二进制串是很实用的功能，所以人们通过使用Base64将二进制数据编码为文本来绕开这个限制。
  
  模式然后用于表示该值应该被解释为Base64编码。这个工作，但它有点hacky，并增加了33％的数据大小。 
  XML 【11】和JSON 【12】都有可选的模式支持。这些模式语言相当强大，所以学习和实现起来相当复杂。 
  XML模式的使用相当普遍，但许多基于JSON的工具嫌麻烦才不会使用模式。由于数据的正确解释（例如数字和二进制字符串）取决于模式中的信息，因此不使用XML/JSON模式的应用程序可能需要对相应的编码/解码逻辑进行硬编码。


- CSV does not have any schema, so it is up to the application to define the meaning of each row and column. If an application change adds
  a new row or column, you have to handle that change manually. CSV is also a quite vague format (what happens if a value contains a comma or a newline character?). 
  Although its escaping rules have been formally specified [13], not all parsers implement them correctly.
  
- CSV没有任何模式，因此应用程序需要定义每行和每列的含义。如果应用程序更改添加新的行或列，则必须手动处理该变更。
  CSV也是一个相当模糊的格式（如果一个值包含逗号或换行符，会发生什么？）。尽管其转义规则已经被正式指定【13】，但并不是所有的解析器都正确的实现了标准。  
  
Despite these flaws, JSON, XML, and CSV are good enough for many purposes. It’s likely that they will remain popular, especially as data interchange formats (i.e., for sending data from one organization to another). In these situations, as long as people agree on what the format is, it often doesn’t matter how pretty or efficient the format is. 
The difficulty of getting different organizations to agree on anything outweighs most other concerns.


尽管存在这些缺陷，但JSON，XML和CSV已经足够用于很多目的。特别是作为数据交换格式（即将数据从一个组织发送到另一个组织），它们很可能仍然很受欢迎。这种情况下，只要人们对格式是什么意见一致，格式多么美观或者高效就没有关系。让不同的组织达成一致的难度超过了其他大多数问题。