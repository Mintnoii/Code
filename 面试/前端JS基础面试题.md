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
console.log(typeof undefined)      // undefined
console.log(typeof 'abc')  // string
console.log(typeof 123)   // number
console.log(typeof true)   // boolean
console.log(typeof {})    // object
console.log(typeof [])    // object
console.log(typeof null)       // object
console.log(typeof console.log)    //function
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
var obj = {}; obj.a = 100
var arr = []; arr.a = 100
function fn() {}
fn.a = 100

console.log(obj._proto_)
console.log(arr._proto_)
console.log(fn._proto_)

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

- 作为构造函数执行

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

**闭包的使用场景：**

- 函数作为返回值（上面的示例代码）

- 函数作为参数传递(函数自由变量要到父级作用域中找)

  ```javascript
  function F2(fn){
  	var a=200
  	fn() // (自由变量要到声明定义时的父作用域中找，和执行的作用域没有关系)
  }
  F2(f1) // 100 在F2内执f1()方法，去f1定义的作用域内找到a=100
  ```

#### 面试题

1. 对变量提升的理解？

   > 变量的定义
   >
   > 函数的声明（注意和函数表达式的区别）

2. 说明this的几种不同使用场景？

   > 参考上文的this知识点

3. 创建10个`<a>`标签，点击的时候弹出来对应的序号？

   ```javascript
   var i
   for(i=0;i<10;i++){
   	(function(i){
   	var a=document.createElement('a')
       a.innerHTML=i+'<br>'
       a.addEventListener('click',function(e){		   							e.preventDefault()
      		alert(i)
      	})
      	document.body.appendChild(a)
   	})(i)//相当于创建了10个函数 每个函数内的i都不同
   }
   ```

4. 如何理解作用域？

   > 自由变量
   >
   > 作用域链，即自由变量的查找
   >
   > 闭包的使用场景

5. 实际开发中闭包的应用？

   ```javascript
   //闭包实际应用中主要用于封装变量，收敛权限
   function isFirstLoad(){
   	var _list=[] //  不想暴露出去的私有数组
   	return function(id){
       	if(_list.indexOf(id)>=0){
   			return false
       	}else{
       		_list.push(id)
           	return true
       	}
       }
   }
   //使用：判读是否是第一次加载
   var firstLoad=isFirstLoad()
   firstLoad(10) // true
   firstLoad(10) // false
   firstLoad(20) // true
   ```

### 1.4 异步、单线程

#### 什么是异步

```javascript
console.log(100) 
setTimeout(function(){ 
console.log(200) 
},1000) 
console.log(300) //100 300 200
// 先打印100 再打印300 1s后打印200
// 而不是先打印100 堵塞等待1s后打印200 最后打印300
// 这就是异步
```

#### 前端使用异步的场景

可能发生等待的情况下，等待过程不能像alert一样阻塞程序运行。

1. 定时任务：setTimeout、setInterval
2. 网络请求：ajax请求，动态img加载
3. 事件绑定

**异步示例：**

```javascript
console.log('start')
$.get('./data1.json',function(data1){
	console.log(data1)
})
console.log('end') // 'start'  'end'   data1
 
 
console.log('start')
var img=document.createElement('img')
img.onload=function(){
	console.log('loaded')
} // 图片加载完执行
img.src='/xx.png'
console.log('end')// 'start' 'end' 'loaded'
 
 
console.log('start')
document.getElementById('btn1').addEventListener('click',function(){
       alert('clicked')
}) // 点击时才会执行
console.log('end') // 'start' 'clicked' 'end'
```

#### 异步和单线程

js 是单线程的语言，所以需要异步。

上述定时器的异步代码的**执行过程**如下（其他异步函数也类似）：

1. 执行第一行，打印100
2. 执行setTimeout后，传入setTimeout的函数会被暂存起来，不会立即执行（单线程的特点，不能同时干两件事）
3.  执行最后一行，打印 300
4. 待所有程序执行完，处于空闲状态时，会立马看有没有暂存起来的函数要执行
5. 发现暂存起来的setTimeout中的函数，在指定的时间后执行

#### 面试题

1. 同步和异步的区别是什么？分别举一个同步和异步的例子 

   > 同步会阻塞代码执行，而异步不会 
   > alert是同步，setTimeout是异步

