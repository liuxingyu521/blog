---
title: "JS代码技巧"
description: "知识在于点滴的积累···"
publishDate: 2018-01-19
tags:
  - 技巧
  - 知识点
---

# JS 代码技巧积累

---

#### 1. 对象的属性 => 变量赋值

```javascript
var key = "myKey";
var o = {
	key: key
};
console.log(o); // { key: 'myKey' }

// 给属性赋值变量  用[]引起来
var key = "myKey";
var o = {
	[key]: key
};
console.log(o); // { myKey: 'myKey' }
```

#### 2. 将 this 绑定到当前函数内部 => 使用`function(){}.bind(this)`

```javascript
// 之前
var that = this;
setTimeout(function () {
	that.addNode(ele);
}, 1000);

// 新方法
setTimeout(
	function () {
		this.addNode(ele);
	}.bind(this),
	1000
);
```

#### 3. js 判断当前机器是否联网

```javascript
(navigator.onLine == true) == //联网状态
	false; //断网状态
```

监听 window 对象的联网断网事件

```javascript
window.addEventListener("online", function () {
	console.log("this pc is online");
});
window.addEventListener("offline", function () {
	console.log("this pc is offline");
});
```

#### 4. 判断一个变量为整数

```javascript
var v = 23;
if (v === parseInt(v)) {
	console.log(v + "是一个整数");
}
```

#### 5. npm 版本号说明

```
~会匹配最近的小版本依赖包，比如~1.2.3会匹配所有1.2.x版本，但是不包括1.3.0
^会匹配最新的大版本依赖包，比如^1.2.3会匹配所有1.x.x的包，包括1.3.0，但是不包括2.0.0
```

#### 6. 获取一个元素到浏览器窗口的顶部距离

```javascript
document.getElementById("div").getBoundingClientRect().top;
```

#### 7. 行内元素内容在块状元素中不换行

```css
div {
	white-space: nowrap; /* 不换行 */
	overflow: hidden;
	text-overflow: ellipsis; /* 使行内元素超出的字用...代替 ，必须有overflow: hidden */
}
```

#### 8. `for in` 和 `for of`

i. `for in` 遍历对象的键值 key，`for of` (ES6) 遍历的是元素值

ii. `for in` 会遍历对象的属性还有**原型**上的属性

```javascript
Array.prototype.getLength = function () {
	return this.length;
};

var arr = [1, 2, 3, 4, 5];
for (var index in arr) {
	console.log(index);
}
// 0,1,2,3,4,getLength

for (var value of arr) {
	console.log(value);
}
// 1,2,3,4,5
```

iii. `for in` 一般用于遍历对象，可以使用`hasOwnProperty`筛选自身的属性

```javascript
Object.prototype.getlength = function () {
	return this.length;
};

var obj = { a: 123, b: 456 };
for (var key in obj) {
	if (obj.hasOwnProperty(key)) {
		console.log(key);
	}
}
// a,b
```

#### 9. `defer` 和 `async`

```html
<script async src="script.js"></script>
<script defer src="myscript.js"></script>
```

- 这两个属性都是使 js 脚本异步执行的
- **defer** 属性是 js 脚本加载完，`DOMContentLoaded` 事件触发前才执行，按照页面的 js 加载顺序执行
- **async** 属性是在 js 脚本加载完立即执行，不按脚本的加载顺序执行

#### 10. `~~`位运算符用于浮点数取整

`~~`运算符会舍弃掉小数部分，不会改变整数部分

```js
~~123.455; // 123
~~-123.423; // -123
```

#### 11. 执行一段字符串代码

之前可以用 `eval()`，还有一种方法是`new Function('var obj = {}')()`

#### 12. 函数节流

在频繁操作的函数调用中，使用节流函数可以减少不必要的性能开销。

```js
function throttle(fn, waitTime, firstExecute) {
	var _fn = fn,
		timer = null,
		startFlag = firstExecute; // 是否立即执行一次函数

	return function () {
		var _this = this,
			args = arguments;

		if (startFlag) {
			_fn.apply(_this, args);
			startFlag = false;
			return;
		}

		// 如果timer存在，说明此时还在上一次设置的执行时间内，不用执行
		if (timer) return;

		timer = setTimeout(function () {
			// 清除定时器
			clearTimeout(timer);
			timer = null;
			_fn.apply(_this, args);
		}, waitTime);
	};
}

window.onscroll = throttle(function () {
	console.log("设置了函数节流的滚动");
}, 1000);
```

#### 13. js 原生复制文本到剪贴板

```js
/** 点击复制链接 start */
const copyInput = document.createElement("input");
copyInput.value = "我是要被复制到剪贴板的文本";
document.body.appendChild(copyInput);
copyInput.select();
const copyResult = document.execCommand("copy");
document.body.removeChild(copyInput);
/** 点击复制链接 end */
```

#### 14. 对象解构重命名和默认值

```javascript
/**
 * 1. `:` 代表重命名
 * 2. `=` 代表赋默认值
 */
let obj = { a: 1, b: 2 };
let { a: aa } = obj; // 将 a 重命名为 aa 使用
let { a = 123 } = {}; // 给 a 赋默认值
```
