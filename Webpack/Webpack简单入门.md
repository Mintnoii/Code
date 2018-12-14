## 什么是Webpack？

自从出现模块化以后，我们可以将原本一坨代码分离到个个模块中，但是由此引发了一个问题。每个 JS 文件都需要从服务器去拿，这样会导致页面加载速度变慢。Webpack 最主要的目的就是为了解决这个问题，将所有小文件打包成一个或多个大文件，官网的图片就很好的诠释了这个事情。

![webpack](./images/webpack.png)

**WebPack是一个现代 JavaScript 应用程序的静态模块打包器(module bundler)：它会分析你的项目结构，找到JavaScript模块以及其它的一些浏览器不能直接运行的扩展语言(如ES6、TypeScript、Sass等)，将其转换和打包为合适的格式后供浏览器使用。**

## Webpack有什么作用？

当 webpack 处理应用程序时，它会递归地构建一个依赖关系图(dependency graph)，其中包含应用程序需要的每个模块，然后将所有这些模块打包成一个或多个 bundle。

构建就是把源代码转换成发布到线上可执行的 JavaScript、CSS、HTML 代码，包括以下内容：

- **代码转换**：TypeScript 编译成 JavaScript、SCSS 编译成 CSS 等
- **文件优化**：压缩 JavaScript、CSS、HTML 代码，压缩合并图片等
- **代码分割**：提取多个页面的公共代码、提取首屏不需要执行部分的代码让其异步加载
- **模块合并**：在采用模块化的项目有很多模块和文件，需要构建功能把模块分类合并成一个文件
- **自动刷新**：监听本地源代码的变化，自动构建，刷新浏览器
- **代码校验**：在代码被提交到仓库前需要检测代码是否符合规范，以及单元测试是否通过
- **自动发布**：更新完代码后，自动构建出线上发布代码并传输给发布系统

 构建其实是工程化、自动化思想在前端开发中的体现。把一系列流程用代码去实现，让代码自动化地执行这一系列复杂的流程。

## webpack的基本概念