2. 一个关于setTimeout的笔试题?

   ```javascript
   console.log(1) 
   setTimeout(function(){ 
   console.log(2) 
   },0) 
   console.log(3) 
   setTimeout(function(){ 
   console.log(4) 
   },1000) 
   console.log(5) 
   //1 3 5 2 4
   ```

### 1.5 补充知识

#### 日期

```javascript
Date.now()  // 获取当前时间毫秒数 
var dt=new Date() 
dt.getTime()   // 获取毫秒数 
dt.getFullYear()   // 年
dt.getMonth()  // 月 (0-11)
dt.getDate() // 日 (0-31)
dt.getHours()   // 小时 (0-23) 
dt.getMinutes() // 分钟 (0-59) 
dt.getSeconds() // 秒 (0-59)
```

#### Math

```javascript
Math.random()
// random 在实际中的应用有清除缓存的作用，是每次访问到的都不是缓存
```

#### 数组API

- forEach  遍历所有元素
- sort  数组排序
- every  判断所有元素是否都符合条件 返回值为true或false
- some  判断是否至少一个元素符合条件 返回值为true或false
- filter 过滤符合条件的元素
- map  对元素重新组装，生成新数组

#### 对象API

```javascript
var obj={
	x:100,
	y:200,
	z:300
}
var key
for(key in obj){
	// 注意这里的hasOwnProperty,在讲原型链时讲过
	if(obj.hasOwnProperty(key)){
		console.log(key,obj[key])
	}
}
```

#### 面试题

1. 获取2017-06-10格式的日期 ？

   ```javascript
   function formatDate(dt){
   	if(!dt){
   		dt=new Date()
       }
       var year=dt.getFullYear()
       var month=dt.getMonth()+1
       var date=dt.getDate()
       if(month<10){
       	// 强制类型转换
       	month="0"+month
       }
       if(date<10){
       	//强制类型转换
       	date="0"+month
        }
        return year+"-"+month+"-"+date
   }
   var dt=new Date()
   var formatDate=formatDate(dt)
   console.log(formatDate)
   ```

2. 获取随机数，要求是长度一致的字符串格式？

   ```javascript
   var random=Math.random()
   var random=random + '0000000000'   //后面加上10个零 
   var random=random.slice(0,10) // 获取到的随机数长度都为10
   console.log(random)
   ```

3. 写一个能遍历对象和数组的通用forEach函数？

   ```javascript
   function myForEach(obj,fn){
   	var key
       // 准确判断是不是数组
      	if(obj instanceof Array){
           // 数组的foreach方面默认参数顺序就是(item、index)
       	obj.forEach(function(item,index){
       		fn(item,index)
       	})
     	}else{
       	// 不是数组就是对象
           for(key in obj){
           	fn(key,obj[key])
           }
       }
   }
   // 测试 
   var arr=['a','b','c']
   myForEach(arr,function(item,index){
       //注意，这里参数的顺序换了，为了和对象遍历出来的格式一致
   	console.log(index,item)
   })
    
   var obj={x:100,y:200}
   myForEach(obj,function(key,value){
   	console.log(key,value)
   })
   ```

## 2. JS-WEB-API

**常说的JS(浏览器执行的JS)包括两部分：**

- JS基础知识：ECMA 262标准
- JS-WEB-API：W3C标准，它不参与规定任何JS基础相关的东西，不管什么变量类型、原型、作用域和异步，只管定义用于浏览器JS操作页面的API和全局变量

所以全面的考虑，JS内置的全局函数和对象有哪些？

- Object、 Array 、RegExp 、Function、 Error、 Date 、Number、 Boolean、 String、Math、JSON
- 以及window、document、navigator...

### 2.1 DOM操作

#### DOM的本质

Document  Object  Model文档对象模型可以理解为：
浏览器把拿到的html代码，将其结构化成为一个浏览器能识别，并且js可操作的一个模型而已。

#### 获取DOM节点

```javascript
var div1 = document.getElementById('div1') // 元素 
var divList = document.getElementsByTagName('div') // 集合 
console.log(divList.length) 
console.log(divList[0])
 
var containerList = document.getElementsByClassName('.contaner') // 集合 
var pList = document.querySelectorAll('p') // 集合 
```

