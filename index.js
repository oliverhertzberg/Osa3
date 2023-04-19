const express = require('express')
const app = express()

app.use(express.json())

const idGenerator = () => {
    const newID = (Math.round( 9007199254740991*Math.random()))
    return newID
}

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

app.get('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    const person = persons.find(p => p.id === id)

    person ? response.json(person)
    : response.status(404).end()
})

app.delete('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    persons = persons.filter(p => p.id !== id)

    response.status(204).end()
})

app.post('/api/persons', (request, response) => {
    const body = request.body
    const namesMap = persons.map(p => p.name)

    if(!body.name) {
        return response.status(400).json({ error: 'Name is missing' }
    )}
    if(!body.number){
        response.status(400).json({ error: 'Number is missing' }
    )}
    if(namesMap.includes(body.name)) {
        response.status(400).json({ error: 'Name must be unique' }
    )}

    person = {
        id: idGenerator(),
        name: body.name,
        number: body.number,
    }

    persons = persons.concat(person)

    response.json(person)
})



const PORT = 3001;
app.listen(PORT, () => {
    console.log('Server is running on port ' + PORT)
})