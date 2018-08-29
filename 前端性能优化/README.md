# Web前端性能优化
## 简介
几乎所有的开发者都会面临着开发的网站存在加载问题，想要加快网页的加载速度前端的页面更需要在性能优化上下功夫，只有这样才能实现更好的用户体验。

本文根据自己的学习笔记、工作经验总结而来，从构建、浏览器渲染、缓存、PWA、服务端优化等多方面，梳理前端性能优化的技术点、综合分析技术的原理，根据不同的业务场景选择合适的性能优化点进行应用，最终为你的网站带来显著的速度提升和整体性能提升。
## 注意
性能优化要见机行事，随机应变，坚持中庸的思想，不可过度优化。
## 前端性能优化点
- 网络层面
- 构建层面
- 服务端层面
- 浏览器渲染层面
## 涉及到的功能点
- 资源的合并与压缩
- 图片编解码原理和类型选择
- 浏览器的渲染机制
- 懒加载预加载
- 浏览器存储
- 缓存机制
- PWA
- Vue-SSR
## 资源的压缩与合并

### 1. 文件的压缩

> 压缩具体来说就是从代码中去除不必要的字符（空格，制表符，换行符）以减少大小，从而提升加载速度。还可以删除无效代码、css语义合并、剔除注释、代码语义的缩减和优化、代码保护。除了压缩外部脚本和样式，行内的<script>和<style>块也可以压缩。即使启用了gzip模块，先进行压缩也能够缩小5%或者更多的大小。JavaScript和CSS的用处越来越多，所以压缩代码会有不错的效果。

**如何进行压缩：**
1. 使用在线网站进行压缩
2. 使用nodejs提供的html-minifier工具，同时可以压缩css和js文件
3. html也可以通过后端模板引擎渲染压缩
4. 使用clean-css对css进行压缩
5. 使用uglifyjs2对js进行压缩和混淆

### 2. 文件合并

