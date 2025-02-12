import _path from "path";
import _fs from "fs";
var module = {
  exports: {}
};
var exports = module.exports;
const fs = _fs;
const path = _path;
const template = fs.readFileSync(path.join(__dirname, 'error.html'), 'utf8');
module.exports = function getErrorHtml(config = {}) {
  return template.replace('{{title}}', config.title || 'Error').replace('{{error}}', config.error || 'An unknown error occurred');
};
export default module.exports;