#### DOM节点的操作
**property**

```javascript
// 获取到的DOM节点都是JS可操作的js对象,所以浏览器对它的property有一些规定的可以扩展的属性
var pList = document.querySelectorAll('all')
var p = pList[0]
console.log(p.style.width) // style属性获取样式
p.style.width = '100px' // 修改样式
console.log(p.className) // 获取class
p.className = 'p1'

// 获取nodeName和nodeType 
console.log(p.nodeName) 
console.log(p.nodeType) 
```

**Attribute**

```javascript
// 获取到的DOM节点是一个可扩展属性的JS对象，但同时它指向的html元素也有一些可以设置的Attribute属性
var pList = document.querySelectorAll('all')
var p = pList[0]
p.getAttribute('data-name')
p.setAttribute('data-name', 'theP')
p.getAttribute('style')
p.setAttribute('style', 'font-size:30px')
```

#### DOM结构的操作

- 新增节点

  ```javascript
  var div1 = document.getElementById('div1')
  // 添加新节点
  var p1 = document.creatElement('p')
  p1.innerHtml = 'this is p1'
  div1.appendChild(p1) // 添加新创建的元素
  // 移动已有节点
  var p2 = document.getElementById('p2')
  div1.appendChild(p2)
  ```

- 查询子节点

  ```javascript
  var parent = div1.parentElement
  ```

- 查询父节点

  ```javascript
  var child = div1.childNodes
  ```

- 删除节点

  ```javascript
  div1.removeChild(child[0])
  ```

#### 面试题

1. dom是哪种基本的数据结构？

   > - 树

2. Dom操作的常用API有哪些？

   > 1. 获取DOM节点，以及节点的property和Attribute 
   > 2. 获取父节点，获取子节点  childNodes/ parentNode
   > 3. 新增节点，删除节点

3. Dom节点的Attribute和Property有和区别？ 

   > 1. property只是一个JS对象的属性的修改 
   > 2. Attribute是对html标签属性的修改

### 2.2 BOM操作

#### BOM的本质

Browser  Object  Model浏览器对象模型可以理解为：
通过浏览器对象可以获取页面加载的元素之外的那些关于浏览器的信息。

####  navigator

```javascript
var ua = navigator.userAgent // 或者通过window.navigator来访问，下同
var isChrome = ua.indexOf(‘Chrome’) 
console.log(isChrome) 
```

#### screen

```javascript
window.screen.width // 屏幕的像素宽度
screen.top // 屏幕距上边的距离
```

#### location

```javascript
location.href // 设置或返回完整的完整的URL 'https://www.test.com:1234/video/av32033435/?p=38'
location.protocol // 设置或返回当前 URL 的协议 'https:'
location.host // 设置或返回主机名和当前 URL 的端口号 'www.test.com:1234'
location.hostname // 设置或返回当前 URL 的主机名 'www.test.com'
location.port // 设置或返回当前 URL 的端口号 '1234'
location.pathname // 设置或返回当前 URL 的路径部分  '/video/av32033435/'
location.search // 设置或返回从问号 (?) 开始的 URL（查询部分）'?p=38'
location.hash = '#demo' // 设置或返回从井号 (#) 开始的 URL（锚）
```

#### history

```javascript
histort.forward()
history.back() 
history.go(-1)
```

### 2.3 事件

#### 事件冒泡

在父级 div 中定义的事件，会在子级的事件执行之后冒泡上来执行

- 阻止事件冒泡 e.stopPropagation()

```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <title></title>
  </head>
  <body>
    <div id="div1">
      <p id="p1">激活</p>
      <p id="p2">取消</p>
      <p id="p3">取消</p>
      <p id="p4">取消</p>
    </div>
    <div id="div2">
      <p id="p5">取消</p>
      <p id="p6">取消</p>
    </div>
 
 
    <script type="text/javascript">
    // 利用阻止冒泡的机制实现：只点击 p1 的时候弹窗激活
      function bindEvent(elem,type,func) {
        elem.addEventListener(type,func)
      }
      var p1 = document.getElementById('p1')
      bindEvent(p1,'click',function(e){
        e.stopPropagation()
        alert('激活')
      })
      bindEvent(body,'click',function (e) {
        alert('取消')
      })
    </script>
  </body>
</html>
```

