<template>
    <div>
        <h1>用户页面</h1>
        <ul>
            <li>编号：{{detail.uid}}</li>
            <li>名字：{{detail.name}}</li>
            <li>时间：{{detail.date}}</li>
        </ul>
        <!-- 多路由参数 -->
        <p>uid={{ uid }}, {{ nationality }}</p>
        <p>$route.params.uid={{ $route.params.uid }}</p>
        <p>$route.params.uid={{ $route.params.nationality }}</p>
        <!-- 连接接到嵌套路由的组件 -->
         <router-link :to="profile">简介</router-link>
        <router-link :to="stats">数据</router-link>
        <hr>
        <router-view></router-view>
    </div>
</template>

<script>
    export default {
        name: "User",
        // 路由参数props
        props: ['uid', 'nationality'],
        data() {
            return {
                detail: {},
                profile:'',
                statss:''
            };
        },
        // 组件装载完成时执行（之后不会再执行）
        mounted() {
            // 使用this.$route.params.uid 接收url里的参数
            this.detail = this.getUser(this.$route.params.uid);
            //改变嵌套路由的地址
            this.profile = '/User/' + this.$route.params.uid + '/profile';
            this.stats = '/User/' + this.$route.params.uid + '/stats';
        },
        // 在路由更新前调用
        beforeRouteUpdate(to, from, next) {
            //给uid重新赋值(to的地址)
            this.detail = this.getUser(to.params.uid);
            this.profile = '/User/' + this.$route.params.uid + '/profile';
            this.stats = '/User/' + this.$route.params.uid + '/stats';
            next();
        }, 
        methods: {
            getUser(uid) {
                // 应该根据uid从服务端获取返回数据
                switch (uid.toString()) {
                    case '1':
                        return {uid: 1,name: '阿里云',date: 2013};
                    case '2':
                        return {uid: 2,name: '腾讯云',date: 2010};
                    default:
                        return {uid: -1};
                }
            }
        }
    };
</script>