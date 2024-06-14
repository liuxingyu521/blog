---
title: "使用 python 脚本监测 Mac 上当前活跃的应用"
description: ""
publishDate: 2024-06-14
tags:
  - 脚本
  - 技巧
---

## 前言

最近安装一个软件时，安装到一半不想安装了，于是关闭了安装程序。这时可能由于之前程序有异步任务，弹出一个弹窗让我输入密码确认安装一个 helper 程序，如下图所示

![无关闭按钮的弹窗](https://cdn.jsdelivr.net/gh/liuxingyu521/pictureBed@picture/blog/no-close-dialog-origin.png)

乍一看这个弹窗只有下一步按钮，却没有关闭的操作，这可怎么关闭，我并不想输入密码呀，而且还定时重置弹窗到中间屏幕的位置，很烦人。

想到 Mac 有个强制退出应用的入口，但点开只有正常的一些软件列表，没有这个弹窗的应用。再然后把这个弹窗的标题输入到谷歌搜索里，也没找到相关结果。

于是遇换了一种思路，既然你会定时执行，那我要是可以监听一段时间内活跃的应用不就行了？于是 google 了下「如何监听当前活跃的应用」，在结果列表中找到了一个 python 脚本可以做这个事情。

## 监测方法

新建一个 python 文件 `monitor.py`，将下方代码粘贴进去，保存然后打开命令行工具，执行 `python3 monitor.py`

```python
#!/usr/bin/python

try:
    from AppKit import NSWorkspace
except ImportError:
    print("Can't import AppKit -- try `pip install PyObjC`")
    exit(1)

from datetime import datetime
from time import sleep

last_active_name = None
while True:
    active_app = NSWorkspace.sharedWorkspace().activeApplication()
    if active_app['NSApplicationName'] != last_active_name:
        last_active_name = active_app['NSApplicationName']
        print('%s: %s [%s]' % (
            datetime.now().strftime('%Y-%m-%d %H:%M:%S'),
            active_app['NSApplicationName'],
            active_app['NSApplicationPath']
        ))
    sleep(1)
```

执行后，命令行会动态输出当前哪个应用在激活状态，如下图，终于找到元凶~

![监测到没有关闭按钮的弹窗应用](https://cdn.jsdelivr.net/gh/liuxingyu521/pictureBed@picture/blog/no-close-dialog.png)

## 总结

一些时候我们会被一些「流氓」应用占用系统资源，还找不到是什么应用时，可以使用本文的 python 脚本来监测当前活跃应用，比如以下场景

- 想要关掉没有关闭按钮的弹窗
- 使用一个应用的时候莫名地失焦，被其他应用打断掉且不知道是什么应用时
- 。。。
