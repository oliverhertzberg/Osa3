const express = require('express')
const morgan = require('morgan')
const app = express()

app.use(express.json())

// En saanut toimimaan..
// app.use(morgan(':method :url :status :response[content-length] - :response-time ms :body', {
//     skip: (request, response) => {
//         return request.method !== 'POST' || response.statusCode !== 200;
//     },
//     stream: process.stdout,
//     body: (request) => {
//         return JSON.stringify(request.body);
//     },
// }))


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


app.get('/api/persons', morgan('tiny'), (request, response) => {
    console.log(persons)
    response.json(persons)
})

app.get('/api/info', morgan('tiny'), (request, response) => {
    const currentTime = new Date()
    const personCount = persons.length

    response.write(`This phone book has the info of ${personCount} people \n `)
    response.write(`${currentTime}`)
    response.end(
    
    )
})

app.get('/api/persons/:id', morgan('tiny'), (request, response) => {
    const id = Number(request.params.id)
    const person = persons.find(p => p.id === id)

    person ? response.json(person)
    : response.status(404).end()
})

app.delete('/api/persons/:id', morgan('tiny'), (request, response) => {
    const id = Number(request.params.id)
    persons = persons.filter(p => p.id !== id)

    response.status(204).end()


})

morgan.token('body', (request) => JSON.stringify(request.body));

app.post('/api/persons',morgan(':method :url :status :res[content-length] - :response-time ms :body'), (request, response) => {
    const body = request.body
    const namesMap = persons.map(p => p.name)

    if(!body.name) {
        return response.status(400).json({ error: 'Name is missing' }
    )}
    if(!body.number){
        return response.status(400).json({ error: 'Number is missing' }
    )}
    if(namesMap.includes(body.name)) {
        return response.status(400).json({ error: 'Name must be unique' }
    )}

    person = {
        id: idGenerator(),
        name: body.name,
        number: body.number,
    }

    persons = persons.concat(person)

    response.json(person)
})



const unknownEndpoint = (request, response) => {
    response.status(404).send({error: 'unknown endpoint'})
}

app.use(unknownEndpoint)


const PORT = 3001;
app.listen(PORT, () => {
    console.log('Server is running on port ' + PORT)
})