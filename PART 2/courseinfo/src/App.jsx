import Course from "./components/Course"
const Header = (props) => {
    return(
        console.log(props),
        <h1>{props.course}</h1>
    )
}

const Part = ({ part, exercises}) => {
  return <p>{part} {exercises}</p>
}

const Content = (props) => {
  return (
    <div>
      <Part part={props.parts[0].name} exercises={props.parts[0].exercises} />
      <Part part={props.parts[1].name} exercises={props.parts[1].exercises} />
      <Part part={props.parts[2].name} exercises={props.parts[2].exercises} />
    </div>
  )
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
    },
    {
      name: 'Redux',
      exercises: 11
    }
  ]

  return (
    <div>
      <Header course={course} />
      <Content parts={parts} />
      <Course course={course} parts={parts}/>
    </div>
  )
}

export default App
