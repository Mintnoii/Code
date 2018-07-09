<template>
  <div id="app">
    <img src="./assets/logo.png">
    <!-- 加入几个按钮并使用bootstrap的样式 -->
    <hr>
    <button class="btn btn-primary">确定</button>
    <button class="btn btn-success">使用</button>
    <button class="btn btn-danger">注意</button> 
    <hr> 
    <!-- 使用自定义的css样式 -->
    <div class="myclass1">你好！</div>
    <hr>
    <p>
      <!-- 使用 router-link 组件来导航. -->
      <!-- 通过传入 `to` 属性指定链接. -->
      <!-- <router-link> 默认会被渲染成一个 `<a>` 标签 -->
      <router-link to="/">Home</router-link>
      <router-link to="/news">新闻</router-link>
      <router-link to="/about">关于</router-link>
      <router-link to="/User/1">用户一1</router-link>
      <router-link to="/User/2">用户二1</router-link>

      <router-link to="/other">Other</router-link>
      <!-- 多路由参数部分 -->
      <router-link to="/user/1/usa">User1</router-link>
      <router-link to="/user/2/china">User2</router-link>
      <router-link to="/user/3/korea">User3</router-link>
    </p>
    <!-- 路由出口 -->
    <!-- 路由匹配到的组件将渲染在这里 -->
    <router-view/>


    <!-- 编程路由 -->
    <button @click="btnClick(1)">用户一2</button>
    <button @click="btnClick(2)">用户二2</button>
    <hr>
    <!-- 直接将上面写到$router.push内的参数写到router-link的to属性内同样生效 -->
    <router-link :to="{ name: 'User', params: { uid: 1 }}">用户一3</router-link>
    <router-link :to="{ path: '/User/2/stats' }">用户二3</router-link>

    <table width="100%">
      <tr>
          <td colspan="2" style="background-color:darkgoldenrod">
              <router-view name="myHeader"></router-view>
          </td>
      </tr>
      <tr>
          <td width="20%" style="background-color:thistle">
              <router-view name="mySidebar"></router-view>
          </td>
          <td width="80%" style="background-color:aquamarine">
              <router-view name="myDetail"></router-view>
          </td>
      </tr>
    </table>
  </div>
</template>

<script>
// 导入自定义的css样式文件
//这里必须是该文件对于my.css的相对路径
import './assets/my.css'

export default {
  name: 'App',
  methods: {
        btnClick(uid) {
            //利用$router.push()方法改变跳转路径
            //this.$router.push({ name: 'user', params: { uid: uid } });
            this.$router.push({ path: `/user/${uid}` });
            //this.$router.push({ path: `/user/${uid}/stats` });

            //url来传递get参数的写法
            //this.$router.push({ path: '/user', query: { uid: uid }}); 
            //url历史控制的用法
            //this.$router.go(-1);
        }
    }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
