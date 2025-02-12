// @ts-check
import express from 'express';
import pkg from '../../esm/index.mjs';
const { setupExpressAuth, InMemoryStore } = pkg;
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

// ESM equivalent of __dirname
const __dirname = path.dirname(fileURLToPath(import.meta.url));

dotenv.config();

const app = express();

// Initialize our in-memory stores
const stateStore = new InMemoryStore();
const sessionStore = new InMemoryStore();

// Serve the example page
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
            stateStore,
            sessionStore,
        });
        
        app.listen(process.env.PORT || 5001, () => 
            console.log(`Server running on port ${process.env.PORT || 5001}`)
        );
    } catch (error) {
        console.error('Failed to setup auth:', error);
        process.exit(1);
    }
})(); 