require('dotenv').config();
// const express = require('express');
const { initializeOAuth } = require('./oauth');
const { authMiddleware } = require('./middleware');
const { oauthRoutes } = require('./routes');

async function setupExpressAuth(app, options = {}) {
    // Initialize OAuth client
    await initializeOAuth(options);
    app.use(authMiddleware());
    app.use(oauthRoutes());
}

module.exports = {
    setupExpressAuth,
    authMiddleware,
    oauthRoutes,
    initializeOAuth
};
