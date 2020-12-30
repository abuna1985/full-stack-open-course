import React, { useState } from 'react';
import ReactDOM from 'react-dom';

const Title = ({text}) => <h1>{text}</h1>

const Display = ({value, text}) => <div>{text}: {value}</div>

const Button = (props) => (
  <button onClick={props.handleClick}>
    {props.text}
  </button>
);

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

 
  return (
    <div>
      <Title text="Give Feedback" />
      <Button handleClick={() => setGood(good + 1)} text="Good" />
      <Button handleClick={() => setNeutral(neutral + 1)} text="Neutral" />
      <Button handleClick={() => setBad(bad + 1)} text="Bad" />
      <Title text="Statistics" />
      <Display value={good} text="Good" />
      <Display value={neutral} text="Neutral" />
      <Display value={bad} text="Bad" />
    </div>
  )
}

ReactDOM.render(<App />, 
  document.getElementById('root')
)