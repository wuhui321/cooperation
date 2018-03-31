const path = require('path');
const webpack = require('webpack');
const htmlWebpackPlugin = require('html-webpack-plugin');
const extractTextPlugin = require("extract-text-webpack-plugin");
const cleanWebpackPlugin = require('clean-webpack-plugin');
// var ImageminPlugin = require('imagemin-webpack-plugin').default;
const page = require("./webpack.config.data");
module.exports = {
    entry: {
        app: path.resolve(__dirname, './src/scripts/app.js')
    },
    output: {
        filename: '[name].' + (+new Date()) + '.bundle.js',
        path: path.resolve(__dirname, 'dist'),
        publicPath: 'http://s.letlike.com/tmp/test/'
    },
    module: {
        rules: [{
            test: /\.css$/,
            use: [
                'style-loader',
                'css-loader'
            ]
        }, {
            test: /\.less$/,
            use: extractTextPlugin.extract({
                use: [
                    "css-loader",
                    "less-loader"
                ]
            })
        }, {
            test: /\.js$/,
            exclude: /(node_modules|bower_components)/,
            use: {
                loader: 'babel-loader',
                query: {
                    presets: ['es2015']
                }
            }
        }, {
            test: /\.(png|svg|jpg|gif)$/,
            use: [
                'file-loader?name=images/[hash].[ext]'
                // 'file-loader?name=images/[hash].[ext]&outputPath=http://s.letlike.com/tmp/test/'
                // 'file-loader'
            ]
        }, {
            // test: /\.(htm|html)$/i,
            // use: ['html-withimg-loader']
        }]
    },
    resolve: {
        extensions: ['.json', '.js', '.css']
    },
    plugins: [
        new cleanWebpackPlugin(['dist']),
        new htmlWebpackPlugin({
            template: './src/app.html',
            filename: 'app.html',
            chunks: ['app'],
            title: page.title,
            shareTitle: page.shareTitle,
            shareDesc: page.shareDesc,
            shareUrl: page.shareUrl,
            shareImg: page.shareImg,
            minify: {
                removeComments: true,
                collapseWhitespace: true,
                minifyCSS: true,
                minifyJS: true
            }
        }),
        new extractTextPlugin("[name]." + (+new Date()) + ".styles.css"),
        new webpack.ProvidePlugin({
            $: "jquery",
            jQuery: "jquery",
            "window.jQuery": "jquery"
        }),
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false,
                drop_console: false,
            }
        }),
        // new ImageminPlugin({
        //     pngquant: {
        //         quality: '50'
        //     }
        // })
    ]
};