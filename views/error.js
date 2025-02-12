const fs = require('fs');
const path = require('path');

const { fileURLToPath } = require('url');
const { dirname } = require('path');
const __filename = typeof __filename !== 'undefined' ? __filename : fileURLToPath(import.meta.url);
const __dirname = typeof __dirname !== 'undefined' ? __dirname : dirname(__filename);

const template = fs.readFileSync(path.join(__dirname, 'error.html'), 'utf8');

module.exports = function getErrorHtml(config = {}) {
    return template
        .replace('{{title}}', config.title || 'Error')
        .replace('{{error}}', config.error || 'An unknown error occurred');
}; 