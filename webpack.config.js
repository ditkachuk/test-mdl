const path = require('path');
const webpack = require('webpack');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const dir = dir => path.resolve(__dirname, dir);

module.exports = {
    context: dir('src'),
    entry: {
        app: dir('src/index.js'),
        vendor: [
            'material-design-lite'
        ]
    },
    resolve: {
        extensions: ['.html', '.js', '.css', '.scss'],
        modules: [
            dir('src'),
            dir('node_modules'),
            'node_modules'
        ]
    },
    output: {
        path: dir('dist'),
        publicPath: '/',
        filename: 'bundle.js'
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: [/node_modules/],
                use: [{
                    loader: 'babel-loader',
                    options: { presets: ['es2015'] }
                }]
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
            }
        ]
    },
    plugins: [
        new webpack.optimize.OccurrenceOrderPlugin(),
        new CleanWebpackPlugin('dist', {
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
        contentBase: dir('dist'),
        stats: 'errors-only'
    }
}
