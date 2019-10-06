const path = require('path')
const PATH = {
  app:path.join(__dirname, "./src/index.js"),
  build:path.resolve(__dirname, "./dist")
}

module.exports = {
  entry:{
    //这里面的key值决定了下面name的名字叫什么
    app:PATH.app,
    // lodash: './src/lodash.js'
  },
  output:{
      // publicPath: '',
      filename:"[name].js", // 使用占位符来命名  即项目直接引用的 app.js
      chunkFilename: "[name].chunk.js", // 代码在 node-modules 下的模块打包生成的 chunks 会按照这个格式命名
      path:PATH.build,
  },
  //做模块的处理 用loader进行处理
  module: {
    rules:[
        // {
        //     // 匹配 html 文件
        //     test: /\.html$/,
        //     /*
        //     使用 html-loader, 将 html 内容存为 js 字符串，比如当遇到
        //     import htmlString from './template.html';
        //     template.html 的文件内容会被转成一个 js 字符串，合并到 js 文件里。
        //     */
        //     use: 'html-loader'
        // },
        // {
        //     test: /\.js$/,
        //     use: {
        //             loader:"babel-loader",
        //             options:{
        //             presets:["@babel/env","@babel/react"]
        //         }
        //     }
        // },
        {
            test: /\.(png|jpg|gif)$/, 
            use: [
                {
                    loader: 'file-loader',
                    options: {
                        // outputPath: 'images/', //输出到images文件夹
                        // limit: 10000 //是把小于500B的文件打成Base64的格式，写入JS
                    }
                }
            ]
        },
        // {
        //     test: /\.m?js$/,
        //     exclude: /node_modules/,
        //     use: {
        //         loader: 'babel-loader',
        //         //options: {
        //           //  presets: ['@babel/preset-env']
        //         //}
        //     }
        // }
    ]
  },
  optimization: {
    usedExports: true,
    splitChunks: {
      chunks: 'all',
      cacheGroups: {
        vendors: false,
        default: false
      }
    },
    
  }
}