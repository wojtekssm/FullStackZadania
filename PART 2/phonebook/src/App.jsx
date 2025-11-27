import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')


  const addPerson = (event) => {
    event.preventDefault()
    const personObject = {name: newName, number: newNumber, id:persons.length+1}
    const ifContains = (persons, personObject) => {
      return persons.some(p => p.name === personObject.name && p.number === personObject.number);
    }
    
    console.log(ifContains)
    if(!ifContains(persons, personObject)){
      setPersons(persons.concat(personObject));
      setNewName('');
    }else{
      alert(`${newName} is already added to phonebook`)
    }
  }
  const handleChangeName= (event) =>{
    setNewName(event.target.value)
  }
  const handleChangeNumber= (event) =>{
    setNewNumber(event.target.value)
  }
  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addPerson}>
        <div>
          name: <input value={newName} onChange={handleChangeName} />
        </div>
        <div>number: <input value={newNumber} onChange={handleChangeNumber}/></div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {persons.map(person =>
        <p key={person.id}>{person.name} {person.number}</p>
      )}
      <div>debug: {newName}</div>
      <div>debug: {newNumber}</div>
    </div>
    
  )
}

export default App