**[入口(entry point)](https://link.juejin.im/?target=https%3A%2F%2Fwww.webpackjs.com%2Fconcepts%2Fentry-points%2F)**

指示 webpack 应该使用哪个模块，来作为构建其内部依赖图的开始，webpack 会找出有哪些模块和 library 是入口起点（直接和间接）依赖的。

> 默认值是 `./src/index.js`，然而，可以通过在 webpack 配置中配置 entry 属性，来指定一个不同的入口起点（或者也可以指定多个入口起点）。

**[出口(output)](https://link.juejin.im/?target=https%3A%2F%2Fwww.webpackjs.com%2Fconcepts%2Foutput%2F)**

告诉 webpack 在哪里输出它所创建的 bundles，以及如何命名这些文件。

> 主输出文件默认为 `./dist/main.js`，其他生成文件的默认输出目录是 `./dist`

**[加载器(loader)](https://link.juejin.im/?target=https%3A%2F%2Fwww.webpackjs.com%2Fconcepts%2Floaders%2F)**

让 webpack 能够去处理那些非 JavaScript 文件（webpack 自身只理解 JavaScript）。loader 可以将所有类型的文件转换为 webpack 能够处理的有效模块，然后你就可以利用 webpack 的打包能力，对它们进行处理。

> 注意，loader 能够 import 导入任何类型的模块（例如 .css 文件），这是 webpack 特有的功能，其他打包程序或任务执行器的可能并不支持。我们认为这种语言扩展是有很必要的，因为这可以使开发人员创建出更准确的依赖关系图。

[插件(plugins)](https://link.juejin.im/?target=https%3A%2F%2Fwww.webpackjs.com%2Fconcepts%2Fplugins%2F)

loader 被用于转换某些类型的模块，而插件则可以用于执行范围更广的任务。插件的范围包括，从打包优化和压缩，一直到重新定义环境中的变量。插件接口功能极其强大，可以用来处理各种各样的任务。

**[模式(mode)](https://link.juejin.im/?target=https%3A%2F%2Fwww.webpackjs.com%2Fconcepts%2Fmode%2F)**

通过选择 `development` 开发环境或 `production` 生产环境之中的一个，来设置 mode 参数，从而启用相应模式下的 webpack 内置的优化。

> 简单来说，开发时可能需要打印 debug 信息，还有定义 `sourcemap` 、`UglifyJSPlugin`文件，而生产环境是用于线上的即代码都是压缩后，运行时不打印 debug 信息等。譬如 axios、antd 等我们的生产环境中需要使用到那么我们应该安装该依赖在生产环境中，而 `webpack-dev-server` 则是需要安装在开发环境中。

**webpack 构建过程：**

1. 从 Entry 里配置的 Module 开始递归解析 Entry 依赖的所有 Module。
2. 每找到一个 Module， 就会根据配置的 Loader 去找出对应的转换规则。
3. 每找到一个 Module， 就会根据配置的 Loader 去找出对应的转换规则。
4. 这些模块会以 Entry 为单位进行分组，一个 Entry 和其所有依赖的 Module 被分到一个组也就是一个 Chunk(编码块)。
5. 最后 Webpack 会把所有 Chunk 转换成文件输出。
6. 在整个流程中 Webpack 会在恰当的时机执行 Plugin 里定义的逻辑。



## WebPack VS Grunt/Gulp？

**其实Webpack和另外两个并没有太多的可比性，Gulp/Grunt是一种能够优化前端开发工作流程的工具，而WebPack是一种模块化的解决方案，不过Webpack的优点使得Webpack在很多场景下可以替代Gulp/Grunt类的工具。**

### Grunt和Gulp的工作方式：

在一个配置文件中，指明对某些文件进行类似编译，组合，压缩等任务的具体步骤，这个工具之后可以自动替你完成这些任务。

![Grunt和Gulp的工作流程](./images/gulp工作流程.png)



### Webpack的工作方式：

把你的项目当做一个整体，通过一个给定的主文件（如：index.js），Webpack将从这个文件开始找到你的项目的所有依赖文件（如：component.js 、helper.js ），然后将这些模块使用不同的loaders（第三方包）来处理它们，最后打包为一个浏览器可识别的JavaScript文件。（如：app.js）

![webpack的工作流程](./images/webpack工作流程.png)



## 开始使用Webpack

在初步了解了Webpack的工作方式后，我们现在一步步的开始学习简单的使用Webpack4.0搭建项目。

### 安装

```bash
// 全局安装
npm install webpack -g
//安装到你的项目目录
npm install webpack --save-dev
```

```bash
1、卸载默认： 
npm uninstall webpack
2、全局安装：不推荐，会将你项目中的 webpack 锁定到指定版本，并且在使用不同的 webpack 版本的项目中，可能会导致构建失败。
npm install webpack -g
3、局部安装： 4.0及以上还需要安装 webpack-cli（此工具用于在命令行中运行 webpack）
npm install webpack webpack-cli --save-dev
```

### 准备工作

```
// 新建一个空的练习文件夹
mkdir  webpack-demo

cd webpack-demo
mkdir src
cd src 
touch index.js
cd ..

// 创建 package.json npm说明文件，包括当前项目的基本信息，依赖模块，自定义的脚本任务
// 这里会问一些问题，可以直接回车跳过或者 npm init -y
npm init 

// 局部安装，将 webpack 放入项目 devDependencies 依赖中
npm install webpack webpack-cli --save-dev
```

## 搭建项目

webpack已经实现了零配置，

首先创建一个webpack.config.js文件来配置我们的webpack，然后创建src文件夹和dist文件夹。

```JavaScript
// 引入自带的node核心模块
const path = require('path')

/*
	配置入口文件路径以及出口文件路径
	
	path.join() 将第一个参数和第二个参数进行链接(路径连接)
	该方法的主要用途在于，会正确使用当前系统的路径分隔符，Unix系统是 /，Windows系统是 \。
	
	 __dirname:当前文件夹的绝对路径
*/
const PATH = {
    app:path.join(__dirname,"./src/index.js"),
    build:path.join(__dirname,"./dist")
}
// 也可以省去此步，直接在项目中创建相应的app文件夹和build文件

// 以下为webpack的配置项
module.exports = {
    entry:  './app/index.js', // 入口文件
    output: {
      path: path.resolve(__dirname, 'build'), // 必须使用绝对地址，输出文件夹
      filename: "bundle.js" // 打包后输出文件的文件名
    }
  }

```



