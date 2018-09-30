# 前端JS基础面试题

通过学习本系列的面试题，你可以学会前端JS基础知识以及知识体系，掌握如何应对面试题和一些面试技巧。

## 1. JS基础

### 1.1 变量类型和计算

#### 题目

1. JS中使用typeof 能得到的哪些类型？
2. 何时使用 == ，何时使用 === ？
3. JS中有哪些内置函数？
4. JS变量按照存储方式区分为哪些类型，并描述其特点？
5. 如何理解JSON ?

#### 知识点

**变量类型**

```javascript
// 问题1：使用typeof运算符查看JS变量类型
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
// 问题4：按照存储方式区分:值类型 VS 引用类型

//值类型
var a = 10
var b = a
a = 11
console.log(b) // 10

//引用类型: 对象、数组、函数
var a = { age : 19}
var b = a
b.age = 20
console.log(a.age) // 20
```

**变量计算**

会发生类型转换的几种情况：

1. 字符串拼接

   ```javascript
   var a = 100 + 10 // 110
   var b = 100 + '10' // '10010'
   ```

2. == 运算符

   ```javascript
   100 == '100' // true
   0 == '' // true
   null == undefined // true
   ```

3. if 语句

   ```javascript
   var a = true
   if (a) {
   	// ...
   }
   var b = 100
   if (b) {
       // ...
   }
   // 会被判断为false的6种情况： 0、''、NaN、null、undefined、false
   ```

4. 逻辑运算

   ```javascript
   console.log(10 && 0) // 0 与
   console.log(''|| 'abc') // 'abc' 或
   console.log(!window.abc) // true 非
   
   // 使用！！来查看在if()中判断一个变量会被当做true 还是 false
   var b = 100
   console.log(!!b)
   ```

```javascript
// 问题2：何时使用 == ，何时使用 === ？
// 一般全都使用 === 全等运算符
// 除了要用在判断对象的属性时，可以使用下面的写法
if(obj.a == null){
    //这里相当于 obj.a === null || obj.a === undefined, 简写形式
    //这是 jquery 源码中推荐写法
}
```

```javascript
// 问题3：JS中有哪些内置函数？ —— 数据封装类对象
Object
Array
Boolean
Number
String
Function
Date
RegExp
Error
```

```javascript
// 问题5：如何理解JSON？
// JSON是一种数据格式，但单纯从JS语法来看它只不过是一个JS内置对象而已(类似于Math)

//把对象变成字符串
JSON.stringify({ a : 10, b : 20})
//把字符串变成json对象
JSON.parse('{"a" : 10, "b" : 20}')
```

### 1.2 原型、原型链

#### 构造函数

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

> 题目：new一个构造函数返回对象的过程：
>
> - 构造函数执行时，函数内部的this会先变成一个空对象。
> - 然后函数根据参数列表，对this进行属性的赋值。
> - 最后默认将this对象return出去赋值给变量(p、p1)。

#### 构造函数—扩展

- var a = {} 其实是 var a = new Object() 的语法糖

- var a = [] 其实是 var a = new Array() 的语法糖

- function Foo(){...} 其实是 var Foo = new Function(){...} 的语法糖

- 使用`instanceof`判断一个函数是否是一个变量的构造函数

  > 题目：判断一个变量是否为“数组”：
  >
  > 变量 instanceof Array

