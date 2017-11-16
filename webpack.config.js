const path = require('path');
const webpack = require('webpack');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: {
    app: './src/app.js',
    test: './test/app.Spec.js'
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].bundle.js'
  },
  resolve: {
    extensions: ['.js', '.jsx']
  },
  module: {
    rules: [
      {
        enforce: 'pre',
        test: /.jsx?$/,
        include: [
          path.resolve(__dirname, 'app'),
          path.resolve(__dirname, 'test')
        ],
        exclude: /(node_modules | bower_components)/,
        use: {
          loader: 'eslint-loader'
        }
      },
      {
        test: /\.(js|jsx)$/,
        include: [
          path.resolve(__dirname, 'src')
        ],
        exclude: /(node_modules | bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['env','react']
          }
        }
      },
      {
        test: /\.(js|jsx)$/,
        include: [
          path.resolve(__dirname, 'test')
        ],
        exclude: /(node_modules | bower_components)/,
        use: {
          loader: 'mocha-loader'
        }
      }
    ]
  },
  devtool: 'source-map',
  devServer: {
    contentBase: path.resolve(__dirname, 'dist'),
    compress: true,
    port: 9000,
    open: true
  },
  plugins: [
    new CleanWebpackPlugin(['dist']),
    new UglifyJSPlugin({
      sourceMap: true
    }),
    new HtmlWebpackPlugin({
      title: 'Development',
      inject: 'body',
      chunks: ['app'],
      template: './templates/index.ejs',
      filename: 'index.html',
      css: './styles/index.css'
    }),
    new HtmlWebpackPlugin({
      title: 'Test',
      inject: 'body',
      chunks: ['test'],
      template: './templates/index.Spec.ejs',
      filename: 'index.spec.html',
      css: './styles/test.css'
    }),
    new webpack.HotModuleReplacementPlugin()
  ]
}
