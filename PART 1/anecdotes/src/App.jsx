import { useState } from 'react'

const Button = (props) => {
  return (
    <button onClick={props.onClick}>
      {props.text}
    </button>
  )
}

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ]
  let random_number = Math.trunc(Math. random() * ((anecdotes.length-1) - 0) + 0);
  const [selected, setSelected] = useState(random_number)
  const [votes, setVotes] = useState({ 0:0, 1:0, 2:0, 3:0, 4:0, 5:0, 6:0, 7:0 })

  const nextSelected = () => setSelected(selected + 1)
  if(selected > (anecdotes.length-1)){
    setSelected(0);
  }

  const addVote = () => {
    const copy = { ...votes }
    copy[selected] += 1
    setVotes(copy)
  }
  const maxValue = Math.max(...Object.values(votes));
  const maxKey = Object.keys(votes).find(key => votes[key] === maxValue);
  return (
    <div>
      <h1>Anecdote of the day</h1>
      {anecdotes[selected]}<br/>
      has {votes[selected]} votes<br/>
      <Button text="vote" onClick={addVote}/>
      <Button text="next anecdote" onClick={nextSelected}/>
      <h1>Anecdote with most votes</h1>
      {anecdotes[maxKey]}<br/>
      has {maxValue} votes
    </div>
  )
}

export default App