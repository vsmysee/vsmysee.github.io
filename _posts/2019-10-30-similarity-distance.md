---
layout: article
title: 文本相似度和距离
---
最近在做文本比较相关的工作，接触到了如下一些算法，每一种算法都有它自身的优点和缺陷，没有一种算法能够完全满足业务的要求
所以我们所需要做的工作就是如何取舍


参考两个库

```
compile group: 'info.debatty', name: 'java-string-similarity', version: '1.2.1'
compile group: 'org.apache.commons', name: 'commons-text', version: '1.8'
```

这个领域的算法的分类:
- 基于词向量
- 基于具体字符
- 基于概率统计
- 基于词嵌入的



## 相似度

Cosine (余弦向量)

```
The similarity between the two strings is the cosine of the angle between
these two vectors representation. It is computed as V1 . V2 / (|V1| * |V2|)
The cosine distance is computed as 1 - cosine similarity.
```

{% highlight java %}

Cosine cos = new Cosine(3);

        // ABC BCE
        // 1  0
        // 1  1
        // angle = 45°
        // => similarity = .71
System.out.println(cos.similarity("ABC", "ABCE"));
        
{% endhighlight %}


JaroWinkler(基于字符)


```
The Jaro–Winkler distance metric is designed and best suited for short
strings such as person names, and to detect typos; it is (roughly) a
variation of Damerau-Levenshtein, where the substitution of 2 close
characters is considered less important then the substitution of 2 characters
that a far from each other.
Jaro-Winkler was developed in the area of record linkage (duplicate
detection) (Winkler, 1990). It returns a value in the interval [0.0, 1.0].
The distance is computed as 1 - Jaro-Winkler similarity.
```


Jaccard(基于集合)

```
Each input string is converted into a set of n-grams, the Jaccard index is
then computed as |V1 inter V2| / |V1 union V2|.
Like Q-Gram distance, the input strings are first converted into sets of
n-grams (sequences of n characters, also called k-shingles), but this time
the cardinality of each n-gram is not taken into account.
Distance is computed as 1 - cosine similarity.
```

{% highlight java %}

Jaccard j2 = new Jaccard(2);
        // AB BC CD DE DF
        // 1  1  1  1  0
        // 1  1  1  0  1
        // => 3 / 5 = 0.6
System.out.println(j2.similarity("ABCDE", "ABCDF"));

{% endhighlight %}


SorensenDice (Jaccard相似)

```
Similar to Jaccard index, but this time the similarity is computed as 2 * |V1
inter V2| / (|V1| + |V2|). Distance is computed as 1 - cosine similarity.
```

{% highlight java %}

SorensenDice sd = new SorensenDice(2);

        // AB BC CD DE DF FG
        // 1  1  1  1  0  0
        // 1  1  1  0  1  1
        // => 2 x 3 / (4 + 5) = 6/9 = 0.6666
System.out.println(sd.similarity("ABCDE", "ABCDFG"));

{% endhighlight %}


NormalizedLevenshtein(基于字符)

```
This distance is computed as levenshtein distance divided by the length of
the longest string. The resulting value is always in the interval [0.0 1.0]
but it is not a metric anymore! The similarity is computed as 1 - normalized
distance.
```

IntersectionSimilarity(基于集合)

```
Measures the intersection of two sets created from a pair of character sequences
```

SimpleHash

[谷歌使用的算法](http://www.lanceyan.com/tech/arch/simhash_hamming_distance_similarity.html)

将文本分词，然后压缩到一个01串上进行距离比较


## 距离


- Cosine
- JaroWinkler
- Jaccard
- SorensenDice
- NormalizedLevenshtein


Sift4

```
Sift4 - a general purpose string distance algorithm inspired by JaroWinkler
and Longest Common Subsequence.
```

MetricLCS

```
Distance metric based on Longest Common Subsequence, from the notes "An
LCS-based string metric" by Daniel Bakkelund.
```

Damerau(基于字符)

```
Implementation of Damerau-Levenshtein distance with transposition (also
sometimes calls unrestricted Damerau-Levenshtein distance).
It is the minimum number of operations needed to transform one string into
the other, where an operation is defined as an insertion, deletion, or
substitution of a single character, or a transposition of two adjacent
characters.
It does respect triangle inequality, and is thus a metric distance.

This is not to be confused with the optimal string alignment distance, which
is an extension where no substring can be edited more than once.
```



Levenshtein(基于字符)

```
The Levenshtein distance between two words is the minimum number of
single-character edits (insertions, deletions or substitutions) required to
change one string into the other.
```

LongestCommonSubsequence(基于字符)


```
The longest common subsequence (LCS) problem consists in finding the longest
subsequence common to two (or more) sequences. It differs from problems of
finding common substrings: unlike substrings, subsequences are not required
to occupy consecutive positions within the original sequences.
 
It is used by the diff utility, by Git for reconciling multiple changes, etc.
 *
The LCS distance between Strings X (length n) and Y (length m) is n + m - 2
|LCS(X, Y)| min = 0 max = n + m
 
LCS distance is equivalent to Levenshtein distance, when only insertion and
deletion is allowed (no substitution), or when the cost of the substitution
is the double of the cost of an insertion or deletion.
 
! This class currently implements the dynamic programming approach, which has
a space requirement O(m * n)!
```

NGram(基于统计)

```
N-Gram Similarity as defined by Kondrak, "N-Gram Similarity and Distance",
String Processing and Information Retrieval, Lecture Notes in Computer
Science Volume 3772, 2005, pp 115-126.
 
The algorithm uses affixing with special character '\n' to increase the
weight of first characters. The normalization is achieved by dividing the
total similarity score the original length of the longest word.
```

OptimalStringAlignment(字符串对齐)

```
Implementation of the the Optimal String Alignment (sometimes called the
restricted edit distance) variant of the Damerau-Levenshtein distance.

The difference between the two algorithms consists in that the Optimal String
Alignment algorithm computes the number of edit operations needed to make the
strings equal under the condition that no substring is edited more than once,
whereas Damerau-Levenshtein presents no such restriction.
```

QGram(基于统计)


```
Q-gram distance, as defined by Ukkonen in "Approximate string-matching with
q-grams and maximal matches". The distance between two strings is defined as
the L1 norm of the difference of their profiles (the number of occurences of
each n-gram): SUM( |V1_i - V2_i| ). Q-gram distance is a lower bound on
Levenshtein distance, but can be computed in O(m + n), where Levenshtein
requires O(m.n).
```

WeightedLevenshtein

```
Implementation of Levenshtein that allows to define different weights for
different character substitutions.
```

HammingDistance(相等长度字符串)

```
The hamming distance between two strings of equal length is the number of
positions at which the corresponding symbols are different.
```


## 其他
FuzzyScore

```
One point is given for every matched character. Subsequent matches yield two bonus points. A higher score
indicates a higher similarity.
```