# Part 1-D: A more complex, state, debugging React apps

<img src="./../images/part-1-d-complex-state-debugging.png" />

## Table of Contents
- [Part 1-D: A more complex, state, debugging React apps](#part-1-d-a-more-complex-state-debugging-react-apps)
  - [Table of Contents](#table-of-contents)
    - [Complex state](#complex-state)
    - [Handling Arrays](#handling-arrays)
    - [Conditional Rendering](#conditional-rendering)
    - [Old React](#old-react)
    - [Debugging React Applications](#debugging-react-applications)
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

### Conditional Rendering

### Old React

### Debugging React Applications

### Rules Of Hooks

### Event Handling Revisited

### Function That Returns a Function

### Passing Event Handlers to Child Components

### Do Not Define Components Within Components

### Summary

### Additional Resources