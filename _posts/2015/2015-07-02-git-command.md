---
layout: article
title: git命令集
---

![](/images/git-arch.jpg)


名词解释

```
HEAD始终指向当前分支的最新的提交点
workspace：工作空间
index：暂存区
repository ： 本地仓库
remote :远程仓库
```

版本列表

```
1.8
1.9
2.0
2.1
2.2
2.3
2.4
2.5
2.6
2.7
2.8
2.9
```

git的高效主要是HEAD的设计，很多操作只移动这个指针。

一个新建文件状态为Untracked，需要通过git add加入index，加入之后想反悔git reset HEAD file 或者git restore --staged file

git commit -m "msg"会把index里的修改提交到版本库，如果提交之后想反悔message部分，可以git commit --amend，或者it commit --amend -m "Fixes bug #42"，如果想反悔提交则git reset --hard SHA

git reset -hard "HEAD^"是直接将最新一次提交删除

如果是修改了一个文件想反悔git checkout fileName，如果已经add了就要先git reset HEAD file 

--hard反悔提交会把暂存区的所有更改都丢弃，但工作区里的修改会保留，如果--hard的反悔你反悔了，可以通过git reflog再reset回来。



## 配置

git config --list

git config --global user.name "Your Name"

git config --global user.email "email@example.com"

git config -e


## 仓库

git status

git init

git clone [url]

git remote -v

git remote add [name] [url]

git remote rm [name]

git remote rename [name] [newname]

git remote set-url origin ssh://git@github.com/[username]/[repository-name].git


git pull [remoteName] [localBranchName]

git push [remoteName] [localBranchName]


git fetch



## 分支

git branch

git branch -r

git branch -a

git branch [branch-name]

git checkout -b [branch]

git branch [branch] [commit]

git checkout [branch-name]

git checkout -b [branch name] origin/[branch name]

git branch -m [old branch name] [new branch name]

git branch -d [branch-name]

git branch -D <branch name> //强制删除

git checkout -

git merge [name]

git push origin --delete [branch-name]

git push origin :[name]

git push origin --delete [branch name]


## 标签

git tag

git tag -r

git tag [tag]

git tag [tag] [commit]

git tag -d [tag]

git show [tag]

git push [remote] [tag]

git push [remote] --tags

git checkout -b [branch] [tag]


## 提交

git add [file]

git add docs/*.txt

git add .

git add -A

git rm

git rm --cached <file>

git commit -m [message]  // 需要先add

git commit [file1] [file2] ... -m [message]

git commit -a -m // 合并了add

git commit --amend -m [message]


## 日志

git log

git log --summary

git log --oneline

git log –follow [file]  

git log -5 --pretty --oneline

git diff [source branch] [target branch]

git diff HEAD

git diff --cached  



## 撤销


get reset [file]

git reset HEAD [file]

git reset [commit]

git reset --hard HEAD

git reset –-soft HEAD^

git reset –-hard HEAD^



git checkout [file]

git checkout [commit] [file]

git checkout .




git stash

git stash pop

git stash list

git stash clear


//git revert是用一次新的commit来回滚之前的commit

get revert HEAD 

git rebase -i HEAD~2



// 也算一种撤销

git commit --amend -m [message]


## 其他

ssh-keygen -t rsa -C "youremail@example.com"

git cherry-pick

git clean

git archive

git gc

git fsck

git prune



![](/images/git-cheat.png)
