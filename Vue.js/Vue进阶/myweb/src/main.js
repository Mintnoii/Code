// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
//整个程序的入口  所有的全局变量都要在这里声明
import Vue from 'vue'
import App from './App'

//导入路由组件
import router from './router'

//导入bootsrap的css文件 这样全局都可以使用
import 'bootstrap/dist/css/bootstrap.min.css'

//导入axios以及对axios进行封装的库
import axios from 'axios'
import VueAxios from 'vue-axios'


//使用Vue.use()进行全局注册 
Vue.use(VueAxios, axios)
//让所有的组件都能够访问到这两个库 其实这是vue-axios库实现的功能
//（axios只是为网页增加远程数据存取能力（Ajax））

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  // 在入口组件中注册  以后所有的子组件都可以使用路由组件
  router,
  components: { App },
  template: '<App/>'
})
