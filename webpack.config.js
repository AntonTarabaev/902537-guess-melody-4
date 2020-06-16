const path = require('path');
const webpack = require('webpack');

module.exports = (env) => {
  return {
    mode: env.type,
    entry: './src/index.js',
    output: {
      filename: 'bundle.js',
      path: path.join(__dirname, 'public')
    },
    devServer: {
      contentBase: path.join(__dirname, 'public'),
      open: true,
      inline: true,
      hot: true,
      port: 1337,
    },
    plugins: [
      new webpack.ProvidePlugin({
        React: 'react',
        PropTypes: 'prop-types',
      }),
    ],
    module: {
      rules: [
        {
          test: /\.(js|jsx)$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
          },
        }
      ],
    },
    devtool: env.devtool,
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'),
      },
      extensions: ['*', '.js', '.jsx']
    }
  };
};
