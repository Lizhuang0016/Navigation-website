//基础webpack的配置文件
const path = require('path')
const webpack = require('webpack') //启用热更新的第二步
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')

module.exports = {
  // 入口文件
  entry: './src/index.js',
  output: {
    filename: 'bundle.[hash].js',
    // filename: 'bundle.js',
    path: path.join(__dirname, '../dist/')
  },
  module: {
    // 配置相应的规则
    rules: [
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader', 'postcss-loader']
      },
      {
        test: /\.js[x]?$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react'],
            plugins: ['@babel/plugin-proposal-class-properties']
          }
        }
      },
      {
        test: /\.less$/,
        use: [
          { loader: 'style-loader' },
          { loader: 'css-loader' },
          {
            loader: 'less-loader',
            options: {
              lessOptions: {
                javascriptEnabled: true
              }
            }
          }
        ]
      },
      {
        test: /\.(jpg|png|jpeg|gif)$/,
        loader: 'url-loader',
        options: {
          limit: 10,
          outputPath: './img/',
          publicPath: '/img/'
        }
      }
    ]
  },
  // 配置相应的插件
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html'
    }),
    new webpack.HotModuleReplacementPlugin(),
    new CleanWebpackPlugin()
  ]
}
