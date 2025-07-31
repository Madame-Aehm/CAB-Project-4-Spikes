
# React Optimization

Reducing redundant renders can really improve the performance of large React apps. The pattern of writing functional code first, then optimizing/refactoring that code later, means we can introduce a few additional React hooks now that can be implemented into your existing projects.

## Memoization

**Memoization** is the caching/storing of expensive computed values. If a value must be computed each time a process runs, then that process will be at least as slow as the computation. If the value does not change between runs, then the additional time taken to recalculate the value each time is essentially wasted. Store that value somewhere, and reuse the same pre-calculated value, to optimize performance. 

React 19's [React Compiler](https://react.dev/learn/react-compiler) means very soon manual memoization is no longer something developers will need to consider. Vite, however, have not included it by default in their boilerplate. To upgrade your project to include React Compiler, follow the [documentation](https://react.dev/learn/react-compiler/installation).

### memo

The [`memo` function](https://react.dev/reference/react/memo) in React let's you memoize an entire component. If the parent component re-renders, a memoized child component will not re-render _unless_ its prop have changed since the previous render. 

Memoize any existing React component by wrapping the function definition in a `memo()`:

```js
import { memo } from 'react';

const PetCard = memo(({ pet }: Props) => {
    // ...
})
```

### useMemo() 

The `useMemo()` hook is used to memoize a value _within_ a component between renders. Only if values defined in the `useMemo` **dependency array** change, will the value be recalculated and re-cached. This is especially useful for objects and arrays, which


usememo
memo
usecallback

useref