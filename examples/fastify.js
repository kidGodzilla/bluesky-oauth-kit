require('dotenv').config();

const fastify = require('fastify');
const path = require('path');

const { setupExpressAuth, InMemoryStore } = require('../index.js');

const app = fastify({
    logger: true
});

// CORS
app.register(require('@fastify/cors'), {
    origin: process.env.OAUTH_BASE_URL,
    methods: ['GET', 'POST'],
    allowedHeaders: ['Content-Type', 'Authorization'],
});

// Cookie support
app.register(require('@fastify/cookie'));

// Static files
app.register(require('@fastify/static'), {
    root: path.join(__dirname, '..', 'clients'),
    prefix: '/'
});

// Rate limiting
app.register(require('@fastify/rate-limit'), {
    max: 100,
    timeWindow: '15 minutes',
    allowList: ['127.0.0.1']
});

// Initialize our in-memory stores
let stateStore = new InMemoryStore(), sessionStore = new InMemoryStore();

// Serve the example page
app.get('/', (request, reply) => {
    reply.sendFile('express.html', path.join(__dirname));
});

(async () => {
    try {
        await setupExpressAuth(app, {
            baseUrl: 'http://127.0.0.1:5001',
            serveLoginPage: true,
            redirectUrl: '/',
            stateStore,
            sessionStore,
        });
        
        await app.listen({ port: process.env.PORT || 5001 });
        console.log(`Server running on port ${process.env.PORT || 5001}`);
    } catch (error) {
        console.error('Failed to setup auth:', error);
        process.exit(1);
    }
})();