#### 事件代理

利用事件冒泡和事件监听来实现事件代理(事件委托)：使代码简洁，减少浏览器内存占用

```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <title></title>
  </head>
  <body>
    <ul id="list">
  		<li id="item1">项目1</li>
  		<li id="item2">项目2</li>
  		<li id="item3">项目3</li>
        <!-- 随时会新增更多的 li 标签 -->
	</ul>
    <script type="text/javascript">
      // 要求用代理的方式实现 动态事件绑定，绑定 div1 中的所有 a 标签
      var list = document.getElementById('list')
      function bindEvent(elem,type,func) {
        elem.addEventListener(type,func)
      }
        
      bindEvent(list,'click',function(e){
        console.log(e) // MouseEvent
        console.log(e.target) //  完整的li标签对象
        console.log(e.target.nodeName) // 都是大写
        if(e.target && e.target.nodeName == "LI"){
          alert(e.target.id + e.target.innerHTML)
        }
      })
    </script>
  </body>
</html>
```

#### 通用的事件绑定

```javascript
function bindEvent(elem, type, selector, fn) {
    if (fn == null) {
        fn = selector
        selector = null
    }
    elem.addEventListener(type, function(e){
        var target
        if (selector) {
            // 代理
            target = e.target
            // 使用Element.matches 精确匹配 需要 IE9 及以上的现代化浏览器版本
            if (target.matches(selector)) {
                fn.call(target, e)
            }
        } else {
            // 非代理
            fn(e)
        }
    })
}
```

```javascript
// 使用代理
var list = document.getElementById('list')
bindEvent(list, 'click', 'list.test', function (e) {
    console.log(this.innerHTML)
})

// 不使用代理
var a = document.getElementById('a1')
bindEvent(a, 'click', function (e) {
    console.log(a,innerHTML)
})
```

### 2.4 Ajax、跨域

#### XMLHttpRequest

```javascript
// 指定了请求目标，也明确了如何处理之后，就可以发送请求了
var request = new XMLHttpRequest() 
request.open('GET',url,true) // 指定请求目标，三个参数，1.GET or POST 2.请求路径 3.是否异步 （默认true，可以不写）
request.onreadystatechange() = function(){
 
    if(request.readyState === 4){
        // 请求完成
        if(request.status === 200){
            // 请求成功，获得一个成功的响应,此后可以开始请求成功后的处理
            console.log(request.responseText)//responseText 保存文本字符串格式
            request.responseXML//responseXML 保存 Content-Type 头部中指定为 "text/html" 的数据
        }else{
            // 请求失败，根据响应码判断失败原因
            console.log('error,status:'+request.status)
        }
    }else{
        // 请求还在继续
    }
}
```

- IE低版本使用 ActiveXObject，和W3C标准不一样

#### 状态码

```javascript
0 -（未初始化）还没有调用send()方法 
1 -（载入）已调用send()方法，正在发送请求 
2 -（载入完成）send()方法执行完成，已经接收得到全部响应内容 
3 - (交互)正在解析响应内容 
4 -（完成）响应内容解析完成，可以在客户端调用了
 
2xx - 表示成功处理请求。如200 
3xx - 需要重定向，浏览器直接跳转 
4xx - 客户端请求错误，如404 
5xx - 服务器端错误，如500
```

#### 跨域

- 浏览器有同源策略，不允许ajax访问其他域接口

- 跨域条件：协议、域名、端口，有一个不同就算跨域

- 所有的跨域请求都必须经过信息提供方允许

- 但是有三个标签允许跨域加载资源

  ```html
  <img src="xxx">
  <link href="xxx">
  <script src="xxx">
  ```

- 三个标签的使用场景

  > img 用于打点统计，统计网站可能是其他域
  >
  > link、script 可以使用CDN，CDN的也是其他域
  >
  > script 可以用于JSONP

