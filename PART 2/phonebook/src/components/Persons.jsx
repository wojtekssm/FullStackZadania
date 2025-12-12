import personService from '../services/persons'

const Persons = ({persons, newFilter, setPersons}) =>{
  const deletePerson = (person) => {
    if(window.confirm(`Delete ${person.name}?`)){
      personService.deleteFrom(person.id).then(() => {
        setPersons(persons.filter(p => p.id !== person.id))
    })
  }
}
    if(newFilter.length < 1){
      return(
      persons.map(person =>
        <p key={person.id}>{person.name} {person.number} <button onClick={() => deletePerson(person)}>delete</button></p>
      )
    )
    }else{
      return(
        persons.map(person => person.name.toLowerCase().includes(newFilter.toLowerCase()) ?
        <p key={person.id}>{person.name} {person.number} <button onClick={() => deletePerson(person)}>delete</button></p>: null
      )
      )
    }
  }
  export default Persons