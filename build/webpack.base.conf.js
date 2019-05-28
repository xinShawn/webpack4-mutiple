const path = require('path');
const rulesConfig = require('./webpack.rules.conf');
const webpack = require('webpack');
// const extractTextPlugin = require('extract-text-webpack-plugin');
const htmlWebpackPlugin = require('html-webpack-plugin');
// 页面汇集
const htmlArray = require('./webpack.html.conf')
// css分离
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

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
    filename: './js/[name].[hash].js',
    path: path.resolve(__dirname, '../dist'),
    publicPath: '/' // 虚拟路径，将用于确定应该从哪里提供 bundle，'/'代表网站根目录。
  },
  // resolve: {   // 此配置可以在import的时候直接使用缩写名
  //   alias: {
  //     xx: path.resolve(__dirname, '文件夹'),
  //     xx$: path.resolve(__dirname, '具体文件.扩展名')
  //   }
  // },
  module: {
    rules: rulesConfig
  },
  plugins: [
    // new extractTextPlugin({
    //   filename: 'css/[name].css',
    // }), // 分离css的插件
    new webpack.HotModuleReplacementPlugin(), // 热更新插件
    new MiniCssExtractPlugin({
      filename: 'css/[name].[hash].css', // 分离后的css名字和路径
      chunkFilename: '[id].[hash].css', // 分离后的chunk名，打包后的html文件会自动引入
    })
  ]
};

//自动生成html模板
htmlArray.forEach((element) => {
  module.exports.plugins.push(new htmlWebpackPlugin(getHtmlConfig(element.title, element._html, element.chunks)));
})