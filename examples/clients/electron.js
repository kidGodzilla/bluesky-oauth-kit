// Electron main.js
// Option 1: Using built-in window
const authWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
        nodeIntegration: false
    }
});
authWindow.loadURL('http://your-server/login');
authWindow.webContents.on('will-redirect', (event, url) => {
    if (url.includes('token=')) {
        const token = new URL(url).searchParams.get('token');
        // Store token, close window
        authWindow.close();
    }
});

// Option 2: Using system browser
const { shell } = require('electron');
shell.openExternal('http://your-server/login');