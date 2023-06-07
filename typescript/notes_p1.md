# Typescript Part 1

**Typescript** is a programming language that builds on top of JavaScript. Most programming languages are already **strongly typed**, so Typescript was developed to deal with the many problems that come from JavaScript's over-flexibility. It will help us catch bugs before you ever have to see your app crash, and because it sits on top of JavaScript there is very little learning curve if you already understand JavaScript. [Read more](https://www.typescriptlang.org/docs/handbook/typescript-in-5-minutes.html).

To install Typescript globally, run `npm install -g typescript`. You can test which version you have installed by running `tsc --version`.

## Transpiling

**Transpiling** refers to the process of "translating" Typescript into plain JavaScript. Web browsers can't read Typescript alone, so before a project can be deployed, the Typescript transpiler will generate equivalent `.js` files for all your `.ts` files. For a larger React project, this will happen on build before we deploy, but let's look at a smaller scale example. 

Create an `index.ts` file. Have it log a simple string to the console. When we run the command `tsc index.ts`, this file is transpiled into JavaScript, and a `.js` copy of the file is generated. If we look inside, it looks the same. But what if we use some more complicated JavaScript functionality, such as an asynchronous function?

```ts
const example = async() => {
  const message = "Hello World";
  return message
} 

const message = example();
```

That's a lot of code! This is because the default settings for Typescript transpile into an older version of JavaScript, _before_ asynchronous functions existed. It shows you just how much work goes into asynchronous code under the hood. Transpiling into an older version of JavaScript, however, means your code is going to be more universally compatible. ie. Older browsers will still be able to read it! But you as a developer can still write your code using the newest, shiniest functionalities. 

If we want to have manual control over our Typescript, we can create a configuration file to hold our rules. This can be updated to re-transpile the same base code in various ways. For example, if there is a new JavaScript release, we can update our config file and run the transpiler, and our code will be generated into the newest js version without us having to make any manual updates. This make for excellent code maintainability.

Create a `tsconfig.json` and paste:

```json
{
  "compilerOptions": {
    "target": "es6",
    "watch": true,
    "lib": ["dom", "esnext"]
  }
}
```

- The `target` property refers to the JavaScript version to compile into (usually opt for slightly older for maximum browser compatibility).

- If `watch` is set to `true` the transpiler will run automatically on every save, rather than you needing to manually run the script.

- The `lib` property takes an array of additional high level libraries not included in default set of type definitions.
  - `dom` = window, document, etc. 
  - `esnext` = latest version of js

Read about more compiler options [here](https://www.typescriptlang.org/tsconfig).

## Strong Typing

**Strongly typing** your variables will help us to enforce the type of our variables. This means we decide what Type our variable is going to be, and then Typescript will prevent us from accidentally changing it, or applying incompatible functionality. 

To add a type to a variable on declaration, put a **colon** (**:**) after the name, then specify which Type (string, number, boolean, etc.):

```ts
let myNum: number = 42;
```

Now if you try to change the Type of that variable, Typescript will throw an error:

```ts
myNum = 69; // this is fine
myNum = "This is a string"; // this will cause an error
```

If we don't **explicitly** assign a Type when we declare a variable, the Type will be **inferred** and assigned automatically based on the Type of the value. In VSCode, you can hover your mouse over any variable to see the Type. If your variable Type is flexible, you can declare what's called a **Union Type**, seperate each relevant Type with a **|** symbol (note that in Typescript, you only need **one** **|** symbol to represent an **Or Operator**):

```ts
let myVariable: string | number = "This is a string"; // this is ok
myVariable = 42; // this is also ok
```

## Type Aliases

If we find ourselves using the same combination of Types many times, we can create a **Type Alias** to hold that value. Think of it like a custom Type. We do this by using the declaration `type`, and then assigning a name (the Alias). It's not compulsory, but good pracise is to give your Types capitalized Aliases to help differentiate Types from variables:

```ts
type StrNum = string | number

let myVariable: StrNum = "This is a string";
myVariable = 42;
```

You can be even more specific, and specify exactly which _values_ can be accepted. This is known as a **Literal Type**:

```ts
type Mentor = "Raul" | "Lucas" | "Heron"
let myMentor: Mentor = "Raul"; // this is fine
myMentor = "Jost"; // this will cause an error
```

The Types for `string`, `number` and `boolean` are known as [**Primitive Types**](https://www.typescriptlang.org/docs/handbook/2/everyday-types.html). Types also exist for `undefined` and `null`.

**Arrays** are declared by using **square brackets [ ]**. Declaring a variable as an empty array creates an inferred type of `any[]`. This means your array will accept any value. If you want to limit your array to accepting only a single Type, declare it as `Type[]`. There is also a special Array Type known as a [**Tuple**](https://www.tutorialsteacher.com/typescript/typescript-tuple) which will accept only a defined number of elements, which must conform to Types defined for them. The use-cases for this are fairly limited, however. 

```ts
const array1 = [];
array1.push("string", 42, true, { message: "this array will accept any variable" }); // all ok

const array2: string[] = [];
array2.push("string"); // this is ok
array2.push(42); // this will cause an error
```

## Interfaces

If you want to apply a strict Type to an `object`, it's best to use an **Interface**. This will let you define the **shape** of your object. The definition I found most helpful to understand why an Interface is preferable to a Type for an `object` is:  

_"Type aliases and interfaces are very similar, and in many cases you can choose between them freely. Almost all features of an interface are available in type , the key distinction is that a type cannot be re-opened to add new properties vs an interface which is always extendable."_

Types and Interfaces can also be nested to make for some very specific variable control. If any properties are missing or mis-typed, Typescript will complain. This will prevent the _very_ common React error "could not read property of undefined":

```ts
type Animal = "cat" | "dog"

interface Pet {
  animal: Animal
  name: string
  age: number
  desexed: boolean
}

type Pets = Pet[]

interface Person {
  name: string
  pets: Pets
}
```

**Optional Properties** can be indicated with a **question mark ( ? )**:

```ts
interface Person {
  name: string
  pets: Pets
  gender?: string
}
```

The `any` Type is kind of like an escape hatch out of Typescript. It means your variable can be _any_ Type. It's best to avoid using `any` as much as possible, since it defeats the purpose of using Typescript at all, and strong typing will actually help you write better code.

## Functions

Typescript is hugely helpful to prevent simple errors thrown in functions. Typing our **parameters** means we know for sure the Type of a variable before we apply any manipulation functionality to it:

```ts
function multiply(x: number, y: number) {
  return x * y
}

const res1 = multiply(3, 5); // this is ok
const res2 = multiply("one", "two"); // this will cause an error
```

We can also Type the **return** of a function, by defining the Type after the parentheses. I can then use that value, confident the Type will be correct:

```ts
function multiply(x: number, y: number): number {
  return x * y
}

const dog1Age = multiply(2, 3);

const dog1 = {
  animal: "dog",
  name: "Lassie",
  age: dog1Age,
  desexed: true
}
```