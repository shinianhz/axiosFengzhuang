var path = require('path');
var webpack = require('webpack');

module.exports = {
  entry : './src/main.js',   // 入口文件
  output: {
    // 出口设置
    path      : path.resolve(__dirname, './dist'),   // npm run build的目标文件目录
    publicPath: '/dist/',                            // npm run dev的
    filename  : 'build.js'
  },
  module: {
    // 加载器
    rules: [
      {
        test: /\.css$/,
        use : ['vue-style-loader', 'css-loader']
      },
      {
        test: /\.scss$/,
        use : ['vue-style-loader', 'css-loader', 'sass-loader']
      },
      {
        test: /\.sass$/,
        use : ['vue-style-loader', 'css-loader', 'sass-loader?indentedSyntax']
      },
      {
        test   : /\.vue$/,
        loader : 'vue-loader',
        options: {
          loaders: {
            // Since sass-loader (weirdly) has SCSS as its default parse mode, we map
            // the "scss" and "sass" values for the lang attribute to the right configs here.
            // other preprocessors should work out of the box, no loader config like this necessary.
            scss: ['vue-style-loader', 'css-loader', 'sass-loader'],
            sass: [
              'vue-style-loader',
              'css-loader',
              'sass-loader?indentedSyntax'
            ]
          }
          // other vue-loader options go here
        }
      },
      {
        test   : /\.js$/,
        loader : 'babel-loader',
        exclude: /node_modules/
      },
      {
        test   : /\.(png|jpg|gif|svg)$/,
        loader : 'file-loader',
        options: {
          name: '[name].[ext]?[hash]'
        }
      },
      {
        test: /\.(woff)|(eot)|(ttf)$/,
        use : [
          {
            loader : 'url-loader',
            options: {
              limit: 50000,                   //小于50K的 都打包
              name : '[hash:8].[name].[ext]'
            }
          }
        ]
      }
    ]
  },
  resolve: {
    alias: {
      vue$: 'vue/dist/vue.esm.js',
      '@' : path.resolve('./src')
    },
    extensions: ['*', '.js', '.vue', '.json']
  },
  devServer: {
    historyApiFallback: true,
    noInfo            : true,
    overlay           : true
  },
  performance: {
    hints: false
  },
  devtool: '#eval-source-map'
};

//  插件管理

if (process.env.NODE_ENV === 'production') {
  module.exports.devtool = '#source-map';
  // http://vue-loader.vuejs.org/en/workflow/production.html
  module.exports.plugins = (module.exports.plugins || []).concat([
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"production"'
      }
    }),
    new webpack.optimize.UglifyJsPlugin({
      sourceMap: false,
      compress : {
        warnings: false
      }
    }),
    new webpack.LoaderOptionsPlugin({
      minimize: true
    })
  ]);
}
