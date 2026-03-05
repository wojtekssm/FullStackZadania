if (process.argv.length < 3) {
  console.log('give password as argument')
  process.exit(1)
}

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

const Person = mongoose.model('Person', personSchema)

const person = new Person({
  id: getRandomInt(1000000).toString(),
  name: process.argv[3],
  number: process.argv[4],
})

if(process.argv.length<4){
  Person.find({}).then(result => {
  result.forEach(person => {
    console.log(person)
  })
  
}).catch(err => console.error(err)).finally(() => mongoose.connection.close())
}else{
  if(process.argv.length==5){
  person.save().then(result => {
  console.log(`added ${person.name} number ${person.number} to phonebook`)
  mongoose.connection.close()
})
}else{
  console.log('give all arguments')
  process.exit(1)
}
}