---
layout:     post
title:      "npm常用命令参数使用"
subtitle:   "npm命令系列···"
date:       2018-01-02
author:     "Xuer"
header-img: "img/header-bg/post-bg-first-record.jpg"
tags:
    - npm
    - 终端命令
withContent: true
---

## 前言

在我们前端开发过程中，很多时候需要使用第三方工具包，大大简化了我们的开发，而其中很常用的依赖包管理工具就是 [`npm` ](https://www.npmjs.com/)了，接下来就来了解下这个命令常见的使用吧！

## 安装(install)

>
```sh
$ npm install [-g] [package-name] [--save | --save-dev]
```

这个命令用于安装指定的安装包，

* `package-name` 参数指定了要安装的包的名字；
* `-g` 参数表示安装在系统全局；
* `--save` 参数表示安装的时候同时将依赖包版本写进 `package.json` 文件中的 `dependencies`字段中；
* `--save-dev` 参数表示安装的时候同时将依赖包版本写进 `package.json` 文件中的 `devDependencies`字段中；

**举例说明**

**1. 当前路径下有`package.json`文件，且当中有`dependencies`字段**

```sh
$ npm install
```
会把在 `package.json` 文件中的`dependencies`字段中所有的依赖包都安装在本目录下，**而且会安装匹配版本正则的最新版**。

*（本示例只说明常用的，类似`devDependencies`字段和`peerDependencies`字段等，不常用请自行了解...）*

**2. 当前路径下安装 `fanyi` 包（一个命令行翻译工具）**

```sh
$ npm install fanyi
```
执行完这个命令后，当前文件夹多了一个 `node_modules` 的文件夹，里边存放着`fanyi`的依赖文件


**3. 全局安装 `fanyi` 包**

```sh
$ npm install fanyi -g
```
如果不加 `-g` 的话，`fanyi` 这个命令只能在`fanyi`的安装路径下使用，加了`-g`后，可以在终端的任意目录执行`fanyi`命令。

**4. 安装指定版本的 `fanyi` 包**

```sh
$ npm install fanyi@1.2.0
```

**5. 将安装的依赖包版本信息写在`package.json`文件中的`dependencies`字段中**

```sh
$ npm install fanyi --save
```

## 更新(update)

> 
```sh
npm update [package-name] [-g] [--save]
```

在项目中，如果发现用的第三方依赖包太旧，需要更新的话，可以使用`update`参数，**会下载`package.json`中版本号正则匹配的最新版**。

参数和`npm install`的参数性质一样。

**举例说明**

**1. 更新本目录下的所有依赖包**

```sh
$ npm update
```
执行命令后，该目录下所有的依赖包都会根据package.json中的规则走一遍，下载最新版本的依赖包。

*注意*

如果有更新，只会更新到node_modules里，`package.json`中的依赖信息不会变， 要想同步更新到package.json文件里，需要加 `--save` 参数。

**2. 更新指定依赖包**

```sh
$ npm update fanyi
```

## 卸载(uninstall)

> 
```sh
npm uninstall package-name [--save]
```

和`install`一样，不做过多解释。

## 查看本地安装列表(list)

> 
```sh
npm list [-g] [--depth Number]
```

可以查看本地安装了哪些依赖包。

* `-g` 参数表示查看全局的
* `--depth Number` 表示列出几层的依赖包（看下边例子）

**举例说明**

**1. 列出本目录下安装的依赖包有哪些**

```sh
$ npm list 
```
默认会以树状图将本目录所有依赖显示出来。
如图所示
![npm-list-depth]({{site.baseurl}}/img/in-post/post-npm/npm-list.png)

**2. 只展示一层依赖包**

```sh
$ npm list --depth 0
```
如图所示
![npm-list-depth]({{site.baseurl}}/img/in-post/post-npm/npm-list-depth.png)

## 查看依赖包信息(info)

> 
```sh
npm info package-name [versions | 其他可用字段]
```

**举例说明**

```sh
$ npm info fanyi
```
如图所示
![npm-info]({{site.baseurl}}/img/in-post/post-npm/npm-info.png)

未完待续...




