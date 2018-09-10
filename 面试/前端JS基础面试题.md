# 前端JS基础面试题

通过学习本系列的面试题，你可以学会前端JS基础知识以及知识体系，掌握如何应对面试题和一些面试技巧。

**几个简单的面试题**

```javascript
// 问题： JS中使用typeof 能得到的哪些类型?
console.log(typeof undefined);      //undefined
console.log(typeof 'abc');  //string
console.log(typeof 123);    //number
console.log(typeof true);   //boolean
console.log(typeof {});     //object
console.log(typeof []);     //object
console.log(typeof null);       //object
console.log(typeof console.log);    //function
```

```javascript
//问题： 何时使用 === 何时使用 ==

if(obj.a == null){
    //这里相当于 obj.a === null || obj.a === undefined, 简写形式
    //这是 jquery 源码中推荐写法

}
```

## 1. JS基础

### 1. 原型、原型链

### 2. 作用域、闭包

### 3. 异步、单线程

## 2. JS-WEB-API

### 1. DOM操作

### 2. Ajax

### 3. 事件绑定

## 3. JS开发环境

### 开发环境：

### 1. 版本管理

### 2. 模块化

### 3. 打包工具

### 运行环境：

### 1. 页面渲染

### 2. 性能优化