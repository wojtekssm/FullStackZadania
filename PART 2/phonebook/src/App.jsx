import { useState, useEffect } from 'react'
import personService from './services/persons'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import Filter from './components/Filter'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setNewFilter] = useState('')
useEffect(() => {
    personService.getAll().then(response => {
        setPersons(response.data)
      })
  }, [])

const addPerson = (event) => {
  event.preventDefault()
  const personObject = { name: newName, number: newNumber }

  const ifContains = (persons, name) => {
    return persons.some(p => p.name === personObject.name)
  }

  if (!ifContains(persons, personObject.name)) {
    personService.create(personObject)
      .then(response => {
        setPersons(persons.concat(response.data))
        setNewName('')
        setNewNumber('')
      })
      .catch(error => {
        console.error("Error adding person:", error)
      })
  } else {
    if(window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)){
      const foundPerson = persons.find(p => p.name === personObject.name)
      personService.update(foundPerson.id, personObject).then(response => {
      setPersons(persons.map(p => 
        p.id !== foundPerson.id ? p : response.data
      ))
      setNewName('')
      setNewNumber('')
    })
    }
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
      <Persons persons={persons} newFilter={newFilter} setPersons={setPersons}/>
    </div>
    
  )
}

export default App