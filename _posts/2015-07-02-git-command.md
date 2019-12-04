---
layout: article
title: git命令集
---

![](/images/git-arch.jpg)


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

git commit -m [message]

git commit [file1] [file2] ... -m [message]

git commit -a

git commit --amend -m [message]


## 日志

git log

git log --summary

git log --oneline

git log –follow [file]  

git log -5 --pretty --oneline

git diff [source branch] [target branch]

git diff HEAD




## 撤销

git checkout [file]

git checkout [commit] [file]

git checkout .

git stash

git stash pop

git stash list

git stash clear

get reset [file]

git rest [commit]

git reset –soft HEAD^

git reset –hard HEAD^


## 其他

ssh-keygen -t rsa -C "youremail@example.com"

get rebase

get revert 

git cherry-pick

git clean

git archive

git gc

git fsck

git prune


