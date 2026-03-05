const express = require('express')
const app = express()
var morgan = require('morgan')

function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

let persons = [
    { 
      "id": "1",
      "name": "Arto Hellas", 
      "number": "040-123456"
    },
    { 
      "id": "2",
      "name": "Ada Lovelace", 
      "number": "39-44-5323523"
    },
    { 
      "id": "3",
      "name": "Dan Abramov", 
      "number": "12-43-234345"
    },
    { 
      "id": "4",
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122"
    },
    { 
      "id": "5",
      "name": "Wojtek M", 
      "number": "123"
    }
]

const mongoose = require('mongoose')
const password = process.argv[2]

const url = `mongodb+srv://wojtekssm_db_user:${password}@phonebook.9fiexg0.mongodb.net/?appName=phonebook`

mongoose.set('strictQuery',false)

mongoose.connect(url, { family: 4 })

const personSchema = new mongoose.Schema({
  id: String,
  name: String,
  number: String,
})

personSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

const Person = mongoose.model('Person', personSchema)


app.use(express.static('dist'))

app.use(express.json())
morgan.token('body', (req) => JSON.stringify(req.body))

app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))

app.get('/', function (req, res) {
  res.send('hello, world!')
})

app.get('/info', (request, response) => {
  const count = persons.length
  const date = new Date()

  response.send(`
    <p>Phonebook has info for ${count} people</p>
    <p>${date}</p>
  `)
})


app.get('/api/persons', (request, response) => {
  Person.find({}).then(persons => {
    response.json(persons)
  })
})

app.get('/api/persons/:id', (request, response) => {
  const id = request.params.id
  const person = persons.find((person) => person.id === id)

  if (person) {
    response.json(person)
  } else {
    response.status(404).end()
  }
})


app.post('/api/persons', (request, response) => {
  const body = request.body

  if (!body.name) {
    return response.status(400).json({
      error: 'name missing',
    })
  }

  else if(!body.number){
    return response.status(400).json({
      error: 'number missing',
    })
  }

  const nameExist = persons.some(person => person.name === body.name)
  const numberExist = persons.some(person => person.number === body.number)

  if(nameExist){
    return response.status(400).json({
      error: 'name must be unique',
    })
  }
  else if(numberExist){
    return response.status(400).json({
      error: 'number must be unique',
    })
  }

  const person = 
  {
    id: getRandomInt(1000000),
    name: body.name,
    number: body.number   
  }

  persons = persons.concat(person)

  response.json(person)
})

app.delete('/api/persons/:id', (request, response) => {
  const id = request.params.id
  persons = persons.filter((person) => person.id !== id)

  response.status(204).end()
})

const PORT = 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})