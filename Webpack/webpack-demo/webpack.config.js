// 引入自带的node核心模块
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

const PATH = {
    app:path.join(__dirname, "./src/index.js"),
    build:path.resolve(__dirname, "./dist")
}


module.exports = {
    entry:{
        //这里面的key值决定了下面name的名字叫什么
        app:PATH.app
    },
    output:{
        filename:"[name].js", // 即app.js
        path:PATH.build
    },
    mode: 'development',

    //做模块的处理 用loader进行处理
    // module: {
    //     rules:[
    //         {
    //             test: /\.js$/,
    //             use: {
    //                     loader:"babel-loader",
    //                     options:{
    //                     presets:["@babel/env","@babel/react"]
    //                 }
    //             }
    //         },
    //         {
    //             test: /\.(css|scss)$/,
    //             use: ["style-loader","css-loader","sass-loader"] //loader的执行顺序是从下至上 从右至左
    //         }
    //     ]
    // },
    plugins:[
        new HtmlWebpackPlugin()
    ]
}