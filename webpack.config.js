module.exports = {
  mode: 'none',
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
}
