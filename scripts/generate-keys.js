#!/usr/bin/env node
const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');
const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

async function generateKeys() {
    const targetDir = process.cwd(); // User's project directory
    const envPath = path.join(targetDir, '.env');

    // Check if .env exists
    if (fs.existsSync(envPath)) {
        const answer = await new Promise(resolve => {
            rl.question('.env file already exists. Append OAuth keys? (y/N) ', resolve);
        });
        if (answer.toLowerCase() !== 'y') {
            console.log('Aborted.');
            process.exit(0);
        }
    }

    // Generate keys
    const keys = {};
    for (let i = 1; i <= 3; i++) {
        const privateKey = execSync('openssl genpkey -algorithm RSA -pkeyopt rsa_keygen_bits:2048').toString();
        keys[`OAUTH_PRIVATE_KEY_${i}`] = privateKey.replace(/\n/g, '');
    }

    const jwtSecret = execSync('openssl rand -base64 32').toString().trim();
    
    // Create or append to .env
    const envContent = `
# Bluesky OAuth Keys
OAUTH_JWT_SECRET='${jwtSecret}'
OAUTH_PRIVATE_KEY_1='${keys.OAUTH_PRIVATE_KEY_1}'
OAUTH_PRIVATE_KEY_2='${keys.OAUTH_PRIVATE_KEY_2}'
OAUTH_PRIVATE_KEY_3='${keys.OAUTH_PRIVATE_KEY_3}'
`;

    if (fs.existsSync(envPath)) {
        fs.appendFileSync(envPath, envContent);
        console.log('Added OAuth keys to existing .env file. Double check for duplicate keys.');
    } else {
        const defaultEnv = `
# OAuth Configuration
OAUTH_BASE_URL='http://localhost:5001'
OAUTH_CLIENT_NAME='OAuth Example App'
OAUTH_USE_COOKIES=false
OAUTH_REDIRECT_URL=/
NODE_ENV=development
${envContent}
`;
        fs.writeFileSync(envPath, defaultEnv.trim());
        console.log('Created new .env file with OAuth configuration. Update your OAUTH_CLIENT_NAME.');
    }

    rl.close();
}

generateKeys().catch(console.error);
