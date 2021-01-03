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

const Title = ({text}) => <h1>{text}</h1>;

const Button = ({handleClick, text}) => (
  <button onClick={handleClick}>
    {text}
  </button>
);

const PopularQuote = ({quote}) => {
  if(!quote) {
    return <p>No votes counted yet!</p>
  }

  return <p>{quote}</p>
}

const App = ({anecdotes}) => {
  const [selected, setSelected] = useState(0);
  const [points, setPoints] = useState(Array(anecdotes.length).fill(0));
  const [popularQuote, setPopularQuote] = useState("");

  const getRandomNumber = (num) => {
    return Math.floor(Math.random()*num);
  }

  const handleButtonClick = () => {
    return setSelected(getRandomNumber(anecdotes.length))
  }

  const handleVoteClick = () => {
    const copy = [...points];

    const getMaxPoint = (num) => {
      return num === Math.max(...copy)
    }

    copy[selected] += 1;
    setPoints(copy);
    // tie goes to the index closer to 0
    setPopularQuote(anecdotes[copy.findIndex(getMaxPoint)]);
  }

  return (
    <div>
      <Title text="Anecdote of the day" />
      <p>{anecdotes[selected]}</p>
      <Button handleClick={handleVoteClick} text="vote" />
      <Button handleClick={handleButtonClick} text="next anecdote" />
      <Title text="Anecdote with the most votes" />
      <PopularQuote quote={popularQuote} />
    </div>
  );
}

ReactDOM.render(
  <App anecdotes={anecdotes} />,
  document.getElementById('root')
);