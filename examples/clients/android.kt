// Using Custom Tabs
val customTabsIntent = CustomTabsIntent.Builder().build()
customTabsIntent.launchUrl(context, Uri.parse("http://your-server/login"))

// Handle callback in Activity
override fun onNewIntent(intent: Intent) {
    super.onNewIntent(intent)
    // Parse token from intent data
}