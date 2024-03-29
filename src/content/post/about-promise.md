---
title: "了解 Promise"
publishDate: 2017-11-17
description: "异步」，经常会碰到的东西，如何优雅的解决，Promise就是一个很好的选择"
tags: ["JavaScript", "知识点"]
---

> Promise 是异步编程的一种解决方案，比传统的解决方案——回调函数和事件——更合理和更强大。ES6 将其写进了语言标准，统一了用法，原生提供了`Promise`对象。
>
> -- 选自阮一峰博客 -> [Promise](http://es6.ruanyifeng.com/#docs/promise)

`Promise`对象有三种形态，`pending`，`resolved`，`rejected`。转换方式只能为 pending => resolved 或 pending => rejected。

Promise 对象用一个函数作为参数，分别处理 2 种结束状态。看以下实例。

```javascript
const promise = new Promise(function(resolve, reject){
    // 类似的异步操作
    setTimeout(function(){
        if(/*成功*/){
            resolve('success');
    }, 2000)
})

promise.then(function(resolved_param){
    // success
}, function(rejected_param){
    // failed
});
```

## 1. Promise.prototype.then

用来处理 Promise 对象返回后的状态，2 个参数。
(**一般只使用第一个参数，第二个参数用`Promise.prototype.catch`来捕获错误**)

```javascript
getJSON("/posts.json")
 .then(function (json) {
  return json.post;
 })
 .then(function (post) {
  // ...
 });
```

**then** 方法可以链式调用，参数是上一个 then 函数的返回值。

```javascript
var promise = new Promise(function(resolve, reject）{
    resolve('first')
});
promise.then(function(param){
    console.log(param);
    return 'chain';
}).then(function(str){
    console.log(str);
});
// first
// chain
```

## 2. Promise.prototype.catch

`catch`用来处理**reject**状态，是`.then(null, reject(error))`的别名。用来捕捉错误的回调函数。
Promise 里的错误会沿着链一直传递下去，直到遇到 reject 的回调函数，reject 的回调函数里的错误也可以让后边的 catch 捕获到。

```javascript
// 写法一
var promise = new Promise(function (resolve, reject) {
 try {
  throw new Error("throw a error");
 } catch (e) {
  reject(e);
 }
});
promise.catch(function (error) {
 console.log(error);
});
// 写法二
var promise = new Promise(function (resolve, reject) {
 reject(new Error("test"));
});
promise.catch(function (error) {
 console.log(error);
});
```

## 3. Promise.all()

`Promise.all()`接受一个数组作为参数，将多个 promise 实例包装成新的 Promise。

```javascript
var p = Promise.all([p1, p2, p3]);
```

p 的状态有两种

1. 当 p1, p2, p3 的状态**全部**返回 resolved，p 的状态变为**resolved**，此时 p1, p2, p3 的返回值组成一个**数组**，传递给 p 的 resolved 回调函数；
2. 只要 p1, p2, p3**有一个**状态是 rejected，p 的状态变为**rejected**，此时第一个被 reject 的实例的返回值，传递给 p 的 rejected 回调函数。

## 4. Promise.race()

```javascript
var p = Promise.race([p1, p2, p3]);
```

`Promise.race()`和`.all()`一样，处理一个 Promise 集合，但只要 p1,p2,p3 的**其中一个**的状态改变，p 的状态随之变化，那个最先改变的 Promise 实例的返回值，传递给 p 的回调函数。

## 5. Promise.resolve()

该方法用来将一个对象转换为 Promise 对象。

```javascript
var p = Promise.resolve([param]);
// 等同于
var p = new Promise(function (resolve, reject) {
 resolve([param]);
});
```

**Promise.resolve**的参数有四种情况：

**（1）参数为一个 Promise 对象：**

Promise.resolve()会直接返回当前 Promise 对象。

**（2）参数是一个原始值**

如果是原始值，`Promise.resolve`方法返回一个新的 Promise 对象，状态为`resolved`。

```javascript
const p = Promise.resolve("Hello");

p.then(function (s) {
 console.log(s);
});
// Hello
```

上面代码生成一个新的 Promise 对象的实例`p`。由于字符串`Hello`不属于异步操作（判断方法是字符串对象不具有 then 方法），返回 Promise 实例的状态从一生成就是`resolved`，所以回调函数会立即执行。`Promise.resolve`方法的参数，会同时传给回调函数。

**（\*3）没有参数**

`Promise.resolve`方法允许调用时不带参数，直接返回一个`resolved`状态的 Promise 对象。

需要注意的是，立即`resolve`的 Promise 对象，是在本轮“事件循环”（event loop）的结束时触发回调函数，而不是在下一轮“事件循环”的开始时。

```javascript
setTimeout(function () {
 console.log("three");
}, 0);

Promise.resolve().then(function () {
 console.log("two");
});

console.log("one");

// one
// two
// three
```

**（4）参数是一个`thenable`对象**

`thenable`对象指的是具有`then`方法的对象，比如下面这个对象。

```javascript
let thenable = {
 then: function (resolve, reject) {
  resolve(42);
 }
};
```

`Promise.resolve`方法会将这个对象转为 Promise 对象，然后就立即执行`thenable`对象的`then`方法。

```javascript
let thenable = {
 then: function (resolve, reject) {
  resolve(42);
 }
};

let p1 = Promise.resolve(thenable);
p1.then(function (value) {
 console.log(value); // 42
});
```

上面代码中，`thenable`对象的`then`方法执行后，对象`p1`的状态就变为`resolved`，从而立即执行最后那个`then`方法指定的回调函数，输出 42。

## 6. Promise.reject

`Promise.reject(reason)`方法也会返回一个新的 Promise 实例，该实例的状态为`rejected`。

```javascript
const p = Promise.reject("出错了");
// 等同于
const p = new Promise((resolve, reject) => reject("出错了"));

p.then(null, function (s) {
 console.log(s);
});
// 出错了
```

上面代码生成一个 Promise 对象的实例`p`，状态为`rejected`，回调函数会立即执行。

注意，`Promise.reject()`方法的参数，会原封不动地作为`reject`的理由，变成后续方法的参数。这一点与`Promise.resolve`方法不一致。

```javascript
const thenable = {
 then(resolve, reject) {
  reject("出错了");
 }
};

Promise.reject(thenable).catch((e) => {
 console.log(e === thenable);
});
// true
```

上面代码中，`Promise.reject`方法的参数是一个`thenable`对象，执行以后，后面`catch`方法的参数不是`reject`抛出的“出错了”这个字符串，而是`thenable`对象。

未完，不知下次什么时候待续 🤔
