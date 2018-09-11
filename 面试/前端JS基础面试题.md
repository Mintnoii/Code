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

#### 题目

1. 如何准确判断一个变量是数组类型
2. 写一个原型链继承的例子
3. 描述new一个对象的过程
4. zepto(或其他框架)源码中如何使用原型链

#### 知识点

**构造函数**

```javascript
function Foo(name,age) { // 习惯将构造函数首字母大写
    this.name = name
    this.age = age
    this.class = 'class-1'
    // return this // 默认有这一行
}
var p = new Foo('zhangsan', 20)
// var p1 = new Foo('lisi', 22) // 创建多个对象
console.log(p.name) // zhangsan
```

> new一个构造函数返回对象的过程：
>
> - 构造函数执行时，函数内部的this会先变成一个空对象。
> - 然后函数根据参数列表，对this进行属性的赋值。
> - 最后默认将this对象return出去赋值给变量(p、p1)。

**构造函数—扩展**

- var a = {} 其实是 var a = new Object() 的语法糖

- var a = [] 其实是 var a = new Array() 的语法糖

- function Foo(){...} 其实是 var Foo = new Function(){...} 的语法糖

- 使用`instanceof`判断一个函数是否是一个变量的构造函数

  > 题目1：判断一个变量是否为“数组”：
  >
  > 变量 instanceof Array

**5条原型规则及实例**

1. 所有的引用类型（数组、对象、函数），都具有对象特性，即可自由扩展属性（除了“null”以外）。
2. 所有的引用类型（数组、对象、函数），都有一个`_proto_`属性（隐式原型），属性值是一个普通的对象。
3. 所有的函数，都有一个`prototype`属性（显式原型），属性值也是一个普通的对象。
4. 所有的引用类型（数组、对象、函数），`_proto_`属性值指向**它的构造函数的**`“prototype”`属性值。

```javascript
var obj = {}; obj.a = 100;
var arr = []; arr.a = 100;
function fn() {}
fn.a = 100;

console.log(obj._proto_);
console.log(arr._proto_);
console.log(fn._proto_);

console.log(fn.prototype)

console.log(obj._proto_ === Object.prototype)
```

5. 当视图得到一个对象的某个属性时，如果这个对象本事没有这个属性，那么会去它的`_proto_`(即它的构造函数的prototype)中去寻找。

```javascript
// 构造函数
function Foo(name, age) {
    this.name = name
}
Foo.prototype.alertName = function () {
    alert(this.name)
}
// 创建实例
var p = new Foo('zhangsan')
p.printName = function () {
    console.log(this.name)
}
// 测试
p.printName() // zhangsan
p.alertName() // zhangsan
```

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