---
layout: post
title: '如何给「VsCode」添加自定义透明背景图'
author: 'Xuer'
header-img: 'img/header-bg/home-bg.jpg'
tags:
  - vscode
  - 设置
---

作为程序员，每天都在和编辑器打交道，设计一个舒服的界面，不仅可以愉悦心情，更是无形中提高了 Coding 能力加成 hhh。话不多说，先放 Taylor 女神背景效果图 ↓

![VsCode 背景图]({{site.baseurl}}/img/in-post/post-vscode/vscode-bg.png)

#### 准备材料

1. 用编辑器打开 VsCode 样式文件（样式文件位置查找方式： 1、打开 VSCode 帮助 2、点击切换开发人员工具 3、右键 body 右边的文件链接，复制其位置）
   ![查找 VsCode 样式文件地址]({{site.baseurl}}/img/in-post/post-vscode/find-vscode-stylefile.jpg)

2. 要设置的背景图片地址(本地、网络均可)，最好使用绝对路径（例如我本地图片：`/Users/Xuer/Documents/image/taylor.jpg`）

#### 添加样式代码

将下面的样式代码添加到 VsCode 样式文件末尾，其中 `xxx` 替换为背景图的绝对地址

```css
/*background start*/
body {
  pointer-events: auto !important;
  background-size: 100% !important;
  opacity: 0.83 !important;
  background-position: 0 0 !important;
  background-image: url('xxx') !important;
  content: '';
  position: absolute;
  z-index: 99999;
  width: 100%;
  background-repeat: no-repeat;
}
/*background end*/
```

#### 重启 VSCode

完成透明背景图设置。

#### 遇到的问题及解决方式

- 问题：替换完背景图重启之后，vscode 会提示 `code 安装似乎损坏，请重新安装`，并且编辑器标题上会显示`[不受支持]`，这个是由于 vs 官方不建议修改官方文件，才会有这样的提示

  ![vscode 提示损坏]({{site.baseurl}}/img/in-post/post-vscode/code-error.png)

- 解决方式：

  1. 安装 `Fix VSCode Checksums` 插件
  2. `Cmd+Shift+P` 打开命令行，输入 `fix checksums: apply` 回车，问题解决

  ![安装 `Fix VSCode Checksums` 插件解决提示损坏的问题]({{site.baseurl}}/img/in-post/post-vscode/fix-code-error.png)
