// 引入自带的node核心模块
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const webpack = require('webpack')
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
        // publicPath: '',
        filename:"[name].js", // 使用占位符来命名  即app.js
        path:PATH.build
    },
    mode: 'development',
    devtool: 'eval',
    devServer: {
        port: 8086,
        proxy: {
            '/api': 'http://localhost:8086'
        },
        hot: true,
        hotOnly: true
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
                test: /\.(css|scss)$/,
                use: ["style-loader", "css-loader", "sass-loader"] 
                //loader的执行顺序是从下至上 从右至左
                /* use: [
                    {loader: "style-loader"},
                    {loader: "css-loader"},
                    {loader: "sass-loader"},
                    {loader: "postcss-loader"}
                ]*/
            },
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
    plugins:[
        new HtmlWebpackPlugin({
            template: './src/index.html'
        }),
        new webpack.HotModuleReplacementPlugin()
    ],
    optimization: {
        usedExports: true
    }
}