const fs = require('fs');
const path = require('path');

const template = fs.readFileSync(path.join(__dirname, 'login.html'), 'utf8');

module.exports = function getLoginHtml(config = {}) {
    return template.replace('{{title}}', config.title || 'Bluesky Login');
};
