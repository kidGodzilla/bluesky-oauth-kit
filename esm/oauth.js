import _sessionStore from "./sessionStore";
import { NodeOAuthClient } from "@atproto/oauth-client-node";
import { JoseKey } from "@atproto/jwk-jose";
var module = {
  exports: {}
};
var exports = module.exports;
const InMemoryStore = _sessionStore;
let client = null;
let stateStore = null;
let sessionStore = null;
function getConfig(config = {}) {
  const baseUrl = config.baseUrl || process.env.OAUTH_BASE_URL;

  // Handle localhost client_id special case
  const client_id = baseUrl.includes('127.0.0.1') ? `http://localhost?redirect_uri=${encodeURIComponent(`${baseUrl}/oauth/callback`)}&scope=${encodeURIComponent('atproto transition:generic')}` : `${baseUrl}/oauth/client-metadata.json`;
  const metadata = {
    // Standard OAuth 2.0 client configuration
    client_id: config.clientId || client_id,
    client_name: config.clientName || process.env.OAUTH_CLIENT_NAME || 'OAuth Client',
    client_uri: config.clientUri || baseUrl,
    redirect_uris: config.redirectUris || [`${baseUrl}/oauth/callback`],
    // Standard OAuth 2.0 supported features
    grant_types: config.grantTypes || ['authorization_code', 'refresh_token'],
    response_types: config.responseTypes || ['code'],
    scope: config.scope || 'atproto transition:generic',
    // Client authentication settings
    application_type: 'web',
    token_endpoint_auth_method: 'private_key_jwt',
    token_endpoint_auth_signing_alg: 'RS256',
    jwks_uri: config.jwksUri || `${baseUrl}/oauth/jwks.json`,
    dpop_bound_access_tokens: true
  };

  // Optional fields - only add if provided in config
  if (config.logoUri) metadata.logo_uri = config.logoUri;
  if (config.tosUri) metadata.tos_uri = config.tosUri;
  if (config.policyUri) metadata.policy_uri = config.policyUri;

  // Store the redirectUrl in the config for use in routes
  config.redirectUrl = config.redirectUrl || process.env.OAUTH_REDIRECT_URL || '/';
  return metadata;
}
async function initializeOAuth(config = {}, stores = {}) {
  const requiredEnvVars = ['OAUTH_JWT_SECRET', 'OAUTH_PRIVATE_KEY_1', 'OAUTH_PRIVATE_KEY_2', 'OAUTH_PRIVATE_KEY_3'];
  requiredEnvVars.forEach(varName => {
    if (!process.env[varName]) {
      throw new Error(`Missing required environment variable ${varName}`);
    }
  });

  // Use provided stores or create new in-memory stores
  stateStore = stores.stateStore || new InMemoryStore();
  sessionStore = stores.sessionStore || new InMemoryStore();
  client = new NodeOAuthClient({
    clientMetadata: getConfig(config),
    keyset: await Promise.all([JoseKey.fromImportable(process.env.OAUTH_PRIVATE_KEY_1, 'key1'), JoseKey.fromImportable(process.env.OAUTH_PRIVATE_KEY_2, 'key2'), JoseKey.fromImportable(process.env.OAUTH_PRIVATE_KEY_3, 'key3')]),
    stateStore,
    sessionStore
  });
  return {
    client,
    sessionStore,
    stateStore
  };
}
module.exports = {
  initializeOAuth,
  getClient: () => client,
  getStateStore: () => stateStore,
  getSessionStore: () => sessionStore,
  InMemoryStore
};
export default module.exports;