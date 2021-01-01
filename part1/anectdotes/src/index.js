import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
];

const Button = ({handleClick, text}) => (
  <button onClick={handleClick}>
    {text}
  </button>
);

const App = (props) => {
  const [selected, setSelected] = useState(0);
  const [points, setPoints] = useState(Array(anecdotes.length).fill(0));

  const getRandomNumber = (num) => {
    return Math.floor(Math.random()*num);
  }
  const handleButtonClick = () => {
    return setSelected(getRandomNumber(anecdotes.length))
  }

  const handleVoteClick = () => {
    const copy = [...points];
    copy[selected]++;
    return setPoints(copy);
  }



  return (
    <>
      <div>{props.anecdotes[selected]}</div>
      <Button handleClick={handleVoteClick} text="vote" />
      <Button handleClick={handleButtonClick} text="next anectdote" />
    </>
  );
}

ReactDOM.render(
  <App anecdotes={anecdotes} />,
  document.getElementById('root')
);