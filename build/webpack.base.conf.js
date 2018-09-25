const path = require('path');
const rulesConfig = require('./webpack.rules.conf');
const webpack = require('webpack');
const extractTextPlugin = require('extract-text-webpack-plugin');
const htmlWebpackPlugin = require('html-webpack-plugin');
// const glob = require("glob-all");
// 消除冗余的css
// const purifyCssWebpack = require("purifycss-webpack");
// 页面汇集
const htmlArray = require('./webpack.html.conf')

var getHtmlConfig = function (title, name, chunks, dir) {
  return {
    template: path.resolve(__dirname, `../src/pages/${name}/index.html`),
    filename: `${dir || '.'}/${name}.html`,
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
    path: path.resolve(__dirname, '../dist')
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
    new extractTextPlugin({
      filename: 'css/[name].css',
    }),
    // new webpack.ProvidePlugin({  // 可以使用这种方式来全局引入lodash或jquery
    //   _: 'lodash'
    // }),
    new webpack.HotModuleReplacementPlugin()
    // 多页面应用中该配置删除了有用的css样式
    // new purifyCssWebpack({
    //   paths: glob.sync([
    //     path.join(__dirname, "../src/pages/*.html"),
    //     path.join(__dirname, "../src/*.js")
    //   ])
    // }),
  ]
};

//自动生成html模板
htmlArray.forEach((element) => {
  module.exports.plugins.push(new htmlWebpackPlugin(getHtmlConfig(element.title, element._html, element.chunks, element.dir)));
})