const path = require('path');
const webpack = require('webpack');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const Autoprefixer = require("autoprefixer");

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
          path.resolve(__dirname, 'src'),
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
      },
      {
          test: /\.scss$/,
          use: ExtractTextPlugin.extract({
            fallback: 'style-loader',
            //resolve-url-loader may be chained before sass-loader if necessary
            use: ['css-loader', 'postcss-loader', 'sass-loader']
          })
      },
      {
        test: /\.(png|jpg|gif)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[path][name].[ext]'
            }
          }
        ]
      }
      // {
      //   test: /\.(png|jpg|gif|svg|eot|ttf|woff|woff2)$/,
      //   loader: 'url-loader',
      //   options: {
      //     limit: 10000
      //   }
      // }
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
      title: 'Small Project Boilerplate',
      inject: 'body',
      chunks: ['app'],
      template: '!!ejs-compiled-loader!./templates/index.ejs',
      filename: 'index.html'
    }),
    new HtmlWebpackPlugin({
      title: 'Test',
      inject: 'body',
      chunks: ['test'],
      template: '!!ejs-compiled-loader!./templates/index.Spec.ejs',
      filename: 'index.spec.html'
    }),
    new webpack.HotModuleReplacementPlugin(),
    new ExtractTextPlugin({
      filename: '[name].css'
    })
  ]
}
