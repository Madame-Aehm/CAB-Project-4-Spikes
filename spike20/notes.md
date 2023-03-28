# Spike 20 Notes

## Express Server Structure

- Let's take the first steps to start building our API! We can follow the **Express** [documentation](https://expressjs.com/en/starter/basic-routing.html) to make our first test request from our index:

```js
app.get('/', (req, res) => {
  res.send('Hello World!')
})
```

- This is when you're going to start using [Postman](https://www.postman.com/downloads/) a _lot_. If you haven't already, you'll need to download it for this project because the browser version doesn't allow request types other than 'get'. We'll use it now to test our first endpoint! If I change the **path**, then I must send the request to that new end-point.

- Since this project is going to be quite large, we're going to separate it into different folders. There are a few ways you can structure your project, if you choose a different folder structure to this one, just make sure you stay consistent so you don't get confused! Create a folder now to hold all our 'routes', and a **.js** file inside for 'users', or 'usersRoutes'. This is where we're going to define all the end-points that will affect the documents held in our 'users' collection over on MongoDB.

- In our routes file we're going to use Express' [**express.Router**](https://expressjs.com/en/guide/routing.html). According to the documentation, this creates a modular, mountable route handler. A Router instance is a complete middleware and routing system; for this reason, it is often referred to as a “mini-app”. 

- Use this router instance to set up a test 'get' route. Make sure to also export the router instance: 

```js
import express from 'express'

const usersRouter = express.Router();

usersRouter.get("/test", (req, res) => {
  res.send('testing route....')
})

export default usersRouter
```

- Import the router instance into the index.js, and have the app **use** it. Here we will define the _base_ endpoint for this router. I recommend defining your base endpoints with '/api/', as this is necessary to deploy on Vercel:

```js
import usersRouter from './routes/users.js'

app.use('/api/users', usersRouter);
```

- Now let's use Postman to test it! Our endpoint is going to be 'localhost:5000/api/users/test'. If we've set it all up correctly, we should get a response of 'testing route....'! Take node of where you're putting your **/** symbols.

- Since some of the callback functions for our routes will get quite long, a good practise is to collect them all in a **controller** file. I'm going to create a folder 'controllers', and inside I'll create a **.js** file for 'users', or 'usersController'. Here I will write and export my express functions, then import them into my routes file. I'll demonstrate this with the test route function, even though it is only very small. **Note** the difference between a **regular export**, and a **default export**. 

## CRUD & Connecting MongoDB

- **CRUD** = **Create**, **Read**, **Update**, and **Delete**. These are the four basic database functions.

- It's time to actually connect our project to our MongoDB database. From MongoDB, on the Database Deployments page, click the button to **Connect**, then **Connect your application**. There's a code snippet here that we're going to copy, but these details need to stay private. So let's let up an **.env** file to hold them.

- Install [**dotenv**](https://www.freecodecamp.org/news/how-to-use-node-environment-variables-with-a-dotenv-file-for-node-js-and-npm/) package from npm, then paste this into the index:

```js
import * as dotenv from "dotenv";
dotenv.config();
```

- Create a new file in the server root folder called **.env**. This will hold all our environmental variables. **Make sure to add it to the .gitignore!!**

- .env files save data in the format: VARIABLE_NAME=value. Strings don't need quotation marks. To access this variable use **process.env.VARIABLE_NAME**. We're going to save the code snippet from MongoDB as a variable:

```js
MONGO_URL=mongodb+srv:...
```

- If you've forgotten the password, you can reset it in **Database Access** under **Security**. If you reset it, be aware it might take a few minutes before it updates and access is given.

- We're going to be connecting to MongoDB _through_ an **Object Data Modeling (ODM)** library called [**Mongoose**](https://mongoosejs.com/docs/index.html). You'll have to install the mongoose npm package, then we'll set it up in our index using the credentials saved in our .env file. We only want our app to start listening when a connection to MongoDB has been established. Since it's an asynchronous process, we'll move **app.listen()** down into the **.then()** block of the mongoose connection.

```js
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    app.listen(port, () => {
      console.log("Connection to MongoDB established, and server is running on port " + port);
    });
  })
  .catch((err) => console.log(err));
```

- One of the reasons we're using Mongoose on top of MongoDB is because it offers us the opportunity to create **Models** of our data, essentially locking the form it can take with a **Schema**. In plain terms: you set the shape of your data object. Since we'll need a Model for every collection, we'll make another folder in our server for 'models', and a **.js** file for 'users', or 'usersModel'.

- On the usersModel.js file, import mongoose from 'mongoose'. This variable has a property **Schema**, which we can use to create a **new** Schema, and define the shape of our user object:

```js
import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  email: { type: String, required: true },
  username: String,
  password: { type: String, required: true }
})
```

- There is huge potential for creating incredibly complex and specific Schemas. For more info, have a read of the [docs](https://mongoosejs.com/docs/guide.html).

- Once we have defined a Schema, using another property on the mongoose variable we will create a **Model** and link it to the collection using the singular, lower-case name of your collection. Make sure to export it:

```js
export const userModel = mongoose.model("user", userSchema);
```

- We can use this Model to access the collection. Back over on our userControllers.js file, we can write a new function to find and return all the documents. Export this, then use it in the callback for a new route on userRoutes.js

