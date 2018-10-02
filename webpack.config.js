
console.log(__dirname + "/build");

module.exports = {
  entry:  './src/app.js',
  output: {
    filename: './build/app.js'
  },
  watch:  true,
  module: {
    loaders: [
      { test: /\.js?$/, loader: "awesome-typescript-loader" },
    ]
  }
};