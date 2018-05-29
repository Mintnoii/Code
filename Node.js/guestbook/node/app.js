// 把当前模块所有的依赖项都声明在文件模块最上面
var http = require('http')
var fs = require('fs')
var url = require('url')
var template = require('art-template')

var comments = [
  {
    name: '张三',
    message: '今天天气不错！',
    dateTime: '2015-10-16'
  },
  {
    name: '李四',
    message: '今天天气还好！',
    dateTime: '2015-10-18'
  },
  {
    name: '王五',
    message: '今天天气很差！',
    dateTime: '2015-10-22'
  }
]
// 简写方式，该函数会直接被注册为 server 的 request 请求事件处理函数
http.createServer(function (req, res) {
    // 使用 url.parse 方法解析url请求路径 comments?name=mintnoii&message=你好
    // 第二个参数为 true 表示直接将查询字符串转为一个对象（通过 query 属性来访问）
    var parseObj = url.parse(req.url, true)

    // 单独获取不包含查询字符串的路径部分（该路径不包含 ? 之后的内容）
    var pathname = parseObj.pathname

    if (pathname === '/') {
      fs.readFile('./views/index.html', function (err, data) {
        if (err) {
          return res.end('404 Not Found.')
        }
        //渲染模板字符串
        var htmlStr = template.render(data.toString(), {
          comments: comments
        })
        res.end(htmlStr)
      })
    } else if (pathname === '/post') {
      fs.readFile('./views/post.html', function (err, data) {
        if (err) {
          return res.end('404 Not Found.')
        }
        res.end(data)
      })
    } else if (pathname.indexOf('/public/') === 0) {
      // 统一处理：
      //  如果请求路径是以 /public/ 开头的，则认为要获取的是 public 中的某个资源
      //  所以就直接可以把请求路径当作文件路径来直接进行读取
      fs.readFile('.' + pathname, function (err, data) {
        if (err) {
          return res.end('404 Not Found.')
        }
        res.end(data)
      })
    } else if (pathname === '/comments') {
      // 我们已经使用 url 模块的 parse 方法把请求路径中的查询字符串给解析成一个对象了
      // 所以接下来要做的就是：
      // 1. 获取表单提交的数据 parseObj.query
      var comment = parseObj.query
      // 2. 将当前时间日期添加到数据对象中，然后存储到数组中
      comment.dateTime = '2017-11-2 17:11:22'
      comments.unshift(comment)
      // 3. 让用户重定向跳转到首页 /
      //   当用户重新请求 / 的时候，我数组中的数据已经发生变化了，所以用户看到的页面也就变了

      // 如何通过服务器让客户端重定向？
      //    1. 状态码设置为 302 临时重定向
      //        statusCode
      //    2. 在响应头中通过 Location 告诉客户端往哪儿重定向
      //        setHeader
      // 如果客户端发现收到服务器的响应的状态码是 302 就会自动去响应头中找 Location ，然后对该地址发起新的请求，此时就能看到客户端自动跳转了
      res.statusCode = 302
      res.setHeader('Location', '/')
      res.end()
    } else {
      // 其它的都处理成 404 找不到
      fs.readFile('./views/404.html', function (err, data) {
        if (err) {
          return res.end('404 Not Found.')
        }
        res.end(data)
      })
    }
  })
  .listen(3000, function () {
    console.log('running...')
  })
