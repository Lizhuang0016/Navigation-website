// webpack开发环境的配置文件
// const path = require('path');

// module.exports = {
//     /* 入口 */
//     entry: path.join(__dirname, '../src/index.js'),
//     /* 输出到dist目录，输出文件名字为bundle.js */
//     output: {
//         path: path.join(__dirname, '../dist'),
//         filename: 'bundle.js'
//     }
// };
const webpack = require('webpack') //启用热更新的第二步
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const merge = require('webpack-merge')
const baseConfig = require('./webpack.base.config.js')

module.exports = merge(baseConfig, {
  // 设置为开发模式
  mode: 'development',
  devtool: 'inline-source-map',
  // 配置服务端目录和端口
  devServer: {
    contentBase: './dist',
    port: 81,
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
      },
      '/now_data_api': {
        target: 'http://hq.sinajs.cn',
        // 转换请求 /api/users 为 http://money.finance.sina.com.cn/users
        pathRewrite: { '^/now_data_api': '' }, //路径重写
        changeOrigin: true
      }
    }
  },
  // 配置相应的插件
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html'
    }),
    new webpack.HotModuleReplacementPlugin(),
    new CleanWebpackPlugin(),
  ]
})