- **JSONP实现原理**

  1. 提前定义好跨域请求的接口要返回的函数
  2. 通过script跨域加载js文件，绕过浏览器的同源策略
  3. 加载请求的js文件，同时执行callback函数 得到请求的数据

  ```javascript
  <script>
  window.callback = function (data) {
      // 这是执行请求得到的信息
      console.log(data)
  }
  <script/>
  <script src = "http://demo.com/api.js"><script/>
  // 该接口讲返回 callback({x:10, y:20})
  ```

- 服务端设置 http header 也可以解决跨域问题

  ```javascript
  // 不同的后端语言会有不同
  response.setHeader("Access-Control-Allow-Origin", "http://test.com") // 不建议直接写 '*'
  ```

### 2.5 存储

#### cookie

- 本身用于客户端和服务端通信
- 但是它有本地存储的功能，于是就被 ”借用“
- 使用 document.cookie = ... 获取和修改即可

缺点：

- 数据存储量太小，只有4kb
- 所有http请求都带着，会影响获取资源的效率
- API简单，需要封装才能用

#### localStorage、sessionStorage

- HTML5专门为存储而设计，最大容量 5M
- API简单易用：localStorage.setItem( key, val )   localStorage.getItem( key )
- sessionStorage保存的数据会在浏览器或会话关闭后被清除，而localStorage不会，所以更常用localStorage
- IOS safari 隐藏模式下，localStorage.getItem 会报错，建议统一使用 try-catch 封装 

#### 区别

- 容量 4kb VS 5M
- 是否会携带到ajax请求中
- API易用性

## 3. JS开发环境

### 开发环境：

### 3.1 版本管理

```bash
git add . /*添加所有的修改*/
git checkout xxx /*切换到某个版本*/
git commit -m 'xxx' /*将添加的修改文件提交到本地暂存区，并为提交记录添加备注*/
git push origin master /*将修改提交到远程代码库*/
git pull origin master /*拉取远程仓库的更新*/

git branch xxx /*查看或切换到某个分支*/
git checkout -b xxx /*新建并切换到某个分支*/
git merge xxx /*将xxx分支的修改合并到当前分支*/
```

### 3.2 模块化

#### 不使用模块化的情况

- 工具函数库util.js 里的 getFormatDate 基础底层函数
- 自定义的工具函数文件a-util.js里的 aGetFormatDate 函数要依赖于 getFormatDate 底层函数
- 在a.js文件中使用自定义的 aGetFormatDate

```javascript
// util.js 
function getFormatDate(date, type) {
    // type === 1 返回 2018-10-12
    // type === 2 返回 2018年10月12日
    // ...
}
// a-util.js 
function aGetFormatDate(date) {
    // 要求返回 2018年10月12日 格式
    return getFormatDate(date, 2)
}
// a.js
var dt = new Date()
console.log(aGetFormatDate(dt))
```

```html
<script src="util.js"></script>
<script src="a-util.js"></script>
<script src="a.js"></script>

<!-- 1.除了各文件加载顺序的问题，这些代码中的函数还必须是全局变量，才能暴露给使用方。全局变量污染-->
<!-- 2.a.js知道要引用 a-util.js,但是不知道它还需要依赖于util.js或其他文件-->
```

#### 使用模块化

```javascript
// util.js 将其中的getFormatDate函数导出
export {
	getFormatDate: function (date, type) {
    	// type === 1 返回 2018-10-12
    	// type === 2 返回 2018年10月12日
    	// ...
	}
}
// a-util.js 引入依赖的util.js并将自己的aGetFormatDate函数导出
var getFormatDate = require('util.js')
export {
	aGetFormatDate: function (date) {
    	// 要求返回 2018年10月12日 格式
    	return getFormatDate(date, 2)
	}
}
// a.js 引入需要的a-util.js 使用其导出的方法
var aGetFormatDate = require('a-util.js')
var dt = new Date()
console.log(aGetFormatDate(dt))
```

- 使用时可以直接只加载a.js，其他的文件会根据依赖关系自动引用
- 工具函数中的两个函数，没必要写成全局变量，不会带来污染和覆盖

#### AMD

- require.js 遵循AMD模块化加载规范
- 全局 define 函数定义引用文件
- 全局 require 函数用来引用文件
- 依赖的JS文件会自动 异步加载

**使用require.js:**

