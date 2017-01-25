// 必须引入
var webpack = require('webpack');

// 生成的chunk文件会自动的打入html文件
var HtmlWebpackPlugin = require('html-webpack-plugin');

// 先编译并打包所有的CSS代码
var ExtractTextPlugin = require('extract-text-webpack-plugin');
// 配置entry的信息项
// pagesDir是各个页面模块的入口文件集合目录的路径
// pageArr是各个页面模块的所在文件夹和文件名字
// libsDir是框架和库的入口文件集合目录的路径
var pagesDir = 'src/pages/',
    pageArr = [
      'collection',
      'login',
      'setting',
      'storylists',
      'track',
      'writing'
    ],
    configEntry = {};
pageArr.forEach( function(page, index) {
  configEntry[page] = pagesDir + page + '/[name]-entry.js';
});

// 框架和库的入口文件
configEntry['libs'] = libsDir + 'libs-entry.js';

module.exports = {

    // 生成Source Maps（使调试更容易）
    // 配置生成Source Maps, 选择合适的选项
    // 在学习阶段以及在小到中性的项目上，eval-source-map是一个很好的选项，不过记得只在开发阶段使用它
    // devtool: 'eval-source-map',

    // 基本配置

    // 入口
    // entry: configEntry,
    entry: './index.js',

    // 输出配置
    /*
    output: {
        path: path.resolve(__dirname, "/dist/"),
        filename: 'bundle.js'
    },
    */

    output: {
        path:'./',
        filename: 'bundle.js'
    },

    watch: true,

    // 处理样式表的工具 css-loader和style-loader： npm install --save-dev style-loader css-loader
    // 安装Babel（一个编译JavaScript的平台）： npm install --save-dev babel-core babel-loader babel-preset-es2015 babel-preset-react
    // 安装可以转换JSON的loader： npm install --save-dev json-loader
    module: {
        loaders: [
            {
                test: /\.css$/,
                //loader: 'style!css?modules!postcss' // 添加对样式表的处理
                loader: ExtractTextPlugin.extract('style', 'css?modules!postcss')
            },
            {
                test: /\.js|jsx$/,
                // exclude: /node_modules/,
                loader: 'babel',
                query: {
                    presets: ['es2015', 'react']
                }
            },
            //解析.scss文件,对于用 import 或 require 引入的sass文件进行加载，以及<style lang="sass">...</style>声明的内部样式进行加载
            {
                test: /\.scss$/,
                // 这里用了样式分离出来的插件，如果不想分离出来，可以直接这样写 loader:'style!css!sass'
                loader: ExtractTextPlugin.extract("style", 'css!sass')
            },
            {
                test: /\.jade$/,
                loader: "jade"
            },
            {
                test: /\.png$/,
                loader: "url-loader",
                query: { mimetype: "image/png" }
            },
            {
                test: /\.json$/,
                loader: "json"
            }
        ]
    },

/*
    resolve: {
        extensions: ['', '.js', '.jsx'],
            // 模块别名定义，方便后续直接引用别名，无须多写长长的地址
        alias: {
            // entry : 'js/entry.js',  // 后面直接引用 require(“entry”)即可引用到模块
        }
    },
*/

/*
    // 使用PostCSS来为CSS代码自动添加适应不同浏览器的CSS前缀： npm install --save-dev postcss-loader autoprefixer
    postcss: [
        // 调用autoprefixer插件
        require('autoprefixer')
    ],
*/

    // 插件（Plugins）
    // 添加一个实现版权声明的插件
    // HtmlWebpackPlugin： npm install --save-dev html-webpack-plugin
    // OccurenceOrder、UglifyJS plugins、ExtractTextPlugin： npm install --save-dev extract-text-webpack-plugin
    plugins: [

        // BannerPlugin：在输出文件开头添加一下注释
        new webpack.BannerPlugin(
                                    'Copyright (c) 2016-2017 ********* ' + '\n' +
                                    '创建人:谈裕锦' + '\n' +
                                    '日期:' + '\n' +
                                    '修改人:谈裕锦' + '\n' +
                                    '日期:' + '\n' +
                                    '描述:' + '\n' +
                                    '版本:' + '\n'
                                ),

        // new 一个这个插件的实例，并传入相关的参数
/*
        new HtmlWebpackPlugin({
            // template: __dirname + '/index.html'
        }),
        new webpack.optimize.OccurenceOrderPlugin(),
        new ExtractTextPlugin("style.css"),
        new ExtractTextPlugin("[name]-[hash].css"),
*/
        new webpack.DefinePlugin({
            'process.env': {
                'NODE_ENV': JSON.stringify('production')
            }
        }),
        // 压缩代码
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings : false
            }
        })

    ],

    // 使用webpack构建本地服务器
    // npm install --save-dev webpack-dev-server
    devServer: {
        contentBase: './',     // 本地服务器所加载的页面所在的目录
        colors: true,             // 终端中输出结果为彩色
        historyApiFallback: true, // 不跳转
        progress: true,
        inline: true,              // 实时刷新
        hot: true,
        port: 7777
    }

};

// 注：“__dirname” 是node.js中的一个全局变量，它指向当前执行脚本所在的目录。