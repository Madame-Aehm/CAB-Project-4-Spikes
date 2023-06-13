# Typescript Part 2

## Typescript in React

Adding Typescript to an existing project can be tricky. Read about the steps [here](https://marketsplash.com/tutorials/typescript/how-to-add-typescript-to-existing-react-project/). It's much easier to just use one of the boilerplate scripts to create a new project already configured for Typescript. This can be achieved by adding `--ts` or `--typescript` when running the `create-react-app` script, or by selecting Typescript from the prompts when creating a project with **Vite** or **Next.js**. These projects will now include a package of pre-made Types specific to the framework. 

The most important things to assign explicit Types to are the variables that will be passed around: **Props**, **State**, **Context**, and **functional Parameters and Returns** (including those of **event handler** functions).

