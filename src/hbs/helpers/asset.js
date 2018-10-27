var path = require('path');

module.exports = function (filepath, options) {
    // Asset path
    const assetsPath = 'assets/';

    // Root
    const root = this.compilation.options.context + '/';

    // Current path
    let fileName = this.htmlWebpackPlugin.options.filename.split(path.sep);
    fileName.pop();
    fileName = fileName.join('/');
    let target = root + fileName;

    // Relative path
    let relativePath = path.relative(target, root);
    let relative;
    if(relativePath === '') {
        relative =  assetsPath + filepath;
    } else {
        relative = relativePath + '/' + assetsPath + filepath;
    }

    return relative;
};
