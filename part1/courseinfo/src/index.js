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
const Content = ({parts}) => {

  return (
    <>
      {parts && parts.map((part, i) => {
        return <Part {...part} key={i} />
      })}
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
  const parts = [
    {
      name: 'Fundamentals of React',
      exercises: 10
    },
    {
      name: 'Using props to pass data',
      exercises: 7
    },
    {
      name: 'State of a component',
      exercises: 14
    }
  ];
  const getExerciseTotal = (arr) => {
    return arr.reduce((all, item, i) => {
      return all + item.exercises;
    }, 0);
  }

  return (
    <>
      <Header course={course} />
      {/* Decided to pass through an object for each part */}
      <Content parts={parts}/>
      <Total total={getExerciseTotal(parts)} />
    </>
  );
}

ReactDOM.render(<App />, document.getElementById('root'))