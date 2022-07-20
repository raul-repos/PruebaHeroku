require("dotenv").config()
const express = require("express")
const app = express()
const morgan = require("morgan")
const cors = require("cors")
const phoneEntry = require("./models/entry.js")

morgan.token("content", (req, res) => {
  return JSON.stringify(req.body)
})

app.use(express.static("build"))
app.use(cors())
app.use(express.json())

const generateId = () => {
  const maxId = notes.length > 0 ? Math.max(...notes.map((n) => n.id)) : 0
  return maxId + 1
}

// let notes = [
//   {
//     name: "Raul2kkkkkkkk",
//     number: "chichinabo",
//     id: 5,
//   },
//   {
//     name: "num2",
//     number: "2345",
//     id: 7,
//   },
//   {
//     name: "bhnm",
//     number: "bnmbnm",
//     id: 8,
//   },
// ]

console.log("notas:", phoneEntry[1])
let totalNotes = phoneEntry.length

app.use(morgan("tiny"))

app.get("/", (request, response) => {
  response.send("<h1>Hello World!</h1>")
})

app.get("/api/notes", (request, response) => {
  phoneEntry.find().then((notes) => {
    response.json(notes)
  })
})

app.get("/api/notes/info", (request, response) => {
  const date = new Date()
  phoneEntry.find().then((notes) => {
    response.send(`<h1>Hay un total de ${notes.length} notas</h1>
  <p> ${date} </p>`)
  })
})

app.get("/api/notes/:id", (request, response, next) => {
  // const id = Number(request.params.id)
  // const note = notes.find((note) => note.id === id)

  phoneEntry
    .findById(request.params.id)
    .then((note) => {
      if (note) {
        response.json(note)
      } else {
        response.status(404).end()
      }
    })
    .catch((error) => next(error))
  // if (note) {
  //   response.json(note)
  // } else {
  //   response.status(404).end()
  // }
})

app.delete("/api/notes/:id", (request, response) => {
  // const id = Number(request.params.id)

  phoneEntry
    .findByIdAndRemove(request.params.id)
    .then((note) => {
      response.status(204).end()
    })
    .catch((error) => next(error))

  // notes = notes.filter((note) => note.id !== id)
  // response.status(204).end()
})

app.post(
  "/api/notes/",
  morgan(" :method :url :content :response-time ms"),
  (request, response) => {
    const body = request.body

    // if (!body.name && !body.number) {
    //   return response.status(400).json({
    //     error: "content missing",
    //   })
    // }
    // const duplicate = notes.find((content) => content.name === body.name)

    // if (duplicate) {
    //   return response
    //     .status(418)
    //     .json({ error: "Ya hay un post con el mismo contenido" })
    // }

    const note = new phoneEntry({
      name: body.name,
      number: body.number,
      date: new Date(),
      // id: generateId(),
    })

    note.save().then((savedNote) => {
      response.json(savedNote)
    })
  }
)

app.put("/api/notes/:id", (request, response, next) => {
  const body = request.body
  const note = {
    name: body.name,
    number: body.number,
  }
  phoneEntry
    .findByIdAndUpdate(request.params.id, note, { new: true })
    .then((updatedNote) => response.json(updatedNote))
    .catch((error) => next(error))
})

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: "unknown endpoint" })
}
app.use(unknownEndpoint)

const errorHandler = (error, request, response, next) => {
  console.log(error.message)
  if (error.name === " CastError") {
    return response.status(400).send({ error: "malformed id" })
  }
  next(error)
}
app.use(errorHandler)

const PORT = process.env.PORT
app.listen(PORT)
console.log(`Server running on port ${PORT}`)
