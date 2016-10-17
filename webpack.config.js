var path = require('path');
var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');


module.exports = {
    entry: {
        'build': path.resolve(__dirname, './src/main.js'),
        'vendor': path.resolve(__dirname, './src/vendor.js')
    },
    output: {
        path: path.resolve(__dirname, './dist'),
        publicPath: '/dist/',
        filename: '[name].js',
        chunkFilename: '[name].bundle.js'
    },
    resolveLoader: {
        root: path.join(__dirname, 'node_modules'),
    },
    module: {
        // preLoaders: [
        //     {test: /\.(js)$/, loader: "eslint-loader", exclude: /(node_modules|vendors)/}
        // ],
        loaders: [{
                test: /\.vue$/,
                loader: 'vue'
            }, {
                test: /\.css$/,
                loader: ExtractTextPlugin.extract("style-loader", "css-loader")
            }, {
                test: /\.js$/,
                loader: 'babel!eslint',
                exclude: /node_modules/
            }, {
                test: /\.json$/,
                loader: 'json'
            }, {
                test: /\.html$/,
                loader: 'vue-html'
            },
            {
                test: /\.(png|jpg|gif|svg)$/,
                loader: 'url',
                query: {
                    limit: 10000,
                    name: '[name].[ext]?[hash]'
                }
            }, { // bootstrap font-awesome  
                test: /\.(woff|woff2)(\?v=\d+\.\d+\.\d+)?$/,
                loader: 'url',
                query: {
                    limit: 10000,
                    mimetype: 'application/font-woff',
                    // 字体文件放置目录  
                    name: 'font/[name]_[hash].[ext]'
                }
            }, { // bootstrap  
                test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
                loader: 'url',
                query: {
                    limit: 10000,
                    mimetype: 'application/octet-stream',
                    // 字体文件放置目录  
                    name: 'font/[name]_[hash].[ext]'
                }
            }, { // bootstrap  
                test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
                loader: 'file',
                query: {
                    limit: 10000,
                    // 字体文件放置目录  
                    name: 'font/[name]_[hash].[ext]'
                }
            }, { // bootstrap  
                test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
                loader: 'url',
                query: {
                    limit: 10000,
                    mimetype: 'application/image/svg+xml',
                    // 字体文件放置目录  
                    name: 'font/[name]_[hash].[ext]'
                }
            }, { // font-awesome  
                test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                loader: "file",
                query: {
                    limit: 10000,
                    // 字体文件放置目录  
                    name: 'font/[name]_[hash].[ext]'
                }
            }
        ]
    },
    vue: {
        loaders: {
            js: 'babel!eslint'
        }
    },
    plugins: [
        //自动生成入口html文件
        // new HtmlWebpackPlugin({
        //   template: '',
        //   chunk: ['build', 'vendor'],
        //   title: '首页'
        // }),
        //css单独打包
        new ExtractTextPlugin("[name].css"),
        //子模块加载公用模块次数超过2次，则打包进父模块
        new webpack.optimize.CommonsChunkPlugin({
            children: true,
            minChunks: 3
        }),
        //把vendor代码单独打包
        new webpack.optimize.CommonsChunkPlugin({
            name: "vendor",
            minChunks: Infinity
        }),
        //ProvidePlugin的机制是：当webpack加载到某个js模块里，出现了未定义且名称符合（字符串完全匹配）配置中key的变量时，会自动require配置中value所指定的js模块。
        //jquery会被打包到入口js中
        new webpack.ProvidePlugin({
            $: 'jquery',
            jQuery: 'jquery',
            'window.jQuery': 'jquery',
            'window.$': 'jquery',
        }),
    ],
    devServer: {
        historyApiFallback: true,
        noInfo: true,
        port: 9000,
        proxy: {
            '/mock/*': {
                target: 'http://localhost:8080',
                rewrite: function(req) {
                    req.url = req.url.replace(/^\/mock/, '');
                }
            }
        }
    },
    devtool: '#eval-source-map'
}
if (process.env.NODE_ENV === 'production') {
    module.exports.devtool = '#source-map'
        // http://vue-loader.vuejs.org/en/workflow/production.html
    module.exports.plugins = (module.exports.plugins || []).concat([
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: '"production"'
            }
        }),
        //压缩js
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false
            }
        }),
        // Search for equal or similar files and deduplicate them in the output.
        // Note: Don’t use it in watch mode. Only for production builds.
        new webpack.optimize.DedupePlugin(),
        // Assign the module and chunk ids by occurrence count.
        new webpack.optimize.OccurrenceOrderPlugin()
    ])
}
