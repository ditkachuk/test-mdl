const path = require('path');
const webpack = require('webpack');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const isDev = !process.env.NODE_ENV;
const dir = dir => path.resolve(__dirname, dir);
const DIST = isDev ? 'tmp' : 'dist';

module.exports = {
    context: dir('src'),
    entry: {
        app: dir('src/index.js'),
        vendor: [
            'material-design-lite'
        ]
    },
    resolve: {
        extensions: ['.html', '.js', '.css', '.scss', '.json'],
        modules: [
            dir('src'),
            dir('node_modules'),
            'node_modules'
        ]
    },
    output: {
        path: dir(DIST),
        publicPath: '/',
        filename: 'bundle.js'
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: [/node_modules/],
                loader: 'babel-loader'
            },
            {
                test: /\.html$/,
                loader: 'html-loader'
            },
            {
                test: /\.css$/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    loader: 'css-loader'
                })
            },
            {
                test: /\.woff2?(\?v=\d+\.\d+\.\d+)?$/,
                loader: 'url-loader',
                options: {
                    limit: '10000',
                    mimetype: 'application/font-woff',
                    name: 'fonts/[name].[ext]'
                }
            },
            {
                test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                loader: 'file-loader',
                options: {
                    name: 'fonts/[name].[ext]'
                },
                exclude: /images/
            }
        ]
    },
    plugins: [
        new webpack.optimize.OccurrenceOrderPlugin(),
        new CleanWebpackPlugin(DIST, {
            root: dir(''),
            verbose: true,
            dry: false
        }),
        new webpack.optimize.CommonsChunkPlugin({
            name: 'vendor',
            filename: 'vendor.bundle.js'
        }),
        new ExtractTextPlugin({
            filename: 'bundle.css',
            allChunks: true
        }),
        new HtmlWebpackPlugin({
            template: dir('src/index.html'),
            inject: 'head',
            hash: true
        }),
        new CopyWebpackPlugin([
            {
                from: dir('src/assets'),
                to: ''
            }
        ], {
            debug: 'warning'
        }),
        new webpack.SourceMapDevToolPlugin({
            filename: '[file].map'
        })
    ],
    devServer: {
        contentBase: dir(DIST),
        stats: 'errors-only'
    }
}
