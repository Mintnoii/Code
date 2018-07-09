import Vue from 'vue'
//导入组件
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import About from '@/components/About'
import News from '@/components/News'
//动态路由的组件
import User from '@/components/User'
//引入嵌套路由的组件
import UserProfile from '@/components/User/Profile'
import UserStats from '@/components/User/Stats'


import SettingDetail from '@/components/setting/Detail'
import SettingHeader from '@/components/setting/Header'
import SettingSidebar from '@/components/setting/Sidebar'
//全局注册
Vue.use(Router)

//es6语法 导出对象
export default new Router({
  //定各种路径的映射（路由表）
  routes: [{
    path: '/',
    name: 'HelloWorld',
    //匹配路径对应的组件
    component: HelloWorld
    },
    {
      path: '/about',
      name: 'About',
      // component: About
      //注意这里是components
      components: {
        myHeader: SettingHeader,
        mySidebar: SettingSidebar,
        myDetail: SettingDetail
      }
    }, 
    {
      path: '/news',
      name: 'News',
      component: News,
      alias: '/theNews'
      // 相当于path的别名
    },
    // 重定向
    {
      path: '/other',
      redirect: '/User/1'
      //redirect: { name: 'News' }
      //redirect: '/news'
    },
    //动态路由的配置  :uid(将路由中的参数赋值给变量uid)
    {
      path: '/User/:uid',
      name: 'User',
      component: User,
      // 子路由（配置嵌套路由）
      children: [
        {
          path: 'profile',
          component: UserProfile
        },
        {
          path: 'stats',
          component: UserStats
        }
      ]
    },
    // 配置多路由参数的路由
    {
      path: '/user/:uid/:nationality',
      name: 'User',
      component: User,
      props: true
    }
  ]
})