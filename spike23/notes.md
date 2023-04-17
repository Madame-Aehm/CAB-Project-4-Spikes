# Spike 23 Notes

## Authentication

- When you log into a website, your credentials are being used to **authenticate** your identity. The log-in process is the authentication process. Once a user's identity is confirmed, they are granted **authorized** access to certain data. This authenticated status is saved as a [**token**](https://www.okta.com/identity-101/what-is-token-based-authentication/).

- Think of a **token** like a wristband at a music festival - once your ticket validity is confirmed, you're given a wristband. Depending on your ticket price, your wristband gives you access to parts of the festival. A VIP wristband gets access to more places than a regular wristband, a staff or backstage wristband will be able to get through into other places restricted to the public. A wristband that's been damaged, tampered with, or expired will be rejected.

### JWT - JSON Web Token

- The **auth token** that we're going to be using is an open standard: the [**JSON Web Token (JWT)**](https://supertokens.com/blog/what-is-jwt#).

- The [**debugger**](https://jwt.io/) on JWT official docs can show us how it's built: a **Header**, a **Payload**, and a **Signature**. The JSON-formatted data fields are hashed into a code which makes up the token itself. If we make any changes to any of these fields, you'll notice the token change.

- The Header will contain metadata to determine the **token type** (in our case `typ: "JWT"`) and the [**signing algorithm**](https://auth0.com/blog/json-web-token-signing-algorithms-overview/) (in our case `alg: "HS256"`, which is the default).

- The Payload is the body of the token, this is where the actual data used to identify the user will be stored. The properties in this section are known as **claims**, and while you can put any data you like in here, there are some common [claim conventions](https://www.iana.org/assignments/jwt/jwt.xhtml):
  - **iss** = issuer (ie. your App)
  - **sub** = subject (ie. user id)
  - **iat** = issued at (ie. the time the token was created, measured in Unix time???)
  - **exp** = expiration (ie. the time the token will expire, measured in Unix time???)

- The Signature is both the Header and Payload [**Base64Url encoded**](https://bunny.net/academy/http/what-is-base64-encoding-and-decoding/), plus our **secret key** (which we will define later), hashed using the algorithm defined in our Header. 

- To start working with JWT, we first have to install the package. In the [libraries](https://jwt.io/libraries) we want to find and install the package compatible with Node.js. From here you can also have a look at the [GitHub repository](https://github.com/auth0/node-jsonwebtoken) which will have documentation specific to this package.

- And before we can create a token, we need to authenticate the user credentials, which means we'll need a log-in. I'll write and export a function on my User controller, and create a new POST endpoint in my User routes. To log in, we know our front-end is going to need to send an email and a password. Once we've found a user in our database that matches the email, we need to make sure the password matches. We'll need to use that **bcrypt** function we already wrote in order to compare the plain-text entered by the user with the hashed password saved in our database. If either of these steps fail, send back error messages:

```js
const logIn = async(req, res) => {
  try {
    const existingUser = await User.findOne({ email: req.body.email });
    if (existingUser) {
      const verified = await verifyPassword(req.body.password, existingUser.password);
      if (verified) {
        res.status(200).json({ msg: "User verified!" })
      } else {
        res.status(401).json({ error: "Password doesn't match" })
      }
    } else {
      res.status(404).json({ error: "User not found" })
    }
  } catch(e) {
    console.log(e);
    res.status(500).send(e.message);
  }
}
```

- Before moving to the next step, use Postman to make sure all error messages work correctly. Log to the console every step of the way to make sure your variables are what you're expecting them to be.

- 
