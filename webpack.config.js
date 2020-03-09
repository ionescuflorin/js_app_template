const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  // in webpack there are 4 concepts
  // 1. entry point - where webpack will start bundling all the files
  entry: ["babel-polyfill", "./src/js/index.js"],
  // 2. the output - where to save our bundle file
  output: {
    // we need to have an absolute path
    path: path.resolve(__dirname, "dist"),
    filename: "js/bundle.js"
  },
  devServer: {
    // the final code we want to ship
    contentBase: "./dist"
  },
  // 3. plugins - allow us to do complex processing on input files
  plugins: [
    new HtmlWebpackPlugin({
      filename: "index.html",
      template: "./src/index.html"
    })
  ],
  // 4. loaders - import and loads all kinds of files and to process them like converting sass to css file or es6 to es5
  module: {
    rules: [
      {
        // all files that ends with .js
        test: /\.js$/,
        exclude: /node_modules/,
        // apply loader
        use: {
          loader: "babel-loader"
        }
      }
    ]
  }
};
