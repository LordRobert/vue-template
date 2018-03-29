'use strict'
// Template version: 1.3.1
// see http://vuejs-templates.github.io/webpack for documentation.

const path = require('path')
var fs = require('fs');
var ora = require('ora')
require('shelljs/global');
const buildConfig = require('../../build.config')

var spinner = ora('preparing...');
spinner.start();

// 创建临时入口文件供打包使用
var tmpDir = path.resolve(__dirname, '../tmp');
rm('-rf', tmpDir);
mkdir(tmpDir); // 删除并重新创建临时目录

var appDir = path.resolve(__dirname, '../../src/apps');
var apps = fs.readdirSync(appDir);
if (apps.length === 0) {
    throw 'no app defined in ./apps/';
}

// spinner.text = 'making multi languages...';
// // 创建多语言文件
// var localeTool = require('./localeTool');
// localeTool.make();

spinner.text = 'making entry files...';

var entries = {};
var templateHtml = path.resolve(__dirname, '../template', 'index.html');
var templateJs = path.resolve(__dirname, '../template', 'main.js');

var hasElement = function(arr) { // 判断数组是否不为空
    return arr && arr.length > 0;
}

var getVendors = function(pageName) { // 读取页面需要额外加载的第三方库(js/css)
    var jslist = [], csslist = [];

    // 先加载全局lib
    if (hasElement(buildConfig.jslibs)) {
        jslist = buildConfig.jslibs.map(item => `<script src="${item}"></script>`);
    }
    if (hasElement(buildConfig.csslibs)) {
        csslist = buildConfig.csslibs.map(item => `<link rel="stylesheet" href="${item}">`);
    }

    // 然后加载页面范围的lib
    // var confPath = path.resolve(__dirname, `../../src/pages/${pageName}/app.config.js`);
    var confPath = path.resolve(__dirname, `../../src/apps/${pageName}/app.config.js`);
    if (fs.existsSync(confPath)) {
        var appConf = require(confPath);
        
        if (hasElement(appConf.jslibs)) {
            jslist = jslist.concat(appConf.jslibs.map(item => `<script src="${item}"></script>`));
        }
        if (hasElement(appConf.csslibs)) {
            csslist = csslist.concat(appConf.csslibs.map(item => `<link rel="stylesheet" href="${item}">`));
        }
    }

    return {
        js: jslist.join('\n'),
        css: csslist.join('\n')
    };
};

var buildConf = {};

// 读取模板文件
var tmpIndexHtml = fs.readFileSync(templateHtml, 'utf-8');
var tmpIndexJs = fs.readFileSync(templateJs, 'utf-8');

// 将短横线连接词转换为驼峰
var toCamel = function(word) {
    return word && word.replace(/-(\w)/g, function(a) {return a.charAt(1).toUpperCase();});
};

// 从routes文件中解析出 title
var getTitle = function(routesContent) {
    var m = routesContent.match(/title: \'(.*?)\',/);
    if (m && m.length === 2) {
        return m[1];
    } else {
        return '';
    }
};

var prepareEntryFiles = function(app) {
    var title = getTitle(fs.readFileSync(path.resolve(appDir, app, 'routes.js'), 'utf-8'));
    var pageConfig = require(path.resolve(appDir, app, 'app.config.js'));
    // console.log('get app.config.js success!!!')
    var pageLang = pageConfig.lang || 'cn'; // 若未定义则默认中文
    // console.log(pageLang)

    var tmpAppDir = path.resolve(tmpDir, app);
    var vendors = getVendors(app);
    mkdir(tmpAppDir);

    var htmlContent = tmpIndexHtml.replace('[WIN_TITLE]', title || app)
    //     .replace('[CSS_LIBS]', vendors.css) // 插入自定义 css
    //     .replace('[JS_LIBS]', vendors.js); // 插入自定义 js
    var entryName = toCamel(app);
    var jsContent = tmpIndexJs.replace(/\[PAGE_NAME\]/g, app)
        .replace('[LANG_NAME]', pageLang);

    fs.writeFileSync(path.resolve(tmpAppDir, 'index.html'), htmlContent, 'utf-8');
    fs.writeFileSync(path.resolve(tmpAppDir, 'main.js'), jsContent, 'utf-8');
};

var buildEntryFiles = function() {
    if (apps.length > 1) {
        apps.forEach(app => {
            prepareEntryFiles(app);
            entries[app] = `./build/tmp/${app}/main.js`;
            buildConf[app] = path.resolve(buildConfig.distDir, `./${app}/index.html`);
        });
    } else { // 若只有一个 app，则直接打包到根目录，不需要用子目录来区分
        var app = apps[0];
        prepareEntryFiles(app);
        entries[app] = `./build/tmp/${app}/main.js`;
        buildConf[app] = path.resolve(buildConfig.distDir, 'index.html');
    }
};

buildEntryFiles();

fs.watch(templateHtml, function(type, file) {
    tmpIndexHtml = fs.readFileSync(templateHtml, 'utf-8');
    buildEntryFiles();
});

fs.watch(templateJs, function(type, file) {
    tmpIndexJs = fs.readFileSync(templateJs, 'utf-8');
    buildEntryFiles();
});

spinner.stop();

module.exports = {
  entry: entries,
  dev: {

    // Paths
    assetsSubDirectory: '',
    assetsPublicPath: '/',
    // Various Dev Server settings
    host: '0.0.0.0', // can be overwritten by process.env.HOST
    autoOpenBrowser: false,
    errorOverlay: false,
    notifyOnErrors: true,
    poll: false, // https://webpack.js.org/configuration/dev-server/#devserver-watchoptions-

    // Use Eslint Loader?
    // If true, your code will be linted during bundling and
    // linting errors and warnings will be shown in the console.
    useEslint: true,
    // If true, eslint errors and warnings will also be shown in the error overlay
    // in the browser.
    showEslintErrorsInOverlay: false,

    /**
     * Source Maps
     */

    // https://webpack.js.org/configuration/devtool/#development
    devtool: 'cheap-module-eval-source-map',

    // If you have problems debugging vue-files in devtools,
    // set this to false - it *may* help
    // https://vue-loader.vuejs.org/en/options.html#cachebusting
    cacheBusting: true,

    cssSourceMap: true
  },

  build: Object.assign({
    // Template for index.html
    index: path.resolve(__dirname, '../..', buildConfig.distDir, 'index.html'),

    // Paths
    assetsRoot: path.resolve(__dirname, '../..', buildConfig.distDir),
    assetsSubDirectory: 'static',
    assetsPublicPath: '../',

    /**
     * Source Maps
     */

    productionSourceMap: false,
    // https://webpack.js.org/configuration/devtool/#production
    devtool: '#source-map',

    // Gzip off by default as many popular static hosts such as
    // Surge or Netlify already gzip all static assets for you.
    // Before setting to `true`, make sure to:
    // npm install --save-dev compression-webpack-plugin
    productionGzip: false,
    productionGzipExtensions: ['js', 'css'],

    // Run the build command with an extra argument to
    // View the bundle analyzer report after build finishes:
    // `npm run build --report`
    // Set to `true` or `false` to always turn it on or off
    bundleAnalyzerReport: process.env.npm_config_report
  }, buildConf)
}
