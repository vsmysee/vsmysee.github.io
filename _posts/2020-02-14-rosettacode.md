---
layout: article
title: 罗塞塔代码
---


Rosetta Code is a programming chrestomathy site. The idea is to present solutions to the same task in as many different languages as possible, to demonstrate how languages are similar and different, and to aid a person with a grounding in one approach to a problem in learning another. 

Rosetta Code currently has 1,006 tasks, 225 draft tasks, and is aware of 764 languages, though we do not (and cannot) have solutions to every task in every language.


[网站](http://rosettacode.org/wiki/Rosetta_Code)


一个使用不同编程语言来实现各种Task的网站，我们可以看到对于同一种问题，使用不同编程语言所表现出的各种解决方式.



比如快排算法的各种技法:


```
let rec qsort = function
    hd :: tl ->
        let less, greater = List.partition ((>=) hd) tl
        List.concat [qsort less; [hd]; qsort greater]
    | _ -> []
```



```
qsort [] = []
qsort (x:xs) = qsort [y | y <- xs, y < x] ++ [x] ++ qsort [y | y <- xs, y >= x]
```



```
func quicksort (a) {
    a.len < 2 && return(a);
    var p = a.pop_rand;          # to avoid the worst cases
    __FUNC__(a.grep{ .< p}) + [p] + __FUNC__(a.grep{ .>= p});
}
```

```
(define (quicksort l gt?)
  (if (null? l)
      '()
      (append (quicksort (filter (lambda (x) (gt? (car l) x)) (cdr l)) gt?)
              (list (car l))
              (quicksort (filter (lambda (x) (not (gt? (car l) x))) (cdr l)) gt?))))
 
```

```
 def sort(xs: List[Int]): List[Int] = xs match {
    case Nil => Nil
    case head :: tail =>
      val (less, notLess) = tail.partition(_ < head) // Arbitrarily partition list in two
      sort(less) ++ (head :: sort(notLess))          // Sort each half
  }
```

```
class Array
  def quick_sort
    h, *t = self
    h ? t.partition { |e| e < h }.inject { |l, r| l.quick_sort + [h] + r.quick_sort } : []
  end
end
```


```
let rec quicksort gt = function
  | [] -> []
  | x::xs ->
      let ys, zs = List.partition (gt x) xs in
      (quicksort gt ys) @ (x :: (quicksort gt zs))
```


```
quicksort is fork [ >= [1 first,tally],
  pass,
  link [
      quicksort sublist [ < [pass, first], pass ],
      sublist [ match [pass,first],pass ],
      quicksort sublist [ > [pass,first], pass ]
  ]
]
```


