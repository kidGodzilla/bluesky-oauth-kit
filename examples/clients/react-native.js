import { Linking, WebView } from 'react-native';
// Option 1: Using WebView
<WebView
    source={{ uri: 'http://your-server/login' }}
    onNavigationStateChange={(navState) => {
        // Check URL for token
        if (navState.url.includes('token=')) {
            // Extract and store token
        }
    }}
/>

// Option 2: Using in-app browser
import InAppBrowser from 'react-native-inappbrowser-reborn';
const result = await InAppBrowser.openAuth(
    'http://your-server/login',
    'yourapp://callback'
);