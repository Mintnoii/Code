# 前端JS基础面试题

## 1. JS基础

### 1.2 原型、原型链

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

#### 面试题

2. 写一个原型链继承的例子

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

#### 面试题

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

Dom节点的Attribute和Property有和区别？ 

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

#### 事件代理

```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <title></title>
  </head>
  <body>
    
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

### 2.4 Ajax

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

## 3. JS开发环境

### 开发环境：

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





