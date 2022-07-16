const rules = require('./webpack.rules');
const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const assets = ['output_files']; // asset directories

rules.push({
  test: /\.css$/,
  use: [
    { loader: "style-loader" },
    { loader: "css-loader" },
    { loader: "postcss-loader" },
  ],
});

module.exports = {
  // Put your normal webpack config below here
  module: {
    rules,
  },
  plugins: assets.map(asset => {
    return new CopyWebpackPlugin({
      patterns:[{
        from: path.resolve(__dirname, 'user_files', asset),
        to: path.resolve(__dirname, '.webpack/renderer', asset)
      }]
  });
  })
};
