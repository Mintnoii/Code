# 活动页模板

## 快速开始

### 1. 新建项目
在[activities](https://gitlab.wallstcn.com/wscnfrontend/activities)下新建一个项目

### 2. 克隆项目
```sh
git clone git@gitlab.wallstcn.com:wscnfrontend/templates/activity.git
```

### 3. 修改远程仓库
```sh
git remote set-url origin 从新项目复制粘贴的url
```

### 4. 添加Deploy Key
在项目的 Settings -> Repository -> Deploy Keys 页面 -> Privately accessible deploy keys 列表中，把名字为 activity 的 key 点击 Enable。

### 5. 配置
[看下面](#配置)

### 6. 开发
```sh
npm run inst && npm run dev
```

### 7. 发布
先编译
```sh
npm run build
```
然后推到仓库
```sh
git add .
git commit -m "first commit"
git push
```
打标签并推送
```sh
git tag v0.1
git push --tags
```

## 配置
### 修改BASE_URL（必须）
修改[config](https://gitlab.wallstcn.com/wscnfrontend/templates/activity/blob/master/config/default.js)。

### 微信分享
修改[shareMeta](https://gitlab.wallstcn.com/wscnfrontend/templates/activity/blob/master/src/shared/shareMeta.js)。

如有多个页面，请修改shared下的shareMeta后，修改每个页面下的shareMeta

### Ivanka API
配置项详见[wscn-ivanka-api](https://gitlab.wallstcn.com/wscnfrontend/packages/wscn-ivanka-api)。

### 金数据表单 API
```js
import jinshuju from '~/services/jinshuju.js'

jinshuju.post('/FORM_ID', formData).then(success, fail)
```

底层接口：
```
POST https://activity.wallstreetcn.com/forms/${FORM_ID}
Content-Type: application/json
Accept: application/json
```

正确会返回 HTTP 20X，错误则返回 HTTP 400/500。HTTP 400 错误时会返回 `error_description` 字段，比如：
```json
{"error_description":"{\"field_1\":[\"请填写联系人\"],\"field_2\":[\"请填写联系电话\"],\"field_3\":[\"请填写职务\"],\"field_4\":[\"请填写公司名称\"],\"field_5\":[\"请填写电子邮箱\"]}"}
```

金数据文档：https://help.jinshuju.net/articles/entry-api

### 谷歌统计
`gtag.init()`之后干啥都行。

### 移动版大于750px适配
在最外层容器加`.mobile-wrapper`。

### Sass
不准用。

### async/await
记得在最开始引入`regenerator-runtime`
```javascript
import 'regenerator-runtime/runtime'
```

### Html中引入资源
```html
<img src="<%- require('~/images/logo.png') %>" alt="logo">
```
