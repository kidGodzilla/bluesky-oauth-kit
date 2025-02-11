// PWA login.js
async function login() {
    // Redirect to login
    window.location.href = '/login';
}

// PWA callback handling (e.g. in your app.js)
if (window.location.search) {
    // Get token from URL params after OAuth redirect
    const token = new URLSearchParams(window.location.search).get('token');
    if (token) {
        // Store in localStorage/IndexedDB
        localStorage.setItem('auth_token', token);
        // Clean URL
        window.history.replaceState({}, document.title, '/');
    }
}