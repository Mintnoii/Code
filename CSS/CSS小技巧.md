# CSS常用代码整理

## 设置全屏背景图片

```css
html {    
    background: url('images/bg.jpg') no-repeat center center fixed;
    -webkit-background-size: cover;
    -moz-background-size: cover;
    -o-background-size: cover;
    background-size: cover;
}
```

## 实现带背景遮罩的弹窗

```css
/*class为black_overlay遮罩层div*/
.black_overlay{
    display: none;
    position: fixed;
    top: 0%;
    left: 0%;
    width: 100%;
    height: 100%;
    background-color: black;
    z-index:1001;
    -moz-opacity: 0.8;
    opacity:.80;
    filter: alpha(opacity=80);
}
/*class为dialog_content的弹窗div*/
.dialog_content {
	display: none;
	position: fixed;
	top: 30%;
	left: 30%;
	background-color: white;
	z-index: 1002;
	overflow: auto;
	border: 5px solid #ADD8E6;
	padding: 10px 10px 10px 10px;
}
```

## 三角形列表项目符号

```css
ul {
    margin: 0; 
    padding: 0 1em; 
    list-style: none;
}
li:before {
    content: ""; 
    border-color: transparent #111; 
    border-style: solid;
    border-width: 0.35em 0 0.35em 0.45em; 
    display: block;
    height: 0;
    width: 0;
    left: -1em;
    top: 0.9em;
    position: relative;
} 
```

## inline元素间的空白间隙

如果你写了个列表，因为元素节点有文本节点，在缩进代码时会占据宽度，比如：

```html
<ul>
    <li>我是第一项</li>
    <li>我是第二项</li>
    <li>我是第三项</li>
    <li>我是第四项</li>
</ul>
```

```css
<style>
    ul {
        list-style: none;
    }
    li {
        width: 25%;
        display: inline-block;
        background: green;
        text-align: center;
        height: 40px;
        line-height: 40px;
    }
</style>
```

为了页面代码的整洁可读性，往往会设置一些适当的缩进、换行，但当元素的display为inline或者inline-block的时候，这些缩进、换行就会使列表项之间产生空白间隙。

此时，最合适的方法就是给li的父级ul设置**font-size: 0**， 给li设置**font-size: 16px**，如此就达到了所需效果。

另外，图片间的间隙问题也是因为换行、缩进。

```html
<div>
     <img src="pic1.jpg">
     <img src="pic2.jpg">
</div>
<!-- 给div设置font-size:0，间隙就会消失。-->
```

## 实现鼠标悬浮内容自动撑开的过渡动画

> **需要为一个列表添加个动画，容器的高度是不确定的，也就是高度为 auto，悬浮时候撑开内容有个过渡动画**

```html
<ul>
  <li>
    <div class="hd"> 列表1 </div>
    <div class="bd">列表内容<br>内容列表内容<br>内容列表内容<br>内容</div>
  </li>
  <li>
    <div class="hd"> 列表1 </div>
    <div class="bd">列表内容<br>内容列表内容<br>内容列表内容<br>内容</div>
  </li>
  <li>
    <div class="hd"> 列表1 </div>
    <div class="bd">列表内容<br>内容列表内容<br>内容列表内容<br>内容</div>
  </li>
</ul>
```

用 `CSS3` 实现的话，由于高度的不确定，而 `transtion` 是需要具体的树枝，所以设置 `height:auto` 是无法实现效果的，可以通过 `max-height` 这个属性间接的实现这么个效果，`css`样式是这样的：

```css
.bd {
  max-height:0;
  overflow:hidden;
  transition: all 1s ease-out;
}
li:hover .bd {
  max-height: 600px;
  transition-timing-function: ease-in;
}
```

## :empty选择器

```html
<ul>
  <li>这里有文字</li>
  <li></li>
  <li>asdfasdf</li>
</ul>
```

写网页的时候经常有这种情况：有的标签里面文字为空，但是这个标签被应用上特定的样式，即便内容为空还是会展现出来。如果想要避免这种情况。你可以尝试使用`CSS3`的选择器`:empty`

```css
li {
  padding: 20px;
  background-color: #ccc;
}
li:empty {
  display: none;
}
```