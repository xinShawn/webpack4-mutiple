const devServer = require('webpack-dev-server')
const extractTextPlugin = require('extract-text-webpack-plugin')

module.exports = {
  devServer: {
    contentBase: path.join(__dirname, "../dist"),
    publicPath:'/',
    host: "127.0.0.1",
    port: "8089",
    overlay: true, // 浏览器页面上显示错误
    // open: true, // 开启自动打开浏览器
    // stats: "errors-only", //stats: "errors-only"表示只打印错误：
    hot: true // 开启热更新
  }
}