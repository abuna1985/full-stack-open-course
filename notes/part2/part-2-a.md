# Part 2-A: Rendering Collections and Modules

<img src="./../images/part-2-a-rendering-collections-and-modules.png" />

## Table of Contents

- [Part 2-A: Rendering Collections and Modules](#part-2-a-rendering-collections-and-modules)
  - [Table of Contents](#table-of-contents)
  - [Recap](#recap)
    - [Console.log](#consolelog)
    - [JavaScript Arrays](#javascript-arrays)
  - [Rendering Collections](#rendering-collections)
    - [Key-attribute](#key-attribute)
    - [Map](#map)
    - [Anti-pattern: Array Indexes As Keys](#anti-pattern-array-indexes-as-keys)
  - [Refactoring To Modules](#refactoring-to-modules)
  - [Troubleshooting When The Application Breaks](#troubleshooting-when-the-application-breaks)
  - [Summary](#summary)


## Recap

### Console.log

`What's the difference between an experienced JavaScript programmer and a rookie? The experienced one uses console.log 10-100 times more.`

If something is not working, don't just assume the data passing through the application is all fine. A better strategy is to place `console.log` in your components before returning your render to ensure all the data (props, state, logic) is working as expected. 

You also set breakpoints with the `debugger`. The JavaScript engine pauses running the code when they see the `debugger` statement. You then the ability to run the remaining JavScript code line by line at your own pace with a controller. I have included a dev.to article that walks through a scenario with visual/code examples of using the debugger. [Here is the excellent article on debugging by Justin E. Samuels](https://dev.to/thugdebugger/dude-get-a-debugger-3ige)

### JavaScript Arrays

The examples will now be using functional JavaScript array methods like `find`, `filter`, `map`. If you are not 100% confident about how they work, you can watch the first 3 videos from the playlist [Functional Programming in JavaScript by funfunfunction](https://www.youtube.com/playlist?list=PL0zVEGEvSaeEd9hlmCXrk5yUyqUag-n84):

* [funfunfunction - Higher-order Functions](https://www.youtube.com/watch?v=BMUiFMZr7vk&list=PL0zVEGEvSaeEd9hlmCXrk5yUyqUag-n84)
* [funfunfunction - Map](https://www.youtube.com/watch?v=bCqtb-Z5YGQ&list=PL0zVEGEvSaeEd9hlmCXrk5yUyqUag-n84&index=2)
* [funfunfunction - Reduce basics](https://www.youtube.com/watch?v=bCqtb-Z5YGQ&list=PL0zVEGEvSaeEd9hlmCXrk5yUyqUag-n84&index=2)

## Rendering Collections

Lets start with the following example from part 0 below:

```js
import React from 'react';
import ReactDOM from 'react-dom';

const notes = [
  {
    id: 1,
    content: 'HTML is easy',
    date: '2019-05-30T17:30:31.098Z',
    important: true
  },
  {
    id: 2,
    content: 'Browser can execute only JavaScript',
    date: '2019-05-30T18:39:34.091Z',
    important: false
  },
  {
    id: 3,
    content: 'GET and POST are the most important methods of HTTP protocol',
    date: '2019-05-30T19:20:14.298Z',
    important: true
  }
];

const App = (props) => {
  const { notes } = props;

  return (
    <div>
      <h1>Notes</h1>
      <ul>
        <li>{notes[0].content}</li>
        <li>{notes[1].content}</li>
        <li>{notes[2].content}</li>
      </ul>
    </div>
  );
}

ReactDOM.render(
  <App notes={notes} />,
  document.getElementById('root')
);
```

Every object within the `notes` array has the following properties:

* A unique id
* text content
* a datestamp
* A boolean value that notates whether the note is `important`

We can improve this component by generating the React elements from the `notes` array using the [map array method](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map).

```js
import React from 'react';
import ReactDOM from 'react-dom';

const notes = [
  {
    id: 1,
    content: 'HTML is easy',
    date: '2019-05-30T17:30:31.098Z',
    important: true
  },
  {
    id: 2,
    content: 'Browser can execute only JavaScript',
    date: '2019-05-30T18:39:34.091Z',
    important: false
  },
  {
    id: 3,
    content: 'GET and POST are the most important methods of HTTP protocol',
    date: '2019-05-30T19:20:14.298Z',
    important: true
  }
];

const App = ({notes}) => {
  return (
    <div>
      <h1>Notes</h1>
      <ul>
        {notes.map(note => <li>{note.content}</li>)}
      </ul>
    </div>
  )
}

ReactDOM.render(
  <App notes={notes} />, 
  document.getElementById('root')
);
```

The result of the render will be similar to the part 0 example:

```html
<div>
  <h1>Notes</h1>
  <ul>
    <li>HTML is easy</li>
    <li>Browser can execute only JavaScript</li>
    <li>GET and POST are the most important methods of HTTP protocol</li>
  </ul>
</div>
```

### Key-attribute

### Map

### Anti-pattern: Array Indexes As Keys

## Refactoring To Modules

## Troubleshooting When The Application Breaks

## Summary