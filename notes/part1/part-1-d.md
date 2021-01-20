# Part 1-D: A more complex, state, debugging React apps

<img src="./../images/part-1-d-complex-state-debugging.png" />

## Table of Contents
- [Part 1-D: A more complex, state, debugging React apps](#part-1-d-a-more-complex-state-debugging-react-apps)
  - [Table of Contents](#table-of-contents)
  - [1. Complex state](#1-complex-state)
  - [2. Handling Arrays](#2-handling-arrays)
  - [3. Conditional Rendering](#3-conditional-rendering)
  - [4. Debugging React Applications](#4-debugging-react-applications)
    - [4.a Rules To Keep In Mind When Debugging](#4a-rules-to-keep-in-mind-when-debugging)
    - [4.b Example of Print-Based Debugging](#4b-example-of-print-based-debugging)
    - [4.c Debugger](#4c-debugger)
  - [5. Rules Of Hooks](#5-rules-of-hooks)
  - [6. Event Handling Revisited](#6-event-handling-revisited)
    - [6.a Examples Of Why You Only Use Functions For `onClick` Attribute With React Components](#6a-examples-of-why-you-only-use-functions-for-onclick-attribute-with-react-components)
      - [I. Example 1 - Passing A String to `onClick` (Result: Error)](#i-example-1---passing-a-string-to-onclick-result-error)
      - [II. Example 2 - Passing A Number To `onClick`  (Result: Error)](#ii-example-2---passing-a-number-to-onclick--result-error)
      - [III. Example 3 - direct method call  (Result: Nothing Happens)](#iii-example-3---direct-method-call--result-nothing-happens)
        - [III.a Why `onClick={console.log('clicked the button')}` won't work](#iiia-why-onclickconsolelogclicked-the-button-wont-work)
      - [IV. Example 4 - direct function call  (Result: Infinite Recursion Error)](#iv-example-4---direct-function-call--result-infinite-recursion-error)
        - [IV.a Why `onClick={setValue(0)}` won't work](#iva-why-onclicksetvalue0-wont-work)
      - [V. Example 5 - Wrapping Functions In Another Function Declaration  (Result: Success!!!)](#v-example-5---wrapping-functions-in-another-function-declaration--result-success)
        - [V.a Event Handler Best-Practices](#va-event-handler-best-practices)
  - [7. Function That Returns a Function](#7-function-that-returns-a-function)
  - [8. Passing Event Handlers to Child Components](#8-passing-event-handlers-to-child-components)
  - [9. Do Not Define Components Within Components](#9-do-not-define-components-within-components)
  - [10. Summary](#10-summary)
  - [11. Additional Resources](#11-additional-resources)


## 1. Complex state

You built a counter using state hooks. Let's add more "complex" state by creating 2 independent counters:

```js
// index.js
import React, { useState } from 'react';
import ReactDOM from 'react-dom';

const App = () => {
  const [leftCounter, setLeftCounter] = useState(0;)
  const [rightCounter, setRightCounter] = useState(0);

  // handle left counter
  const handleLeftClick = () => {
    setLeftCounter(leftCounter + 1);
  }
  //handle right counter
  const handleRightClick = () => {
    setRightCounter(rightCounter + 1);
  }

  return (
    <div>
      {left}
      <button onClick={handleLeftClick}>left</button>
      <button onClick={handleRightClick}>right</button>
      {right}
    </div>
  );
}

ReactDOM.render(
  <App />, 
  document.getElementById('root');
);
```
## 2. Handling Arrays

Now lets add an `allClicks` in the state of the `<App>` component that start off as an empty array and concats when the left or right counter was selected:
```js
import React, { useState } from 'react';
import ReactDOM from 'react-dom';

const App = () => {
  const [left, setLeft] = useState(0);
  const [right, setRight] = useState(0);
  const [allClicks, setAll] = useState([]);

  const handleLeftClick = () => {   
    // L is added to allClick  
    setAll(allClicks.concat('L')) ;  
    // count for left is incremented 
    setLeft(left + 1);  
  }
  const handleRightClick = () => {   
    // R is added to allClick 
    setAll(allClicks.concat('R')); 
    // count for right is incremented 
    setRight(right + 1)  ;
  }

  return (
    <div>
      {left}
      <button onClick={handleLeftClick}>left</button>
      <button onClick={handleRightClick}>right</button>
      {right}
      {/* Join the array and put a space between each element*/}
      <p>{allClicks.join(' ')}</p>    </div>
  );
}

ReactDOM.render(
  <App />, 
  document.getElementById('root');
);
```

The `allClicks` state is put onto the page and the `.join` method will return the array in string form.

**Note:** The state of React components like `allClicks` must not be mutated directly. So do not use the array method `.push()`. Instead follow the example `.concat` method because it returns a new array.

## 3. Conditional Rendering

Now let's add a `<History>` component and rendering a default message when the  `allClicks` array is empty:

```js
const History = (props) => {
  if (props.allClicks.length === 0) {
    return (
      <div>
        the app is used by pressing the buttons
      </div>
    )
  }

  return (
    <div>
      button press history: {props.allClicks.join(' ')}
    </div>
  )
}

const Button = ({ onClick, text }) => (  
  <button onClick={onClick}>{text}</button>
);

const App = () => {
  const [left, setLeft] = useState(0)
  const [right, setRight] = useState(0)
  const [allClicks, setAll] = useState([])

  const handleLeftClick = () => {
    setAll(allClicks.concat('L'))
    setLeft(left + 1)
  }

  const handleRightClick = () => {
    setAll(allClicks.concat('R'))
    setRight(right + 1)
  }

  return (
    <div>
      {left}
      <Button onClick={handleLeftClick} text='left' />
      <Button onClick={handleRightClick} text='right' />      
      {right}
      <History allClicks={allClicks} />
    </div>
  )
}
```

Now when the `allClicks` state is an empty array, it will render:

```html
<div>the app is used by pressing the buttons</div>
```

And in all other cases:

```js
<div>
  button press history: {props.allClicks.join(' ')}
</div>
```

## 4. Debugging React Applications

A shockingly large part of a typical developer's time is spent on debugging and reading existing code. Thankfully, React is an extremely developer-friendly library when it comes to debugging

### 4.a Rules To Keep In Mind When Debugging

- **KEEP THE BROWSER'S DEVELOPER CONSOLE OPEN AT ALL TIMES**

- **IDEALLY YOU WILL HAVE BOTH YOUR CODE AND THE BROWSER OPEN AND TOGETHER AT THE SAME TIME**

- **WHEN THE CODE BREAKS, FIND AND FIX THE ERROR IMMEDIATELY**

### 4.b Example of Print-Based Debugging

If your component is written like this:

```js
const Button = ({ onClick, text }) => (
  <button onClick={onClick}>
    {text}
  </button>
)
```

If the `<Button>` component is not working as intended, you can revert the destructed object and log the props to the console like so:

```js
const Button = (props) => { 
  console.log(props)  
  const { onClick, text } = props

  return (
    <button onClick={onClick}>
      {text}
    </button>
  );
}
```

**NOTE:** **DO NOT** use string concatenation for props/state when logging to console:

```js
// Incorrect
console.log('props value is ' + props) // prints props value is [Object object]
```

Instead separate your values with a comma

```js
// Correct
console.log('props value is', props) 
```

### 4.c Debugger

Logging to the console is by no means the only way of debugging our applications. You can pause the execution of your application code in the Chrome developer console's [debugger](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/debugger), by writing the command debugger anywhere in your code.

## 5. Rules Of Hooks

Let's be aware of some rules with hooks. `useState` and `useEffect` (which is also a hook) cannot be called in the following places:

* From inside a loop
* A conditional expression
* Any place that is not a function defining a component.


If you place hooks in any of these places, the application will behave erratically.

Here are a few visual examples

```js
import React, { useState } from 'react';

const App = () => {
  // Acceptable
  const [age, setAge] = useState(0)
  const [name, setName] = useState('Juha Tauriainen')

  if ( age > 10 ) {
    // this does not work!
    const [foobar, setFoobar] = useState(null)
  }

  for ( let i = 0; i < age; i++ ) {
    // also this is not good
    const [rightWay, setRightWay] = useState(false)
  }

  const notGood = () => {
    // and this is also illegal
    const [x, setX] = useState(-1000)
  }

  return (
    //...
  )
}
```

## 6. Event Handling Revisited

Let's start with this example:

```js
import React, { useState } from 'react';
// TODO - import React-DOM
const App = () => {
  const [value, setValue] = useState(10)

  return (
    <div>
      {value}
      <button>reset to zero</button>
    </div>
  )
}

ReactDOM.render(
  <App />, 
  document.getElementById('root')
)
```

When the button is clicked, you want to set the state called `value` to 0.

**Note:** Event handlers must always be a function or a reference to a function. The button will not work if the event handler is set to a variable of any other type.

### 6.a Examples Of Why You Only Use Functions For `onClick` Attribute With React Components


#### I. Example 1 - Passing A String to `onClick` (Result: Error)

Here is an attempt to pass a string value, which will not work:

```js
<button onClick="stuff...">button</button>
```

Since this is not a function, you will see the following error in the console:

```js
index.js:2178 Warning: Expected `onClick` listener to be a
function, instead got a value of `string` type.
    in button (at index.js:20)
    in div (at index.js:18)
    in App (at index.js:27)
```

#### II. Example 2 - Passing A Number To `onClick`  (Result: Error)

Trying to pass a variable and using an arithmetic expression will also not work:

```js
<button onClick={value + 1}>button</button>
```

Since this is not a function, you will see the following error in the console:

```js
index.js:2178 Warning: Expected `onClick` listener to be a
function, instead got a value of `number` type.
```

#### III. Example 3 - direct method call  (Result: Nothing Happens)

Now let's see what happens here

```js
<button onClick={console.log('clicked the button')}>
  button
</button>
```

The result will be the 'clicked the button' will be logged when the component renders, but nothing will happen when you click the button.

##### III.a Why `onClick={console.log('clicked the button')}` won't work

Again, the `console.log` will run when the component is rendered because the () tied to the `console.log` tells javascript to run it.

The `onClick` within the `<button>` (event handler) is defined as a function call and assigns the returned value from the function. The return value will be `undefined` because that's what `console.log` returns. Since the `console.log` is returning `undefined`, the `<button>` will not run any additional `console.log` request after the initial call. So nothing will happen when you click the button.

#### IV. Example 4 - direct function call  (Result: Infinite Recursion Error)

This will not work either

```js
<button onClick={setValue(0)}>button</button>
```

##### IV.a Why `onClick={setValue(0)}` won't work

This function will run when the component renders, which will update the state and cause a re-render. When it re-renders it will run the `setValue` and set the state to 0, which will cause a re-render. This is an example of infinite recursion. It's just going to get stuck in an infinite loop.

#### V. Example 5 - Wrapping Functions In Another Function Declaration  (Result: Success!!!)

This is how you can get a successful `console.log` and `setValue` on the button click:

```js
// Correct
<button onClick={() => console.log('clicked the button')}>
  button
</button>
// Correct
<button onClick={() => setValue(0)}>button</button>
```

Now no function is run on render, but the reference is stored within to the specific button. And that gets called only when the button is clicked.

##### V.a Event Handler Best-Practices

You'll likely see event handlers defined in the Component function before returning JSX. You'll see `handleClick` is the common name of the function which will be tied to the `onclick` attribute like so:

```js
import React, { useState } from 'react';

const App = () => {
  const [value, setValue] = useState(10)

  // the event handler function
  const handleClick = () =>
    console.log('clicked the button')

  return (
    <div>
      {value}
      {/* Since the function is declared above */}
      {/* This will only run when this button is clicked */}
      <button onClick={handleClick}>button</button>
    </div>
  )
}
```

## 7. Function That Returns a Function

Another way to define an event handler is to use function that returns a function.

**Note:** You probably won't need to use functions that return functions in any of the exercises in this course. 

```js
import React, { useState } from 'react';

const App = () => {
  const [value, setValue] = useState(10);

  // `hello` is returning a function that has a console.log inside
  const hello = (who) => () => {      
      console.log('hello', who);    
  }

  return (
    <div>
      {value}
      {/* When clicked, it prints 'hello world' to the console */}
      <button onClick={hello('world')}>button</button>
      {/* When clicked, it prints 'hello react' to the console */} 
      <button onClick={hello('react')}>button</button>   
      {/* When clicked, it prints 'hello function' to the console */}    
      <button onClick={hello('function')}>button</button>    
    </div>
  )
}
```

Functions returning functions can be utilized in defining generic functionality that can be customized with parameters. 

In the example of the `hello` function, it can be thought of as a factory that produces customized event handlers meant to greet users. It uses the parameter `who` to customize the greeting for a specific user.

You can do the same thing to set the state of the component to a different value like so:

```js
import React, { useState } from 'react';

const App = () => {
  const [value, setValue] = useState(10);

  const setToValue = (newValue) => () => {
    setValue(newValue);
  }

  return (
    <div>
      {value}
      {/* when clicked, value is set to 1000 and is re-rendered*/}
      <button onClick={setToValue(1000)}>thousand</button>
       {/* when clicked, value is set to 0 and is re-rendered*/}
      <button onClick={setToValue(0)}>reset</button>
       {/* when clicked, value is incremented by 1, and is re-rendered*/}
      <button onClick={setToValue(value + 1)}>increment</button>
    </div>
  );
}
```

Using functions that return functions is not required to achieve this functionality. `setTovalue` can be a normal function like so:

```js
import React, { useState } from 'react';

const App = () => {
  const [value, setValue] = useState(10);

  // Now this is just a function that calls `setValue`
  const setToValue = (newValue) => {
    setValue(newValue);
  }

  return (
    <div>
      {value}
      {/* when clicked, value is set to 1000 and is re-rendered*/}
      <button onClick={() => setToValue(1000)}>thousand</button>
       {/* when clicked, value is set to 0 and is re-rendered*/}
      <button onClick={() => setToValue(0)}>reset</button>
       {/* when clicked, value is incremented by 1, and is re-rendered*/}
      <button onClick={() => setToValue(value + 1)}>increment</button>
    </div>
  );
}
```

Choosing between functions returning functions or calling a function within the `onClick` is mostly a matter of taste.

## 8. Passing Event Handlers to Child Components

Now lets extract the button from the example above into its own component:

```js
import React, { useState } from 'react';

// There is now have a `handleClick` prop that will be the function that runs when the button is clicked
// There is now have a `text` prop that is placed in the body of the button
const Button = ({ handleClick, text}) => (
  <button onClick={handleClick}>{text}</button>
);

const App = () => {
  const [value, setValue] = useState(10);

  const setToValue = (newValue) => () => {
    setValue(newValue);
  }

  return (
    <div>
      {value}
      {/* when clicked, value is set to 1000 and is re-rendered*/}
      <Button handleClick={() => setToValue(1000)} text="thousand" />
       {/* when clicked, value is set to 0 and is re-rendered*/}
      <Button handleClick={() => setToValue(0)} text="reset" />
       {/* when clicked, value is incremented by 1, and is re-rendered*/}
      <Button handleClick={() => setToValue(value + 1)} text="increment" />
    </div>
  );
}
```

## 9. Do Not Define Components Within Components

Here is an visual example of defining components separately. I will comment out what you should not be doing:

```js
import React, { useState } from 'react';

// This is the right place to define a component
const Display = props => <div>{props.value}</div>;

const Button = (props) => (
  <button onClick={props.handleClick}>
    {props.text}
  </button>
);

const App = () => {
  const [value, setValue] = useState(10);

  const setToValue = newValue => {
    setValue(newValue);
  }

  // Do not define components inside another component, see the line below
  // const Display = props => <div>{props.value}</div>;

  return (
    <div>
      <Display value={value} />
      <Button handleClick={() => setToValue(1000)} text="thousand" />
      <Button handleClick={() => setToValue(0)} text="reset" />
      <Button handleClick={() => setToValue(value + 1)} text="increment" />
    </div>
  );
}
```

**Note:** **DO NOT IMPLEMENT COMPONENTS WITHIN OTHER COMPONENTS**

If you do, React will treat nested components as new component in every render, and you will experience unpleasant problems with those nested and parent component.

## 10. Summary

You can start to see the ability to customize React components. You have component state and props which will allow us to change the appearance and/or functionality of specific components. 

It would also seem highly beneficial to strategically place `console.log` within components to confirm the data is working properly. Getting in the practice of making your component data transparent will help you write less bugs.

## 11. Additional Resources

* [React Documentation](https://reactjs.org/docs/hello-world.html)
* [Egghead.io - Start Learning React (Class Components)](https://egghead.io/courses/start-learning-react)
* [Egghead.io - Beginner Guide to React (Functional Components)](https://egghead.io/courses/the-beginner-s-guide-to-reactjs)