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
const { setupExpressAuth } = require('bluesky-oauth-kit');

const app = express();
setupExpressAuth(app, { BASE_URL: 'http://localhost:5001' });

app.listen(5001, () => console.log('Server running on port 5001'));
```

## Express (composable)

```js
const { initializeOAuth, authMiddleware, oauthRoutes } = require('bluesky-oauth-kit');

const app = express();
let client;

(async function() {
    client = await initializeOAuth(options);
    app.use(authMiddleware());
    app.use(oauthRoutes());
})();
```

# Crypto
You can generate your .env file in one go using the included script (macOS).

Generate public/private keypairs (macOS) & create/update .env file:

```bash
sh ./generate_keypairs.sh
```


### Todos
- [ ] Factor out express dependency so the routes can be rewritten for other frameworks
