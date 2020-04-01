const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require ('clean-webpack-plugin')
const MiniCssExtractPlugin = require ('mini-css-extract-plugin')

const isDev = process.env.NODE_ENV === 'development'

module.exports = {
    mode: 'development',
    entry: './src/index.js',
    output: {
         filename: "bundle.[hash].js",
         path: path.resolve(__dirname, 'dist') 
    },
    devServer: {
        port: 4200,
        hot: isDev
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/index.html',
            minify: {
                collapseWhitespace: !isDev
            }
        }),
        new MiniCssExtractPlugin({
            filename: 'style.[hash].css'
        }),
        new CleanWebpackPlugin()
    ], 
    module:{
        rules: 
        [
            {
                test: /\.css$/,
                use: [{
                    loader: MiniCssExtractPlugin.loader,
                    options: {
                        hmr: isDev,
                        reloadAll: true
                    },
                }, 'css-loader']
            },
            {
                test: /\.less$/,
                use: [{
                    loader: MiniCssExtractPlugin.loader,
                    options: {
                        hmr: isDev,
                        reloadAll: true
                    },
                }, 'css-loader',
                    'less-loader']
            },
            {
                test: /\.s[ac]ss$/,
                use: [{
                    loader: MiniCssExtractPlugin.loader,
                    options: {
                        hmr: isDev,
                        reloadAll: true
                    },
                }, 'css-loader',
                    'sass-loader']
            }
        ]
    }

};