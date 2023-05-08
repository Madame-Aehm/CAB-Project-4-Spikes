## Password Encyption

- We're going to use a library called [**BCrypt**](https://www.npmjs.com/package/bcrypt) to help us encrypt passwords. This means that even though we can see the password property in our database, it will have been scrambled into an unrecognizable code, keeping our users' data safe and private, even from us! The first step is to install the package.

- Create a folder called 'lib' (for libraries), or 'utils' (for utilities). This is where we can store all extra 'helper' functions that we write or import. Create a `.js` file for bycrypt. We're going to write two main functions using the bcrypt library - one to **hash** the password into a code, and the other will be to **compare** the hashed password in our database to the unhashed password entered by the user for authentication. 

- The two steps of encrypting a password are to generate [**salt**](https://itecnote.com/tecnote/what-are-salt-rounds-and-how-are-salts-stored-in-bcrypt/) with `bcrypt.genSalt()`, which is then used to hash with `bcrypt.hash()`. BCrypt docs show how this can be done in one or two seperate functions. We'll put it together in one function using async/await, make sure to export it so it can be used in your register function. You will have to specify how many **salt rounds** - the more rounds, the higher the **cost factor**, and so the longer it will take to scramble and unscramble the data. The recommended default is 10:

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

## Password Verification

- We will need to use `bycrypt.compare()` to check whether a plain text and a hashed text are actually the same string. We'll write and export a short function now, so that it's there for us when we want create a user log-in. This function will return **true** or **false**:

```js
export const verifyPassword = async (password, hashedPassword) => {
  const verified = bcrypt.compare(password, hashedPassword);
  return verified;
};
```

- Now, we can write an endpoint and controller function to log in. The front-end will need to send an email and a password in the body of the request. In our controller function, we first need to find a user that matches the email - we can use Mongoose's `findOne()` method for this. If no user is found, then we can return an error. If a user _is_ found, we now want to **compare** the password from the user object in the database with the password sent by our front-end. Use the `verifyPassword()` function we created to do this. If the result is `false`, then we send back an error. If it's `true`, then the user identity has been verified and we can send back a positive response. Later, we'll be sending back an authorization token, but for now, this can be just an object that holds the user data:

```js
const login = async(req, res) => {
  try {
    const existingUser = await User.findOne({ email: req.body.email });
    if (!existingUser) {
      res.status(404).json({ error: "no user found" })
    }
    if (existingUser) {
      const verified = await verifyPassword(req.body.password, existingUser.password);
      if (!verified) {
        res.status(406).json({ error: "password doesn't match" })
      }
      if (verified) {
        res.status(200).json({
          verified: true,
          user: {
            _id: existingUser._id,
            username: existingUser.username,
            pets: existingUser.pets,
            avatar: existingUser.avatar
          }
        })
      }
    }
  } catch (e) {
    console.log(e);
    res.status(500).json({ error: "something went wrong.." })
  }
}
```

- In React, we can create a new component or page for our login interface. Since the functionality will be linked to a user, it's best to create a Context to hold the user state and functions linked to the user state.

## React Context with Typescript

- Writing a [Context with Typescript](https://react-typescript-cheatsheet.netlify.app/docs/basic/getting-started/context/) can be a little bit tricky. The first thing we'll need to do is create a **type** or **interface** to define the shape of our Context:

```ts
interface User {
  _id: string,
  email: string,
  username: string,
  avatar: string,
  pets: string[]
}

interface AuthContextType {
  user: User | null,
  login(email: string, password: string): void,
  logout(): void
}
```

- We then need to create context. In the past, we've initalized it to be empty, but then Typescript would infer the type to be nothing and we would never be able to use it! Which means we need to strictly type it. Since our Context doesn't exist yet, the first (but not recommended) way is to type it as either null | your Context type. This, however, means that Typescript is always going to perceive the Context as potentially null, and you'll need to do conditional checks every single time you want to use it.

- A shortcut way to assure Typescript that your Context isn't null is to set the initial value to either `null!` or an empty object `as` your context type:

```js
const CurrentUserContext = createContext<CurrentUserContextType>({} as CurrentUserContextType);
```
```js
const CurrentUserContext = createContext<CurrentUserContextType>(null!);
```

- The most recommended way is to create an 'initialValue' variable, which conforms to your type. In our case, the Context variables would be 'null', and any functions would simply throw errors to explain they're not yet being implimented. Think of it like a placeholder. By the time the app loads, though, the true Context will have been created:

```ts
const initialAuth: AuthContextValue = {
  user: null,
  login: () => {
    throw new Error('login not implemented.');
  },
  logout: () => {
    throw new Error('logout not implemented');
  }
};

export const AuthContext = createContext<AuthContextType>(initialAuth);
```

- The most tedious part of this process will be the need to update both our type and our initialValue variable each time we add, remove, or change something on our Context. If we still have time, let's write the fetch request to our login endpoint. If not, we can do it tomorrow when we start creating our authentication tokens. 

## React Custom Hooks with Typescript

- The same way we wrote a custom hook to fetch for our previous project, it's not a bad practise to do it again here. [Here](https://dev.to/sulistef/how-to-create-a-custom-react-hook-to-fetch-an-api-using-typescript-ioi) is a page with a nicely explained example. We're going to try to do the same thing, but I also want to introduce the concept of [**Generics**](https://www.typescriptlang.org/docs/handbook/2/generics.html). This is where we create a placeholder for a Type that will be passed down through props. 

- In the following example, `<Placeholder>` is an arbitrary name given to the "props" Type being passed down. We use it to strictly type the data variable we will be returning:

```ts
interface ReturnData<Placeholder> {
  isLoading: boolean;
  data: Placeholder | null;
  error: null | string;
}
```

- In the Hook itself, it will recieve the Type like props. We can now use it wherever we need it! It could be used to strictly type the parameters or the return, and can also be reached inside the function to be applied to any relevant variables:

```ts
interface NotOk {
  error: string
}

export function useGet<Placeholder>(url: string): ReturnData<Placeholder> {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState<Placeholder | null>(null);
  const [error, setError] = useState<null | string>(null);

  const get = async () => {
    setError(null);
    try {
      const response = await fetch(url);
      if (response.ok) {
        const data = await response.json();
        setData(data);
      } else {
        const { error } = await response.json() as NotOk;
        setData(null);
        setError(error.error);
      }
    } catch (error) {
      const { message } = error as Error;
      setError(message);
      setData(null)
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    url && get();
  }, [url]);

  return { isLoading, data, error };
}
```

- When we call the function, we just have to be sure to include the Type we wish to pass:

```ts
// I created a type for each response for the catfacts api
interface CatFactType {
  fact: string;
  length?: number;
}
interface CatFactsArray {
  data: CatFactType[];
}
const { data, isLoading, error } = useGet<CatFactType>("https://catfact.ninja/fact");
const { data: factsArray, isLoading: factsLoading, error: factsError } = useGet<CatFactsArray>("https://catfact.ninja/facts");
```