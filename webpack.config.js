const HtmlWebpackPlugin = require('html-webpack-plugin');
const Dotenv = require('dotenv-webpack');
const path = require('path');

module.exports = {
    entry: './src/index.tsx',
    mode: 'development',
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/,
            },
            {
                test: /src\/components\/(.*)\.scss$/,
                use: [ 
                    {
                        loader: "style-loader"
                    },
                    {
                        loader: "css-modules-typescript-loader"
                    },
                    {
                        loader: "css-loader",
                        options: {
                            modules: true,
                        }
                    },
                    {
                        loader: "sass-loader"
                    }, 
                ]
            },
            {
                test: /src\/style\/(.*)\.scss$/,
                use: [
                    'style-loader',
                    'css-loader',
                    'sass-loader'
                ]
            },
            {
                test: /\.(jpg)$/i,
                use: [
                    'file-loader',
                ],
            },
            {
                test: /\.(svg)$/i,
                use: [
                    'file-loader',
                ],
            },
        ],
    },
    resolve: {
        alias: {
            '~': path.resolve('./src'),
        },
        extensions: ['.js', '.ts', '.tsx'],
    },
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist'),
        publicPath: '/',
    },
    plugins: [
        new Dotenv({}),
        new HtmlWebpackPlugin({
            inject: true,
            template: path.resolve('./public/index.html'),
        }),
    ],
    devServer: {
        historyApiFallback: true,
        contentBase: './',
        hot: true
    }
};
