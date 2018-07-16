const path = require('path')
const webpack = require('webpack')

module.exports = {
  entry: {
      // 多入口文件
      index: './src/pages/index/index.js',
      login: './src/pages/login/index.js'
  },
  module: {
    rules: [
      {
        test: /\.(css|scss|sass)$/,
        // 不分离的写法
        // use: ["style-loader", "css-loader",sass-loader"]
        // 使用postcss不分离的写法
        // use: ["style-loader", "css-loader", sass-loader","postcss-loader"]
        // 此处为分离css的写法
        /*use: extractTextPlugin.extract({
            fallback: "style-loader",
            use: ["css-loader", "sass-loader"],
            // css中的基础路径
            publicPath: "../"
        })*/
        // 此处为使用postcss分离css的写法
        use: extractTextPlugin.extract({
            fallback: "style-loader",
            use: ["css-loader", "sass-loader", "postcss-loader"],
            // css中的基础路径
            publicPath: "../"
        })
      },
      {
          test: /\.js$/,
          use: ["babel-loader"],
          // 不检查node_modules下的js文件
          exclude: "/node_modules/"
      }, {
          test: /\.(png|jpg|gif)$/,
          use: [{
              // 需要下载file-loader和url-loader
              loader: "url-loader",
              options: {
                  limit: 5 * 1024,//小于这个时将会已base64位图片打包处理
                  // 图片文件输出的文件夹
                  outputPath: "images"
              }
          }]
      }
    ],
    plugins: [
      new extractTextPlugin({
          filename: 'css/[name].[hash:8].min.css',
      }),
    ]
  }
}