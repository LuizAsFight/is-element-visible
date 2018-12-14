module.exports = {
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
      }
    ]
  },
  output: {
    library: 'is-element-visible',
    libraryTarget: 'umd',
    filename: 'main.js'
  }
};