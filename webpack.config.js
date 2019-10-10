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
      loader: 'babel-loader',
      options: {
        presets: ['@babel/preset-env', '@babel/preset-react']
      }
    }]
  },
  watch: true
}