# Project 4: Spike 3

## POST requests

So far we've been adding all our data manually, then using **get** requests to **read** that data. Let's look at a different type of request: **post**. A 'post' request can manipulate data in your database. In order to do this, you would usually need to send data to the server - in a post request, you can do this through the **body**. 

Let's **create** a new user. First, we'll write the back-end functions and test them with Postman. Once it works in Postman, we can use the sample code Postman provides to help us write a fetch function from our React front-end. Start by establishing a new endpoint, and a new function. This time, though, the method for our route will be 'post':

```js
router.post("/register", registerUser);
```

In the **registerUser** function, log `req.body` to the console. We can also have a look at the whole `req` object, though it is very big and complicated! The body property refers to data given into the function when the request is made. On Postman, there is a **body** subheading, this is where we add that data. The options we can choose from (for this project), will be **form-data**, **x-www-form-urlencoded**, or **raw**. Form-data will require a middleware, so avoid this one for now. If you want to use 'raw', make sure to select **JSON** format from the dropdown. 

Create an object that you would send through as a new user - make sure it follows the Schema defined for the collection. Build a new object in your function using those properties and save it as a new Model. Now you can use Mongoose's `.save()` method to save it to the collection linked to that Model. The save method returns the document:

```js
const createUser = async(req, res) => {
  if (!req.body.email|| !req.body.password || !req.body.username) {
    return res.status(406).json({ error: "Please fill out all fields" })
  }
  const newUser = new UserModel({
    email: req.body.email,
    password: req.body.password,
    username: req.body.username
  });
  try {
    const result = await newUser.save();
    console.log(result);
    res.status(200).json(result);
  } catch(e) {
    console.log(e);
    res.status(500).send('Server error');
  }
}
```

Once you've tested this works in Postman, create a form in React. A trick to keeping all your object changes to a single handleChange function, is to use [] around a property name to define it from a variable (in this case, the event.target.name), and the value from the event.target.value:

```js
  const handleChange = (e) => {
    setFormObject({
      ...formObject,
      [e.target.name]: e.target.value
    })
  }
```

Now that we've got an object to submit, let's look at Postman's sample code. On the very right-hand side, click on the **</>** button in the sidebar. We can copy and paste this code section by section and adapt it to our own project. We can use `response.ok` to check the status code coming from Express. If it's in the 200 range, it's a successful response. If it's not, we can expect one of our error messages:

```ts
response.ok ? alert("successfully registered!") : alert(result.error)
```

Put some signal after the fetch to communicate to your user if the registration was successful, then test it. We can then check our database to see if our new user is there. 

The same logic can be applied to update a user. I could set a route that receives an ID as params, then write a function that uses Mongoose's `findByIdAndUpdate()`:

```js
const updateUser = async(req, res) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.status(200).json(updatedUser);
  } catch(e) {
    console.log(e);
    res.status(500).send(e.message);
  }
}
```

## Bycrypt ?