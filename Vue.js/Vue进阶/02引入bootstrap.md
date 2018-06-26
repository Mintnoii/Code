## 引入Bootstrap

- vue-webpack工程导入bootstrap4框架

```bash
$ cd myweb
# 安装bootstrap模块 --save-exact指精确指定版本号（package.json文件中版本号前没有^符号）
$ npm install bootstrap --save --save-exact
```

- src目录下的main.js

```javascript
//整个程序的入口  所有的全局变量都要在这里声明
import Vue from 'vue'
import App from './App'
import router from './router'

//导入bootsrap的css文件 这样全局都可以使用
import 'bootstrap/dist/css/bootstrap.min.css'

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
```

- src下的App.vue

```javascript
//App.vue 整个应用程序的入口组件
<div id="app">
  <img src="./assets/logo.png">
  //加入几个按钮并使用bootstrap的样式
  <hr>
  <button class="btn btn-primary">确定</button>
  <button class="btn btn-success">使用</button>
  <button class="btn btn-danger">注意</button> 
  <hr> 
  <router-view/>
</div>
```

- 执行`npm run dev`查看页面效果

### [可选] Bootstrap + Vue

https://bootstrap-vue.js.org/