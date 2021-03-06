const path = require('path');
const webpack = require('webpack');
const htmlWebpackPlugin = require('html-webpack-plugin');
const extractTextPlugin = require("extract-text-webpack-plugin");
const cleanWebpackPlugin = require('clean-webpack-plugin');
const page = require("./webpack.config.data");
module.exports = {
    entry: {
        video: path.resolve(__dirname, './src/scripts/video.js')
    },
    output: {
        filename: './js/[name].bundle.js',
        path: path.resolve(__dirname, 'dist'),
        publicPath: 'https://t1toptest.yidianzixun.com/cooperation/dajie/adidas' + (+new Date()) + '/'
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
            ]
        }, {
            // test: /\.(png|jpg|gif)$/,
            // use: [{
            //     loader: 'url-loader',
            //     options: {
            //         limit: 8192
            //     }
            // }]
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
            template: './src/video.html',
            filename: 'video.html',
            chunks: ['video'],
            title: page.title,
            shareTitle: page.shareTitle,
            shareDesc: page.shareDesc,
            shareUrl: page.shareUrl,
            shareImg: page.shareUrl
        }),
        new extractTextPlugin("./css/[name].styles.css"),
        // new extractTextPlugin("[name].styles.css"),
        new webpack.ProvidePlugin({
            $: "jquery",
            jQuery: "jquery",
            "window.jQuery": "jquery"
        })
    ],
    devtool: 'source-map'
};