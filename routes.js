const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const { getClient } = require('./oauth');
const { authenticateToken } = require('./middleware');
const getLoginHtml = require('./views/login');

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

function setupOauthRoutes(app, sessionStore, config = {}) {
    // OAuth informational endpoints
    app.get('/oauth/client-metadata.json', (req, res) => {
        res.json(getClient().clientMetadata);
    });

    app.get('/oauth/jwks.json', (req, res) => {
        res.json(getClient().jwks);
    });

    app.get('/oauth/login', async (req, res, next) => {
        try {
            const state = crypto.randomBytes(16).toString('hex');
            const url = await getClient().authorize(req.query.handle, { state });
            res.redirect(url);
        } catch (err) {
            next(err);
        }
    });

    app.get('/oauth/callback', async (req, res, next) => {
        try {
            const params = new URLSearchParams(req.url.split('?')[1]);
            const { session } = await getClient().callback(params);

            const payload = {
                sub: session.did,  // OpenID Connect standard subject identifier
                did: session.did,  // AT Protocol identifier
                iss: 'bsky.social',  // Issuer
                iat: Math.floor(Date.now() / 1000),  // Issued at
            };

            const token = jwt.sign(payload, process.env.OAUTH_JWT_SECRET, { expiresIn: '48h' });
            
            if (process.env.OAUTH_USE_COOKIES === 'true') {
                const cookieOptions = {
                    httpOnly: true,
                    secure: process.env.NODE_ENV === 'production',
                    sameSite: 'Strict',
                    maxAge: config.maxAge || 48 * 60 * 60 * 1000, // Default 48 hours
                    ...(config.cookieDomain && { domain: config.cookieDomain }),
                    ...(config.cookiePath && { path: config.cookiePath }),
                    ...(config.cookieSecret && { signed: true })
                };
                
                setCookie(res, 'token', token, cookieOptions);
                res.redirect(config.redirectUrl || '/');
            } else {
                // Redirect with token in query string
                const queryParams = new URLSearchParams({
                    token,
                    did: session.did,
                    handle: session.handle,
                    ...(session.displayName && { displayName: session.displayName }),
                    ...(session.avatar && { avatar: session.avatar })
                });
                
                res.redirect(`${config.redirectUrl || '/'}?${queryParams.toString()}`);
            }
        } catch (err) {
            console.error('Callback error:', err);
            next(err);
        }
    });

    app.get('/oauth/userinfo', authenticateToken, (req, res) => {
        if (!req.user) return res.status(401).json({ error: 'Unauthorized' });
        res.json({ user: req.user });
    });

    app.post('/oauth/revoke', authenticateToken, async (req, res) => {
        const sessionId = req.user.did;
        const token = req.body.token || req.headers['authorization']?.split(' ')[1];

        if (!token) {
            return res.status(400).json({ error: 'Token is required' });
        }

        try {
            const session = await sessionStore.get(sessionId);

            if (!session) {
                // OAuth spec says to return 200 even if token was invalid
                return res.status(200).json({ message: 'Token revoked' });
            }

            // Delete the access_token and set expires to right now
            delete session.tokenSet.access_token;
            session.tokenSet.expires_at = new Date().toISOString();

            await sessionStore.set(sessionId, session);

            // OAuth spec requires 200 OK response
            return res.status(200).json({ message: 'Token revoked' });
        } catch (error) {
            console.error('Error revoking access token:', error);
            return res.status(500).json({ error: 'Internal server error.' });
        }
    });

    // Optional login page
    if (config.serveLoginPage !== false) {
        app.get('/login', async (req, res) => {
            res.send(getLoginHtml(config));
        });
    }
}

module.exports = { setupOauthRoutes };
