const webpack = require("webpack");
const path = require("path");
const CopyPlugin = require("copy-webpack-plugin");

/** @type {import('webpack').Configuration } */
module.exports = {
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    historyApiFallback: true,
    port: 80,
    hot: true
  },
  entry: {
    tailwind: path.join(__dirname, "src/runtime-scripts/tailwind.ts"),
    popup: path.join(__dirname, "src/popup/index.tsx"),
    settings: path.join(__dirname, 'src/settings/index.tsx'),
    content: path.join(__dirname, "src/runtime-scripts/content/index.ts"),
    background: path.join(__dirname, "src/runtime-scripts/background/index.ts"),
    hr: path.join(__dirname, 'src/_hr/index.ts'),
  },
  output: { path: path.join(__dirname, "dist"), filename: "[name].js" },
  module: {
    rules: [
      {
        test: /\.ts(x)?$/,
        loader: "ts-loader",
        exclude: /node_modules/,
        options: {
          transpileOnly: true,
        }
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader', 'postcss-loader'],
        exclude: /\.module\.css$/,
      },
      {
        test: /\.svg|.png$/,
        use: "file-loader",
      },
    ],
  },
  resolve: {
    extensions: [".js", ".jsx", ".tsx", ".ts"],
    alias: {
      "react": "preact/compat",
      "react-dom": "preact/compat"
    }
  },
  devServer: {
    contentBase: "./dist",
  },
  plugins: [
    new CopyPlugin({
      patterns: [{ from: "public", to: "." }],
    }),
  ],
};
