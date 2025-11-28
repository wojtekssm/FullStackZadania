import { useState } from 'react'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import Filter from './components/Filter'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setNewFilter] = useState('')


  const addPerson = (event) => {
    event.preventDefault()
    const personObject = {name: newName, number: newNumber, id:persons.length+1}
    const ifContains = (persons, personObject) => {
      return persons.some(p => p.name === personObject.name && p.number === personObject.number)
    }
    
    if(!ifContains(persons, personObject)){
      setPersons(persons.concat(personObject))
      setNewName('')
      setNewNumber('')
    }
    else{
      alert(`${newName} is already added to phonebook`)
    }
  }

  const handleChangeName= (event) =>{
    setNewName(event.target.value)
  }
  const handleChangeNumber= (event) =>{
    setNewNumber(event.target.value)
  }
  const handleFilterChange = (event) =>{
    setNewFilter(event.target.value)
  }
  
  return (
    <div>
      <h2>Phonebook</h2>
      <Filter newFilter={newFilter} handleFilterChange={handleFilterChange}/>
      <h2>add a new</h2>
      <PersonForm addPerson={addPerson} newName={newName} handleChangeName={handleChangeName} newNumber={newNumber} handleChangeNumber={handleChangeNumber}/>
      <h2>Numbers</h2>
      <Persons persons={persons} newFilter={newFilter}/>
    </div>
    
  )
}

export default App