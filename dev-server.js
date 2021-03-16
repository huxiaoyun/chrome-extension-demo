var PROJECT_ROOT = process.cwd();
// port
const portNum = 1111;

const path = require('path');
const express = require('express');
const webpack = require('webpack');
const config = require('./webpack.config.dev');

const app = express();
const compiler = webpack(config);

var webpackDevOptions = {
  // stats: 'minimal',
  historyApiFallback: true,
  stats: {
    colors: true,
    chunks: false,
  },
  publicPath: config.output.publicPath,
  headers: {
    'Access-Control-Allow-Origin': '*'
  }
};

app.use(require('webpack-dev-middleware')(compiler, webpackDevOptions));
app.use(require('webpack-hot-middleware')(compiler));

app.listen(portNum, '0.0.0.0', function(err) {
  if (err) {
    logError('Fail to start', err);
    process.exit(0);
  }
});
