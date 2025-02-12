function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
import _viewsErrorJs from "./views/error.mjs";
import _viewsLoginJs from "./views/login.mjs";
import _middlewareJs from "./middleware.mjs";
import _oauthJs from "./oauth.mjs";
import _jsonwebtoken from "jsonwebtoken";
import _crypto from "crypto";
var module = {
  exports: {}
};
var exports = module.exports;
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return e; }; var t, e = {}, r = Object.prototype, n = r.hasOwnProperty, o = Object.defineProperty || function (t, e, r) { t[e] = r.value; }, i = "function" == typeof Symbol ? Symbol : {}, a = i.iterator || "@@iterator", c = i.asyncIterator || "@@asyncIterator", u = i.toStringTag || "@@toStringTag"; function define(t, e, r) { return Object.defineProperty(t, e, { value: r, enumerable: !0, configurable: !0, writable: !0 }), t[e]; } try { define({}, ""); } catch (t) { define = function define(t, e, r) { return t[e] = r; }; } function wrap(t, e, r, n) { var i = e && e.prototype instanceof Generator ? e : Generator, a = Object.create(i.prototype), c = new Context(n || []); return o(a, "_invoke", { value: makeInvokeMethod(t, r, c) }), a; } function tryCatch(t, e, r) { try { return { type: "normal", arg: t.call(e, r) }; } catch (t) { return { type: "throw", arg: t }; } } e.wrap = wrap; var h = "suspendedStart", l = "suspendedYield", f = "executing", s = "completed", y = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var p = {}; define(p, a, function () { return this; }); var d = Object.getPrototypeOf, v = d && d(d(values([]))); v && v !== r && n.call(v, a) && (p = v); var g = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(p); function defineIteratorMethods(t) { ["next", "throw", "return"].forEach(function (e) { define(t, e, function (t) { return this._invoke(e, t); }); }); } function AsyncIterator(t, e) { function invoke(r, o, i, a) { var c = tryCatch(t[r], t, o); if ("throw" !== c.type) { var u = c.arg, h = u.value; return h && "object" == _typeof(h) && n.call(h, "__await") ? e.resolve(h.__await).then(function (t) { invoke("next", t, i, a); }, function (t) { invoke("throw", t, i, a); }) : e.resolve(h).then(function (t) { u.value = t, i(u); }, function (t) { return invoke("throw", t, i, a); }); } a(c.arg); } var r; o(this, "_invoke", { value: function value(t, n) { function callInvokeWithMethodAndArg() { return new e(function (e, r) { invoke(t, n, e, r); }); } return r = r ? r.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(e, r, n) { var o = h; return function (i, a) { if (o === f) throw Error("Generator is already running"); if (o === s) { if ("throw" === i) throw a; return { value: t, done: !0 }; } for (n.method = i, n.arg = a;;) { var c = n.delegate; if (c) { var u = maybeInvokeDelegate(c, n); if (u) { if (u === y) continue; return u; } } if ("next" === n.method) n.sent = n._sent = n.arg;else if ("throw" === n.method) { if (o === h) throw o = s, n.arg; n.dispatchException(n.arg); } else "return" === n.method && n.abrupt("return", n.arg); o = f; var p = tryCatch(e, r, n); if ("normal" === p.type) { if (o = n.done ? s : l, p.arg === y) continue; return { value: p.arg, done: n.done }; } "throw" === p.type && (o = s, n.method = "throw", n.arg = p.arg); } }; } function maybeInvokeDelegate(e, r) { var n = r.method, o = e.iterator[n]; if (o === t) return r.delegate = null, "throw" === n && e.iterator["return"] && (r.method = "return", r.arg = t, maybeInvokeDelegate(e, r), "throw" === r.method) || "return" !== n && (r.method = "throw", r.arg = new TypeError("The iterator does not provide a '" + n + "' method")), y; var i = tryCatch(o, e.iterator, r.arg); if ("throw" === i.type) return r.method = "throw", r.arg = i.arg, r.delegate = null, y; var a = i.arg; return a ? a.done ? (r[e.resultName] = a.value, r.next = e.nextLoc, "return" !== r.method && (r.method = "next", r.arg = t), r.delegate = null, y) : a : (r.method = "throw", r.arg = new TypeError("iterator result is not an object"), r.delegate = null, y); } function pushTryEntry(t) { var e = { tryLoc: t[0] }; 1 in t && (e.catchLoc = t[1]), 2 in t && (e.finallyLoc = t[2], e.afterLoc = t[3]), this.tryEntries.push(e); } function resetTryEntry(t) { var e = t.completion || {}; e.type = "normal", delete e.arg, t.completion = e; } function Context(t) { this.tryEntries = [{ tryLoc: "root" }], t.forEach(pushTryEntry, this), this.reset(!0); } function values(e) { if (e || "" === e) { var r = e[a]; if (r) return r.call(e); if ("function" == typeof e.next) return e; if (!isNaN(e.length)) { var o = -1, i = function next() { for (; ++o < e.length;) if (n.call(e, o)) return next.value = e[o], next.done = !1, next; return next.value = t, next.done = !0, next; }; return i.next = i; } } throw new TypeError(_typeof(e) + " is not iterable"); } return GeneratorFunction.prototype = GeneratorFunctionPrototype, o(g, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), o(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, u, "GeneratorFunction"), e.isGeneratorFunction = function (t) { var e = "function" == typeof t && t.constructor; return !!e && (e === GeneratorFunction || "GeneratorFunction" === (e.displayName || e.name)); }, e.mark = function (t) { return Object.setPrototypeOf ? Object.setPrototypeOf(t, GeneratorFunctionPrototype) : (t.__proto__ = GeneratorFunctionPrototype, define(t, u, "GeneratorFunction")), t.prototype = Object.create(g), t; }, e.awrap = function (t) { return { __await: t }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, c, function () { return this; }), e.AsyncIterator = AsyncIterator, e.async = function (t, r, n, o, i) { void 0 === i && (i = Promise); var a = new AsyncIterator(wrap(t, r, n, o), i); return e.isGeneratorFunction(r) ? a : a.next().then(function (t) { return t.done ? t.value : a.next(); }); }, defineIteratorMethods(g), define(g, u, "Generator"), define(g, a, function () { return this; }), define(g, "toString", function () { return "[object Generator]"; }), e.keys = function (t) { var e = Object(t), r = []; for (var n in e) r.push(n); return r.reverse(), function next() { for (; r.length;) { var t = r.pop(); if (t in e) return next.value = t, next.done = !1, next; } return next.done = !0, next; }; }, e.values = values, Context.prototype = { constructor: Context, reset: function reset(e) { if (this.prev = 0, this.next = 0, this.sent = this._sent = t, this.done = !1, this.delegate = null, this.method = "next", this.arg = t, this.tryEntries.forEach(resetTryEntry), !e) for (var r in this) "t" === r.charAt(0) && n.call(this, r) && !isNaN(+r.slice(1)) && (this[r] = t); }, stop: function stop() { this.done = !0; var t = this.tryEntries[0].completion; if ("throw" === t.type) throw t.arg; return this.rval; }, dispatchException: function dispatchException(e) { if (this.done) throw e; var r = this; function handle(n, o) { return a.type = "throw", a.arg = e, r.next = n, o && (r.method = "next", r.arg = t), !!o; } for (var o = this.tryEntries.length - 1; o >= 0; --o) { var i = this.tryEntries[o], a = i.completion; if ("root" === i.tryLoc) return handle("end"); if (i.tryLoc <= this.prev) { var c = n.call(i, "catchLoc"), u = n.call(i, "finallyLoc"); if (c && u) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } else if (c) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); } else { if (!u) throw Error("try statement without catch or finally"); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } } } }, abrupt: function abrupt(t, e) { for (var r = this.tryEntries.length - 1; r >= 0; --r) { var o = this.tryEntries[r]; if (o.tryLoc <= this.prev && n.call(o, "finallyLoc") && this.prev < o.finallyLoc) { var i = o; break; } } i && ("break" === t || "continue" === t) && i.tryLoc <= e && e <= i.finallyLoc && (i = null); var a = i ? i.completion : {}; return a.type = t, a.arg = e, i ? (this.method = "next", this.next = i.finallyLoc, y) : this.complete(a); }, complete: function complete(t, e) { if ("throw" === t.type) throw t.arg; return "break" === t.type || "continue" === t.type ? this.next = t.arg : "return" === t.type ? (this.rval = this.arg = t.arg, this.method = "return", this.next = "end") : "normal" === t.type && e && (this.next = e), y; }, finish: function finish(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.finallyLoc === t) return this.complete(r.completion, r.afterLoc), resetTryEntry(r), y; } }, "catch": function _catch(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.tryLoc === t) { var n = r.completion; if ("throw" === n.type) { var o = n.arg; resetTryEntry(r); } return o; } } throw Error("illegal catch attempt"); }, delegateYield: function delegateYield(e, r, n) { return this.delegate = { iterator: values(e), resultName: r, nextLoc: n }, "next" === this.method && (this.arg = t), y; } }, e; }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
var crypto = _crypto;
var jwt = _jsonwebtoken;
var _require = _oauthJs,
  getClient = _require.getClient;
