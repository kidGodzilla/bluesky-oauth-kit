const { initializeOAuth, getClient, getSessionStore, getStateStore } = require('./oauth.js');
const { InMemoryStore } = require('./sessionStore.js');
const { authenticateToken } = require('./middleware.js');
const { setupOauthRoutes } = require('./routes.js');

async function setupExpressAuth(app, options = {}) {
    // Add security headers
    if (options.addHeaders !== false) {
        app.use((req, res, next) => {
            res.setHeader('X-Content-Type-Options', 'nosniff');
            res.setHeader('X-Frame-Options', 'DENY');
            res.setHeader('X-XSS-Protection', '1; mode=block');
            next();
        });
    }

    // Force HTTPS in production
    if (options.forceHTTPS || process.env.NODE_ENV === 'production' && options.forceHTTPS !== false) {
        app.use((req, res, next) => {
            if (req.header('x-forwarded-proto') && req.header('x-forwarded-proto') !== 'https') {
                return res.redirect(`https://${req.header('host')}${req.url}`);
            }
            next();
        });
    }

    // Store the redirectUrl in the config for use in routes
    options.redirectUrl = options.redirectUrl || process.env.OAUTH_REDIRECT_URL || '/';

    const { client, sessionStore, stateStore } = await initializeOAuth(options, {
        stateStore: options.stateStore,
        sessionStore: options.sessionStore
    });

    setupOauthRoutes(app, sessionStore, options);

    return { client, sessionStore, stateStore };
}

module.exports = {
    setupExpressAuth,
    authenticateToken,
    setupOauthRoutes,
    initializeOAuth,
    InMemoryStore,
    getStateStore,
    getSessionStore,
    getClient,
};
