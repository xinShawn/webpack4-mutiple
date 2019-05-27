const path = require('path');
const rulesConfig = require('./webpack.rules.conf');
const webpack = require('webpack');
const extractTextPlugin = require('extract-text-webpack-plugin');
const htmlWebpackPlugin = require('html-webpack-plugin');
const glob = require("glob-all");
// 消除冗余的css
const purifyCssWebpack = require("purifycss-webpack");
// 页面汇集
const htmlArray = require('./webpack.html.conf')
// css分离
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const devMode = process.env.NODE_ENV !== 'production'

// 循环html的主要配置数组,提取到具体配置中
var getHtmlConfig = function (title, name, chunks) {
  return {
    template: path.resolve(__dirname, `../src/pages/${name}/index.html`),
    filename: `${name}.html`,
    // favicon: './favicon.ico',
    title: title,
    inject: true,
    // hash: true, //开启hash  ?[hash]
    chunks: chunks,//页面要引入的包
    chunksSortMode: 'manual',//顺序
    minify: process.env.NODE_ENV === "development" ? false : {
      removeComments: true, //移除HTML中的注释
      // collapseWhitespace: true, //折叠空白区域 也就是压缩代码
      // removeAttributeQuotes: true, //去除属性引用
    },
  };
};

module.exports = {
  entry: {
    index: path.resolve(__dirname, '../src/pages/index/index.js'),
    login: path.resolve(__dirname, '../src/pages/login/index.js')
  },
  output: {
    filename: './js/[name].js',
    path: path.resolve(__dirname, '../dist'),
    publicPath: '/' // 虚拟路径，将用于确定应该从哪里提供 bundle，'/'代表网站根目录。
  },
  module: {
    rules: rulesConfig
  },
  plugins: [
    new extractTextPlugin({
      filename: 'css/[name].css',
    }), // 分离css的插件
    new webpack.HotModuleReplacementPlugin(), // 热更新插件
    // 多页面应用中该配置删除了有用的css样式
    // new purifyCssWebpack({
    //   paths: glob.sync([
    //     path.join(__dirname, "../src/pages/*.html"),
    //     path.join(__dirname, "../src/*.js")
    //   ])
    // }),
    new MiniCssExtractPlugin({
      // Options similar to the same options in webpackOptions.output
      // both options are optional
      filename: devMode ? '[name].css' : '[name].[hash].css',
      chunkFilename: devMode ? '[id].css' : '[id].[hash].css',
    })
  ]
};

//自动生成html模板
htmlArray.forEach((element) => {
  module.exports.plugins.push(new htmlWebpackPlugin(getHtmlConfig(element.title, element._html, element.chunks)));
})