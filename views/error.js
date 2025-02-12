const fs = require('fs');
const path = require('path');

const template = fs.readFileSync(path.join(__dirname, 'error.html'), 'utf8');

module.exports = function getErrorHtml(config = {}) {
    return template
        .replace('{{title}}', config.title || 'Error')
        .replace('{{error}}', config.error || 'An unknown error occurred');
}; 