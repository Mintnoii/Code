const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin')
const merge = require('webpack-merge')
const commonConfig = require('./webpack.common.js')

const prodConfig = {
    mode: 'production',
    plugins:[
        new HtmlWebpackPlugin({
            template: './src/index.html'
        }),
        new MiniCssExtractPlugin({
            filename: "[name].css",
            chunkFilename: "[name].chunk.css"
        })
    ],
    output:{
        filename:"[name].[contenthash].js", // 使用占位符来命名  即项目直接引用的 app.js
        chunkFilename: "[name].[contenthash].js", // 代码在 node-modules 下的模块打包生成的 chunks 会按照这个格式命名
    },
    module: {
        rules: [
            {
              test: /\.(css|scss)$/,
              use: [
                // 不用 style-loader
                MiniCssExtractPlugin.loader,
                'css-loader',
                'postcss-loader',
                'sass-loader',
              ],
            }
        ]
    }
}
module.exports = merge(commonConfig, prodConfig)