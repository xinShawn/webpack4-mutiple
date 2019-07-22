# 用户构建多项目应用的webpack配置

## webpack版本： 4.x

## 包含功能：
- webpack-merge 负责合并配置项，如A是基本配置，开发模式配置 = A + 额外配置，即在A的基础上进行配置补充。
- babel 将ES6语法编译成ES5，并提供babel-polyfill垫片。
- html-webpack-plugin 自动将模板html文件引入相关的chunk。
- mini-css-extract-plugin 将 css 分离出 js。
- sass-loader，scss-loader 编译sass语法。
- post-css autoprefixer 自动补齐css hack前缀。
- purify-css-Webpack 消除冗余的css代码。
- webpack-dev-server 提供简单的web服务器，代码热更新。（由于配置了多入口，导致html、css无法热更新，需要重新手动刷新页面。但js的热更新没有影响。）
- file-loader 解决图片路径问题, url-loader 转图片为 base64。
- copy-webpack-plugin 拷贝静态文件。

## 使用方法

### 安装node.js

### npm 安装依赖

使用前需要先对下载对应依赖。

在项目根目录下打开命令行，输入：` npm install `。
等待一段时间后，若出现报错，一般是依赖版本问题，根据提示修改就好。

### 开发目录说明

开发时源码应放在 src/ 下。

src/assets/ 存放静态文件，一般为图片资源、字体文件等。

src/img/ 存放一些在css中会用到图片，因为考虑到url-loader会对图片进行转化处理，所以和assets分开。

src/pages/ 存放所有页面的 html、js、css文件。

其中 src/pages/ 的格式如下：

        ————— pageA(dir) ———— html、css、js文件

        |
pages ——————— pageB(dir) ———— html、css、js文件

        |
        ————— pageC(dir) ———— html、css、js文件

### 命令

```
npm run dev
```
启动项目的开发模式，具有热更新，自动访问项目的功能。

```
npm run build
```
启动项目的打包模式，一切文件会进行压缩和打包。

更多的命令在项目根目录下的 package.json 中的  ` scripts ` 中。