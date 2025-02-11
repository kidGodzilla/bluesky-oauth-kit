const express = require('express');
const { getClient } = require('./oauth');
const jwt = require('jsonwebtoken');

const router = express.Router();

router.get('/oauth/login', async (req, res, next) => {
    try {
        const state = crypto.randomBytes(16).toString('hex');
        const url = await getClient().authorize(req.query.handle, { state });
        res.redirect(url);
    } catch (err) {
        next(err);
    }
});

router.get('/oauth/callback', async (req, res, next) => {
    try {
        const params = new URLSearchParams(req.url.split('?')[1]);
        const { session } = await getClient().callback(params);

        const payload = {
            did: session.did,
            handle: session.handle,
        };

        const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '48h' });

        res.redirect(`/?token=${encodeURIComponent(token)}`);
    } catch (err) {
        next(err);
    }
});

router.get('/me', (req, res) => {
    if (!req.user) return res.status(401).json({ error: 'Unauthorized' });
    res.json({ user: req.user });
});

module.exports = { oauthRoutes: () => router };
