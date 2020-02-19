---
layout:     post
title:      "Page Visibility API"
subtitle:   "掌握当前文档的可见状态，快来了解这些 document 属性~~"
date:       2017-12-04
author:     "Xuer"
header-img: "img/header-bg/post-bg-first-record.jpg"
tags:
    - JavaScript
    - 知识点
---


# Page Visibility API

## 前言

最近逛博客的时候，发现有个网页的标题有点意思😎，当离开他的页面时，它的文档标题就换成了别的文字，切换回来时又变成原有标题，这让我很好奇这是怎么实现的，上网查了下相关浏览器监听标签页切换的问题，还真找到了~~ 就在MDN上（[Page Visibility API](https://developer.mozilla.org/zh-CN/docs/Web/API/Page_Visibility_API)），接下来总结一下。

浏览器提供了当前文档是否对用户可见的事件监听 `visibilitychange`.

比如当你最小化窗口时，或者切换到了别的标签页时，浏览器API会触发 `visibilitychange` 事件，这时你可以执行一些操作，比如上边说到的变换标题，停止大量动画运行以减少内存消耗等等。

## 相关属性

### 1. document.hidden

当页面为隐藏状态下，document.hidden为 **true**;

当页面对用户可见时，document.hidden 为 **false**;

**document.hidden 为只读属性**

### 2. document.visibilityState

一个用来展示文档可见性状态的字符串，有以下几种值：

1. **visible** : 页面内容至少是部分可见，可以判断为此页面是非最小化窗口的前景选项卡
2. **hidden** : 页面内容对用户不可见，意味着此页面是一个后台标签或是最小化窗口的一部分，或操作系统在锁屏状态下
3. **prerender** : 页面内容正在被预渲染且对用户是不可见的,此时document.hidden为**true**.（浏览器可选支持）
4. **unloaded** : 页面正在从内存中卸载.（浏览器可选支持）

## 实战代码

此段代码实现了文章开头的需求，切换标签页设置不同的title


```javascript
// 设置隐藏属性和改变可见属性的事件的名称
// 不同浏览器做兼容
var hidden, visibilityChange; 
if (typeof document.hidden !== "undefined") { // Opera 12.10 and Firefox 18 and later support 
  hidden = "hidden";
  visibilityChange = "visibilitychange";
} else if (typeof document.msHidden !== "undefined") {
  hidden = "msHidden";
  visibilityChange = "msvisibilitychange";
} else if (typeof document.webkitHidden !== "undefined") {
  hidden = "webkitHidden";
  visibilityChange = "webkitvisibilitychange";
}

if(typeof document.addEventListener === "undefined" || typeof document[hidden] == "undefined" ){
    console.log('not support visibility API');
}else{
    document.addEventListener(visibilityChange, function(){
        if(document[hidden]){
            document.title = '请不要离开哦';
        }else{
            document.title = "欢迎回来^_^";
            
            setTimeout(function(){
                document.title = "page visibility API";
            }, 2000)
        }
    }, false)
}
```

## 使用场景

* 网站有图片轮播效果，只有在用户观看轮播的时候，才会自动展示下一张幻灯片。
* 显示信息仪表盘的应用程序不希望在页面不可见时轮询服务器进行更新。
* 网页正在播放视频，用户切换到别的页面时，停止播放并保存当前进度，切换回来时继续播放。
* 当设备进入待机模式时，网站想要关闭设备声音（用户按下电源键关闭屏幕）


