## 自定义css样式文件

1. 进入src目录下的assets目录
2. 新建自己的css文件
3. 编写css样式代码
4. 在其他的vue文件中导入自定义的css样式文件并使用

```javascript
<!--App.vue文件 script标签内导入-->
//这里必须是该文件对于my.css的相对路径
import './assets/my.css'
```

```html
<!--然后在模版内使用自定义的样式-->
<div class="myclass1">你好！</div>
```

