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


## Recap

### Console.log

`What's the difference between an experienced JavaScript programmer and a rookie? The experienced one uses console.log 10-100 times more.`

If something is not working, don't just assume the data passing through the application is all fine. A better strategy is to place `console.log` in your components before returning your render to ensure all the data (props, state, logic) is working as expected. 

You also set breakpoints with the `debugger`. The JavaScript engine pauses running the code when they see the `debugger` statement. You then the ability to run the remaining JavScript code line by line at your own pace with a controller. I have included a dev.to article that walks through a scenario with visual/code examples of using the debugger. [Here is the excellent article on debugging by Justin E. Samuels](https://dev.to/thugdebugger/dude-get-a-debugger-3ige)

### JavaScript Arrays

## Rendering Collections

### Key-attribute

### Map

### Anti-pattern: Array Indexes As Keys

## Refactoring To Modules

## Troubleshooting When The Application Breaks