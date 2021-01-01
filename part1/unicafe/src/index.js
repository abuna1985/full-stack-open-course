import React, { useState } from 'react';
import ReactDOM from 'react-dom';

const Title = ({text}) => <h1>{text}</h1>

const Statistic = ({value, text}) => (
    <tr>
      <td>{text}</td> 
      <td>{value}</td>
    </tr>
);

const Button = ({handleClick, text}) => (
  <button onClick={handleClick}>
    {text}
  </button>
);

const Statistics = ({good, neutral, bad}) => {
  const getTotal = (goodVotes, neutralVotes, badVotes) => {
    return goodVotes + neutralVotes + badVotes;
  }

  const getAverage = (goodVotes, neutralVotes, badVotes) => {
    let totalVotes = getTotal(goodVotes, neutralVotes, badVotes);
    return (goodVotes + (-badVotes))/totalVotes;
  }

  const getPercentage = (goodVotes, neutralVotes, badVotes) => {
    let totalVotes = getTotal(goodVotes, neutralVotes, badVotes);
    return goodVotes/totalVotes * 100 + '%';
  }

  if (!good && !bad && !neutral) {
    return (
      <>
        <Title text="Statistics" />
        <p>No feedback given</p>
      </>
    );
  }

  
  return (
      <>
        <Title text="Statistics" />
        <table>
          <tbody>
            <Statistic value={good} text="Good" />
            <Statistic value={neutral} text="Neutral" />
            <Statistic value={bad} text="Bad" />
            <Statistic value={getTotal(good, neutral, bad)} text="All" />
            <Statistic value={getAverage(good, neutral, bad)} text="Average" />
            <Statistic value={getPercentage(good, neutral, bad)} text="Positive" />
          </tbody>
        </table>
      </>
  );

}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);
  
  return (
    <div>
      <Title text="Give Feedback" />
      <Button handleClick={() => setGood(good + 1)} text="Good" />
      <Button handleClick={() => setNeutral(neutral + 1)} text="Neutral" />
      <Button handleClick={() => setBad(bad + 1)} text="Bad" />
      <Statistics good={good} neutral={neutral} bad ={bad} />
    </div>
  );
}

ReactDOM.render(<App />, 
  document.getElementById('root')
)