const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const Dotenv = require("dotenv-webpack");

module.exports = {
    entry: {
        index: './src/js/script.js'
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js'
    },
    module: {rules: [
        {
            test: /\.css$/i,
            use: ['style-loader', 'css-loader']
        }
    ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/index.html'
        }),
        new Dotenv(),
    ],
    devServer: {
        port: 5000,
        open: true,
        static: path.resolve(__dirname, 'dist')
    },
    mode: 'development'
}
