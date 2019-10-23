const path = require('path');

module.exports = {
  entry: './client/index.jsx',
  output: {
    path: __dirname + '/public',
    filename: 'bundled.js'
  },
  module: {
    rules: [{
      test: /\.js/,
      exclude: /node_modules/,
      use: {
        loader: 'babel-loader'
      }
    }]
  },
  resolve: {
    alias: {
      "styled-components$": path.resolve(__dirname, "node_modules", "styled-components")
    }
  },
  watch: true
}