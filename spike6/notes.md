# Spike 23 Notes

## Authentication

- When you log into a website, your credentials are being used to **authenticate** your identity. The log-in process is the authentication process. Once a user's identity is confirmed, they are granted **authorized** access to certain data. This authenticated status is saved as a [**token**](https://www.okta.com/identity-101/what-is-token-based-authentication/).

- Think of a **token** like a wristband at a music festival - once your ticket validity is confirmed, you're given a wristband. Depending on your ticket price, your wristband gives you access to parts of the festival. A VIP wristband gets access to more places than a regular wristband, a staff or backstage wristband will be able to get through into other places restricted to the public. A wristband that's been damaged, tampered with, or expired will be rejected.

### JWT - JSON Web Token

- The **auth token** that we're going to be using is an open standard: the [**JSON Web Token (JWT)**](https://auth0.com/learn/json-web-tokens).

- The [**debugger**](https://jwt.io/) on JWT official docs can show us how it's built: a Header, a Payload, and a Signature. The JSON-formatted data fields are hashed into a code which makes up the token itself. If we make any changes to any of these fields, you'll notice the token change.

- The **Header** will contain metadata to determine the **token type** (in our case `typ: "JWT"`) and the [**signing algorithm**](https://auth0.com/blog/json-web-token-signing-algorithms-overview/) (in our case `alg: "HS256"`, which is the default).

- The **Payload** is the body of the token, this is where the actual data used to identify the user will be stored. The properties in this section are known as **claims**, and while you can put any data you like in here, there are some [claim conventions](https://www.iana.org/assignments/jwt/jwt.xhtml):
  - **iss** = issuer (ie. your App)
  - **sub** = subject (ie. user id)
  - **iat** = issued at (ie. the time the token was created, measured in Unix time, generated automatically unless otherwise specified)
  - **exp** = expiration (ie. the time the token will expire, measured in Unix time)

- The **Signature** is both the Header and Payload [**Base64Url encoded**](https://bunny.net/academy/http/what-is-base64-encoding-and-decoding/), plus our **secret key** (which we will define later), hashed using the algorithm defined in our Header. 

- To start working with JWT, we first have to install the package. In the [libraries](https://jwt.io/libraries) we want to find and install the package compatible with Node.js. Then create a `.js` file in `utils` for **jwt**. It's extremely important to keep the secret key private, so I'll put this into the `.env` file. It just needs to be a string - it can be whatever you want it to be!

```
JWT_SECRET=this-is-my-secret-key
```

- This [documentation](https://github.com/auth0/node-jsonwebtoken) will guide us through the rules for signing the token. Let's write a function that recieves the user object as parameters. We'll define the payload, and we also have the choice to include some **options**. Many of the options overlap with the information that can be saved as claims in the payload, such as the token expiration. Either is fine, **just make sure not to use both!!** (For expiration, for example, you might choose to add an option rather than a claim because the option will accept a string, while the claim needs unix time.) We will then pass all of this, plus our secret key from our `.env`, into the `jwt.sign()` method from the documentation, and return the result:

```js
import jwt from "jsonwebtoken";
import * as dotenv from "dotenv";
dotenv.config();

export const generateToken = (user) => {
  const payload = {
    sub: user._id,
    email: user.email,
    avatar: user.avatar,
  }
  const options = {
    expiresIn: "7d",
  };
  const token = jwt.sign(payload, process.env.JWT_SECRET, options)
  return token
}
```

- This function can be exported and imported into our `usersController.js` to be used by our `logIn()` function. Once we've found a user and verified their password, we will generate a token:

```js
if (verified) {
  const token = generateToken(existingUser);
  res.status(200).json({ 
    verified: true,
    token: token,
    user: {
      _id: existingUser._id,
      email: existingUser.email,
      avatar: existingUser.avatar,
      username: existingUser.username,
      pets: existingUser.pets
    }
  })
}
```

- Once you're getting back through Postman exactly what you want, write a fetch request from your React app. **Make sure not to return the password (even hashed) to your front-end!!**

- We will save the token in the Browser Window's **Local Storage**. [Local storage](https://www.w3schools.com/jsref/prop_win_localstorage.asp) refers to how a web application can store data locally. It's similar to a **web cookie**, except that it can only be read by the browser, making it more secure. The storage capacity for local storage is also much higher than for cookies.

- Local storage accepts data as **key/value pairs**. Values saved to Local Storage must be **strings** - if you need to stringify a JavaScript variable, use the `JSON.stringify()` method. To **store** something in the Local Storage, use the method `localStorage.setItem()`. This will accept two arguments: the key, and the stringified value:

```js
localStorage.setItem("token", result.token);
```

- To view the local storage in the browser, open the inspector tool and click on **Application**. You can then view all items saved in the local storage for your app. Write a function to check whether a token exists and call it in a useEffect from your AuthContext. We can access items in the local storage with the method `localStorage.getItem()`. Tomorrow we'll cover how to use the token to return the authenticated user object, but for now, if a token exists, set the user object state:

```js
const checkForToken = () => {
  const token = localStorage.getItem("token");
  if (token) {
    setUser(true) 
  }
}
```

- A log out function would need to set the user state back to `false` or `null`, but we'll also need to remove the token from local storage:

```js
  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
  }
```

- Tomorrow, we're going to use the token to create a function like the `onAuthStateChanged()` function from Firebase Authentication. Once an authorized status is confirmed, we will attach the token to the Header of all fetch requests being made to routes requiring authorization. If you want to read ahead, you can look up **Bearer Tokens** and [**Passport Strategies**](https://www.passportjs.org/), specifically [JWT Passport Strategy](https://www.passportjs.org/packages/passport-jwt/).