#### 5条原型规则及示例

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
var f = new Foo('zhangsan')
f.printName = function () {
    console.log(this.name)
}
// 测试
f.printName() // zhangsan
f.alertName() // zhangsan
```

**补充：循环对象自身的属性**

```javascript
var item
for (item in f) {
    // 高级浏览器已经在 for in 中屏蔽了来自原型的属性
    // 但是这里建议大家还是加上这个判断，以保证程序的健壮性
    if (f.hasOwnProperty(item)) {
        console.log(item)
    }
}
// 输出p的name printName两个属性
```

#### 原型链

![原型模式](http://owoccema2.bkt.clouddn.com/Readme/Code/%E5%8E%9F%E5%9E%8B%E6%A8%A1%E5%BC%8F.jpg)

> **图中矩形代表函数，带圆角的矩形代表对象，再结合上面的5条原型规则：**
>
> **如果调用上面构造函数Foo创建的实例 f 的 toString()方法，当 p 这个实例对象没有这个属性方法时，它会去自身的隐式原型`f._proto_`中去找（规则2、5），也就是它自身构造函数的显式原型`Foo.prototype`（规则3、4）。**
>
> **Foo.prototype也是一个对象（规则3）,而且这个对象中也没有toString这个方法，所以这个对象会继续向自身隐式原型_proto_指向的构造函数Object的显式原型Object.prototype中去找。**
>
> **也就是最后要去`f._proto_._proto_`中找toSting方法。**
>
> **补充：Object.prototype对象的隐式原型_proto_指向的是null，这里是JS原型链的终点。**

**扩展**

`instanceof`：用于判断引用类型属于哪个构造函数的方法

`f instanceof Foo`的判断逻辑是：

-  f 的`__proto__`一层一层往上，能否对应到`Foo.prototype`
- 再试着判断`f instance Object`

#### 面试题

1. 如何准确判断一个变量是否是数组类型？

   ```javascript
   var arr = []
   arr instance Array //true
   typeof arr //object,typeof是无法判断是否是数组的
   ```

2. 写一个原型链继承的例子

   ```javascript
   // 动物
   function Animal(){ 
       this.eat = function(){ 
           console.log('Animal eat')
       }
   }
   // 狗
   function Dog(){ 
       this.bark = function(){ 
           console.log("dog bark")
       }
   }
   Dog.prototype = new Animal()
   // 哈士奇
   var hashiqi = new Dog()
   hashiqi.eat() // "Animal eat"
   ```

   ```javascript
   // 写一个封装DOM查询的例子
   function Elem (id){ 
       this.elem = document.getElementById(id)
   }
   // 在构造函数的原型上增加返回方法
   Elem.prototype.html = function(val){ 
       var elem = this.elem
       if(val){ 
           elem.innerHtml = val
           return this;   //链式操作
       }else{ 
           return elem.innerHtml
       }
   } 
   
   Elem.prototype.on = function(type,fn){
       var elem = this.elem
       elem.addEventListener(type,fn)
   }
   
   var div1 = new Elem('content_wrapper')
   div1.html('<p>hello</p>').on('click',function(){
       alert('clicked')
   }).html('<p>world</p>')
   ```

### 1.3 作用域、闭包

#### 执行上下文

js 是解释型语言不是编译型语言，所以有些错误在编写程序时不会报错，什么时候执行什么时候报错。

- 范围：一段<script>或者一个函数
- 全局环境内：变量定义(var x)、函数声明(function fn)
- 函数环境内：变量定义、函数声明、this、arguments 
- 注意：‘函数声明’和‘函数表达式’的区别

```javascript
console.log(a)//undefined    
var a=100    

fn('zhangsan') //'zhangsan' 20    
function fn(name){   
	age=20       
    console.log(name,age)       
    var age    
}
```

#### this

**this要在执行时才能确认值，定义时无法确认**

```javascript
var a={       
	name:"A",       
	fn:function(){           					     	console.log(this.name)       
	}
}    
a.fn()  // this===a    
a.fn.call({name:B}) // this==={name:'B'}    
var fn1=a.fn;    
fn1() // this===window
```

**this的几种使用场景：**

- 作为构造函数执

  ```javascript
  function Foo(name){
  	//this={}
  	this.name=name;
  	//return this
  }
  var f=new Foo('zhangsan')
  ```

- 作为对象属性执行

  ```javascript
  var obj={           
      name:'A',            
      printName:function(){                			console.log(this.name)
  	} 
  }
  obj.printName()
  ```

- 作为普通函数执行

  ```javascript
  function fn(){
  	console.log(this)
      //this===window
  }
  fn()
  ```

- call、apply、bind

  ```javascript
  function fn1 (name,age){          
      alert(name)
      console.log(this)  //this===window       }       
  fn1.call({x:100},'zhangsan',20)       fn1.apply({x:100},['zhangsan',20])
      
  var fn2 = function(name,age){          alert(name)
   console.log(this)  //this==={x:100}       }.bind({x:100}) 
  //bind只能用函数表达式，函数声明不可用，会报错       
  fn2('zhangsan',200)
  ```

#### 作用域

- 没有块级作用域 (不考虑let)

```javascript
if(true){ 
    var name='zhangsan'
}
console.log(name)//'zhangsan'
```

- 只有全局和函数作用域

```javascript
var a=100
function fn(){
    var a=200
    console.log('fn',a)
}            
console.log('global',a) // global 100
fn() // fn 200
```

#### 作用域链

- 寻找一个自由变量时会从当前作用域开始一直不断的往父级作用域去找，然后形成一个链式结构。

```javascript
var a=100
function F1(){
  var b=200 
  function F2(){
      var c=300
      console.log(a) //a是自由变量
      console.log(b) //b是自由变量
      console.log(c) 
	}          
   F2()       
}
F1()
```

#### 闭包

**一个函数的父级作用域是它定义时的作用域，而不是执行时的作用域。**

```javascript
function F1(){
    var a=100
    //返回一个函数(函数作为返回值)
    return function(){
        console.log(a) //自由变量，父作用域寻找
    }
}     
//f1得到一个函数     
var f1=F1()
var a=200
f1() // 100 此时执行f1打印的仍然是这个函数定义时的父级作用域F1()函数内的a 等于100
```

**

### 1.4 异步、单线程

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