```javascript
// 首先定义入口文件main.js
require(['./a.js'], function(a) {
    // 引入a.js文件并把它返回的对象作为参数a传递进来
    var dt = new Date()
	console.log(aGetFormatDate(dt))
})

// a.js
define(['./a-util.js'], function(aUtil) {
    // 只有define的函数才可以被require
    return {
        printDate: function (date) {
            console.log(aUtil.aGetFormatDate(date))
        }
    }
})
// a-util.js
define(['./util.js'], function (util) {
    return {
        aGetFormatDate: function (date) {
    	return getFormatDate(date, 2)
		}
    }
})
// util.js
define(function(){
    // 底层工具函数，没有要引入依赖的文件
    return {
        getFormatDate: function (date, type) {
    		// type === 1 返回 2018-10-12
    		// type === 2 返回 2018年10月12日
    		// ...
		}
    }
})
```

```html
<script src="/require.min.js" data-main="./main.js"></script> 
<!--在html中引入require.js同时使用data-main属性加载入口文件main.js-->
<!--一个页面只能引用一次requirejs，只能有一个入口文件，如强行引用多个requirejs与入口文件，则只会加载顺序最前面的那个。-->
```

#### CommonJS

- nodejs 模块化规范，现在被大量的在前端使用
- 前端开发依赖的插件和库，都可以从npm中获取
- 构建工具的高度自动化，使得使用npm的成本非常低
- CommonJS 不会异步加载JS，而是同步一次性加载出来

**使用CommonJS：**

配合打包工具webpack一起使用

```javascript
// util.js
module.exports = {
    getFormatDate: function (date, type) {
        // ...
    }
}
// a-util.js
var util = require('util.js')
module.exports = {
    aGetFormatDate: function (date) {
        return util.getFormatDate(date)
    }
}
```

### 3.3 打包工具

#### webpack

**遵循CommonJS规范使用构建打包工具webpack实现模块化：**

- 安装node 与 npm后(可npm全局安装http-server模块，开启一个本地服务)，新建项目demo

- 进入项目文件夹demo，`npm init` 初始化项目的npm环境，填写项目信息，生成package.json文件

- `npm install webpcak --save-dev`安装开发环境下的webpack

- `npm install jquery --save` 为项目安装jQuery

- 在项目中新建一个 webpack.config.js 文件 和 src 文件夹

  ```javascript
  const path = require('path')
  const webpack = require('webpack')
  
  module.exports = {
      context: path.resolve(__dirname, './src'), // __dirname 代表项目目录
      entry: {
      	app: './app.js' // 入口文件为src下的app.js
  	},
      output: {
          path: path.resolve(__dirname, './dist')
          filename: 'bundle.js'  // 处理之后输出的文件
      }
  }
  ```

- 在 package.json 文件的 scripts 对象里加一行代码

  ```javascript
  "start": "webpack"
  ```

- 在终端执行 `npm start` 启动webpack，可以在项目中新生成的dist 文件夹内发现打包后的bundle.js文件

- 在项目根目录下的index.html文件中引入打包后的bundle.js

  ```html
  <body>
      <div id="test"></div>
      
      <script src="dist/bundle.js"></script>
  </body>
  ```

- 接下来的开发，可以直接在app.js 中引入并使用 a-util.js (自己编写的代码都在src文件夹下) 或 jQuery

  ```javascript
  var $ = require('jquery')
  var $testDiv = $('#test')
  $testDiv.html('<p>这是 jQuery 插入的文字 </p>')
  
  var aUtil = require('a-util.js')
  var dt = new Date()
  console.log(aUtil.aGetFormatDate(dt))
  ```

**使用webpack压缩JS代码:**

- 如果进行代码压缩，只需要在 webpack.config.js 文件中配置 plugins

  ```javascript
  plugins: {
      new webpack.optimize.UglifyJSPlugin() // 压缩js
      // 具体配置压缩规则(压缩html、css等)请看官网文档
  }
  ```

#### linux基础命令

