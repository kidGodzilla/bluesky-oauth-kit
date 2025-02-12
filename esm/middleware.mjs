import _jsonwebtoken from "jsonwebtoken";
var module = {
  exports: {}
};
var exports = module.exports;
var jwt = _jsonwebtoken;
var authenticateToken = function authenticateToken(req, res, next) {
  var _req$headers$authoriz, _req$cookies;
  var token = ((_req$headers$authoriz = req.headers['authorization']) === null || _req$headers$authoriz === void 0 ? void 0 : _req$headers$authoriz.split(' ')[1]) || process.env.OAUTH_USE_COOKIES === 'true' && ((_req$cookies = req.cookies) === null || _req$cookies === void 0 ? void 0 : _req$cookies.token);
  if (!token) {
    return res.status(401).json({
      error: 'Access denied. No token provided.'
    });
  }
  try {
    var user = jwt.verify(token, process.env.OAUTH_JWT_SECRET);
    req.auth = {
      user: user
    }; // Keep both for backwards compatibility
    req.user = user;
    next();
  } catch (err) {
    res.status(403).json({
      error: 'Invalid or expired token.'
    });
  }
};
module.exports = {
  authenticateToken: authenticateToken
};
export default module.exports;