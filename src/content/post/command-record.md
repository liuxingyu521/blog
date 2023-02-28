---
title: "常用命令记录"
description: "收集一些日常工作中用到的实用命令"
publishDate: 2020-01-08
tags:
  - 技巧
  - 日常
  - 命令
---

## node 相关

### 1. npm

npm 是 node 包管理工具，以下是一些常用命令

```shell
# 1. 全局安装 node 包
$ npm install -g ${包名}

# 2. 当前目录下安装依赖
# * --save (默认)     参数将依赖放到 dependencies 下
# * --save-dev (等同于 -D ) 参数将依赖放到 devDependencies 下
$ npm install [--save-dev | -D] ${包名}

# 3. 运行 package.json 里的 scripts 命令
$ npm run ${scriptName}

# 4. 发 npm 包
# 在 npm 上注册用户
$ npm adduser
# 登录 npm 账户
$ npm login
# 发布当前 npm 包
$ npm publish
# 删除指定版本的 npm 包，或者强制删除整个包 npm unpublish ${包名} --forse
$ npm unpublish ${包名}@${版本号}
```

### 2. nvm

nvm 用来管理 node 版本，在不同的项目里可能使用不同的 node 版本，有了 nvm 可以在本地灵活切换 node 版本，确保项目运行 OK

```shell
# 安装 nvm, 去官网(https://github.com/nvm-sh/nvm) 查看执行以下命令，按照安装好的说明执行
$ curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.35.2/install.sh | bash

# 1. 列出本地安装过得 node版本
$ nvm ls

# 2. 使用指定版本
$ nvm use 12
```

### 3. nrm

nrm 用来管理 npm 源仓库，默认使用的是 npm 官方源(服务器在国外)，有时某个包比较慢，或者使用自建 npm 源仓库，可以使用 nrm 命令切换源

```shell
# 安装
$ npm install -g nrm

# 1. 查看可用的源仓库
$ nrm ls

# 2. 切换源
$ nrm use taobao

# 3. 新增源
$ nrm add registry http://registry.npm.example.cn

# 4. 删除源
$ nrm del taobao
```

### 4. pm2

[pm2](https://pm2.keymetrics.io/docs/usage/pm2-doc-single-page/) 是一个守护进程管理器，用来管理自己创建的进程服务等，下面列出一些常用用法

```shell
# 首先全局安装一下 pm2
$ npm install -g pm2

# 1. 创建一个进程
$ pm2 start ${要运行的脚本路径 || 命令} --name ${pm2进程名字}

# 2. 查看 pm2 管理的进程列表
$ pm2 list

# 3. 停掉正在运行的进程
$ pm2 stop ${进程name || 进程id || all}

# 4. 删除创建的进程
$ pm2 delete ${进程name || 进程id || all}

# 5. 给进程传递参数 使用 -- 隔开
# 此示例给脚本传入 -p 9999 命令行参数
$ pm2 start ${脚本} -- -p 9999

# 6. 动态查看 pm2 日志
# 此示例查看最近 200 行的日志，加 --lines 参数
$ pm2 logs --lines 200

# 7. 设置 pm2 开机自动重启
$ pm2 startup

# 8. 冻结当前pm2程序，在开机的时候自动重启
$ pm2 save
```

## linux 系统相关

### 1. 远程传输 - scp

```shell
# 1. 本地向远程传输文件
$ scp ${本地文件路径} ${远程路径 => 用户名@ip地址:远程绝对路径}

# 2. 从远程下载文件到本地
$ scp ${远程路径} ${本地文件路径}

# 3. 如果需要传输目录，加 -r 参数
$ scp -r ${本地文件路径} ${远程路径}
```

### 2. 端口相关

```shell
# 1. 查看占用某个端口的进程
$ lsof -i:3000
#COMMAND   PID   USER   FD   TYPE             DEVICE SIZE/OFF NODE NAME
#node    80820  user   13u  IPv6 0xb6cc6492b6278121      0t0  TCP *:hbci (LISTEN)
```

### 3. ssh

```shell
# 生成 ssh 公秘钥，用于 ssh 认证
$ ssh-keygen -t rsa -C "邮箱地址" -f "生成的文件名"

# 因为 ssh 默认只会读取 .ssh/id_rsa 秘钥
# 所以需要使用 ssh-add 手动把秘钥放到 ssh 的读取配置中
$ ssh-add "秘钥路径"
```
