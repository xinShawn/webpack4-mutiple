const path = require('path');
const merge = require("webpack-merge");
const base = require('./webpack.base.conf')

const config = merge(base, {
    mode: 'development',
    devServer: {
        contentBase: path.join(__dirname, "../dist"), // 告诉服务器从哪个目录中提供内容。只有在你想要提供静态文件时才需要。devServer.publicPath 将用于确定应该从哪里提供 bundle，并且此选项优先。
        publicPath:'/',
        host: "localhost",
        port: "8089",
        overlay: true, // 浏览器页面上显示错误
        open: true, // 开启自动打开浏览器
        // stats: "errors-only", //stats: "errors-only"表示只打印错误：
        hot: true // 开启热更新
    },
})

module.exports = config