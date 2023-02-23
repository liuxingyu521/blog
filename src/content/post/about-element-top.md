---
title: "来瞧瞧一个元素的各类“top”"
publishDate: 2017-11-25
description: "关于元素的top定位，你了解多少··· 还等什么，跟着我一探究竟吧！"
tags: ["知识点", "JavaScript"]
---

# 前言

最近自己在折腾博客，准备在博客笔记页面添加一个目录索引。简单在网上看了些关于博客目录建立的 js 插件，最终选择了 [jekyll-table-of-contents](https://github.com/ghiculescu/jekyll-table-of-contents) 这个插件，可以满足基本需求。

接下来问题来了，我想给目录添加一些效果，比如当页面滚动时，想给目录做一个类似吸顶的效果，那么需要在目录 dom 快被滚动到屏幕外时给它来个 fixed 定位，当滚动下来时再让他回到原位置，随页面滚动。

整体思路就是监听滚动事件，比较目录元素距离顶部的高度和页面滚动的高度，但是在找元素和页面高度的时候遇到了问题，offsetTop？scrollTop？傻傻分不清楚 😂，于是去百度各种 top 详解之类，为了加深印象，于是自己详细记录下这个“top”的知识点。

下图是我画的各种 top 标注图解（offsetTop[top]，scrollTop，clientTop）

![一个元素各种top图解](https://cdn.jsdelivr.net/gh/liuxingyu521/pictureBed@picture/blog/element-top.png)

# 正餐

## 1. offsetTop

`element.offsetTop` 和 css 里的`top`属性很相似，都是相对于父级元素（有非 static 定位属性的）定位，如果父级往上都没有定位属性则相对于**body**左上角定位。

**注意：element.offsetTop 是一个只读属性**

```javascript
// 原生js
var ot = document.getElementById("div").offsetTop;
// 返回Number值

// jquery
var ot = $("#div").offset().top;
```

## 2. scrollTop

`scrollTop` 是**可滚动元素**垂直方向已滚动的高度，这个属性既可以**查询**也可以**设置**，例如

```javascript
var sTop = document.getElementById("div").scrollTop;
// 返回Number值

// 设置，滚动到50px处
document.getElementById("div").scrollTop = 50;
```

- 如果元素不可滚动，scrollTop = 0
- 如果设置的 scrollTop 值小于 0，scrollTop = 0
- 如果设置的 scrollTop 值大于可以滚动的最大值，则 scrollTop = 可滚动的最大值

## 3. clientTop

`clientTop` 是一个元素的 border-top 的宽度，是一个**只读**属性。

## 4. 吸顶实战

```javascript
// 给目录增加滚动吸顶效果
// 使用.Xuer-slide-content类进行定位
$(window).scroll(function () {
	var slideTop = $(".Xuer-slide-content").offset().top;
	var bodySrollTop = $("html").scrollTop();

	// 滚动距离大于元素距离，吸顶固定
	if (bodySrollTop > slideTop) {
		$("#toc").addClass("fixed");
	}
	// 滚动距离小于元素距离，在回到原来文档位置
	else {
		$("#toc").removeClass("fixed");
	}
});
```
