---
layout: post
title: '介绍一款 zsh 终端超实用主题：「spaceship」'
author: 'Xuer'
header-img: 'img/header-bg/home-bg.jpg'
tags:
  - vscode
  - 设置
  - zsh
---

# 介绍一款 zsh 终端超实用主题：「spaceship」

先看预览图

![spaceshippreview](https://cdn.jsdelivr.net/gh/liuxingyu521/pictureBed@picture/spaceship-preview.png)

当前项目相关信息一目了然~ 如果是 git 项目目录，会展示当前分支。如果是 node 项目，会展示当前包版本以及使用的 node 版本等等，简直不要太明了：）

> 官方 git 仓库地址：https://github.com/spaceship-prompt/spaceship-prompt

## 一、安装

安装 spaceship 有2个前置依赖，即

1. [zsh](https://ohmyz.sh/)：毕竟 spaceship 是 zsh 的主题，安装步骤如下

    ```shell
    $ sh -c "$(curl -fsSL https://raw.github.com/ohmyzsh/ohmyzsh/master/tools/install.sh)"
    ```
  
2. [Powerline Font](https://github.com/powerline/fonts)： 终端显示非 ascii 码的图形，安装步骤如下
  
    ```shell
    # clone
    git clone https://github.com/powerline/fonts.git --depth=1
    # install
    cd fonts
    ./install.sh
    # clean-up a bit
    cd ..
    rm -rf fonts
    ```
  

接下来只需三步开启 spaceship 主题

```shell
# 1. 克隆 spaceship 源码到 zsh 自定义主题目录
$ git clone https://github.com/spaceship-prompt/spaceship-prompt.git "$ZSH_CUSTOM/themes/spaceship-prompt" --depth=1

# 2. 将 spaceship 主题二进制文件软链到 zsh 主题目录
$ ln -s "$ZSH_CUSTOM/themes/spaceship-prompt/spaceship.zsh-theme" "$ZSH_CUSTOM/themes/spaceship.zsh-theme"

# 3. 在 ~/.zshrc 文件里添加 `ZSH_THEME="spaceship` 即开启
```

## 二、配置

- iterm2 需配置字体选项
  
  ![iterm 配置 powerline 字体](https://cdn.jsdelivr.net/gh/liuxingyu521/pictureBed@picture/iterm2-spaceship-font-setting.png)
  
- VS Code 需配置终端字体

  ![VS Code配置 powerline 字体](https://cdn.jsdelivr.net/gh/liuxingyu521/pictureBed@picture/VsCode-powerline-font-setting.png)