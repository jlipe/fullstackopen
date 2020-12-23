import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const App = (props) => {
  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState(new Array(props.anecdotes.length).fill(0));
  let maxVoted;
  if (votes.reduce((a, v) => a + v)){
    // Something has been voted on
    let maxIndex = votes.indexOf(Math.max(...votes));
    maxVoted = props.anecdotes[maxIndex];
  }

  const handleClick = () => {
    const index = Math.floor(Math.random() * anecdotes.length);
    setSelected(index)
  }

  const incrementVote = () => {
    const updatedVotes = [...votes];
    updatedVotes[selected]++
    setVotes(updatedVotes);
  }

  return (
    <div>
      <h3>Anecdote of the day</h3>
      {props.anecdotes[selected]}
      <div>
        has {votes[selected]} votes
      </div>

      <div>
        <button 
          onClick={handleClick}>
            Random Anecdote
        </button>
        <button 
          onClick={incrementVote}>
            Vote for me!
        </button>
      </div>
      <h3>Anecdote with most votes</h3>
        {maxVoted}
    </div>
  )
}

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

ReactDOM.render(
  <App anecdotes={anecdotes} />,
  document.getElementById('root')
)