![文件合并](http://owoccema2.bkt.clouddn.com/hebing.png)

**不合并文件请求可能存在的问题：**

1. 文件与文件之间有插入的上行请求，请求N个文件时，不合并请求比合并请求增加了N-1个网络延迟
2. 受网络丢包问题影响更严重
3. keep-alive方式自身的问题：经过代理服务器时可能会被断开，不一定能完全保持

**但并不是所以情况都一定要进行文件合并，文件合并也存在一些问题：**

1. 首屏渲染问题：如果首页依赖的js文件合并后过大，请求加载较慢，那么首屏的渲染则会出现延迟。
2. 缓存失效问题：多个js文件合并后，任一文件的变动都会导致合并后的js文件缓存大面积失效。

**文件合并的一般原则：**

1. 公共库合并：将很少变动的公共库文件与业务代码分离，然后将其合并打包成一个文件
2. 根据页面进行合并：比如单页应用中，不同页面所依赖的js文件进行单独的打包，而非一次性地合并加载整个应用的文件。
3. 根据真实业务场景见机行事，随机应变

**如何进行文件合并：**

1. 使用在线网站进行文件合并
2. 使用构建工具（gulp、webpack、fis）实现文件打包合并

## 图片相关的优化
### 1. 不同格式图片常用的业务场景

每种图片格式都有自己的特点，针对不同的业务场景选择不同的图片格式很重要。

- jpg有损压缩，压缩率高，不支持透明，适用于大部分不需要透明图片的业务场景

- png支持透明，浏览器兼容好，适用于大部分需要透明图片的业务场景

  > **png8/png24/png32之间的区别：**
  > png8--256色 + 支持透明
  > png24--2^24色 + 不支持透明
  > png32--2^24 + 支持透明

- webp压缩程度更好，在ios、 webview有兼容性问题，适用于Android

  > **在安卓下使用webp:**
  >
  > WebP 的优势体现在它具有更优的图像数据压缩算法，能带来更小的图片体积，而且拥有肉眼识别无差异的图像质量；同时具备了无损和有损的压缩模式、Alpha 透明以及动画的特性，在 JPEG 和 PNG 上的转化效果都非常优秀、稳定和统一。

- svg矢量图，代码内嵌，相对较小，适用于图片样式相对简单的场景

### 2. 图片优化方法

图片优化的几种方法,通常都用前端构建工具完成
- 进行图片压缩，针对真实图片情况，舍弃一些相对无关紧要的色彩信息。常用网站：[tinypng](https://tinypng.com/)
- css雪碧图，常用网站：[spritecow](http://www.spritecow.com/)
    - 优点：减少HTTP请求数量
    - 缺点：整合图片比较大时，一次加载比较慢
- Image inline ，将图片转换为base64格式后内嵌到html中
    - 适用于图片很小(几KB)的情况
    - 减少网站的HTTP请求数
- 适用矢量图
    - 适用SVG进行矢量图的绘制
    - 适用iconfont解决icon问题
- 在安卓下使用webp,常用制作webp的网站：[智图](http://zhitu.isux.us/)

## css和js的装载与执行
### 1. 页面在浏览器端加载渲染的过程
![页面加载渲染的过程](http://owoccema2.bkt.clouddn.com/Readme/frontEndOptimize/render.png)
**渲染过程中的特点**

1. 顺序执行，并发加载

   > 浏览器引擎的词法分析器 html的tag从上到下进行分析。

2. 

      > 词法分析 并发加载 并发上限

    - 是否阻塞
    
    - 依赖关系
    
    - 引入方式
- css阻塞
    - css head中阻塞页面的渲染
    - css阻塞js的执行
    - css不阻塞外部脚本的加载

- js阻塞

    - 直接引入的js阻塞页面的渲染

    - js不阻塞资源的加载
    - js顺序执行，阻塞后续js逻辑的执行
## 懒加载与预加载
- 懒加载
    - 图片进入可视区域之后请求图片资源
    - 减少无效资源的加载
    - 并发加载的资源过多会阻塞js的加载，影响网站的正常使用
- 预加载
    - 图片等静态资源在使用之前提前请求
    - 资源使用到时能存缓存中加载，提升用户体验 
- 预加载的几种方式
    - 使用img图片直接加载，display属性设置为none
    - 使用Image对象
    - 使用XMLHttpRequest对象
    - 预加载的库：[PreloadJs](http://www.createjs.cc/preloadjs/docs/modules/PreloadJS.html)
- PreloadJs的简单使用
    - 引入PreloadJs
    ```javascript
    <script src="https://cdn.bootcss.com/PreloadJS/0.6.0/preloadjs.min.js"></script>
    <script src="./my_reload.js"></script>
    ```
    - 新建my_preload.js文件
    - my_load.js文件中写入如下代码
    ```javascript
    // LoadQueue是一个加载管理器，可以预先加载一个文件或者一个文件队列
    var queue = new createjs.LoadQueue(false);

    // 为事件添加你想要的监听事件
    queue.on("complete", handleComplete, this);

    // 或添加多个文件使用列表或一个清单定义使用 loadManifest
    queue.loadManifest([
        {id: "myImage", src:"https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=996503075,3768564257&fm=200&gp=0.jpg"},
        {id: "myImage2", src:"https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=4287850242,3208290927&fm=200&gp=0.jpg"}
    ]);

    function handleComplete() {
        var image = queue.getResult("myImage");
        document.body.appendChild(image);
    }
    ```
    - 浏览器中打开index.html页面
## 重绘和回流
### 1. 回流
**什么是回流？**

- 当render tree中的一部分(或全部)因为元素的规模尺寸，布局，隐藏等改变而需要重新构建。这时就需要回流。

**什么情况下会产生回流？**

- 当页面布局和几何属性改变时就需要回流

**触发页面重布局的属性：**

    - 盒子模型相关属性：width、height、padding、margin、display、border-width、border、min-height
    - 定位属性及浮动：top、bottom、left、right、position、float、clear
    - 改变节点内部文字结构：text-align、overflow-y、font-weight、overflow、font-family、line-height、vertival-align、white-space、font-size
### 2. 重绘
**什么是重绘？**

    - 当render tree中的一些元素需要更新属性，而这些属性只是影响元素的外观，风格，而不会影响布局，如color，则称为重绘**回流必定引起重绘，重绘不一定引起回流**

**避免重绘、回流的的两种方法：**

    - 避免使用触发重绘、回流的CSS属性 
    
    - 新建图层
        - 将频繁重绘、回流的DOM元素单独作为一个图层，那么这个DOM元素的重绘和回流的影响只会在这个图层中。
        - 缺点：图层过多会消耗大量的时间进行图层合成

- Chrome创建图层的条件
    - 3D或透视b变换css属性（transform、perspective,will-change:transform）
    - 使用加速视频解码的`<vido>`标签
    - 拥有3D上下文(WebGL)上下文或加速的2D上下文的`<canvas>`节点
    - 混合插件（如Flash）
    - 对自己的opatity做css动画或使用一个动画webkit变换的元素
    - 拥有加速css过滤器的元素
    - 元素有一个包含复合层的后代节点（一个元素拥有一个子元素，该子元素在自己的层里）
    - 元素有一个z-index较低且包含一个复合层的兄弟元素，换句话说就是该元素在复合层上面渲染

- 针对重绘、回流优化的方法
    - 用translate替代top改变,top会触发layout，translate不触发回流  
    - 用opacity替代visibility，visibility触发重绘，opacity不会触发重绘
    - 不要一条条修改DOM样式,预先定义好class，然后修改DOM的className
    - 把DOM离线后修改，比如把DOM给display:none，然后你修改100次，然后再把它显示出来
    - 不要把DOM节点的属性值放在一个循环里当成循环里的变量，如offsetHeight、offsetWidth
    - 不要使用table布局，可能一个很小的改动会造成整个table的重新布局
    - 动画实现的速度的选择
    - 对于动画新建图层
    - 启用GPU硬件加速
## 浏览器存储
### 1. cookies
- 为什么需要cookies
    - 浏览器端和服务器端的交互，因为HTTP请求无状态，需要cookie维持客户端状态(设计初衷)
    - 客户端自身数据的存储

![cookies](http://note.youdao.com/yws/public/resource/c2361265179a03449f6d52397fd50033/xmlnote/9EDFA49A7D514C26996684524B5F3A98/17834)

- cookie的生成方式
    - http response header中的set-cookie，服务端生成客户端存储和维护 
    - js中可以通过document.cookie可以读写cookie
- cookie存储限制
    - 作为浏览器存储，大小4kb左右
    - cookie是一个域名维度下的概念，只要是这个域名下的所有请求都会携带上cookie，但并不是所有请求都需要用cookie
        - 解决办法：cdn上放静态文件，cdn的域名和主站的域名要分开，每次请求cdn静态文件不会携带上cookie
    - 需要设计过期时间 expire
- cookie的一个重要属性httponly，不允许js读写
- cookie的简单操作
```
//设置cookie
document.cookie = "username=jerry";
document.cookie = "age=18";
//读取cookie
console.log(document.cookie);//username=jerry; age=18; 
```
注意：在谷歌浏览器chrome中调试居然不生效！！！不管是使用jquery的cookie插件，还是js原生态的cookie方法都不生效！！！什么原因呢？原因在于chrome不支持js在本地操作cookie!
### 2. LocalStorage
- 特点：
    - HTML5设计出来专门用于浏览器存储的
    - 大小5M左右
    - 仅在客户端使用，不和服务端进行通信
    - 接口封装较好
    - 浏览器本地缓存方案
- 简单使用
```
if (window.localStorage){
    // 设置localStorage
    localStorage.setItem('age', '18');
    localStorage.setItem('name', 'ffy');
    // 读取localStorage中的值
    console.log(localStorage.getItem('name'));
    console.log(localStorage.getItem('age'));
}
```
### 3. SessionStorage
- 特点：
    - 会话级别的浏览器存储
    - 大小5M左右
    - 仅在客户端使用，不和服务端进行通信
    - 接口封装较好
    - 对于表单信息的维护
- 简单使用
```
if (window.sessionStorage){
    // 设置SessionStorage
    sessionStorage.setItem('name', 'yff');
    sessionStorage.setItem('score', '100');
    // 读取SessionStorage中的值
    console.log(sessionStorage.getItem('name'));
    console.log(sessionStorage.getItem('score'));
}
```
### 4. IndexDB 
IndexDB是一种低级API，用户客户端存储大量结构化数据。该API使用索引来实现对该数据的高性能搜索。虽然Web Storage对于存储较少量的数据很有用，但对于存储大量的结构化数据来说，这种方法不太适用，IndexDB提供了一个解决方案
### 5. Service Workers
- 什么是Service Workers
 - Service Worker是一个脚本，浏览器独立于当前网页，将其在后台运行,为实现一些不依赖页面或者用户交互的特性打开了一扇大门。在未来这些特性将包括推送消息,背景后台同步， geofencing（地理围栏定位），但它将推出的第一个首要特性，就是拦截和处理网络请求的能力，包括以编程方式来管理被缓存的响应。
- chrome://serviceworker-internals/运行过的Service Workers
- chrome://inspect/#service-workers查看浏览器正在运行的Service Workers
- 生命周期

![Service Workers生命周期](http://note.youdao.com/yws/public/resource/c2361265179a03449f6d52397fd50033/xmlnote/3A42973E48174043BA1849D2EF3F68F6/17836)
### 6. PWA
- 什么是PWA
    - PWA（Progressive Web Apps）是一种Web App新模型，并不是具体指某一种前沿的技术或者某一个单一的知识点，我们从英文缩写来看就能看出来，这是一个渐进式的Web App,是通过一系列新的Web特性，配合优秀的UI交互设计，逐步增强Web App的用户体验。
- PWA的三个方向
    - 可靠：在没有网络的环境中也能提供基本的页面访问，而不会出现"未连接到互联网"的页面
    - 快速：针对网页渲染及网络数据访问有较好优化
    - 融入：应用可以被添加到手机桌面，并且和普通应用一样有全屏、推送等特性
- PWA性能检测[Chrome插件-lighthouse](https://lavas.baidu.com/doc-assets/lavas/vue/more/downloads/lighthouse_2.1.0_0.zip)
## 缓存
- Expires
    - 缓存过期时间，用来指定资源到期时间，是服务器端的具体的时间点。
    - 告诉浏览器在过期时间前浏览器可以直接从浏览器缓存读取数据，无需再次请求
- Cache-Control 
    - max-age：指定缓存的最大有效时间
    - s-maxage：只能指定public的缓存设备，比如cdn，开放给不同人使用的设备
    - private：表示响应是针对单个用户，不能由共享缓存存储。私有缓存可以存储响应。
    - public： 表示响应可能被任何缓存缓存
    - no-cache：不管怎么样都会发起请求，询问缓存是否过期
    - no-store：所有内容都不会被缓存到缓存或 Internet 临时文件中
- last-modified和If-modified-since
    - 基于客户端和服务端协商的缓存机制
    - last-modified--response header
    - If-modified-since-- request header
    - 需要和Cache-Control共同使用，如果max-age过期了才会和服务端进行协商
- last-modified的缺点
    - 某些服务端不能获取精确的修改时间，用last-modified返回准确时间是做不到的
    - 文件修改时间改了，但文件内容没有变，这种情况使用last-modified也会让缓存失效，这样是不合理的

- Etag-If-None-Match
    - 文件内容的hash值
    - etag -- response header
    - if-none-match -- request header
    - 需要与cache-control共同使用
- 分级缓存策略

![分级缓存策略](http://note.youdao.com/yws/public/resource/c2361265179a03449f6d52397fd50033/xmlnote/A797B68940C94518932A2C86B568BCFC/17838)

- 查看chrome浏览器当前缓存的信息：chrome://cache/
- chrome直接刷新都会在 Request header中加一个Cache-Control:max-age=0

#### 遇到的问题
在用node配置环境测试缓存时，一启动服务就报 `Cannot find module 'mime'`,mime是我自定义的js文件，然后将它在app.js中用require引用：`mime   = require('mime');`，感觉哪都没错呀，为什么报这个错误呢？仔细过了遍代码发现mine的引用前少了./，将代码改为`mime   = require('./mime');`后，程序运行完美。
## SSR（服务端渲染）
## 相关技术和工具
- 少量Vue.js
- 版本控制：git
- 开发工具：VSCode
- 调试工具：Chrome
    - performance
    - layers