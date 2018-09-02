# CSS小技巧

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

