# 面试题：一个带验证码倒计时功能的登录组件

## 介绍

利用Vue.js与Font Awesome图标完成的带验证码倒计时功能的登录组件

## 业务要求

1. 对手机号进行校验
2. 在手机号正确的情况下才允许发送验证码
3. 验证码需要调用远程接口获取（get） - [验证码API](https://easy-mock.com/mock/5b2385e3debe3c5977248a16/wscn/captcha)
4. 获取验证码之后将验证码自动回塞
5. 验证码倒计时组件以秒为基本单位
6. 验证码倒计时组件60内不可重复点击，失败则可重试
7. 最后将手机号与验证码一同发送到提交接口（post） - [提交API](https://easy-mock.com/mock/5b2385e3debe3c5977248a16/wscn/submit)

## 预览

[在线预览](https://luobstack.xyz/login-component/)

![preview](http://owoccema2.bkt.clouddn.com/Readme/vue/login.png)

![preview](http://owoccema2.bkt.clouddn.com/Readme/vue/login2.png)

## 思考

只在前端对发送验证码的频率进行限制并不完全有效，刷新页面就可以跳过倒计时。即使是用localstorage对用户的登录状态进行存储也一样，利用开发者工具也可以进行清空。我觉得想要完全实现理想的重发验证码倒计时功能，还是一定要和后端配合。
