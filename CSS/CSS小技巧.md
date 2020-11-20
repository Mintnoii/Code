# CSS常用代码整理

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