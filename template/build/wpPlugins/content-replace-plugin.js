var opts = [];

function ContentReplacePlugin(options) {
	opts = options;
}

ContentReplacePlugin.prototype.apply = function(compiler) {
    compiler.plugin('compilation', function(compilation) {
        compilation.plugin('html-webpack-plugin-before-html-processing', function(htmlPluginData, callback) {
            opts.forEach(function (option) {
                // console.log('')
                // console.log('xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx')
                // console.log(htmlPluginData.plugin.options.appName)

                var app = htmlPluginData.plugin.options.appName
                if (app && option.callback) {
                    htmlPluginData.html = option.callback(htmlPluginData.html, app)
                }
            });
        	// opts.forEach(function (option) {
        	// 	htmlPluginData.html = htmlPluginData.html.replace(option.templateString, option.newString);
        	// });
            // console.log('----------------------------')
            // console.log(htmlPluginData.html)
            callback(null, htmlPluginData);
        });
    });

};

module.exports = ContentReplacePlugin;
