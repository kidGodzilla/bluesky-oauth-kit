import _subbu963EsmPolyfills from "@subbu963/esm-polyfills";
import _path from "path";
import _fs from "fs";
var module = {
  exports: {}
};
var exports = module.exports;
var fs = _fs;
var path = _path;
if (!__dirname) {
  var _require = _subbu963EsmPolyfills,
    getDirName = _require.getDirName;
  var __dirname = getDirName();
}
var template = fs.readFileSync(path.join(__dirname, 'login.html'), 'utf8');
module.exports = function getLoginHtml() {
  var config = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  return template.replace('{{title}}', config.title || 'Bluesky Login');
};
export default module.exports;