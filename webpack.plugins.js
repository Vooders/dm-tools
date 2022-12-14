const path = require('path')

const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = [
    new ForkTsCheckerWebpackPlugin(),
    new CopyWebpackPlugin({
        patterns: [
            {
                from: path.resolve(__dirname, 'src', 'img'),
                to: path.resolve(__dirname, '.webpack/renderer', 'img')
            }
        ]
    })
];
