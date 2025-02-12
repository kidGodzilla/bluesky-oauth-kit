# Bluesky OAuth (2.0) Kit

Goal: Everything you need to implement Bluesky OAuth sign-in for a Javascript application.


# Installation

```bash
npm i -s bluesky-oauth-kit
```

# Usage

See `examples` directory.

## Express (Default Options)

```js
const express = require('express');
const { setupExpressAuth } = require('bluesky-oauth-kit');

const app = express();

// Basic setup
await setupExpressAuth(app, { 
    baseUrl: 'http://localhost:5001' 
});

// With additional options
await setupExpressAuth(app, {
    baseUrl: 'http://localhost:5001',
    redirectUrl: '/dashboard',
    clientName: 'My OAuth App',
    // Optional: Custom storage implementations
    stateStore: customStateStore,
    sessionStore: customSessionStore
});
```

## Express (composable)

```js
const express = require('express');
const { initializeOAuth, authenticateToken, setupOauthRoutes } = require('bluesky-oauth-kit');

const app = express();

(async function() {
    const { client, sessionStore, stateStore } = await initializeOAuth(options);
    setupOauthRoutes(app, sessionStore);
})();
```

## Framework Support

The library works with multiple frameworks:
- Express (primary support)
- Fastify (see examples/fastify.js)

Other frameworks can be supported by PR.

## Environment Variables

```env
# Required
OAUTH_JWT_SECRET=your-jwt-secret
OAUTH_BASE_URL=http://localhost:5001
OAUTH_PRIVATE_KEY_1=your-private-key-1
OAUTH_PRIVATE_KEY_2=your-private-key-2
OAUTH_PRIVATE_KEY_3=your-private-key-3

# Optional
OAUTH_CLIENT_NAME=My OAuth App
OAUTH_USE_COOKIES=true
OAUTH_REDIRECT_URL=/dashboard
NODE_ENV=development
```

## Custom Storage

The library uses in-memory storage by default, but you can implement your own storage:

```js
class CustomStore {
    async get(key) { /* ... */ }
    async set(key, value) { /* ... */ }
    async del(key) { /* ... */ }
}

// Redis example
class RedisStore {
    constructor(redis) {
        this.redis = redis;
    }
    async get(key) { return JSON.parse(await this.redis.get(key)); }
    async set(key, value) { await this.redis.set(key, JSON.stringify(value)); }
    async del(key) { await this.redis.del(key); }
}
```

## Available Endpoints

The library sets up the following endpoints:
- `/login` - Serves a login form (optional, can be disabled)
- `/oauth/login` - Initiates the OAuth flow
- `/oauth/callback` - Handles the OAuth callback
- `/oauth/userinfo` - Returns info about the authenticated user
- `/oauth/revoke` - Revokes the current session
- `/oauth/client-metadata.json` - Serves OAuth client metadata
- `/oauth/jwks.json` - Serves the JSON Web Key Set

## Configuration

```js
await setupExpressAuth(app, {
    baseUrl: 'http://localhost:5001',
    serveLoginPage: true,  // Set to false to disable built-in login page
    serveErrorPage: true,  // Set to false to disable built-in error page
    loginPageTitle: 'Login with Bluesky',  // Customize login page
    display: 'page',  // 'page', 'popup', or 'touch' for mobile
    maxAge: 48 * 60 * 60 * 1000,  // Cookie lifetime
    cookieDomain: '.yourdomain.com',
    cookiePath: '/',
    cookieSecret: 'your-secret',
    // ... other options
});
```

# Development

## Running the Example

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Copy .env.example to .env and fill in your values:
   ```bash
   cp .env.example .env
   ```
4. Run the example:
   ```bash
   node examples/express.js
   ```

The example server will start on http://localhost:5001

## Generating Keys

You can generate OAuth keys in two ways:

1. Using npx (recommended):
```bash
npx bluesky-oauth-kit generate-oauth-keys
```

2. After installing as a dependency:
```bash
npm run generate-keys
```

This will either create a new .env file or append OAuth keys to your existing one.

## Authentication Flow

The library implements standard OAuth 2.0 authentication, providing:

1. A JWT containing:
   - `sub`: The user's DID (standard OpenID Connect subject identifier)
   - `did`: The user's DID (AT Protocol identifier)
   - `iss`: The issuer ('bsky.social')
   - `iat`: Token issue timestamp

2. The `/oauth/userinfo` endpoint returns this basic profile information.

Note: For richer profile data (handle, displayName, avatar, etc.), you'll need to:
1. Install `@atproto/api`
2. Use the session to create an Agent
3. Call `agent.getProfile()`

Example:
```js
const { Agent } = require('@atproto/api');

// Get rich profile data
const agent = new Agent(session);
const profile = await agent.getProfile({ actor: agent.did });
console.log(profile.data);  // Contains handle, displayName, avatar, etc.
```

## Security Configuration

The library includes several security features that can be configured:

### Cookie Options
When using `OAUTH_USE_COOKIES=true`, you can configure cookie security:

```js
await setupExpressAuth(app, {
    maxAge: 7 * 24 * 60 * 60 * 1000,  // Cookie lifetime (default 48h)
    cookieDomain: '.yourdomain.com',   // Cookie domain
    cookiePath: '/',                   // Cookie path
    cookieSecret: 'your-secret',       // Enable signed cookies
});
```

### Security Headers
The library automatically sets security headers:
- `X-Content-Type-Options: nosniff`
- `X-Frame-Options: DENY`
- `X-XSS-Protection: 1; mode=block`

### CORS
Configure CORS in your Express app:
```js
app.use(cors({
    origin: process.env.OAUTH_BASE_URL,
    methods: ['GET', 'POST'],
    allowedHeaders: ['Content-Type', 'Authorization'],
}));
```

### HTTPS
In production (`NODE_ENV=production`):
- Cookies are automatically set as `Secure`
- HTTP requests are redirected to HTTPS
- Cookies use `SameSite=Strict`

### Rate Limiting
The example includes rate limiting. You should include this (or something similar) in your app.

```js
const rateLimit = require('express-rate-limit');
app.use(['/login', '/oauth/*'], rateLimit({
    windowMs: 15 * 60 * 1000,  // 15 minutes
    max: 100                    // Limit each IP to 100 requests per window
}));
```

## Available Scopes

The Bluesky OAuth server supports these scopes:
- `atproto` - Standard AT Protocol access
- `transition:generic` - Generic transition scope
- `transition:chat.bsky` - Chat transition scope (future use)

## OAuth Implementation Details

This library implements the AT Protocol OAuth specification via `@atproto/oauth-client-node`:
- Secure OAuth 2.0 flow with PAR, DPoP, and PKCE
- Session management
- Token handling and refresh
- Framework integrations (Express, Fastify)
- Configurable storage backends

