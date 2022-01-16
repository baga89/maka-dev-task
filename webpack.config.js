const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
  entry: {
    main: path.resolve(__dirname, 'src/js/index.js'),
  },
  output: {
    filename: 'js/[name].bundle.js',
    path: path.resolve(__dirname, 'dist'),
    // assetModuleFilename: 'images/[name][ext]',
    clean: true,
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'css/[name].css',
    }),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, 'src/index.html'),
      filename: path.resolve(__dirname, 'dist/index.html'),
    }),
    new CopyWebpackPlugin({
      patterns: [{ from: path.resolve(__dirname, 'src/images'), to: path.resolve(__dirname, 'dist/images') }],
    }),
  ],
  module: {
    rules: [
      { test: /\.html$/, use: ['html-loader'] },
      {
        test: /\.js$/,
        enforce: 'pre',
        use: ['source-map-loader', 'babel-loader'],
        exclude: /node_modules/,
      },
      {
        test: /\.css$/i,
        use: [
          MiniCssExtractPlugin.loader,
          // 'style-loader',
          {
            loader: 'css-loader',
            options: {
              importLoaders: 1,
            },
          },
          'postcss-loader',
        ],
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: 'asset/resource',
        // Rules.generator.filename is the same as output.assetModuleFilename
        // and works only with asset and asset/resource module types.
        generator: {
          filename: 'images/[name][ext]',
        },
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/i,
        type: 'asset/resource',
        generator: {
          filename: 'fonts/[name][ext]',
        },
      },
    ],
  },
  devtool: 'source-map',
  devServer: {
    watchContentBase: true,
    static: {
      directory: path.resolve(__dirname, 'dist'),
    },
  },
  optimization: {
    // This will enable CSS optimization only in production mode.
    minimizer: ['...', new CssMinimizerPlugin()],
  },
};
