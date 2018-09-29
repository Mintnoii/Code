# 写一个Vue活动信息卡片组件

![设计稿](http://owoccema2.bkt.clouddn.com/Readme/Code/%E5%B7%A5%E4%BD%9C%E7%AC%94%E8%AE%B0/vuecard.png)

要为公司的移动端加一个页面，看了看设计稿有很多样式相同的卡片，那肯定是要撸一个组件了。

```vue
<template>
  <div>
    <div class="card">
      <a :href="link"><img :src="imgUrl" alt="" class="titleImg"></a>
      <div class="content">
        <div class="contentwrapper">
          <!--后端返回的活动数据state不同 加载不同的图片样式-->
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
          <a :href="link"><p class="activityTitle">{{activityTitle}}</p></a>
          <p class="description">{{description}}</p>
        </div>
        <div class="details">
          <span class="updatetime">{{updatetime}}</span>
          <a :href="link"><div class="btn"></div></a>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    /* 这么多其实也可以通过一个对象传递进来*/
    props: ['imgUrl', 'status', 'location', 'time', 'activityTitle', 'description', 'updatetime', 'link']
  }
</script>
<style scoped>
  .card{
    height: 440px;
    width: 380px;
    background: white;
  }
  .card:hover{
    box-shadow: #9E9E9E 0px 0px 10px;
  }
  .titleImg{
    width: 100%;
    height: 225px;
  }
   /*方便对图片下面的活动信息进行从上到下的摆放*/
  .content{
    margin-top: -5px;
    padding: 18px 18px 25px 18px;
    display: flex;
    -webkit-box-pack: justify;
    flex-direction: column;
    height: 214px;
    justify-content: space-between;
  }
  .contentwrapper{
    height: 22px;
  }
  .state{
    display: inline-block;
    width: 60px;
    height: 22px;
  }
  .state1{
    margin-top: 5px;
    background: url('../images/state1.png') no-repeat;
    background-size: contain;
  }
  .state2{
    margin-top: 5px;
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
    color: #000;
    font-size: 17px;
    display: inline-block;
  }
  .location .site{
    background: url('../images/site.png') no-repeat;
    width: 13px;
    height: 15px;
    background-size: cover;
    display: inline-block;
  }
  .time{
    display: inline-block;
    color: #000;
    font-size: 17px;
  }
  .time .date{
    display: inline-block;
    background: url('../images/date.png') no-repeat;
    width: 15px;
    height: 15px;
    background-size: cover;
    margin-left:23px;
  }
  .article{
    border-bottom: 1px solid rgb(231,231,231,231);
    padding-bottom: 22px;
  }
  .activityTitle{
    font-size: 21px;
    letter-spacing: 1.1px;
    color: #2f2f2f;
    font-weight: bold;
    margin-bottom: 12px;
  }
  .description{
    font-size: 16px;
    color: rgb(128, 128, 128);
    letter-spacing: 0.8px;
    line-height: 20px;
  }
  .details{
    height: 28px;
  }
  .updatetime{
    display: inline-block;
    width: 95px;
    height: 12px;
    font-size: 16px;
    letter-spacing: 0.8px;
    line-height: 12px;
    color: rgb(128, 128, 128);
    margin-top: 12px;
  }
  .btn{
    background: url('../images/btn.png') no-repeat;
    background-size: cover;
    width: 148px;
    height:28px;
    float: right;
  }
  .btn:hover{
    background: url('../images/btn1.png') no-repeat;
    background-size: cover;
  }
</style>
```

