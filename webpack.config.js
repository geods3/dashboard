const path = require("path");
var webpack = require('webpack');
const HtmlWebPackPlugin = require("html-webpack-plugin");
const CopyWebpackPlugin = require('copy-webpack-plugin');
var BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

const htmlPlugin = new HtmlWebPackPlugin({
  template: "./app/index.html",
  filename: "./index.html"
});

const copyPlugin = new CopyWebpackPlugin([
  {
    from: 'img/',
    to: 'img',
    toType: 'dir'
  }
])

const analyzer =  new BundleAnalyzerPlugin({
  analyzerMode: 'static'
})

module.exports = {
  entry: "./app/index.jsx",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: '[name]-bundle.js',
    chunkFilename: '[name].bundle.js',
    publicPath: '/'
  },
  module: {
    rules: [
      {
        test: [/\.js$/, /\.jsx$/, /\.css.js$/],
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
      },
      {
        test: /\.css$/,
        use: [
          { loader: "style-loader" },
          { loader: "css-loader" }
        ]
      },
      {
        test: /\.(png|jpg|gif)$/i,
        use: ['file-loader?name=[name].[ext]&outputPath=img/&publicPath=img/', 'img-loader']
      }
    ]
  },
  devServer: {
    overlay: true,
    historyApiFallback: true,
    proxy: {
      '/api': {
        target: 'http://localhost:3005',
        secure: false,
        changeOrigin: true
      }
    }
  },
  resolve: {
    modules: [path.resolve("./app"), "node_modules"],
    extensions: [".js", ".jsx", ".json"]
  },
  node: {
    fs: 'empty'
  },
  optimization: {

    splitChunks: {
      cacheGroups: {
        node_vendors: {
          test: /[\\/]node_modules[\\/]/,
          chunks: "initial",
          priority: 1
        }
      }
    }
  },
  plugins: [
    htmlPlugin, 
    copyPlugin,
    new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/)
    // analyzer
  ]
};
