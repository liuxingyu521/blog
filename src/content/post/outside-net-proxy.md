---
title: "内网穿透工具 - localtunnel"
description: "一个可以使用外网访问本地服务器的代理工具"
publishDate: 2019-11-01
tags:
  - node
  - 工具
---

# localtunnel 是什么

[localtunnel](https://localtunnel.github.io/www/)是一个可以把本地服务器的页面、接口等，暴露在外网的工具。有了它可以让别人不用和我们连同一个内网环境，就可以访问我们本地的服务。

# localtunnel 怎么用

1. 在安装 node 环境的前提下，全局安装 localtunnel

   ```shell
   npm install -g localtunnel
   ```

2. 使用命令行开启外网访问，外网的主域名为: `localtunnel.me`

   ```shell
   # 更详细的命令使用 lt -h 查看
   $ lt -s 自定义子域名 -p 本地端口号
   ```

   ![localtunnel开启](https://cdn.jsdelivr.net/gh/liuxingyu521/pictureBed@picture/blog/localtunnel-3.png)

   **前提条件：** 你的本地服务器已经开启。

   ![本地服务开启](https://cdn.jsdelivr.net/gh/liuxingyu521/pictureBed@picture/blog/localtunnel-1.png)

此时，就可以愉快的玩耍啦，让别人通过外网地址（eg. 'https://xuer.localtunnel.me' ）访问你本地的页面！
