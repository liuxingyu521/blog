---
title: git 切换不同用户
description: ''
publishDate: 2024-12-24
tags:
  - git相关
  - 终端命令
---

## 前言

在日常使用 git 开发时，经常会在公司项目和个人项目之间切换，账户也不同，经常会发生使用公司 git 账户提交到了个人项目，或者使用个人 git 账户提交到了公司账户，导致错误信息被记录。

于是找了下相关解决方案，可以实现不同项目目录下自动切换 git 账户。

## .gitconfig 配置

[.gitconfig](https://git-scm.com/docs/git-config#FILES) 文件是 git 版本控制系统中用于存储用户配置信息的文件，可以配置诸如用户名、邮箱地址、默认分支等，例如以下示例

```ini
[user]                                  # 账户信息
  email = xxx@example.com               # 邮箱地址
  name = example                        # 账户名称
[core]
    editor = vim                        # 默认的文本编辑器使用 vim
[difftool "sourcetree"]                 # 使用 sourcetree 提供的 difftool
  cmd = opendiff \"$LOCAL\" \"$REMOTE\"
```

其中有个配置项是 [includeIf](https://git-scm.com/docs/git-config#_conditional_includes)，它可以根据条件使用不同的 `gitconfig` 配置文件。

例如下方 `~/.gitconfig` 中的配置

```ini
[includeIf "gitdir:**/Workspace/**"]
  path = ~/.git-workspace-config
```

表示如果当前 git 项目目录（包含 `.git` 相关文件的目录）匹配到 `**/Workspace/**` 后，会自动添加 `~/.git-workspace-config` 文件内容到 git 配置项中。

这样一来我们就可以根据不同的项目目录，匹配不同的账户信息，如下

```ini
# ~/.gitconfig
[user]                                  # 配置全局默认的账户信息
  email = xxx@example.com
  name = example

[includeIf "gitdir:**/Workspace/**"]    # 公司项目
  path = ~/.git-workspace-config
[includeIf "gitdir:**/Personal/**"]     # 个人项目
  path = ~/.git-personal-config
```

然后在不同的配置文件中分别配置不同的账户信息

```ini
# ~/.git-workspace-config
[user]
  email = 公司邮箱地址
  name = 公司 git 账户名称

# ~/.git-personal-config
[user]
  email = 个人邮箱地址
  name = 个人 git 账户名称
```

这样一来，我们在不同的项目目录间使用 git 命令都会匹配到正确的 git 账户信息，从源头杜绝错误的 git 记录~

## git-user

在调研过程中，意外还发现了一个手动切换 git 账户的命令行工具 [Git-User-Switch](https://github.com/geongeorge/Git-User-Switch)，使用上也很方便。

首先它是个 node 脚本，需要安装 node 环境，然后只需要 `npm i -g git-user-switch` 即可。

在命令行输入 `git-user`，就可以在当前可使用的 git 账户列表中选择对应的账户

```shell
$ git-user
Current git user(local) is name1:xx@xx.com

? Select a git user (Use arrow keys)
❯ name1 : xx@xx.com
  name2 : yy@yy.com
  Add new user
```

## 结尾

使用 `.gitconfig` 文件配置以及 `git-user` 可以方便的切换不同的 git 账户，快使用起来吧~

（ps. 如果的确使用了错误的账户信息进行了提交，可以先切换到正确的 git 账户，然后使用 `git commit --amend --reset-author` 命令重新提交一遍即可，不过这个只针对前一次提交可用~）
