---
title: "git commit 规范化处理工具 - Commitizen"
description: ""
publishDate: 2018-06-06
tags:
  - git相关
  - 规范化
  - 工具
---

### 背景

我们在使用 git 仓库的时候，会提交各种各样的信息，有新增功能，有 bug 修复，也有文档的修改等等，如果我们每个人提交的信息格式都不一样，到时候查看 git log 的时候因为提交信息的杂乱会很头痛。这时就需要一个规范化工具来帮助我们，统一每一次提交的格式，本文就将介绍其中一种工具 -- “commitizen”。

### 安装

在网上搜了很多资料，了解到以下 2 种安装的方式，选择自己喜欢的就好 :)

**1. 全局安装**

```sh
# 1. 全局安装工具commitizen
$ npm install -g commitizen

# 2. 全局安装配套常规配置选项的工具 cz-conventional-changelog
$ npm install -g cz-conventional-changelog

# 3. 在 `home` 目录创建一个全局配置cz的文件 '.czrc'
$ echo '{ "path": "cz-conventional-changelog" }' > ~/.czrc
```

**现在在任何 git 仓库下使用`git commit` 的时候就可以用`git cz`来代替**。如下图所示：

![git cz 命令](https://cdn.jsdelivr.net/gh/liuxingyu521/pictureBed@picture/blog/git-cz.png)

**2. 单项目安装**

```sh
# 项目中安装依赖
$ npm install -g commitizen

# 在项目根目录下，初始化git cz命令
$ commitizen init cz-conventional-changelog --save --save-exact
# 执行完发现 package.json 文件中多了config的配置
```

此时也可以使用`git cz`来提交规范化的信息了。

### Commitizen 介绍

**Commitizen**是一个撰写规范化提交信息的工具，其中规范化的信息由三部分 Header,Body,Footer 组成，格式如下：

```
<type>(<scope>): <subject>
// 空一行
<body>
// 空一行
<footer>
```

**1. Header**

Header 部分应只包含一行，包括三个字段：type、scope 和 subject。

- _type_：用于说明 Commit 的类型（feat,fix,docs,refactor,etc...详细看 git cz 注释）
- _scope_：用于说明本次 Commit 所影响的范围，比如 controller、user 或者 README，视项目的不同而不同
- _subject_：是本次 Commit 目的的简短描述

**2. Body**

Body 是对本地提交的一个详细描述，下面是一个示例

```
More detailed explanatory text, if necessary.  Wrap it to
about 72 characters or so.

Further paragraphs come after blank lines.

- Bullet points are okay, too
- Use a hanging indent
```

**3. Footer**

Footer 只用于两种情况:

- _不兼容改动_： 如果当前代码与上一个版本不兼容，则 Footer 部分以 BREAKING CHANGE 开头，后面是对变动的描述、以及变动理由和迁移方法。
- _关闭 Issue_： 如果当前 Commit 是针对某个 Issue 的提交，那么久可以在 Footer 中关闭这个 Issue：Closes #234

#### 参考链接

- [http://www.ruanyifeng.com/blog/2016/01/commit_message_change_log.html](http://www.ruanyifeng.com/blog/2016/01/commit_message_change_log.html)
- [https://blog.csdn.net/bingospunky/article/details/75305278](https://blog.csdn.net/bingospunky/article/details/75305278)
- [https://www.npmjs.com/package/commitizen](https://www.npmjs.com/package/commitizen)
