import AuthenticationServices

let authSession = ASWebAuthenticationSession(
    url: URL(string: "http://your-server/login")!,
    callbackURLScheme: "yourapp",
    completionHandler: { callbackURL, error in
        // Parse token from callbackURL
    }
)
authSession.start()