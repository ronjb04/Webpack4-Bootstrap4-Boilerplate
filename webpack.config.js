const path = require('path');
const glob = require('glob');
const webpack = require('webpack');
const HtmlWebPackPlugin = require('html-webpack-plugin');
//const ExtractTextPlugin = require('extract-text-webpack-plugin'); //webpack4 bug
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
//const PurifyCSSPlugin = require('purifycss-webpack');
const PurgecssPlugin = require('purgecss-webpack-plugin');

/*const { ImageminWebpackPlugin } = require("imagemin-webpack");
const imageminGifsicle = require("imagemin-gifsicle");
const imageminOptipng = require('imagemin-optipng');
const imageminJpegtran = require('imagemin-jpegtran');*/

const ImageminPlugin = require( 'imagemin-webpack-plugin' ).default;
var imageminMozjpeg = require('imagemin-mozjpeg');
var jpegtran = require('imagemin-jpegtran');

const CopyWebpackPlugin = require('copy-webpack-plugin')

const DEV_MODE = process.env.NODE_ENV === 'dev';

const PATHS = {
  src: path.join(__dirname, 'src')
}

module.exports = {
  devtool: DEV_MODE ? 'eval' : 'source-map',
  entry: {
    home: path.resolve(__dirname, 'src/js/home.js'),
    about: path.resolve(__dirname, 'src/js/about.js')
    //'font-awesome-sass-loader!./font-awesome.config.js', //old
    //"font-awesome-webpack!./font-awesome.config.js", updated
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'js/[name].bundle.js',
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      },
      DEV_MODE ? {
        test: /\.scss/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              sourceMap: true
            }
          },
          {
            loader: 'sass-loader',
            options: {
              sourceMap: true
            }
          }
        ]
      }
      : 
      {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              url: true,
              publicPath: '../'
            }
          },
        ]
      },
      {
        test: /\.scss$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              url: false,
              publicPath: '../'
            }
          },
          {
            loader: 'postcss-loader',
            options: {
              url: false,
              publicPath: '../'
            }
          },
          {
            loader: 'sass-loader',
            options: {
              url: false,
              publicPath: '../'
            }
          }
        ]
      },
      /*{
        test: /\.less$/,
        loader: 'less-loader' // compiles Less to CSS
      },*/
      //font
      {
        test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        use: [
            {
                loader: 'url-loader',
                options: {
                    limit: 10000,
                    mimetype: 'application/font-woff',
                    name: "/static/bundles/[hash].[ext]"
                }
            }
        ]
      },
      {
        test: /\.(ttf|eot)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        use: [
          { loader: 'file-loader' }
        ]
      },
       {
        test: /\.(gif|png|jpe?g|svg)$/i,
        use: [
          //'file-loader?name=images/[name].[ext]',
          //'file-loader?name=[name].[ext]&outputPath=assets/images/&publicPath=assets/images/',
          {
            loader: 'file-loader',
            options: {
              limit: 10000,
              outputPath: 'assets/images/',
              publicPath: 'assets/images/',
              name: '[name].[ext]',
            },
          },
         /*{
            loader: 'image-webpack-loader',
            options: {
              mozjpeg: {
                progressive: true,
                quality: 65
              },
              svgo:{
                plugins: [
                  {
                    removeViewBox: false
                  },
                  {
                    removeEmptyAttrs: false
                  }
                ]
              },
              // optipng.enabled: false will disable optipng
              optipng: {
                enabled: false,
              },
              pngquant: {
                quality: '65-90',
                speed: 4
              },
              gifsicle: {
                interlaced: false,
              },
              // the webp option will enable WEBP
              webp: {
                quality: 75
              }
            }
         },*/
        ],
      },

    ]
  },
  resolve: {
    extensions: ['.ts', '.js','.scss','.css'],
    alias: {
      '@fortawesome/fontawesome-free-solid$': '@fortawesome/fontawesome-free-solid/shakable.es.js',
      'scss': path.resolve(__dirname, 'src/scss')
    }
  },
  plugins: [
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery'
    }),


    new HtmlWebPackPlugin({
      title: 'Custom template',
      template: path.join(__dirname, 'src', 'index.html'),
      /*minify: {
        collapseWhitespace: DEV_MODE ? false :  true
      },*/
      excludeChunks: ['about'],
      hash: true,
    }),
    new HtmlWebPackPlugin({
      title: 'About template',
      filename: 'about.html',
      template: path.join(__dirname, 'src', 'about.html'),
      chunks: ['about'],
      hash: true,
    }),


    //new ExtractTextPlugin('css/styles.css'),
    new MiniCssExtractPlugin({
      // Options similar to the same options in webpackOptions.output
      // both options are optional
      filename: "css/[name].css",
      chunkFilename: "[id].css",
    }),
    // Make sure this is after ExtractTextPlugin!
    new PurgecssPlugin({
      paths: glob.sync(`${PATHS.src}/**/*`, { nodir: true })
    }),

    /*new ImageminWebpackPlugin({
      imageminOptions: {
        plugins: [
          imageminGifsicle({
            interlaced: true,
            optimizationLevel: 3
          }),
          imageminOptipng({
            interlaced: true,
            optimizationLevel: 3
          }),
          imageminJpegtran({
            progressive: true,
            optimizationLevel: 3
          }),
        ]
      },
      name: "[name]-[hash].[ext]",
      test: /\.(jpe?g|png|gif|svg)$/i,
    })*/

    new CopyWebpackPlugin([{
      from: 'src/assets/images/', to: 'assets/images/'
      //from: path.join(__dirname, 'src', 'assets/images'),
    }]),

    new ImageminPlugin({
      test: /\.(jpe?g|png|gif|svg)$/i,
      optipng: {
          optimizationLevel: 7,
      },
      pngquant: {
          quality: '65-90',
          speed: 4,
      },
      gifsicle: {
          optimizationLevel: 3,
      },
      svgo: {
          plugins: [{
              removeViewBox: false,
              removeEmptyAttrs: true,
          }],
      },
      jpegtran: {
          progressive: true,
      },
      plugins: [
          imageminMozjpeg({
              quality: 65,
              progressive: true,
          }),
      ],
  }),
  
  
  ]
}
