# Part 1-D: A more complex, state, debugging React apps

<img src="./../images/part-1-d-complex-state-debugging.png" />

## Table of Contents
- [Part 1-D: A more complex, state, debugging React apps](#part-1-d-a-more-complex-state-debugging-react-apps)
  - [Table of Contents](#table-of-contents)
    - [Complex state](#complex-state)
    - [Handling Arrays](#handling-arrays)
    - [Conditional Rendering](#conditional-rendering)
    - [Debugging React Applications](#debugging-react-applications)
      - [Rules To Keep In Mind When Debugging](#rules-to-keep-in-mind-when-debugging)
      - [Example of Print-Based Debugging](#example-of-print-based-debugging)
      - [Debugger](#debugger)
    - [Rules Of Hooks](#rules-of-hooks)
    - [Event Handling Revisited](#event-handling-revisited)
    - [Function That Returns a Function](#function-that-returns-a-function)
    - [Passing Event Handlers to Child Components](#passing-event-handlers-to-child-components)
    - [Do Not Define Components Within Components](#do-not-define-components-within-components)
    - [Summary](#summary)
    - [Additional Resources](#additional-resources)


### Complex state

We built a counter using state hooks. Let's more "complex" state by creating 2 independent counters:

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
  document.getElementById('root')
);
```
### Handling Arrays

Now lets add an `allClicks` in the state of the `<App>` component that start off as an empty array and concats when the left or right counter was selected:
```js
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
      {/* We join the array and put a space between each element*/}
      <p>{allClicks.join(' ')}</p>    </div>
  );
}
```

The `allClicks` state is put onto the page and the `.join` method will return the array in string form.

**Note:** The state of React components like `allClicks` must not be mutated directly. So do not use the array method `.push()`. Instead follow the example `.concat` method because it returns a new array.

### Conditional Rendering

Now we will add a `<History>` component and rendering a default message when the  `allClicks` array is empty:

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

### Debugging React Applications

A shockingly large part of a typical developer's time is spent on debugging and reading existing code. Thankfully, React is an extremely developer-friendly library when it comes to debugging

#### Rules To Keep In Mind When Debugging

**KEEP THE BROWSER'S DEVELOPER CONSOLE OPEN AT ALL TIMES**

**IDEALLY YOU WILL HAVE BOTH YOUR CODE AND THE BROWSER OPEN AND TOGETHER AT THE SAME TIME**

**WHEN THE CODE BREAKS, FIND AND FIX THE ERROR IMMEDIATELY**

#### Example of Print-Based Debugging

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

#### Debugger

Logging to the console is by no means the only way of debugging our applications. You can pause the execution of your application code in the Chrome developer console's [debugger](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/debugger), by writing the command debugger anywhere in your code.

### Rules Of Hooks

Let's be aware of some rules with hooks. `useState` and `useEffect` (which is also a hook) cannot be called in the following places:

* From inside a loop
* A conditional expression
* Any place that is not a function defining a component.


If you place hooks in any of these places, the application will behave erratically.

Here are a few visual examples

```js
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

### Event Handling Revisited

### Function That Returns a Function

### Passing Event Handlers to Child Components

### Do Not Define Components Within Components

### Summary

### Additional Resources