const { initializeOAuth, getClient, getSessionStore, getStateStore } = require('./oauth');
const { InMemoryStore } = require('./sessionStore');
const { authenticateToken } = require('./middleware');
const { setupOauthRoutes } = require('./routes');

async function setupExpressAuth(app, options = {}) {
    // Add security headers
    app.use((req, res, next) => {
        res.setHeader('X-Content-Type-Options', 'nosniff');
        res.setHeader('X-Frame-Options', 'DENY');
        res.setHeader('X-XSS-Protection', '1; mode=block');
        next();
    });

    // Force HTTPS in production
    if (process.env.NODE_ENV === 'production') {
        app.use((req, res, next) => {
            if (req.header('x-forwarded-proto') !== 'https') {
                return res.redirect(`https://${req.header('host')}${req.url}`);
            }
            next();
        });
    }

    const { client, sessionStore, stateStore } = await initializeOAuth(options, {
        stateStore: options.stateStore,
        sessionStore: options.sessionStore
    });

    setupOauthRoutes(app, sessionStore);

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
