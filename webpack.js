const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const ForkTsCheckerNotifierWebpackPlugin = require('fork-ts-checker-notifier-webpack-plugin');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');

module.exports = () => {
  const config = {
    mode: 'development',

    entry: {
      main: './src/Index.tsx',
    },

    output: {
      path: path.resolve('./dist'),
      publicPath: '/',
      filename: '[name]-[hash].js',
      chunkFilename: '[name]-[hash].js',
      futureEmitAssets: true,
    },

    // Dev server
    devServer: {
      host: 'localhost',
      stats: 'errors-only',
    },

    // Bail and fail hard on first error
    bail: false,

    stats: 'minimal',

    performance: {
      // Don't warn about too-large chunks
      hints: false,
    },

    module: {
      strictExportPresence: true,

      rules: [
        // *.m.scss will have CSS Modules support
        {
          test: /\.m\.scss$/,
          use: [
            'style-loader',
            {
              loader: 'css-modules-typescript-loader',
              options: {
                mode: 'emit',
              },
            },
            {
              loader: 'css-loader',
              options: {
                modules: {
                  localIdentName: '[name]_[local]-[hash:base64:5]',
                  exportLocalsConvention: 'camelCaseOnly',
                },
                sourceMap: true,
              },
            },
            'sass-loader',
          ],
        },
        // All files with a '.ts' or '.tsx' extension will be handled by 'babel-loader'.
        {
          test: /\.tsx?$/,
          use: [
            {
              loader: 'babel-loader',
              options: {
                cacheDirectory: true,
              },
            },
          ],
        },
      ],
    },

    resolve: {
      extensions: ['.ts', '.js', '.tsx'],
    },

    plugins: [
      new MiniCssExtractPlugin({
        filename: '[name]-[hash].css',
        chunkFilename: '[name]-[hash].css',
      }),
    ],

    node: {
      fs: 'empty',
      net: 'empty',
      tls: 'empty',
    },
  };

  // In dev we use babel to compile TS, and fork off a separate typechecker
  config.plugins.push(new ForkTsCheckerWebpackPlugin());

  config.plugins.push(
    new ForkTsCheckerNotifierWebpackPlugin({
      title: 'fork-ts-checker-repro TypeScript',
      excludeWarnings: false,
      contentImage: path.join(__dirname, '../icons/release/favicon-96x96.png'),
    })
  );

  return config;
};
