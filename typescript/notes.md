# Typescript

**Typescript** is a programming language that builds on top of JavaScript. Most programming languages are already **strongly typed**, so Typescript was developed to deal with the many problems that come from JavaScript's flexibility. It will help us catch bugs before you ever have to see your app crash, and because it sits on top of JavaScript there is very little learning curve if you already understand JavaScript. [Read more](https://www.typescriptlang.org/docs/handbook/typescript-in-5-minutes.html).

To install Typescript globally, run `npm install -g typescript`. You can test which version you have installed by running `tsc --version`.

## Transpiling

**Transpiling** refers to the process of "translating" Typescript into plain JavaScript. Web browsers can't read Typescript alone, so before a project can be deployed, the Typescript transpiler will generate equivalent `.js` files for all your `.ts` files. For a larger React project, this will happen on build before we deploy, but let's look at a smaller scale example. 

Create an `index.ts` file. Have it log a simple string to the console. When we run the command `tsc index.ts`, this file is transpiled into JavaScript, and a `.js` copy of the file is generated. If we look inside, it looks the same. But what if we use some more complicated JavaScript functionality, such as an asynchronous function?

That's a lot of code! This is because the default settings for Typescript transpile into an older version of JavaScript, _before_ asynchronous functions existed. It shows you just how much work goes into asynchronous code under the hood! Transpiling into an older version of JavaScript, however, means your code is going to be more universally compatible. ie. Older browsers will still be able to read it! But you as a developer can write your code using the newest, shiniest functionalities. 

If we want to have manual control over our Typescript, we can create a `tsconfig.json` file to hold our rules. 

to define which version of js your ts will be compiled into, we can set compilerOptions to target specific releases. This means, if there are newer
js releases, we can update our config file and run the transpiler, and our code will be generated into the newest js version without us having to 
make any manual updates. Maintainabily.

create tsconfig.json and paste:
{
  "compilerOptions": {
    "target": "es6",
    "watch": true,
    "lib": ["dom", "esnext"]
  }
}

target = which js version to compile into (usually opt for slightly older for maximum browser compatibility)

watch = not having to run compiler, regenerate on save
lib = high level libraries not included in default set of type definitions. 
 - dom = window, document, etc. 
 - esnext = latest version of js

more options: https://www.typescriptlang.org/tsconfig

Typescript will automatically look for a config file and apply your settings

What are strong types? We make sure to enforce the type of a variable.
To add a type to a variable on declaration, put a ":" after the name, then specify which type
Now, if you try to change the type of that variable (let num: number = 20, num = "20"), Typescript will throw an error

if we don't explicitly type when we declare the variable, the type will be "inferred". 


Creating our own types
keyword "type" + capitalized type name = value (can even declare specifically which number/string)
single | represents 'or'

if you want to strictly type and object, create an interface
Now when we create a variable, it will complain until we've make it conform to the shape we defined with our interface
strict typing like this means I can confidently use any properties on the object and know they have to exist. 
prevents "could not read property of undefined"

interface MyType {
  [key: string]: any;
}

Think of any as an escape hatch out of typescript. It should be avoided, since if you want your variable to be any type, why are you using ts?
I would use any maybe in testing stage, and when you have finished experimenting, enforce a strict type

optional properties indicated by "?"


function multiply(x, z) {
  return x * y
}

const res = multiply("one", "two");

This won't work - strings can't be multipied. We can strictly type the parameters of a function - here I will define the type as a number

to type the return of a function, add the type after parameters (). person.age = res (res will always be number)


array doesn't have a word to represent it, instead we use "[]"
we can defined the type of each element in the array

Rarely used, but type Tuple is a type to define an array with differently typed elements
optionals exist in tuple with ?

to update the shape of an object, you can update the type, and then every time you use this variable, you will be prompted by typescript to make sure it conforms to the defined shape.

build folder will gather all the compiled files -