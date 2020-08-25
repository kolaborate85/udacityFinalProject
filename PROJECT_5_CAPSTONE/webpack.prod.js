const path = require('path');
const common = require('./webpack.common');
const {merge} = require('webpack-merge');
const WorkboxPlugin = require('workbox-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ManifestPlugin = require('webpack-manifest-plugin');

module.exports = merge(common, {
    mode: 'production',
    output: {
        filename: '[name].sentiment.js',
        path: path.resolve(__dirname, 'dist')
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/client/views/index.html',
            filename: 'index.html'
        }),
        new WorkboxPlugin.GenerateSW({

            clientsClaim: true,
            skipWaiting: true,
        }),
        new ManifestPlugin()
    ],
    module: {
        rules: [
            {
                test: /\.scss$/,
                use: ['style-loader', 'css-loader', 'sass-loader']
            }
        ]
    }
});
