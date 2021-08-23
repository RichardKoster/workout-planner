const path = require("path");

module.exports = {
  entry: "./src/js/index.js",
  mode: "development",
  devtool: "inline-source-map",
  resolve: {
    alias: {
      "@app": path.resolve(__dirname, "src/js/"),
      "@scss": path.resolve(__dirname, "src/scss/"),
    },
  },
  devServer: {
    contentBase: "./dist",
  },
  output: {
    filename: "main.js",
    path: path.resolve(__dirname, "dist"),
  },
  module: {
    rules: [
      {
        test: /\.s[ac]ss$/i,
        use: [
          // Creates `style` nodes from JS strings
          "style-loader",
          // Translates CSS into CommonJS
          "css-loader",
          // Compiles Sass to CSS
          "sass-loader",
        ],
      },
      {
        test: /\.(ico|jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2)(\?.*)?$/,
        use: {
          loader: "file-loader",
          options: {
            name: "[path][name].[ext]",
          },
        },
      },
    ],
  },
};
