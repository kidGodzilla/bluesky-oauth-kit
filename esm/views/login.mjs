import _path from "path";
import _fs from "fs";
var module = {
  exports: {}
};
var exports = module.exports;
const fs = _fs;
const path = _path;
const template = fs.readFileSync(path.join(__dirname, 'login.html'), 'utf8');
module.exports = function getLoginHtml(config = {}) {
  return template.replace('{{title}}', config.title || 'Bluesky Login');
};
export default module.exports;