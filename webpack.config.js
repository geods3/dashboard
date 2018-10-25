const path = require("path");
const HtmlWebPackPlugin = require("html-webpack-plugin");
const CopyWebpackPlugin = require('copy-webpack-plugin');

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

module.exports = {
  entry: "./app/index.jsx",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "bundle.js",
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
        use: ['file-loader?name=[name].[ext]&outputPath=img/&publicPath=img/', 'image-webpack-loader']
      }
    ]
  },
  devServer: {
    overlay: true,
    historyApiFallback: true
  },
  resolve: {
    modules: [path.resolve("./app"), "node_modules"],
    extensions: [".js", ".jsx", ".json"]
  },
  node: {
    fs: 'empty'
  },
  plugins: [htmlPlugin, copyPlugin]
};
