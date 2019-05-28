// loader 加载规则：从后往前开始执行。

// const extractTextPlugin = require('extract-text-webpack-plugin')
const autoPreFixer = require('autoprefixer')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

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
            process.env.NODE_ENV === 'development' ? 'style-loader': MiniCssExtractPlugin.loader, // 开发环境下使用minicssextractplugin会导致热更新失效。
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
        exclude: /(node_modules|bower_components)/,
        use: {
            loader: 'babel-loader',
            options: {
            presets: ['@babel/preset-env']
            }
        }
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