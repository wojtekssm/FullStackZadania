import { useState } from 'react'

const StatisticLine = (props) => {
  return(
    <tr>
      <td>{props.text}</td>
      <td>{props.value}</td>
    </tr>
  )
}

const Statistics = (props) => {
    let all = (props.good + props.neutral + props.bad)
    
    if(all > 0){
      return(
      <div>
      <h2>statistics</h2>
      <table>
        <tbody>
      <StatisticLine text="good" value = {props.good} />
      <StatisticLine text="neutral" value = {props.neutral}/>
      <StatisticLine text="bad" value = {props.bad}/>
      <StatisticLine text="all" value = {all}/>
      <StatisticLine text="average" value = {(props.good + props.neutral * 0 + props.bad * -1) / all}/>
      <StatisticLine text="positive" value = {props.good / all * 100 + " %"}/>
      </tbody>
      </table>
    </div>
      )
    }else{
      return(
        <div>
      <h2>statistics</h2>
      <p>No feedback given</p>
      </div>
      )
    }
  
}

const Button = (props) => {
  return (
    <button onClick={props.onClick}>
      {props.text}
    </button>
  )
}

const Feedback = (props) => {
  return(
    <div>
      <h2>give feedback</h2>
      <Button text="good" onClick={props.setGood}/>
      <Button text="neutral" onClick={props.setNeutral}/>
      <Button text="bad" onClick={props.setBad}/>
    </div>
  )
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)


  const addGood = () => setGood(good + 1);
  const addBad = () => setBad(bad + 1);
  const addNeutral = () => setNeutral(neutral + 1);
  return (
    <div>
      <Feedback setGood={addGood} setBad={addBad} setNeutral={addNeutral}/>
      <Statistics good={good} neutral={neutral} bad={bad}/>
    </div>
  )
}

export default App