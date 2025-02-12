const fs = require('fs');
const path = require('path');

if (!__dirname) {
    const { getDirName } = require('@subbu963/esm-polyfills');
    var __dirname = getDirName();
}

const template = fs.readFileSync(path.join(__dirname, 'login.html'), 'utf8');

module.exports = function getLoginHtml(config = {}) {
    return template.replace('{{title}}', config.title || 'Bluesky Login');
};
