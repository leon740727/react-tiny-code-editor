module.exports = {
  mode: "development",

  entry: {
    demo: ['./src/demo.tsx'],
  },

  output: {
    filename: '[name].js',
    path: __dirname + '/asset',
  },

  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx']
  },

  devtool: 'source-map',

  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: [
          {
            loader: 'ts-loader',
            options: {
              configFile: 'tsconfig.json',
            },
          },
        ],
      },
    ],
  },
};
