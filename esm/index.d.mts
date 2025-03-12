import type { Express } from 'express';
import type { FastifyInstance } from 'fastify';
import type { Request, Response, NextFunction } from 'express';
import type { FastifyRequest, FastifyReply } from 'fastify';
import type { NodeOAuthClient } from '@atproto/oauth-client-node';

export interface OAuthOptions {
    baseUrl?: string;
    clientId?: string;
    clientName?: string;
    clientUri?: string;
    redirectUris?: string[];
    grantTypes?: string[];
    responseTypes?: string[];
    scope?: string;
    logoUri?: string;
    tosUri?: string;
    policyUri?: string;
    redirectUrl?: string;
    serveLoginPage?: boolean;
    serveErrorPage?: boolean;
    maxAge?: number;
    cookieDomain?: string;
    cookiePath?: string;
    cookieSecret?: string;
    stateStore?: Store;
    sessionStore?: Store;
}

export interface Store {
    get(key: string): Promise<any>;
    set(key: string, value: any): Promise<void>;
    del(key: string): Promise<void>;
}

export class InMemoryStore implements Store {
    get(key: string): Promise<any>;
    set(key: string, value: any): Promise<void>;
    del(key: string): Promise<void>;
}

export function setupExpressAuth(app: Express, options?: OAuthOptions): Promise<{
    client: NodeOAuthClient;
    sessionStore: Store;
    stateStore: Store;
}>;

export function authenticateToken(
    req: Request | FastifyRequest,
    res: Response | FastifyReply,
    next: NextFunction
): void;

export function setupOauthRoutes(app: Express | FastifyInstance, sessionStore: Store, config?: OAuthOptions): void;

export function initializeOAuth(config?: OAuthOptions, stores?: {
    stateStore?: Store;
    sessionStore?: Store;
}): Promise<{
    client: any;
    sessionStore: Store;
    stateStore: Store;
}>;

export function getClient(): NodeOAuthClient;
export function getStateStore(): Store;
export function getSessionStore(): Store;

export interface User {
    sub: string;
    did: string;
    iss: string;
    iat: number;
    exp?: number;
}

// Then extend Express Request
declare global {
    namespace Express {
        interface Request {
            user?: User;
            auth?: { user: User };
        }
    }
}