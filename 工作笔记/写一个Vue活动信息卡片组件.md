# 写一个Vue活动信息卡片组件

![设计稿](http://owoccema2.bkt.clouddn.com/Readme/Code/%E5%B7%A5%E4%BD%9C%E7%AC%94%E8%AE%B0/card.png)

要为公司的移动端加一个页面，看了看设计稿有很多样式相同的卡片，那肯定是要撸一个组件了。

```vue
<template>
  <div>
    <div class="card">
      <img :src="imgUrl" alt="" class="titleImg">
      <div class="content">
        <div class="contentwrapper">
          <span class="state" :class='"state"+status'></span>
          <div class="info">
            <div class="location">
              <span class="site"></span><span> {{location}}</span>
            </div>
            <div  class="time">
              <span class="date"></span><span> {{time}}</span>
            </div>
          </div>
        </div>
        <div class="article">
          <p class="activityTitle">{{activityTitle}}</p>
          <p class="description">{{description}}</p>
        </div>
        <div class="details">
          <span class="updatetime">{{updatetime}}</span>
          <div class="btn" :class='"btn" + status'></div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    props: ['imgUrl', 'status', 'location', 'time', 'activityTitle', 'description', 'updatetime']
  }
</script>
<style scoped>
  .card{
    margin-bottom: 11px;
  }
  .titleImg{
    width: 100%;
  }
  .content{
    background: white;
    margin-top: -5px;
    padding: 15px 10px 13px 10px;
  }
  .contentwrapper{
    height: 15px;
  }
  .state{
    display: inline-block;
    width: 60px;
    height: 15px;
  }
  .state1{
    background: url('../images/state1.png') no-repeat;
    background-size: contain;
  }
  .state2{
    background: url('../images/state2.png') no-repeat;
    background-size: contain;
  }
  .state0{
    background: url('../images/state0.png') center center no-repeat;
    background-size: contain;
    width: 80px;
  }
  .info{
    /* display: inline-block; */
    float: right;
    height: 15px;
    font-size: 15px;
  }
  .location {
    display: inline-block;
    margin-left: 15px;
  }
  .location .site{
    background: url('../images/site.png') no-repeat;
    width: 10px;
    height: 11px;
    background-size: cover;
    display: inline-block;
    margin-left:6px;
  }
  .time{
    display: inline-block;
  }
  .time .date{
    display: inline-block;
    background: url('../images/date.png') no-repeat;
    width: 11px;
    height: 11px;
    background-size: cover;
    margin-left:6px;
  }
  .article{
    margin-top:15px;
    margin-bottom: 14px;
  }
  .activityTitle{
    font-size: 16px;
    color: #2f2f2f;
    font-weight: bold;
    margin-bottom: 7px;
  }
  .description{
    font-size: 12px;
    color: #808080;
    letter-spacing: 0.6px;
  }
  .details{
    height: 28px;
  }
  .updatetime{
    display: inline-block;
    width: 65px;
    height: 9px;
    font-size: 12px;
    line-height: 9px;
    color: #6a6a6a;
  }
  .btn{
    background: url('../images/btn.png') no-repeat;
    background-size: cover;
    width: 95px;
    height:28px;
    float: right;
  }
  .btn1{
    background: url('../images/btn1.png') no-repeat;
    background-size: cover;
  }
</style>
```

