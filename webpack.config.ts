import path from 'path';
import TsconfigPathsPlugin from 'tsconfig-paths-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import HtmlWebpackPlugin from "html-webpack-plugin";
import CopyPlugin from 'copy-webpack-plugin'
import 'webpack-dev-server';

const isProduction = process.env.NODE_ENV == 'production';

const stylesHandler = isProduction
  ? MiniCssExtractPlugin.loader
  : 'style-loader';

const config = {
  mode: isProduction ? 'production' : 'development',
  entry: {
    offchain: './node_modules/offchain/dist/index.js',
    ui: path.resolve(__dirname, 'src/index.tsx',)
  },
  target: 'web',
  devtool: 'eval-source-map',
  output: {
    path: path.resolve(__dirname, 'dist'),
  },

  stats: { errorDetails: true },

  devServer: {
    open: true,
    hot: true,
    port: 4009,
    client: {
      overlay: {
        warnings: false,
        errors: true,
      },
    },
    proxy: {
      "/kupo": {
        // KUPO_HOST env variable must be set to the base URL of the Kupo
        // service, otherwise all requests to Kupo will fail.
        target: process.env.KUPO_HOST || "http://localhost:1442",
        changeOrigin: true,
        pathRewrite: { "^/kupo": "" },
      },
    },
  },

  plugins: [
    new HtmlWebpackPlugin({
    template: './index.html',
    inject: 'body',
  }),
  new CopyPlugin({
    patterns: [
      {
        from: 'node_modules/offchain/dist/',
        to: path.resolve(__dirname, 'dist'),
      },
    ],
  }),
  ].filter(Boolean),
  

  module: {
    rules: [
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              cacheDirectory: true,
              presets: ['@babel/preset-env', ['@babel/preset-react', { runtime: 'automatic' }], '@babel/preset-typescript'],
              plugins: ['@babel/plugin-transform-runtime'],
            },
          },
        ],
      },
      {
        test: /\.plutus$/i,
        type: "asset/source",
      },
      {
        test: /\.css$/i,
        use: [stylesHandler, 'css-loader', 'postcss-loader'],
      },
      {
        test: /\.(eot|svg|ttf|woff|woff2|png|jpg|gif)$/i,
        type: 'asset',
      },
    ],
  },

  resolve: {
    extensions: ['.tsx', '.ts', '.jsx', '.js'],
  },
};

export default config