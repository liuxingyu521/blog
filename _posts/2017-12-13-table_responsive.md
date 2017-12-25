---
layout:     post
title:      "响应式table布局"
subtitle:   "简易实现table的响应式，一起了解一下作者的脑洞吧😉"
date:       2017-12-13
author:     "Xuer"
header-img: "img/post-bg-first-record.jpg"
tags:
    - css
    - 响应式布局
---

### 前言

平时我们使用table的时候，很少考虑它的响应式（在不使用布局框架bootstrap、purecss、etc..的情况下），接下来按照 [Matt Smith](https://github.com/allthingssmitty) 的论述，做一个简单的responsive table。

### 设计分析

首先，写好基本的表格dom，如下所示：

```html
<table>
  <caption>Statement Summary</caption>
  <thead>
    <tr>
      <th>Account</th>
      <th>Due Date</th>
      <th>Amount</th>
      <th>Period</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Visa - 3412</td>
      <td>04/01/2016</td>
      <td>$1,190</td>
      <td>03/01/2016 - 03/31/2016</td>
    </tr>
  </tbody>
</table>
```

再加一些基本的css

```css
table {
  border: 1px solid #ccc;
  border-collapse: collapse;
  margin: 0;
  padding: 0;
  table-layout: fixed;
  width: 100%;
}
table tr {
  background: #f8f8f8;
  border: 1px solid #ddd;
  padding: .35em;
}
table th,
table td {
  padding: .625em;
  text-align: center;
}
```




