const crypto = require('crypto');
const { JoseKey } = require('@atproto/jwk-jose');
const { NodeOAuthClient } = require('@atproto/oauth-client-node');
const stateStore = require('./sessionStore');

let client = null;

async function initializeOAuth(config = {}) {
    const BASE_URL = config.BASE_URL || process.env.BASE_URL;
    const requiredEnvVars = ['JWT_SECRET', 'PRIVATE_KEY_1', 'PRIVATE_KEY_2', 'PRIVATE_KEY_3'];

    requiredEnvVars.forEach((varName) => {
        if (!process.env[varName]) {
            console.error(`Missing required environment variable ${varName}`);
            process.exit(1);
        }
    });

    client = new NodeOAuthClient({
        clientMetadata: {
            client_id: config.client_id || BASE_URL + '/client-metadata.json',
            client_name: config.client_name || config.OAUTH_APP_NAME || 'OAuth Example App',
            client_uri: config.client_uri || BASE_URL,
            redirect_uris: config.redirect_uris || [BASE_URL + '/oauth/callback'],
            grant_types: config.grant_types || ['authorization_code', 'refresh_token'],
            response_types: config.response_types || ['code'],
            scope: config.scope || 'atproto transition:generic',
            application_type: config.application_type || 'web',
            token_endpoint_auth_method: config.token_endpoint_auth_method || 'private_key_jwt',
            token_endpoint_auth_signing_alg: config.token_endpoint_auth_signing_alg || 'RS256',
            jwks_uri: config.jwks_uri || BASE_URL + '/jwks.json',
        },
        keyset: await Promise.all([
            JoseKey.fromImportable(process.env.PRIVATE_KEY_1, 'key1'),
            JoseKey.fromImportable(process.env.PRIVATE_KEY_2, 'key2'),
            JoseKey.fromImportable(process.env.PRIVATE_KEY_3, 'key3'),
        ]),
        stateStore,
    });

    return client;
}

module.exports = { initializeOAuth, getClient: () => client };
