'use strict'
const utils = require('./utils')
const webpack = require('webpack')
const config = require('./config')
const merge = require('webpack-merge')
const path = require('path')
const baseWebpackConfig = require('./webpack.base.conf')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')
const ContentReplacePlugin = require('./wpPlugins/content-replace-plugin.js')
const portfinder = require('portfinder')
const buildConfig = require('../build.config')

const HOST = process.env.HOST
const PORT = process.env.PORT && Number(process.env.PORT)


const _dynamicMinJs = url => {
    if (/\.js$/.test(url)) {
        return url;
    } else {
        return `${url}.min.js`;
    }
}
const _dynamicMinCss = url => {
    if (/\.css$/.test(url)) {
        return url;
    } else {
        return `${url}.min.css`;
    }
}

const _htmlReplacement = (html, app) => {
  var appConfig = require(`../src/apps/${app}/app.config`)
  html = html.replace('[CSS_LIBS]', buildConfig.csslibs.concat(appConfig.csslibs || []).map(item => _dynamicMinCss(item)).map(item => `<link rel="stylesheet" href="${item}">`).join('\n'))
  html = html.replace('[JS_LIBS]', buildConfig.jslibs.concat(appConfig.jslibs || []).map(item => _dynamicMinJs(item)).map(item => `<script src="${item}"></script>`).join('\n'))
  return html
}

var plugins = [
  new webpack.DefinePlugin({
    'process.env': require('./config/dev.env')
  }),
  new webpack.HotModuleReplacementPlugin(),
  new webpack.NamedModulesPlugin(), // HMR shows correct file names in console on update.
  // new webpack.NoEmitOnErrorsPlugin(),
  // copy custom static assets
  new CopyWebpackPlugin([
    {
      from: path.resolve(__dirname, '../static'),
      to: config.dev.assetsSubDirectory,
      ignore: ['.*']
    }
  ]),
  new ContentReplacePlugin([{
    callback: _htmlReplacement
  }])
]

var entryKeys = Object.keys(baseWebpackConfig.entry);
if (entryKeys.length > 1) {
    entryKeys.forEach(function (name) {
      plugins.push(new HtmlWebpackPlugin({
        filename: name + '/index.html',
        template: path.resolve(__dirname, 'tmp', name, 'index.html'),
        chunks: [name],
        inject: true,
        appName: name
      }));
    })
} else {
    var name = entryKeys[0];
    plugins.push(new HtmlWebpackPlugin({
        filename: 'index.html',
        template: path.resolve(__dirname, 'tmp', name, 'index.html'),
        chunks: [name],
        inject: true,
        appName: name
    }));
}

const devWebpackConfig = merge(baseWebpackConfig, {
  module: {
    rules: utils.styleLoaders({ sourceMap: config.dev.cssSourceMap, usePostCSS: true })
  },
  // cheap-module-eval-source-map is faster for development
  devtool: config.dev.devtool,

  // these devServer options should be customized in /config/index.js
  devServer: {
    clientLogLevel: 'warning',
    historyApiFallback: {
      rewrites: [
        { from: /.*/, to: path.posix.join(config.dev.assetsPublicPath, 'index.html') },
      ],
    },
    hot: true,
    contentBase: false, // since we use CopyWebpackPlugin.
    compress: true,
    host: HOST || config.dev.host,
    port: PORT || buildConfig.port,
    open: config.dev.autoOpenBrowser,
    overlay: config.dev.errorOverlay
      ? { warnings: false, errors: true }
      : false,
    publicPath: config.dev.assetsPublicPath,
    proxy: buildConfig.proxy,
    quiet: false, // necessary for FriendlyErrorsPlugin
    watchOptions: {
      poll: config.dev.poll,
    }
  },
  plugins: plugins
})

console.log('devWebpackConfig----------------------------')
console.log(devWebpackConfig)

module.exports = new Promise((resolve, reject) => {
  portfinder.basePort = process.env.PORT || buildConfig.port
  portfinder.getPort((err, port) => {
    if (err) {
      reject(err)
    } else {
      // publish the new Port, necessary for e2e tests
      process.env.PORT = port
      // add port to devServer config
      devWebpackConfig.devServer.port = port

      // Add FriendlyErrorsPlugin
      devWebpackConfig.plugins.push(new FriendlyErrorsPlugin({
        compilationSuccessInfo: {
          messages: [`Your application is running here: http://${devWebpackConfig.devServer.host}:${port}`],
        },
        onErrors: config.dev.notifyOnErrors
        ? utils.createNotifierCallback()
        : undefined
      }))

      console.log('complete...........................')

      resolve(devWebpackConfig)
    }
  })
})