var _require2 = _middlewareJs,
  authenticateToken = _require2.authenticateToken;
var getLoginHtml = _viewsLoginJs;
var getErrorHtml = _viewsErrorJs;
function setCookie(res, name, value, options) {
  // Express
  if (typeof res.cookie === 'function') {
    return res.cookie(name, value, options);
  }
  // Fastify
  if (typeof res.setCookie === 'function') {
    return res.setCookie(name, value, options);
  }
  // Could add Koa support: ctx.cookies.set()
}
function setupOauthRoutes(app, sessionStore) {
  var config = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
  // OAuth informational endpoints
  app.get('/oauth/client-metadata.json', function (req, res) {
    res.json(getClient().clientMetadata);
  });
  app.get('/oauth/jwks.json', function (req, res) {
    res.json(getClient().jwks);
  });
  app.get('/oauth/login', /*#__PURE__*/function () {
    var _ref = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee(req, res, next) {
      var state, url;
      return _regeneratorRuntime().wrap(function _callee$(_context) {
        while (1) switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            state = crypto.randomBytes(16).toString('hex');
            _context.next = 4;
            return getClient().authorize(req.query.handle, {
              state: state,
              display: req.query.display || 'page' // Support 'page', 'popup', 'touch'
            });
          case 4:
            url = _context.sent;
            res.redirect(url);
            _context.next = 11;
            break;
          case 8:
            _context.prev = 8;
            _context.t0 = _context["catch"](0);
            next(_context.t0);
          case 11:
          case "end":
            return _context.stop();
        }
      }, _callee, null, [[0, 8]]);
    }));
    return function (_x, _x2, _x3) {
      return _ref.apply(this, arguments);
    };
  }());
  app.get('/oauth/callback', /*#__PURE__*/function () {
    var _ref2 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee2(req, res, next) {
      var params, _yield$getClient$call, session, payload, token, cookieOptions, queryParams;
      return _regeneratorRuntime().wrap(function _callee2$(_context2) {
        while (1) switch (_context2.prev = _context2.next) {
          case 0:
            _context2.prev = 0;
            params = req.method === 'POST' ? req.body : new URLSearchParams(req.url.split('?')[1]);
            _context2.next = 4;
            return getClient().callback(params);
          case 4:
            _yield$getClient$call = _context2.sent;
            session = _yield$getClient$call.session;
            payload = {
              sub: session.did,
              // OpenID Connect standard subject identifier
              did: session.did,
              // AT Protocol identifier
              iss: 'bsky.social',
              // Issuer
              iat: Math.floor(Date.now() / 1000) // Issued at
            };
            token = jwt.sign(payload, process.env.OAUTH_JWT_SECRET, {
              expiresIn: '48h'
            });
            if (process.env.OAUTH_USE_COOKIES === 'true') {
              cookieOptions = _objectSpread(_objectSpread(_objectSpread({
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                sameSite: 'Strict',
                maxAge: config.maxAge || 48 * 60 * 60 * 1000
              }, config.cookieDomain && {
                domain: config.cookieDomain
              }), config.cookiePath && {
                path: config.cookiePath
              }), config.cookieSecret && {
                signed: true
              });
              setCookie(res, 'token', token, cookieOptions);
              res.redirect(config.redirectUrl || '/');
            } else {
              // Redirect with token in query string
              queryParams = new URLSearchParams(_objectSpread(_objectSpread({
                token: token,
                did: session.did,
                handle: session.handle
              }, session.displayName && {
                displayName: session.displayName
              }), session.avatar && {
                avatar: session.avatar
              }));
              res.redirect("".concat(config.redirectUrl || '/', "?").concat(queryParams.toString()));
            }
            _context2.next = 15;
            break;
          case 11:
            _context2.prev = 11;
            _context2.t0 = _context2["catch"](0);
            console.error('Callback error:', _context2.t0);
            next(_context2.t0);
          case 15:
          case "end":
            return _context2.stop();
        }
      }, _callee2, null, [[0, 11]]);
    }));
    return function (_x4, _x5, _x6) {
      return _ref2.apply(this, arguments);
    };
  }());
  app.get('/oauth/userinfo', authenticateToken, function (req, res) {
    if (!req.user) return res.status(401).json({
      error: 'Unauthorized'
    });
    res.json(req.user);
  });
  app.post('/oauth/revoke', authenticateToken, /*#__PURE__*/function () {
    var _ref3 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee3(req, res) {
      var _req$headers$authoriz;
      var sessionId, token, session;
      return _regeneratorRuntime().wrap(function _callee3$(_context3) {
        while (1) switch (_context3.prev = _context3.next) {
          case 0:
            sessionId = req.user.did;
            token = req.body.token || ((_req$headers$authoriz = req.headers['authorization']) === null || _req$headers$authoriz === void 0 ? void 0 : _req$headers$authoriz.split(' ')[1]);
            if (token) {
              _context3.next = 4;
              break;
            }
            return _context3.abrupt("return", res.status(400).json({
              error: 'Token is required'
            }));
          case 4:
            _context3.prev = 4;
            _context3.next = 7;
            return sessionStore.get(sessionId);
          case 7:
            session = _context3.sent;
            if (session) {
              _context3.next = 10;
              break;
            }
            return _context3.abrupt("return", res.status(200).json({
              message: 'Token revoked'
            }));
          case 10:
            // Delete the access_token and set expires to right now
            delete session.tokenSet.access_token;
            session.tokenSet.expires_at = new Date().toISOString();
            _context3.next = 14;
            return sessionStore.set(sessionId, session);
          case 14:
            return _context3.abrupt("return", res.status(200).json({
              message: 'Token revoked'
            }));
          case 17:
            _context3.prev = 17;
            _context3.t0 = _context3["catch"](4);
            console.error('Error revoking access token:', _context3.t0);
            return _context3.abrupt("return", res.status(500).json({
              error: 'Internal server error.'
            }));
          case 21:
          case "end":
            return _context3.stop();
        }
      }, _callee3, null, [[4, 17]]);
    }));
    return function (_x7, _x8) {
      return _ref3.apply(this, arguments);
    };
  }());

  // Optional login page
  if (config.serveLoginPage !== false) {
    app.get('/login', /*#__PURE__*/function () {
      var _ref4 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee4(req, res) {
        return _regeneratorRuntime().wrap(function _callee4$(_context4) {
          while (1) switch (_context4.prev = _context4.next) {
            case 0:
              res.send(getLoginHtml(config));
            case 1:
            case "end":
              return _context4.stop();
          }
        }, _callee4);
      }));
      return function (_x9, _x10) {
        return _ref4.apply(this, arguments);
      };
    }());
  }

  // Error handling middleware specifically for OAuth routes (Express)
  if (config.serveErrorPage !== false) {
    var errorRoutes = ['/oauth/*'];
    if (config.serveLoginPage !== false) errorRoutes.push('/login');
    app.use(errorRoutes, function (err, req, res, next) {
      var _req$headers$accept;
      console.error('OAuth Error:', err);

      // If API request (based on Accept header or XHR)
      if (req.xhr || (_req$headers$accept = req.headers.accept) !== null && _req$headers$accept !== void 0 && _req$headers$accept.includes('application/json')) {
        return res.status(err.status || 500).json({
          error: err.message || 'Internal Server Error'
        });
      }

      // For browser requests, show error page
      var errorMessage = process.env.NODE_ENV === 'production' ? 'An error occurred during authentication.' : err.message || 'Internal Server Error';
      res.status(err.status || 500).send(getErrorHtml({
        title: 'Authentication Error',
        error: errorMessage
      }));
    });
  }
}
module.exports = {
  setupOauthRoutes: setupOauthRoutes
};
export default module.exports;