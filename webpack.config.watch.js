var path = require('path');
var webpack = require('webpack');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

var sassLoader = [
  'css-loader',
  'sass-loader'
];

const PROJECT_ROOT = process.cwd();

module.exports = {
  watch: true,
  watchOptions: {
    aggregateTimeout: 600,
    ignored: /node_modules/,
    aggregateTimeout: 200,
    poll: 1000
  },

  entry: {
    frontend: "./src/frontend/frontend.js",
    options: "./src/options/options.js"
  },
  optimization: {
    noEmitOnErrors: true,
    minimize: false,
  },
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: '[name].js',
  },
  plugins: [
    new webpack.DefinePlugin({
      "process.env": {
         NODE_ENV: JSON.stringify("production")
       }
    }),
    new webpack.ProgressPlugin({
      profile: false
    }),
    new MiniCssExtractPlugin({
      filename: '[name].css',
      chunkFilename: '[id].css',
    }),
    // new BundleAnalyzerPlugin({
    //   analyzerMode: 'static',
    //   reportFilename: 'report.html',
    //   defaultSizes: 'parsed',
    //   openAnalyzer: true,
    //   generateStatsFile: true,
    //   statsFilename: 'stats.json',
    //   statsOptions: null,
    //   logLevel: 'info'
    // })
  ],
  resolve: {
    alias: {
    },
    modules: [
      path.resolve(__dirname, 'src'),
      path.join(__dirname, 'node_modules'),
    ],
    extensions: ['.scss', '.js', '.css'],
  },
  module: {
    rules: [{
      test: /\.jsx?$/,
      use: [{
        loader: 'babel-loader',
        options: {
          babelrc: false,
          presets: [
            "babel-preset-react",
            "babel-preset-es2015",
            "babel-preset-stage-0",
          ],
          plugins: [
            "babel-plugin-transform-decorators-legacy",
          ]
        },
      }],
      include: [
        path.join(__dirname, 'src'),
      ],
    }, {
      test: /\.scss$/,
      include: [
        __dirname,
        path.join(__dirname, 'src'),
      ],
      use: [
        MiniCssExtractPlugin.loader,
        ...sassLoader,
      ]
    }, {
      test: /\.css$/,
      include: [
        __dirname,
        path.join(__dirname, 'src'),
      ],
      use: [
        MiniCssExtractPlugin.loader,
        'css-loader',
      ],
    }],
  },
};
