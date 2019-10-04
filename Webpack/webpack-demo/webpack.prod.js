const HtmlWebpackPlugin = require('html-webpack-plugin')
const merge = require('webpack-merge')
const commonConfig = require('./webpack.common.js')
const prodConfig = {
    mode: 'production',
    plugins:[
        new HtmlWebpackPlugin({
            template: './src/index.html'
        }),
    ]
}
module.exports = merge(commonConfig, prodConfig)