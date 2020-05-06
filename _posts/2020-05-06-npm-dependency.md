---
layout: post
title: 'npm dependencies/devDependencies... 详解 '
subtitle: ''
author: 'Xuer'
header-img: 'img/header-bg/home-bg.jpg'
tags:
  - npm
  - config
---

目前市面上大部分的前端项目使用 `npm` 包管理器来组织项目中用到的模块依赖。但我们去看 `npm` 配置文件 `package.json` 的时候，发现有些模块放在 `dependencies` 配置中，还有一些模块放在 `devDependencies` 中，是不是有点傻傻分不清楚 🧐。

莫慌，先概览下 `npm` 中的 5 种依赖，心里有个底：

- [dependencies](#1-dependencies) => 放置项目中代码运行时需要用到的依赖
- [devDependencies](#2-devdependencies) => 放置本地开发过程中需要使用到的编译、打包、测试、格式化模块等
- [peerDependencies](#3-peerdependencies) => 放置本模块需要宿主环境提供的模块依赖（通常本模块是为了给引用方提供服务时设置依赖）
- [bundledDependencies](#4-bundleddependencies) => 和上面的配置不同，为数组格式，其中包含需要被打包进本地 package 里的依赖模块名，通过 `npm pack` 命令生成一个模块包
- [optionalDependencies](#5-optionaldependencies) => 放置一些项目中可忽略其各种错误的包模块，和 `dependencies` 一样，但该模块可有可无（ps. 该配置命名也很直观 🤐）

详细介绍往下看 👇

## 1. dependencies

该配置项用来放置一些项目中实际运行需要用到的代码，如果没有该模块，项目会运行出错，那就必须要安装在 `dependencies` 下面。

通过以下命令进行安装

```shell
# 以 axios（客户端/服务端请求工具） 为例
# 通过 npm 安装
$ npm install --save axios

# 通过 yarn 安装
$ yarn add axios
```

## 2. devDependencies

该配置项放置本地开发过程中需要使用到的编译、打包、测试、格式化模块等，**特别注意**： `npm publish` 的时候不会安装该配置下的模块

通过以下命令安装

```shell
# 以 typescript (解析 ts/tsx 文件的工具) 为例
# 通过 npm 安装
$ npm install --save-dev typescript

# 通过 yarn 安装
$ yarn add -D typescript
```

## 3. peerDependencies

一般用在发布的代码库当中，表示需要宿主环境提供该配置下的模块依赖，与宿主环境息息相关。npm 3.x 版本之后不会自动安装该配置下的依赖模块，会告警提示。

```json
// 以 react-router (react 路由库) 的官方库为例，react-router 需要在 react 环境中使用
{
  "peerDependencies": {
    "react": ">=15"
  }
}
```

## 4. bundledDependencies

该配置下的模块通过 `npm pack` 会被打包到生成的模块包中，一般用于私密包引用，把文件配置到其他项目的依赖中

**特别注意**： 该配置是数组格式，包含需要被打包的包名。

## 5. optionalDependencies

该配置如其名，可有可无的配置，也就是说在代码运行或安装模块的时候，就算失败报错了也会正常运行，个人理解应该是有提升效益的模块安装在这里，如果失败了也不影响代码的正常运行。

**特别注意**： 该配置会覆盖掉 `dependencies` 里的包，不要重复添加

通过以下命令安装

```shell
# 通过 npm 安装
$ npm install --save-optional xxx

# 通过 yarn 安装
$ yarn add -O xxx
```

### 总结

项目中用到最多的是 `dependencies` 和 `devDependencies`，其他的知道就 OK。不管怎样，现在对 `npm` 里的依赖有了更深刻的了解了吧！

加油，learn on the way ~
