const HtmlWebpackPlugin = require('html-webpack-plugin')
const { merge } = require('webpack-merge')
const common = require('./webpack.common')

const dev = {
   
  mode: 'development',
   optimization: {
        runtimeChunk: 'single'
    },
  target: 'web',
  devtool: 'inline-source-map',
  devServer: {
    open: true,
     port: 9100, hot: true,
  },
 
}


module.exports = merge(common, dev)