---
layout:     post
title:      "js函数节流 & 函数防抖"
subtitle:   "限制函数调用频率的方法"
date:       2018-09-05
author:     "Xuer"
header-img: "img/home-bg.jpg"
tags:
    - 技巧
    - JavaScript
---

### 背景

有这样一些场景，比如我们要监听页面滚动事件，做吸顶功能时，或者要实时监听用户输入事件，请求相应内容的时候，这些滚动或者请求的频率很频繁，非常消耗页面性能，这时需要一些策略来限制高频率事件，那就是**节流**和**防抖**。

### 函数节流

让原来高频率执行的函数每隔设定的`delay`时间执行一次。

*实现原理* ： 本质是一个高阶函数的运用，以函数作为参数，返回一个包含其他逻辑的函数。往细了说是通过**闭包**，维护一个定时器的状态，设置延迟执行。

```javascript
/**
 * 函数节流
 * @param  {function}  func        需要高频率执行函数 
 * @param  {Number}  delay       限制下次函数执行的延迟时间
 * @param  {Boolean} isFirstExec 第一次触发是否执行
 */
function throttle(func, delay, isFirstExec){
  // 闭包内维护的计时器 
  var timer = null;

  return function(){
    var _this = this,
        args = arguments;
    
    // 第一次是否执行
    if(isFirstExec){
      func.apply(_this, args);
      isFirstExec = false;
    }
    
    // 如果还在上一个计时时间内，不作处理
    if(timer) return;
    
    // 否则，设定延迟时间后执行高频率函数
    timer = setTimeout(function(){
      timer = null;
      func.apply(_this, args);
    }, delay)
  }
}
```

另外一个时间差的版本

```js
function throttle2(func, delay, isFirstExec){
  var lastTime = (new Date()).getTime(),
      curTime = null;

  return function(){
    var args = arguments;
    curTime = (new Date()).getTime();

    if(isFirstExec){
      func.apply(this, args);
      lastTime = curTime;

      isFirstExec = false;
      return;
    }

    if(curTime - lastTime > delay){
      func.apply(this, args);
      lastTime = curTime;
    }
  }
}
```

### 函数防抖

和**函数节流**一样的原理，限制高频率触发的函数，只有一点不同，**函数只执行一次**，在最后一次触发后执行。

```javascript
/**
 * 函数防抖
 * @param  {function}  func        需要高频率执行函数
 * @param  {Number}  delay       限制下次函数执行的延迟时间
 * @param  {Boolean} isFirstExec 第一次触发是否执行
 */
function debounce(func, delay, isFirstExec){
  var timer = null;

  return function(){
    var _this = this,
        args = arguments;

    if(isFirstExec){
      func.apply(_this, args);
      isFirstExec = false;
    }
    
    // 清掉计时器，重新计时
    if(timer){
      clearTimeout(timer);
    }

    timer = setTimeout(function(){
      func.apply(_this, args);
    }, delay)
  }
}
```

### 总结

||节流|防抖|
|:--:|:--:|:--:|
|相同点|限制高频率执行函数|限制高频率执行函数|
|不同点|每隔一段时间执行一次|只在最后触发的时候执行|


