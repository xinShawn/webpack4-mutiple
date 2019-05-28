# 用户构建多项目应用的webpack配置

## webpack版本：** 4.x **

## 包含功能：
- webpack-merge 负责合并配置项，如A是基本配置，开发模式配置 = A + 额外配置，即在A的基础上进行配置补充。
- babel 将ES6语法编译成ES5，并提供babel-polyfill垫片。
- html-webpack-plugin 自动创建html文件。
- mini-css-extract-plugin css 分离出 js。
- autoprefixer 自动补齐css hack前缀。
- webpack-dev-server 提供简单的web服务器，代码热更新。
- file-loader 解决图片路径问题, url-loader 转图片为 base64。

## 使用方法

### 安装node.js

### npm 安装依赖

使用前需要先对下载对应依赖。

在项目根目录下打开命令行，输入：` npm install `。
等待一段时间后，若出现报错，一般是依赖版本问题，根据提示修改就好。

### 命令集

```
npm run dev
```
启动项目的开发模式，具有热更新，自动访问项目的功能。

```
npm run build
```
启动项目的打包模式，一切文件会进行压缩和打包。

更多的命令集在项目根目录下的 package.json 中的  ` scripts ` 中。