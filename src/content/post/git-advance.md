---
title: "git 系列之进阶命令"
description: "一些在特殊情况时很强大的git用法，看看咯"
publishDate: 2019-01-08
tags:
  - git相关
  - 终端命令
---

上篇文章写了一些 git 的基本命令，在标准的工作流程中够用。可是工作中难免遇到一些棘手的问题，比如不小心将错误的代码推送到了远程仓库，想要回滚、开发了一半的代码，需要更新远程仓库到本地，而不改变本地修改等等。

下面介绍一些我在工作中用过的几个进阶命令，当初学习这些命令的时候觉得可真神奇！Let's begin！

#### 1. git reset

`git reset`命令用于回退版本以及撤销 add

- 在工作区做了修改，并使用`git add`放到了暂存区，可以通过`git reset`把暂存区的修改撤销掉，重新放回到工作区

  ```shell
  git reset HEAD 要撤销修改的文件名
  ```

  **`HEAD` 在 git 中是一个指针，指向最新的一次提交**

- 回退版本到上一次 commit 或指定的 commit

  ```shell
  # 回退到上一次commit
  $ git reset --hard HEAD^
  # HEAD^ 表示上一次
  # HEAD^^ 表示上上一次commit
  # 也可以指定数字
  # HEAD~100 表示前100次commit

  # 回退到指定commit上
  $ git reset -hard commit-id
  ```

#### 2. git stash

有这样一个场景，当我们在 dev1 分支上开发了一半，忽然接到任务说要在 dev2 分支上开发一个功能，而我们又不想丢弃 dev1 上的修改，这时我们可以通过`git stash`将 dev1 上的修改内容放在脏目录里，然后在 dev2 开发完后再回到 dev1 上，使用`git stash apply` 来还原之前 dev1 上的修改。

```shell
# 将当前工作区的修改放到脏目录里
$ git stash

# 做完其他事情后，再回到该开发分支还原之前的修改
$ git stash apply
```

#### 3. git cherry-pick

这个命令是我近期发现的，可以说是很强大了。

**`git cherry-pick`可以将任意分支指定的 commit 添加到当前分支上**

```shell
git cherry-pick commit-id
```

例如，我们在开发中，有时会有 2 个版本（新版本，老版本），现在要修复一个 bug，在新老版本同时存在，我们可以在老版本上修改完，在用相同的方式修改新版本，但是如果改动量又多又杂的话，会很麻烦，这时`git cherry-pick`命令就很有用，把修复 bug 的 commit 捡出来放到新版本里，基本有了这个命令，git 里的 commit 可以说是随便玩了~

#### 4. 关联分支

- 本地分支`branch_name`往远程分支（没有该分支）上推送并关联

  ```shell
  git push --set-upstream origin branch_name
  ```

- 远程分支`branch_name`拉到本地（没有该分支）并关联

  ```shell
  # 这一步之前可以先 `git fetch` 一下，将远程信息同步到本地
  $ git checkout --track origin/branch_name
  ```

- 本地和远程的分支都存在，要进行关联

  ```shell
  git branch --set-upstream-to=origin/xxx [本地分支，默认当前分支]
  ```

#### 5. git rebase

> rebase -- 译为变基，即改变基准，在 git 流里也就是更改不同分支 commit 的排列顺序

**使用 rebase 的作用：**

1. 使不同分支的合并提交信息变整齐： 在使用这个之前我们都是使用`git merge`去合并分支的，合并之后我们会发现有个 `merge`的提交，到时候看提交信息的话，比较冗余杂乱。使用了 rebase 相当于把另外一个分支移花接木到主分支的末尾处，当然提交 commit 也会相应改变，但是不会有 merge 的提交，看上去就比较清爽了~
2. 合并多个 commit，这个工作中用到较少，待用到做补充

**使用 rebase 的步骤**

```shell
# 比如上线前，当前分支需要rebase下master是否有冲突
$ git pull --rebase origin master

# 如果有冲突的话，先解冲突，然后 `git add .` 添加一下，然后使用下面命令继续rebase
$ git rebase --continue

# 如果碰到比如submodule的类似冲突问题，可以使用下面命令跳过
$ git rebase -skip
```

**注意：**

1. rebase 中途遇到问题，可以使用 `git rebase --abort`终止掉，重新开始
2. rebase 和 merge 不要混合使用，不然 commit 提交会混乱。。

#### 6. git bisect (查错)

> 参考[阮一峰老师博文](http://www.ruanyifeng.com/blog/2018/12/git-bisect.html)

原理使用二分法，来确定最初出错的提交记录。

首先确定二分法的起点(例如： 1)和终点(例如： 50)，此时当前代码为起点和终点的中间那次提交版本(26)，如果运行代码没有出错，则使用`git bisect good`来标识此次是正确提交，此时代码版本去到(32)，如果代码有问题，使用`git bisect bad`标识此次包含错误提交，此时代码版本去到(13)。依次类推..最后找到是哪个分支之后，去网站上查找此次提交哪里有问题，再使用`git bisect reset`回到最近一次提交，修复问题。

```shell
# 终点是最近一次的commit id
$ git bisect start [终点] [起点]

# 标识此次代码ok,继续二分查找
$ git bisect good

# 标识此次代码有问题,继续二分查找
$ git bisect bad

# 恢复提交
$ git bisect reset
```

目前工作中用到的就这么多，以后实践多了在记录其他，共勉！
