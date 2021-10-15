## 问题描述

> chrome 默认的滚动条，hover 时的样式是一个白色背景的滚动条，与项目页面风格不统一，需要优化。

less 代码：

```less
li.ant-menu-submenu ul.ant-menu-sub {
    max-height: 280px;
    width: 100%;
    // 使用 overflow-y: overlay 让滚动条浮动在内容上方，而不占容器的宽度
    overflow: hidden overlay;
    // width 设置为 0 则可实现隐藏滚动条的滚动
    &::-webkit-scrollbar {
	    width: 10px;
    }
    &::-webkit-scrollbar-track,
    &::-webkit-scrollbar-thumb {
      width: 10px;
      border-radius: 10px;
      // 将背景与边框设置为透明
      background-color: transparent;
      border: 2px solid transparent;
      // 设置该属性后背景延伸至内边距（padding）外沿，不会绘制到边框处，也就是说设置该属性后，背景将被限制在内容和边距之内，边框背景不会改变。
      background-clip: padding-box;
    }
    // hover 时显示灰色的滚动条
    &::-webkit-scrollbar-thumb:hover {
      background: rgba(157, 165, 183, 0.7);
    } 
  }

```

### 参考链接
- [浏览器滚动条hover时变粗、改变颜色](https://juejin.cn/post/7004597253717360648)
- [如何用 CSS 打造实力与颜值并存的网页滚动条](https://fehey.com/how-to-custom-best-scrollbar-with-css/)