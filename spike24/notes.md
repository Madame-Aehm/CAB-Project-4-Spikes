# Spike 24 Notes

## Authorization with Passport Strategy

- Now that our user has been authenticated and a token has been issued, we're going to use [**Passport**](https://www.passportjs.org/), which is an authentication middleware for Node.js, to create an authorization strategy. If we have a look at strategies offered by Passport, there are packages available for many authentication options. For some options, such as signing in through Google or GitHub, there is no token. We'll be using the [JWT strategy](https://www.passportjs.org/packages/passport-jwt/). 

- Install on the server the packages for 'passport' and 'passport-jwt' via npm.

- Following along with the documentation for our strategy, we'll need to configure Passport in our app. Create a new `.js` file in `config` for 'passportConfig'. There is an example configuration we can use as a guide. 