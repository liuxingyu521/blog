---
title: "git 系列之基础命令"
description: "介绍一些基本的git命令，方便工作中使用"
publishDate: 2018-03-27
tags:
  - git相关
  - 终端命令
---

### 前言

**git** 是一款流行的版本控制工具，非常适用于团队多人合作完成一些重大的项目。关于 git 的入门可以参考[廖雪峰老师的 git 教程](https://www.liaoxuefeng.com/wiki/0013739516305929606dd18361248578c67b8067c8c017b000)，我当时也是从那里初学。

本文介绍一些我在工作中常用&实用的 git 命令，一边学习，一边记录。

先理一下平时使用 git 时的流程，如下图所示：

![git使用流程图](https://cdn.jsdelivr.net/gh/liuxingyu521/pictureBed@picture/blog/git-process.png)

### 正文

#### 1. git clone

`git clone`很多时候是我们用的第一个命令，用于将自己或别人的 git 代码仓库克隆到本地，然后进行查看和开发。

```sh
git clone 版本库地址
```

- 版本库地址一般有两种
  - ssh 的方式：
    例如 `git@github.com:liuxingyu521/Practice.git`
  - https 的方式：
    例如 `https://github.com/liuxingyu521/Practice.git`

执行完`git clone`命令后，会在当前目录创建一个和远程代码库一样的目录。

#### 2. git config

`git config` 命令用来查看或设置 git 仓库属性。

- 查看 git 仓库配置列表

  ```sh
  git config --local -l
  ```

- 设置仓库信息

  ```sh
  # 配置用户名
  $ git config --local user.name 'Richard'

  # 配置邮箱
  $ git config --local user.email 'xxx@xx.xx'
  ```

**`--local` 表示只改变当前仓库属性，可以替换成`--global`(当前用户的配置) 或者 `--system`(系统的配置)**

#### 3. git remote

`git remote` 命令用来修改远端仓储的信息

- 删除本地对应的远程 git 库地址

  ```sh
  git remote rm origin
  ```

- 添加本地对应的远程 git 库地址

  ```sh
  git remote add origin git@example.git
  ```

#### 4. git branch

`git branch`用来查看和管理本地或远程分支

- 查看分支

  ```sh
  # 查看本地分支，加了 -a 参数可以查看远程分支
  $ git branch [-a]
  ```

- 从当前分支新建 dev 分支

  ```sh
  git branch dev
  ```

- 删除本地 dev 分支(先切换到不是 dev 的分支上)

  ```sh
  git branch -D dev
  ```

- 查看本地分支关联的远程分支

  ```sh
  git branch -vv
  ```

- 关联本地分支和远程分支

  ```sh
  git branch --set-upstream-to=origin/${远程分支名} ${本地分支名}（不写默认当前分支）
  ```

#### 5. git checkout

`git checkout` 有两个功能：

- **切换分支、创建分支**

  - 切换到`dev`分支

    ```sh
    git checkout dev
    ```

  - 创建并切换到 dev 分支

    ```sh
    git checkout -b dev
    ```

- **恢复工作区的修改**

  比如在工作区改了很多文件，但有些文件修改的有问题，如果手动的把改过的东西在改回来，那将非常麻烦，可以使用 `git checkout filename` 来方便还原工作区文件

#### 6. git add

当我们把远程仓库`git clone`下来以后，开始一些开发，对文件做了修改，这些修改是在工作区修改的，可以通过`git add`将工作区的修改文件放到暂存区。（工作区与暂存区解释看[这里](https://www.liaoxuefeng.com/wiki/0013739516305929606dd18361248578c67b8067c8c017b000/0013745374151782eb658c5a5ca454eaa451661275886c6000)）

```sh
git add [filename | dirname]
```

可以将修改的文件或者文件夹放到暂存区，一次可使用多次`git add`

#### 7. git status

这个命令用于查看当前仓库的状态，有分支信息，被修改过的文件名，提交到暂存区的文件，还有当前仓库 commit 是否超前或落后于远程仓库等等...

#### 8. git diff

```sh
git diff filename
```

查看当前工作区里指定已经修改的文件，会高亮显示哪里被修改，一目了然

#### 9. git commit

`git commit`命令将暂存区的修改提交到本地仓库里，有 log 提交记录

```sh
git commit -m '本次提交的内容简要'
```

**`git commit`一定要添加提交信息，以便日后方便查看修改历史**。（事实上 git 也不允许提交空信息的 commit）

#### 10. git pull

```sh
git pull <远程主机名> <远程分支名>:<本地分支名>
```

`git pull`可以将制定远程分支代码拉回到本地分支上。建议养成在每次 push 之前先 pull 的习惯，因为多人协作的时候，远程仓库代码不断更新，先 pull 在 push，如果有冲突，先解了冲突在 push。（当 pull 有冲突时，终端里会报错，并说明哪个文件有 conflict，手动到那个文件里找到 ‘>>> HEAD >>>’等字样，修改后 push）

#### 11. git push

```sh
git push <远程主机名> <远程分支名>:<本地分支名>
```

`git push`将本地的代码推送到远程仓库中。

- 可以通过命令手动关联本地分支和远程分支（如果没有关联的话，git push 的时候会自动找远程同名分支）

  ```sh
  git push --set-upstream origin 远程分支名
  ```

- 删除远程分支

  ```sh
  git push origin --delete 远程分支名
  ```

#### 12. git merge

```sh
# 将dev分支的代码合并到当前分支
$ git merge dev
```

在使用`git merge`之前，先切换到要合并的目标分支上。

#### 13. git log

`git log`这个命令可以查看当前分支的 commit 提交历史，包括提交时间、提交人、提交说明、commit 唯一标志 id 等等

以上是我在工作中经常使用的基本命令，下一篇会写一些关于 git 的进阶用法。

孰能生巧，还需要多练多用才能把 git 真正运用好，加油！
