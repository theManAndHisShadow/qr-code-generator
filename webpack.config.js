// webpack.config.js
const path = require('path')

module.exports = {
    entry: {
        main: './src/ts/qr.ts',
    },

    mode: 'production',

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
        path: path.resolve(__dirname, './dist/js'),
        filename: 'qr.js',
    },
}