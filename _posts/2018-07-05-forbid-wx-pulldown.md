---
layout: post
title: '禁止微信h5下拉显示域名'
subtitle: '工作中遇到的问题及解决办法'
date: 2018-07-05
author: 'Xuer'
header-img: 'img/header-bg/home-bg.jpg'
tags:
  - 技巧
  - 填坑
---

### 需求

最近项目中产品提了一个需求，要在城市选择组件中添加字母导航，可快速定位到用户选择的城市索引下。

### 遇到的问题

虽然整体功能已完成，如下图所示。

![基础功能完善]({% if site.isProd %}{{site.cdnPrefix}}{% else %}{{site.baseurl}}{%endif%}/img/in-post/post-workin/letterguide.gif)

但是由于项目大多数在微信 h5 环境下，需要测试特殊情景，比如微信下当页面滑到顶端，在往下滑会显示当前域名信息。这时就出现一个问题，由于我是监听了`touchend`事件来加载当前字母索引城市列表，但页面下拉时，会阻断这个事件，其实并没有触发到`touchend`事件，如下图所示。（`touchstart`添加背景阴影，`touchend`去除阴影）

![下拉出现问题]({% if site.isProd %}{{site.cdnPrefix}}{% else %}{{site.baseurl}}{%endif%}/img/in-post/post-workin/pulldown-error.gif)

### 解决办法

于是想到在字母导航条上触发的`touchstart`事件，禁止它出现下拉显示域名信息，在`touchend`事件后在恢复。禁止下拉代码如下：

```js
function preventDefault(e){
    e.preventDefault();
}

this.rightBoxEle.on('touchstart', function(){
    // 加阴影效果
    _this.rightBoxEle.addClass("select");

    // 解决在微信下，下拉显示网址导致触发不到touchend问题
    document.addEventListener('touchmove', preventDefault, {
      capture: false,
      passive: false
    });
  });

this.rightBoxEle.on('touchend', function(e){
    /* ...动态加载当前字母城市列表代码 */

    // 去除阴影效果
    _this.rightBoxEle.removeClass("select");

    // 恢复页面下拉显示域名信息
    document.removeEventListener('touchmove', preventDefault, false);
}
```

效果如下：

![字母导航最终版]({% if site.isProd %}{{site.cdnPrefix}}{% else %}{{site.baseurl}}{%endif%}/img/in-post/post-workin/letterguide-final.gif)

_其实还有一种情景是长按触发右键，也会阻断`touchend`事件，需要处理`document.oncontextmenu`事件，禁止右键就好了_
