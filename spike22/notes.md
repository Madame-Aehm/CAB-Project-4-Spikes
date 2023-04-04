# Spike 22 Notes

## Password Encyption

- We're going to use a library called [**BCrypt**](https://www.npmjs.com/package/bcrypt) to help us encrypt passwords. This means, that even though we can see the password property in our database, it will have been scrambled into an unrecognizable code, keeping our user's data safe and private, even from us! The first step is to install the package.

- Create a folder called 'lib' (for libraries), or 'utils' (for utilities). This is where we can store all extra 'helper' functions that we write or import. Create a `.js` file for bycrypt. We're going to write two main functions using the bcrypt library - one to **hash** the password into a code, and the other will be to **compare** the hashed password in our database to the unhashed password entered by the user for authentication. 

- The two steps of encrypting a password are to generate [**salt**](https://itecnote.com/tecnote/what-are-salt-rounds-and-how-are-salts-stored-in-bcrypt/) with `bcrypt.genSalt()`, which is then used to **hash** with `bcrypt.hash`. BCrypt docs show how this can be done in one or two seperate functions. We'll just put it together in one using async/await, make sure to export it to be used in your register function. You will have to specify how many **salt rounds** - the more rounds, the higher the **cost factor**, and so the longer it will take to scramble and unscramble the data. The recommended default is 10:

```js
import bcrypt from "bcrypt";

export const encryptPassword = async(password) => {
  try {
    const saltRounds = 10;
    const salt = await bcrypt.genSalt(saltRounds);
    const hashPassword = await bcrypt.hash(password, salt);
    return hashPassword
  } catch(error) {
    console.log("Error: ", error);
  }
}
```

- We now want to import and call this function on our password _before_ we send it to the database. Make sure to use **await**, since it is an asynchronous function!

- We will need to use `bycrypt.compare()` to check whether a plain text and a hashed text are actually the same string. We'll write and export a short function now, so that it's there for us when we want to use it to create a user log-in. This function will return **true** or **false**:

```js
export const verifyPassword = async (password, hashedPassword) => {
  const verified = bcrypt.compare(password, hashedPassword);
  return verified;
};
```

## Image Upload

- We're not going to be saving any actual images on MongoDB. Instead we will be saving them on the cloud-based image and video management service, [**Cloudinary**](https://cloudinary.com/documentation/how_to_integrate_cloudinary), then just saving a URL reference in MongoDB. To make the upload process easier and safer, we'll also use a middleware called [**Multer**](https://www.npmjs.com/package/multer). Install both packages via npm.

- Start by creating a free account on Cloudinary. Under Media Library, you can create folders and manually add or delete files. Start by creating a folder for your user images: 'profile_pics' or 'user_avatars', whatever you like. Upload a sample image. 

- On your Dashboard, you'll be able to see the Cloud Name, your API Key, and your API Secret. We'll save these variables in our `.env` file. Then create a folder in your server for 'config', to hold configuration files. This is just to save space on our `index.js`. In a `.js` file for cloudinaryConfig, copy and paste the config code snippet from the 'getting started' page in Cloudinary docs, just make sure to replace each of the variables for your process.env variables. Export this as a function, which we will call on the `index.js` together with the middlewares. 

- We'll also need to update our user Schema to include an image. This will just be a string URL for the image that we will already have uploaded to Cloudinary. This is a good opportunity to demonstrate the 'default' property, which I'll set to the URL of the sample image I already uploaded. If this property isn't included on the user object, or the value is set to **undefined**, then the default will be applied. Any other value (including **null** or an empty string) will still be stored in the database!

- 