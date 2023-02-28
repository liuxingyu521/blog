---
title: "网站分析工具 umami 实践"
description: ""
publishDate: 2023-02-28
tags:
  - 网站运营
  - self-hosted
  - 安装教程
---

我们的个人网站上线之后，如果想要统计网站的一些访问情况，用户来源等，一般我们都会用谷歌分析，百度统计等等，只需要插入一段统计脚本，十分便利。但目前有出现一款新的开源网站分析工具 `umami`，它可以实现数据自托管，把这些访问数据存储在我们自己的服务器中。

先看官方统计示例图
![umami-demo](https://cdn.jsdelivr.net/gh/liuxingyu521/pictureBed@picture/blog/umami-demo.png)

可以看到 `umami` 有统计PV/UV、页面referrers、浏览器、操作系统、设备、来源国家、语言、屏幕大小、自定义事件、页面参数这些。

由于自己在安装过程中有遇到一些问题，但好在都已经解决并成功部署，下面整体记录下 `umami` 的安装使用过程。

> 本教程使用源代码构建部署（docker在服务器下载过程中一直卡住.. orz）

## 安装

### 前置环境

1. nodejs 14+ ([官网地址](https://nodejs.org/en/download/))
2. yarn 包管理工具

    ```sh
    npm install -g yarn
    ```

3. mysql 数据库
4. [pm2 进程管理工具](https://pm2.keymetrics.io/docs/usage/pm2-doc-single-page/)

    ```sh
    npm install -g pm2
    ```

### 启动脚本

先把官方代码拉下来

```sh
git clone https://github.com/umami-software/umami.git
```

1. 安装依赖

    ```sh
    yarn install
    ```

2. 创建 `.env` 文件，填入数据库地址

    ```yaml
    # 一定要带具体的数据库名称
    DATABASE_URL=mysql://${username}:${password}@localhost:3306/${创建的数据库名称}
    ```

3. 构建应用

    ```sh
    yarn build

    # build 命令是这些命令的合集 build-db check-db build-tracker build-geo build-app
    # 如果过程中有遇到报错，看下是哪一步报的错，可以单独执行那一步
    ```

4. 启动应用

    ```sh
    # 当前会话中启动（测试使用，正式启动使用 pm2）
    yarn start

    # 使用 pm2 后台运行
    pm2 start yarn -- name umami -- start
    # 设置开机自启动pm2进程
    pm2 startup
    pm2 save

    # 这样就算服务器重启之后也会自动运行应用
    ```

    默认端口是 `3000`，想要更换为其他端口，在 `package.json` 的 `start` 命令前增加参数 =>  `"start": "PORT=7002 next start"`

## 使用

服务启动后访问服务链接，会先到登录页面，默认账号 `admin`，默认密码 `umami`。登录后可在设置页面添加要分析统计的网站

![umami-add-site](https://cdn.jsdelivr.net/gh/liuxingyu521/pictureBed@picture/blog/umami-add-site.png)

然后把埋点代码复制到页面 `head` 标签中，再次访问网站就能收到统计数据了

![umami-script](https://cdn.jsdelivr.net/gh/liuxingyu521/pictureBed@picture/blog/umami-script.png)

效果预览
![umami-preview](https://cdn.jsdelivr.net/gh/liuxingyu521/pictureBed@picture/blog/umami-preview.png)

## Q&A

1. **为什么统计的来源国家都是 Unknown**

    可以参考[文档](https://umami.is/docs/environment-variables#:~:text=npm%20start.-,CLIENT_IP_HEADER,-%3D%20%3Cheader%20name%3E)设置对应的客户端 ip Headers。如果使用的是 `nginx` 代理，需要在 `umami` 服务代理配置文件中添加如下设置

    ```txt
    server {
      ...

      location / {
          proxy_pass                  http://xxx;
          proxy_set_header            X-real-ip $remote_addr;
          proxy_set_header            X-Forwarded-For $proxy_add_x_forwarded_for;
      }
    }
    ```
