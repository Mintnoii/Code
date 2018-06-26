## 引入axios

### 安装

- https://github.com/axios/axios

```bash
$ cd myweb
# 建议也安装一个vue-axios（vue对axios进行封装的库）
$ npm install --save --save-exact axios vue-axios
```

### 导入

```javascript
//在main.js入口文件中导入安装的这两个组件
import axios from 'axios'
import VueAxios from 'vue-axios
```

### 全局注册

```javascript
//同样在main.js文件里 使用Vue.use()进行全局注册
Vue.use(VueAxios, axios)
//让所有的组件都能够访问到这两个库,其实这是vue-axios库实现的功能
//（axios只是为网页增加远程数据存取能力（Ajax））
```

### 使用

```vue
<!--在src目录下的components目录下的HelloWorld.vue文件中测试使用axios -->
<template>
  <div class="hello">
    <!-- 显示content内容 -->
    <pre>{{content}}</pre>
    <!--已删除模版默认内容-->
  </div>
</template>


<script>
export default {
  name: 'HelloWorld',
  data () {
    return {
      //为组件添加content数据
      content: ''
    }
  },
  //mounted函数 在组件挂载之后执行
  mounted () {
    //使用axios发送post请求(this这里指当前组件)
    this.axios.post("http://api.komavideo.com/news/list").then(news => {
      // 并将api返回的数据data赋给content
      this.content = news.data;
    });
  }
}
</script>
```



