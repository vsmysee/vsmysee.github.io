---
layout: article
title: 在线logo
---

[地址](https://www.calormen.com/jslogo/#)

## 画树叶

```
to fern :size :sign
  if :size < 1 [ stop ]
  fd :size
  rt 70 * :sign fern :size * 0.5 :sign * -1 lt 70 * :sign
  fd :size
  lt 70 * :sign fern :size * 0.5 :sign rt 70 * :sign
  rt 7 * :sign fern :size - 1 :sign lt 7 * :sign
  bk :size * 2
end
window clearscreen pu bk 150 pd
fern 25 1

```


![](/images/logo-leaf.jpg)


## 画树

```
to tree :size
   if :size < 5 [forward :size back :size stop]
   forward :size/3
   left 30 tree :size*2/3 right 30
   forward :size/6
   right 25 tree :size/2 left 25
   forward :size/3
   right 25 tree :size/2 left 25
   forward :size/6
   back :size
end
clearscreen
tree 150
```


![](/images/logo-tree.jpg)



