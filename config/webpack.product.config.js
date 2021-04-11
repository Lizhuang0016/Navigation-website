// webpack生产环境配置文件
const merge = require('webpack-merge')
const webpack = require('webpack')
const baseConfig = require('./webpack.base.config.js')
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const CompressionPlugin = require('compression-webpack-plugin');
//配置webpack压缩插件
const UglifyJSPlugin = require('uglifyjs-webpack-plugin')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin

module.exports = merge(baseConfig, {
  // 设置为生产模式
  mode: 'production',
  // devtool: 'inline-source-map',
  devtool: false,
  // 配置服务端目录和端口
  devServer: {
    contentBase: './dist',
    port: 80,
    open: true,
    disableHostCheck: true,
    hot: true, // 还需要配置一个插件 HotModuleReplacementPlugin
    proxy: {
      // 配置服务代理
      '/all_data_api': {
        target: 'http://money.finance.sina.com.cn',
        // 转换请求 /api/users 为 http://money.finance.sina.com.cn/users
        pathRewrite: { '^/all_data_api': '' }, //路径重写
        changeOrigin: true
      }
    }
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production')
    }),
    new BundleAnalyzerPlugin({
      analyzerMode: 'disabled',
      generateStatsFile: true,
      statsOptions: { source: false }
    }),
    new UglifyJSPlugin(),
  ]
})
