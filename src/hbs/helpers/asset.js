var path = require('path');

module.exports = function (filepath, options) {
    const assetPath = '/assets';
    return path.join(assetPath, filepath).replace(/\\/g, '/');
};
