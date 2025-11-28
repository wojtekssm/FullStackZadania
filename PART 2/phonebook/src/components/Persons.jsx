const Persons = ({persons, newFilter}) =>{
    if(newFilter.length < 1){
      return(
      persons.map(person =>
        <p key={person.id}>{person.name} {person.number}</p>
      )
    )
    }else{
      return(
        persons.map(person => person.name.toLowerCase().includes(newFilter.toLowerCase()) ?
        <p key={person.id}>{person.name} {person.number}</p>: null
      )
      )
    }
  }

  export default Persons