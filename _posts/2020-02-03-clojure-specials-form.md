---
layout: article
title: Clojure specials
---

```
(print (keys (. clojure.lang.Compiler specials)))
```


```
(& monitor-exit case* try reify* 
finally loop* do letfn* if clojure.core/import* 
new deftype* let* fn* recur set! . var 
quote catch throw monitor-enter def)
```

