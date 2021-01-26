const MiniCssExtractPlugin = require("mini-css-extract-plugin"); // 新增

module.exports = {
  mode: "production",
  entry: {
    index: "./src/index.js", // 一个入口文件
    chunk1: "./src/chunk1.js", // 两一个入口文件
  },
  output: {
    filename: "[name].[chunkhash].js", // 出口文件
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, "css-loader"],
      },
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: "[name].[contenthash].css",
    }),
  ],
};
