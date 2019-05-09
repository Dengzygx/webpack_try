const path = require('path');

let HtmlWebpackPlugin = require('html-webpack-plugin');

let CleanWebpackPlugin = require('clean-webpack-plugin');

let ExtractTextWebpackPlugin = require('extract-text-webpack-plugin');

let webpack = require('webpack');
module.exports = {
  entry: {
    index: './src/index.js',
    login: './src/login.js',
  },
  output: {
    filename: '[name].[hash:8].js',
    path: path.resolve('dist')
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: "babel-loader",
        include: /src/,
        exclude: /node_modules/
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader?sourceMap'],
        exclude: /node_modules/
      },
      {
        test: /\.scss$/,
        use: ExtractTextWebpackPlugin.extract({
            use: ['css-loader', 'sass-loader'],
            fallback: 'style-loader'
        })
      },
      {
        test: /\.(jpe?g|png|gif)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 8192, // 小于8k的图片自动转成base64格式，并且不会存在实体图片
              outputPath: 'images/' // 图片打包后存放的目录
            }
          }
        ]
      },
      {
        test: /\.(eot|ttf|woff|svg)$/,
        use: 'file-loader'
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html',
      filename: 'index.html',
      chunks: ['index'],
      // hash: true,
    }),
    new HtmlWebpackPlugin({
      template: './src/login.html',
      filename: 'login.html',
      chunks: ['login'],
      // hash: true,
    }),
    new CleanWebpackPlugin(),
    new ExtractTextWebpackPlugin("[name].css"),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin(),
  ], // 对应的插件
  devServer: {
    contentBase: path.resolve(__dirname, 'dist'), // 配置开发服务运行时的文件根目录
    compress: true, // 开发服务器是否启动gzip等压缩
    host: 'localhost', // 开发服务器监听的主机地址
    port: 5001, // 开发服务器监听的端口
    hot: true, // 开启热跟新
    open: true, // 自动打开浏览器
  }, // 开发服务器配置
  mode: 'development' // 模式配置
}