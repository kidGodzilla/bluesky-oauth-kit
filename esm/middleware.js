import _jsonwebtoken from "jsonwebtoken";
var module = {
  exports: {}
};
var exports = module.exports;
const jwt = _jsonwebtoken;
const authenticateToken = (req, res, next) => {
  const token = req.headers['authorization']?.split(' ')[1] || process.env.OAUTH_USE_COOKIES === 'true' && req.cookies?.token;
  if (!token) {
    return res.status(401).json({
      error: 'Access denied. No token provided.'
    });
  }
  try {
    const user = jwt.verify(token, process.env.OAUTH_JWT_SECRET);
    req.auth = {
      user
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
  authenticateToken
};
export default module.exports;