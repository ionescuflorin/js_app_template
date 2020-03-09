const path = require('path');

module.exports = {
    // in webpack there are 4 concepts
    // 1. entry point - where webpack will start bundling all the files
    entry: './src/js/index.js',
    // 2. the output - where to save our bundle file
    output: {
        // we need to have an absolute path
        path: path.resolve(__dirname, 'dist/js'),
        filename: 'bundle.js'
    },
    mode: 'development'
    // 3. loaders
    // 4. plugins
};
