console.log("testing");

async function test() {
  return "hello";
}

test();

type StrNum = string | number

let myVariable: StrNum = "this is a string";
myVariable = 42;

type myNums = 1 | 2 | 3 | "testing"

let num: myNums = "testing"

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
  gender?: string
}

const testArray = [];

testArray.push("string", 42, true, { message: "this array will accept any variable" });

const testArray2: string[] = []

testArray2.push("testing");

const me: Person = {
  name: "Emily",
  pets: [],
  gender: ""
}

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