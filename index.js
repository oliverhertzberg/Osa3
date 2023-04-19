const express = require('express')
const app = express()

app.use(express.json())

let persons = [
    { 
      id: 1,
      name: "Arto Hellas", 
      number: "040-123456",
    },
    { 
      id: 2,
      name: "Ada Lovelace", 
      number: "39-44-5323523",
    },
    { 
      id: 3,
      name: "Dan Abramov", 
      number: "12-43-234345",
    },
    { 
      id: 4,
      name: "Mary Poppendieck", 
      number: "39-23-6423122",
    }
]

app.get('/api/persons', (request, response) => {
    response.json(persons)
    console.log(response.json(persons))
})

app.get('/api/info', (request, response) => {
    const currentTime = new Date()
    const personCount = persons.length

    response.write(`This phone book has the info of ${personCount} people \n `)
    response.write(`${currentTime}`)
    response.end(
    
    )
})

const PORT = 3001;
app.listen(PORT, () => {
    console.log('Server is running on port ' + PORT)
})