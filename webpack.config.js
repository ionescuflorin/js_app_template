const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
    // in webpack there are 4 concepts
    // 1. entry point - where webpack will start bundling all the files
    entry: './src/js/index.js',
    // 2. the output - where to save our bundle file
    output: {
        // we need to have an absolute path
        path: path.resolve(__dirname, 'dist'),
        filename: 'js/bundle.js'
    },
   devServer: {
       // the final code we want to ship
       contentBase: './dist'
   },
    // 3. loaders
    // 4. plugins - allow us to do complex processing on input files
    plugins: [
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: './src/index.html'
        })
    ]
}
