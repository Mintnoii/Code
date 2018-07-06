## Url重定向

### 定义

- 重定向指令：redirect
- 路由别名：alias

### 使用

配置router/index.js

```javascript
import About from '@/components/News'
...
{
   path: '/news',
   name: 'News',
   component: News,
   alias: '/theNews'
   // 相当于path的别名
},
    //重定向
{
   path: '/other',
   redirect: '/User/1'
   //redirect: { name: 'News' }
   //redirect: '/news'
},
```

在App.vue中放置路由

```vue
<router-link to="/other">Other</router-link>
```

点击/other可重定向跳转到/User/1页面。