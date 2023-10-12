# Project 4: Spike 7 (option 2)

## Authorization with Express Cookie Parser

An alternative to using Passport for authorizing requests, is **Express Cookie Parser**. Storing our token in Local Storage means we have to rely on our front-end to attach, remove, and send the token. Cookies can be accessed by the server, which means we can attach and remove the Cookies from our server-side controller functions. 

Start by installing the `cookie-parser` package. Then `import`, and have the app use the package from the `index.js`. This will add `.cookies` as a property on the request object. We should put this in with our middlewares. We'll also need to give `cors()` some options:

```js
import cookieParser from "cookie-parser"

app.use(cookieParser());

const corsOptions = {
    origin: ["http://localhost:5173"], // here we can add the client base url to our env file
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
}
app.use(cors(corsOptions));
```

Our `login` function already generates a token and sends it back to the front-end. Let's update that function: instead of sending the token back as JSON in the response, we can use `.cookie()`, together with a credentials header, to tell the front-end to add our Cookie to the browser.

```js
res.status(200)
  .header('Access-Control-Allow-Credentials', true)
  .cookie("token", token, { withCredentials: true, httpOnly: false, })
  .json({ verified, user });
```

If we test this function in Postman, underneath the blue **Send** button, you'll see a button for **Cookies**. You'll be able to see your Cookie here.

We can now write a middleware function that will be attached to any endpoint we wish to make authorized. The function will need to extract the token from `req.cookies`, verify the token, and find a user with the `_id` property we saved in our token's payload. If any of these steps fail, then we erase the token by clearing the Cookie and return as error in the response. If all goes well, we initialize a `user` property on the request object as the user from MongoDB, and use the Express `next()` function to move to the controller function. 

```js
import jwt from "jsonwebtoken";
import 'dotenv/config'
import { UserModel } from "../models/user.js";

const cookieAuth = async (req, res, next) => {
  console.log(req.cookies)
  const { token } = req.cookies;
  if (!token) return res.status(401).json({ error: "Access denied: No token provided." });
  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    const user = await UserModel.findById(payload.sub).select("-password");
    req.user = user;
    next();
  } catch (e) {
    console.log("error", e);
    return res.clearCookie("token").status(500).send({ error: e.message });
  }
};

export default cookieAuth
```

Call this function as middleware on endpoints that need to be authorized. If the request is authorized, the controller will have the active user's data held in `req.user`, which can be used instead of passing the their ID through params or the body. If we write a simple endpoint to retrieve the active user's profile, we can simply send back this object:

```js
const getProfile = (req, res) => {
 res.status(200).json(req.user);
}

router.get("/me", cookieAuth, getProfile);
```

When sending a fetch request to an authorized endpoint, we will need to add `credentials: "include"` to the fetch options, which attaches the Cookies to the request:

```js
const requestOptions = {
  method: 'GET',
  headers: myHeaders,
  credentials: "include" as RequestCredentials
};
```