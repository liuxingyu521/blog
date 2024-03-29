---
title: "理解「柯里化」"
description: "将带有多个参数的函数转换成只带一个参数的函数并返回"
publishDate: 2017-12-05
tags:
  - JavaScript
  - 概念
---

## 什么是柯里化

> 柯里化（英语：Currying），是把接受多个参数的函数变换成接受一个单一参数（最初函数的第一个参数）的函数， 并且返回接受余下的参数而且返回结果的新函数的技术。

## 理解柯里化

先来看一个工厂模式的例子：

```javascript
// 工厂模式
function CarFactory(modal, year, miles) {
	var car = function (modal, year, miles) {
		this.modal = modal;
		this.year = year;
		this.miles = miles;
	};

	return new car(modal, year, miles);
}

var miniCar = CarFactory("mini", 2017, 20000);
console.log(mini.year); // 2017
```

上面的代码创建了一个简单的汽车工厂，它的作用是生产不同的车对象(object)，类似的，我们也可以把柯里化理解成 **生产函数的函数工厂**，生成具体的 function，再看下面的例子：

```javascript
/*
 *   1. 一般的加法函数
 */
function add(num1, num2) {
	return num1 + num2;
}
add(5, 4); // 9

/*
 *   2. 柯里化后的加法函数
 */
// 数字求和的函数生成器
function addGenerator(num) {
	// 返回一个简单的函数，求两个数字的和，其中第一个数字来自生成器
	return function (otherNum) {
		return num + otherNum;
	};
}
// 根据函数生成器，生成不同加数因子的函数
var addFive = addGenerator(5);
var addSix = addGenerator(6);
var addSeven = addGenerator(7);

// 使用新生成的函数
addFive(4); // 9
addSix(4); // 10
```

看了上述代码，发现柯里化后的步骤好像比一般的函数还要复杂，那有什么意义呢？其实心细的小伙伴可以发现，使用柯里化后的函数，它因为类似函数工厂，可以再次生成函数变种，而且这些变种和柯里化后的函数 **有一个固定的参数联系**，这在函数式编程中很有意义，为什么呢？接着看下面这个例子：

```javascript
/*
 *   1. 普通绑定兼容函数
 */
// 封装不同浏览器的原生dom绑定事件函数
var addEvent = function (el, type, func, capture) {
	if (el.addEventListener) {
		el.addEventListener(
			type,
			function (e) {
				func.call(el, e);
			},
			capture
		);
	} else if (el.attachEvent) {
		el.attachEvent("on" + type, function (e) {
			e = e || window.event; // IE下的event对象
			e.cancelBubble = capture ? true : false;
			func.call(el, e);
		});
	}
};

/*
 *   2. 使用柯里化后的绑定兼容函数
 */
var addEvent = (function () {
	if (window.addEventListener) {
		return function (el, type, func, capture) {
			el.addEventListener(
				type,
				function (e) {
					func.call(el, e);
				},
				captrue
			);
		};
	} else {
		return function (el, type, func, capture) {
			el.attachEvent("on" + type, function (e) {
				e = e || window.event;
				e.cancelBubble = capture ? true : false;
				func.call(el, e);
			});
		};
	}
})();
```

看了上述代码，发现什么不同了吗？是不是柯里化做了一个返回函数的动作，对没错，柯里化后的 addEvent 函数不需要每次去判断浏览器类型，因为它把判断浏览器的动作作为固定参数锁定了，相当于

```javascript
// 在标准浏览器下
addEvent = function (el, type, func, capture) {
	el.addEventListener(
		type,
		function (e) {
			func.call(el, e);
		},
		captrue
	);
};

// 在IE浏览器下
addEvent = function (el, type, func, capture) {
	el.attachEvent("on" + type, function (e) {
		e = e || window.event;
		e.cancelBubble = capture ? true : false;
		func.call(el, e);
	});
};
```

因此，柯里化声称“如果你固定某些参数，你将得到接受余下参数的一个函数”

怎么样，看完本篇教程理解了吗，那就在实践中运用柯里化吧！

- 参考文章
  - <https://github.com/ChenChenJoke/JokerWebFont/tree/master/currying>
  - <http://www.css88.com/archives/7833#currying>
