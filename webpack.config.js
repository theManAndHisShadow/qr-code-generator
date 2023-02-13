// webpack.config.js
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
    entry: {
        main: './src/ts/qr.ts',
    },

    mode: 'devlopment',

    module: {
        // Use `ts-loader` on any file that ends in '.ts'
        rules: [
          {
            test: /\.ts$/,
            use: 'ts-loader',
            exclude: /node_modules/,
          },
        ],
      },
      // Bundle '.ts' files as well as '.js' files.
      resolve: {
        extensions: ['.ts', '.js'],
      },

    output: {
        path: path.resolve(__dirname, './dist'),
        filename: 'js/qr.js',
    },

    plugins:[
      new HtmlWebpackPlugin({
        template: './src/index.html'
      }),
      new CopyWebpackPlugin({
        patterns: [
          { from: "./src/css/", to: "./css/" },
        ],
      }),
    ],
}