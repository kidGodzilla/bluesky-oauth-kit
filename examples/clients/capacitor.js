// Capacitor app.ts
import { Browser } from '@capacitor/browser';

async function login() {
    await Browser.open({
        url: 'https://your-server/login',
        windowName: '_self',
        presentationStyle: 'popover'
    });

    // Listen for redirect URL
    Browser.addListener('browserFinished', async (data) => {
        const url = new URL(data.url);
        const token = new URLSearchParams(url.search).get('token');
        if (token) {
            // Store token securely in Capacitor storage
            await Storage.set({
                key: 'auth_token',
                value: token
            });
        }
    });
}