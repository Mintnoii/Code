// 引入webpack自带的node核心模块
const path = require('path')
// 该插件能将生成的js注入到模版的tml内
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
    // 页面入口 js 文件
    entry: './src/index.js',

    // 配置打包输出相关
    output: {
        // 打包输出目录，必须使用绝对地址，输出文件夹路径
        path: path.resolve(__dirname, 'dist'), // 解析路径为 ./dist
        // 入口 js 的打包输出文件名，默认为 main.js
        filename: "bundle.js"
    },
    module: {
        rules: [
            {
                test: /\.(css|scss)$/, // 匹配css和scss文件
                include: [path.resolve(__dirname, 'src')],
                use: [
                    "style-loader", // creates style nodes from JS strings
                    "css-loader", // translates CSS into CommonJS
                    "sass-loader" // compiles Sass to CSS, using Node Sass by default
                ]
            },
            {
                // 对".js"或".jsx"结尾的文件使用babel-loader进行转译
                // babel-loader的配置放到".babelrc"文件内
                test: /\.jsx?$/,
                use: "babel-loader"
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            // 根目录下的src下的模板文件
            template: './src/template.html'
        })
    ]
}