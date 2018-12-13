## 什么是Webpack？有什么作用？

**WebPack可以看做是模块打包机：它做的事情是，分析你的项目结构，找到JavaScript模块以及其它的一些浏览器不能直接运行的扩展语言(如ES6、TypeScript、Sass等)，将其转换和打包为合适的格式后供浏览器使用。**



自从出现模块化以后，我们可以将原本一坨代码分离到个个模块中，但是由此引发了一个问题。每个 JS 文件都需要从服务器去拿，这样会导致页面加载速度变慢。Webpack 最主要的目的就是为了解决这个问题，将所有小文件打包成一个或多个大文件，官网的图片就很好的诠释了这个事情。

![webpack](./images/webpack.png)

> - 模块化，让我们可以把复杂的程序细化为小的文件。
> - 作为一款模块加载器兼打包工具，它能把各种资源，例如JS（含JSX）、coffee、Vue文件、样式（含less/sass）、图片等都作为模块来使用和处理。
> - webpack还可以进行css解析、img解析、代码合并压缩等常常用gulp来实现的工作。

>
>
> - 除此之外，它还可以做

## WebPack和Grunt以及Gulp相比有什么特性？

**其实Webpack和另外两个并没有太多的可比性，Gulp/Grunt是一种能够优化前端开发工作流程的工具，而WebPack是一种模块化的解决方案，不过Webpack的优点使得Webpack在很多场景下可以替代Gulp/Grunt类的工具。**



Grunt和Gulp的工作方式是：在一个配置文件中，指明对某些文件进行类似编译，组合，压缩等任务的具体步骤，这个工具之后可以自动替你完成这些任务。

![Grunt和Gulp的工作流程](./images/gulp工作流程.png)



Webpack的工作方式是：把你的项目当做一个整体，通过一个给定的主文件（如：index.js），Webpack将从这个文件开始找到你的项目的所有依赖文件（如：component.js 、helper.js ），然后将这些模块使用不同的loaders（第三方包）来处理它们，最后打包为一个浏览器可识别的JavaScript文件。（如：app.js）

![webpack的工作流程](./images/webpack工作流程.png)

> - webpack是建立在module之上进行打包的
> - js、js、img 都叫做module模块
> - 处理这些模块是需要安装不同的loader来工作的
> - loader被用于转换某些类型的模块，而插件则可以用于执行范围更广的任务。插件的范围包括，从打包优化和压缩，一直到重新定义环境中的变量。

## 开始使用Webpack

在初步了解了Webpack的工作方式后，我们现在一步步的开始学习简单的使用Webpack搭建项目。

### 安装

```bash
// 全局安装
npm install webpack -g
//安装到你的项目目录
npm install webpack --save-dev
```

```bash
温馨提示：webpack4.0以上版本坑比较多，新手建议安装4.0以下版本，4.0及以上还需要安装webpack-cli（此工具用于在命令行中运行 webpack）
1、卸载默认： 
npm uninstall webpack
2、全局安装：
npm install webpack@3.5.3 -g
3、局部安装： 
npm install webpack@3.5.3 --save-dev
```

### 准备工作

```
// 新建一个空的练习文件夹
mkdir  webpack-demo

cd webpack-demo
// 创建 package.json npm说明文件，包括当前项目的基本信息，依赖模块，自定义的脚本任务
// 这里会问一些问题，可以直接回车跳过或者 npm init -y
npm init 

// 推荐这个安装方式，不推荐全局安装 webpack。这会将你项目中的 webpack 锁定到指定版本，并且在使用不同的 webpack 版本的项目中，可能会导致构建失败。
// 将 webpack 放入项目 devDependencies 依赖中
npm install webpack@3.5.2 --save-dev
```

## 搭建项目

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



