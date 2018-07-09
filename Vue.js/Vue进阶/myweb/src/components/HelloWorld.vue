<template>
  <div class="hello">
    <pre>{{content}}</pre>
    <!--已删除模版默认内容-->
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  data () {
    return {
      // 为组件添加content数据
      content: ''
    }
  },
  // mounted函数 在组件挂载之后执行
  mounted () {
    // 使用axios发送post请求(this这里指当前组件) 
    this.axios.post("http://api.komavideo.com/news/list").then(news => {
      // 并将api返回的数据data赋给content
      this.content = news.data;
    });
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
