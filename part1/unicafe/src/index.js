import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Button = ({ text, handleClick }) => {
  return <button onClick={handleClick}>{text}</button>;
}

const Statistic = ({ text, value }) => {
  return <tr><td>{text}{value}{text==="Positive: " ? " %" : null}</td></tr>;
}

const Statistics = ({ good, bad, neutral }) => {
  const all = good+neutral+bad;
  const average = (good-bad)/all;
  const positive = (good/all)*100;

  if (good || neutral || bad){
    return(
      <>
        <h1>Statistics</h1>
        <table>
          <tbody>
            <Statistic text="Good: " value={good} />
            <Statistic text="Neutral: " value={neutral} />
            <Statistic text="Bad: " value={bad} />
            <Statistic text="All: " value={all} />
            <Statistic text="Average: " value={average} />
            <Statistic text="Positive: " value={positive} />
          </tbody>
        </table>
      </>
    );
  } else {
    return(
      <>
        <h1>Statistics</h1>
        <p>No feedback given</p>
      </>
    );
  }
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)


  return (
    <div>
      <h1>Give Feedback</h1>
      <Button handleClick={() => setGood(good + 1)} text="Good" />
      <Button handleClick={() => setNeutral(neutral + 1)} text="Neutral" />
      <Button handleClick={() => setBad(bad + 1)} text="Bad" />
      <Statistics good={good} bad={bad} neutral={neutral} />
    </div>
  )
}

ReactDOM.render(<App />, 
  document.getElementById('root')
)