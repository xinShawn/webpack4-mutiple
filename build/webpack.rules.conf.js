// const extractTextPlugin = require('extract-text-webpack-plugin')
const autoPreFixer = require('autoprefixer')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const devMode = process.env.NODE_ENV !== 'production'

// test: 匹配处理文件的扩展名的正则表达式
// use： loader名称
// include/exclude： 手动指定必须处理的文件夹或屏蔽不需要处理的文件夹
// query： 为loader提供额外的设置选项

module.exports = [
    {
        test: /\.(css|scss|sass)$/,
        // 不分离的写法
        // use: ["style-loader", "css-loader",sass-loader"]

        // 使用postcss不分离的写法
        // use: ["style-loader", "css-loader", sass-loader","postcss-loader"]

        // 使用extractTextPlugin的写法，注意在plugin配置项也要引入
        // use: extractTextPlugin.extract({
        //     fallback: "style-loader",
        //     use: ["css-loader", 
        //     {
        //       loader: "postcss-loader",
        //       options: {
        //         ident: 'postcss',
        //         plugins: [
        //           autoPreFixer // 自动添加前缀
        //         ]
        //       }
        //     },
        //     "sass-loader"],
        //     // css中的基础路径
        //     // publicPath: "./"
        // })

        // 由于 webpack4.x 之后不提倡使用extractTextPlugin。所以改用mini-css-extract-plugin
        use: [
            devMode ? 'style-loader' : MiniCssExtractPlugin.loader,
            'css-loader',
            {
                loader: "postcss-loader",
                options: {
                    ident: 'postcss',
                    plugins: [
                        autoPreFixer // 自动添加前缀
                    ]
                }
            },
            'sass-loader'
        ]
    },
    {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: __dirname + 'node_modules',
        include: __dirname + 'src',
        options: {
            presets: ['env']
        }
    },
    // CSS-in-JS
    {
        test: /\.style.js$/,
        use: [
          'style-loader',
          { loader: 'css-loader', options: { importLoaders: 2 } },
          { loader: 'postcss-loader', options: { parser: 'postcss-js' } },
          'babel-loader',
          'scss-loader'
        ]
    }, 
    {
        test: /\.(png|jpg|gif)$/,
        use: [{
            // 需要下载file-loader和url-loader
            loader: "url-loader",
            options: {
                limit: 5 * 1024, // 图片小于这个单位将为专为base64码
                // 图片文件输出的文件夹
                outputPath: "images"
            }
        }]
    }
]