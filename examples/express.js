// require('dotenv').config();

const cookieParser = require('cookie-parser');
const cors = require('cors');
const express = require('express');
const path = require('path');

const { setupExpressAuth, InMemoryStore } = require('../index.js');

const app = express();
app.set('trust proxy', 2);

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({
    origin: process.env.OAUTH_BASE_URL,
    methods: ['GET', 'POST'],
    allowedHeaders: ['Content-Type', 'Authorization'],
}));

// Rate limiting
const rateLimit = require('express-rate-limit');
app.use(['/login', '/oauth/*name'], rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100,
}));

// Initialize our in-memory stores
let stateStore = new InMemoryStore(), sessionStore = new InMemoryStore();

// Alternative example using a Redis store
// const Redis = require('ioredis');
// class RedisStore {
//     constructor(redis) {
//         this.redis = redis;
//     }
//     async get(key) { return JSON.parse(await this.redis.get(key)); }
//     async set(key, value) { await this.redis.set(key, JSON.stringify(value)); }
//     async del(key) { await this.redis.del(key); }
// }

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'express.html'));
});

app.use(express.static('clients'));

(async () => {
    try {
        await setupExpressAuth(app, {
            baseUrl: 'http://127.0.0.1:5001',
            serveLoginPage: true,
            serveErrorPage: true,
            redirectUrl: '/',

            // Optional: Use Redis for session/state storage
            // stateStore: new RedisStore(new Redis()),
            // sessionStore: new RedisStore(new Redis()),
            
            // Default: Use in-memory storage
            stateStore,
            sessionStore,
        });
        
        app.listen(process.env.PORT || 5001, () => console.log(`Server running on port ${ process.env.PORT || 5001 }`));
    } catch (error) {
        console.error('Failed to setup auth:', error);
        process.exit(1);
    }
})();

/* EXAMPLE: USING ATPROTO AFTER INTEGRATING THIS PACKAGE */
const { authenticateToken, getClient } = require('../index.js');
const { Agent } = require('@atproto/api');
// Small endpoint to demonstrate an API request
app.get('/profile', authenticateToken, async (req, res) => {
    if (!req.user || !req.user.did) return res.status(500).send('Error');

    try {
        const client = getClient();
        const oauthSession = await client.restore(req.user.did);
        // Instantiate the api Agent using an OAuthSession
        const agent = new Agent(oauthSession);

        const profile = await agent.getProfile({ actor: agent.did });
        console.log('Bsky profile:', profile.data);

        res.json(profile);
    } catch(e) {
        console.log(e);
        res.status(403).send('Unauthorized'); // Simplified error handling for this example
    }
});

// Endpoint to demonstrate a write request
app.get('/post', authenticateToken, async (req, res) => {
    if (!req.user || !req.user.did) return res.status(500).send('Error');

    try {
        const client = getClient();
        const oauthSession = await client.restore(req.user.did);
        // Instantiate the api Agent using an OAuthSession
        const agent = new Agent(oauthSession);

        const response = await agent.post({
            $type: "app.bsky.feed.post",         // The AT Protocal type
            text: req.query.text,
            createdAt: new Date().toISOString()  // Required format
        });

        console.log('Bsky response:', response);

        res.json(response);
    } catch(e) {
        console.log(e);
        res.status(403).send('Unauthorized'); // Simplified error handling for this example
    }
});
