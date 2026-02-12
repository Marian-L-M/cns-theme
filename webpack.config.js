const defaultConfig = require('@wordpress/scripts/config/webpack.config');
const path = require('path');
const glob = require('fast-glob');

// Auto-discover all block JS files
const blockEntries = glob.sync('./blocks/*.js').reduce((entries, file) => {
    const name = path.basename(file, '.js');
    entries[`blocks/${name}`] = file;
    return entries;
}, {});

module.exports = {
    ...defaultConfig,
    entry: {
        index: './src/index.js',
        ...blockEntries,
    },
};
