import React from 'react'
import ReactDOM from 'react-dom'

const Header = ({course}) => {
  return (
    <h1>{course}</h1>
  );
}

// Part will have the text for part and exercise number
const Part = ({name, exercises}) => {
  return <p>{name} {exercises}</p>;
}

// Create a content
const Content = ({part1, part2, part3}) => {
  return (
    <>
      {/* Using the spread operator to drop in the object */}
      <Part {...part1} />
      <Part {...part2} />
      <Part {...part3} />
    </>
  );
}

const Total = ({total}) => {
  return (
    <p>Number of exercises {total}</p>
  );
}

const App = () => {
  const course = 'Half Stack application development'
  const part1 = {
    name: 'Fundamentals of React',
    exercises: 10
  }
  const part2 = {
    name: 'Using props to pass data',
    exercises: 7
  }
  const part3 = {
    name: 'State of a component',
    exercises: 14
  }

  return (
    <>
      <Header course={course} />
      {/* Decided to pass through an object for each part */}
      <Content 
        part1={part1} 
        part2={part2} 
        part3={part3}
      />
      <Total total={part1.exercises + part2.exercises + part3.exercises} />
    </>
  );
}

ReactDOM.render(<App />, document.getElementById('root'))