```bash
1. mkdir a      // 在当前目录中创建一个空文件夹'a'
2. ls           // 查看当前目录下的文件
3. ll           // ls -l 的简写
4. cd a         // 进入当前目录下的 a 目录
5. pwd          // 查看当前目录的路径
6. cd ..        // 返回上层目录
7. rm -rf a     // 删除文件夹 a
8. vi a.js      // 或者 vim ；编辑 a.js 文件，写入新的内容并保存则会创建；键入 i 进入插入模式，ESC 返回刚刚的模式 :w 保存 :q 退出 :wq 保存并退出
9. cp a.js a1.js  // 拷贝 a.js 存入 a1.js 
10. mv a1.js <new dir>  // 将 a1.js 移动到新的文件夹下
11. rm a.js         // 删除 a.js
12. cat a.js    // 查看 a.js 
13. head a.js   // 查看头部内容
14. tail a.js   // 查看尾部内容
15. head -n 1 a.js   // 查看第一行
16. tail -n 2 a.js   // 查看后两行
16. grep '2' a.js    // 搜索 包含 '2'
```

### 运行环境：

### 3.4 页面渲染

#### 加载资源的形式

- 输入 url (或跳转页面) 加载 html
- 加载 html 中的静态资源 `<img>` `<script>` `<video>` CSS等

#### 加载一个资源的过程

- 浏览器根据 DNS 服务器得到域名的 IP 地址
- 向这个 IP 的服务器发送 http 请求
- 服务器收到请求，处理并返回 http 请求
- 浏览器得到返回内容

#### 浏览器渲染页面的过程

- 根据 HTML 结构生成 DOM Tree
- 根据 CSS 生成 CSSOM
- 将 DOM 和 CSSOM 整合形成 RenderTree
- 浏览器根据 RenderTree开始渲染和展示
- 遇到`<script>` 时，会执行并阻塞渲染，因为JS有可能改变DOM树结构
- 而 img、 video则是异步加载，不会阻塞渲染

**window.onload 和 DOMContentLoaded**

```javascript
window.addEventListener('load', function () {
    // 页面的全部资源加载完才会执行，包括图片、视频等
})

document.addEventListener('DOMContentLoaded', function () {
    // DOM 渲染完即可执行，此时图片、视频可能还没有加载完
})
```

### 3.5 性能优化

#### 优化原则

- 多使用内存、缓存或者其他方法
- 减少 CPU 计算、减少网络请求

#### 优化方向

1. 加载资源优化

   - 静态资源的压缩合并
   - 静态资源缓存（通过控制请求的文件名称）
   - 使用 CDN 让资源加载更快
   - 使用 SSR 后端渲染，数据直接输出到 HTML 中

2. 渲染优化

   - CSS 放前面，JS 放后面

   - 懒加载（图片懒加载、下拉加载更多）

     ```html
     <!--先在页面中使用一张体积比较小或缓存中的图片 preview.png-->
     <img id="img1" src="preview.png" data-realsrc="abc.png"/>
     <!-- 把图片资源请求过来之后再替换标签的src地址-->
     <script>
         var img1 = document.getElementById('img1')
         img1.src = img1.getAttribute('data-realsrc')
     </script>
     ```

   - 减少DOM 查询，对 DOM 查询做缓存

   - 减少DOM 操作，多个操作（查询、插入）尽量合并在一起执行

   - 事件节流（监听键盘、鼠标的事件时设置触发条件）

     ```javascript
     var textarea = document.getElementById('text')
     var timeoutId 
     textarea.addEventListener('keyup', function () {
         if(timeoutId) {
             clearTimeout(timeoutId)
         }
         timeoutId = setTimeout(function () {
             // 触发change事件
         },1000)
     })
     ```

   - 尽早执行操作（如 DOMContentLoaded ）

### 3.6 安全性

#### XSS(Cross Site Scripting) 跨站请求攻击

- 在页面中偷偷插入一段 script 代码
- 在攻击代码中，获取页面查看者的cookie，发送到攻击者的服务器

**防范：**

- 前端替换关键字，例如替换 < 为 `&lt;` 等
- 更好的方案是后端替换

#### XSRF （Cross-site request forgery） 跨站请求伪造

- 登录一个购物网站浏览商品，而该网站的付费购买接口是xxx.com/pay?id=10
- 然后可能会收到邮件，其中隐藏着对购物网站（已登录）没有任何验证的购买请求`<img src = "xxx.com/pay?id=10">`

**防范：**

- 增加验证流程，如指纹、密码、短信验证码