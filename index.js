const express = require("express")
const app = express()
const morgan = require("morgan")
const cors = require("cors")

morgan.token("content", (req, res) => {
  return JSON.stringify(req.body)
})

app.use(cors())
app.use(express.json())

const generateId = () => {
  const maxId = notes.length > 0 ? Math.max(...notes.map((n) => n.id)) : 0
  return maxId + 1
}

let notes = [
  {
    name: "Raul2kkkkkkkk",
    number: "chichinabo",
    id: 5,
  },
  {
    name: "num2",
    number: "2345",
    id: 7,
  },
  {
    name: "bhnm",
    number: "bnmbnm",
    id: 8,
  },
]

let totalNotes = notes.length

app.use(morgan("tiny"))

app.get("/", (request, response) => {
  response.send("<h1>Hello World!</h1>")
})

app.get("/api/notes", (request, response) => {
  response.json(notes)
})

app.get("/api/notes/info", (request, response) => {
  const date = new Date()
  response.send(`
  <h1>Hay un total de ${totalNotes} notas</h1>
  <p> ${date} </p>`)
})

app.get("/api/notes/:id", (request, response) => {
  const id = Number(request.params.id)
  const note = notes.find((note) => note.id === id)
  if (note) {
    response.json(note)
  } else {
    response.status(404).end()
  }
})

app.delete("/api/notes/:id", (request, response) => {
  const id = Number(request.params.id)
  notes = notes.filter((note) => note.id !== id)
  response.status(204).end()
})

app.post(
  "/api/notes",
  morgan(" :method :url :content :response-time ms"),
  (request, response) => {
    const body = request.body

    if (!body.name && !body.number) {
      return response.status(400).json({
        error: "content missing",
      })
    }
    const duplicate = notes.find((content) => content.name === body.name)

    if (duplicate) {
      return response
        .status(418)
        .json({ error: "Ya hay un post con el mismo contenido" })
    }

    const note = {
      name: body.name,
      number: body.number,
      date: new Date(),
      id: generateId(),
    }

    notes = notes.concat(note)

    response.json(note)
  }
)

const PORT = 3001
app.listen(PORT)
console.log(`Server running on port ${PORT}`)
