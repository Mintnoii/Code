# Swiper常见问题总结

### 1. swiper内的slide无限滚动

**问题场景：**

> 点击页面上的一个区域，弹出一个弹窗。弹窗内的图片可以左右滑动。
> 需求很简单，但是写完swiper的基本模板后却发现用来滑动的slide可以一直无限的向左滑或右滑。

```html
<!--一直向左滑，translate3d第一个参数的值会一直减小 -->
<div class="swiper-wrapper" style="transition-duration: 300ms; transform: translate3d(-1881.6px, 0px, 0px);">
	<div class="swiper-slide">...</div>
    <div class="swiper-slide">...</div>
	...
</div>
```

**问题原因：**

> **swiper初始化时，因为其父级元素处于隐藏状态(display:none)，会导致swiper初始化失败,，页面中的滚动效果有问题。**

**解决方法：**

```javascript
// 方法1: 使用api里的监视器
 var mySwiper = myApp.swiper('.guest-wrapper',{
     observer: true,//修改swiper自己或子元素时，自动初始化swiper
     observeParents: true//修改swiper的父元素时，自动初始化swiper
 });
 
// 方法2: 直接写死宽高
  var mySwiper = myApp.swiper('.guest-wrapper',{
     width:500,
     height:500
 });
```

### 2. swiper里面的图片懒加载与预加载

 可以使用自带的 lazyload 方法

```javascript
设为true开启图片延迟加载默认值，使preloadImages无效。或者设置延迟加载选项。

图片延迟加载：需要将图片img标签的src改写成data-src，并且增加类名swiper-lazy。
背景图延迟加载：载体增加属性data-background，并且增加类名swiper-lazy。

还可以加一个预加载，<div class="swiper-lazy-preloader"></div>
或者白色的<div class="swiper-lazy-preloader swiper-lazy-preloader-white"></div>

当你设置了slidesPerView:'auto' 或者 slidesPerView > 1，还需要开启watchSlidesVisibility。


var mySwiper = new Swiper('.swiper-container', {
  lazy: {
    loadPrevNext: true,
  },
})
```

### 3. 取消拖动最后一页或者第一页时的留白状态

[resistanceRatio](http://www.swiper.com.cn/api/touch/2015/0308/205.html)

抵抗率。边缘抵抗力的大小比例。值越小抵抗越大越难将slide拖离边缘，0时完全无法拖离。