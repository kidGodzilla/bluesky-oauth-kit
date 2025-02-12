import _path2 from "path";
import _url from "url";
import _path from "path";
import _fs from "fs";
var module = {
  exports: {}
};
var exports = module.exports;
var fs = _fs;
var path = _path;
var _require = _url,
  fileURLToPath = _require.fileURLToPath;
var _require2 = _path2,
  dirname = _require2.dirname;
var __filename = typeof __filename !== 'undefined' ? __filename : fileURLToPath(import.meta.url);
var __dirname = typeof __dirname !== 'undefined' ? __dirname : dirname(__filename);
var template = fs.readFileSync(path.join(__dirname, 'error.html'), 'utf8');
module.exports = function getErrorHtml() {
  var config = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  return template.replace('{{title}}', config.title || 'Error').replace('{{error}}', config.error || 'An unknown error occurred');
};
export default module.exports;