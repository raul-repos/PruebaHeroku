const entriesRouter = require("express").Router()

const { response } = require("express")
const Contact = require("../models/contact")

// Ruta para pillar todas las entradas

// La URL es RELATIVA a la url aportada donde se use el módulo
entriesRouter.get("/", (req, res) => {
  Contact.find({}).then((entries) => {
    response.json(entries)
  })
})

// Ruta para pillar entrada segun ID
entriesRouter.get("/:id", (req, res, next) => {
  Contact.findById(req.params.id)
    .then((entry) => {
      entry ? response.json(entry) : response.status(404).end()
    })
    .catch((error) => next(error))
})

// Para postear una entrada
entriesRouter.post("/", (req, res, next) => {
  const body = req.body
  const entry = new Contact({
    name: body.name,
    number: body.number,
  })

  entry
    .save()
    .then((savedEntry) => {
      response.json(savedEntry)
    })
    .catch((error) => next(error))
})

// Delete de una entrada
entriesRouter.delete("/:id", (req, res, next) => {
  Contact.findByIdAndRemove(req.params.id)
    .then(() => response.status(204).end())
    .catch((error) => next(error))
})

//Actualizar una entrada
entriesRouter.put("/:id", (req, res, next) => {
  const body = req.body

  const entry = new Contact({
    name: body.name,
    number: body.number,
  })
  // Necesita el ID para hacer update, la info que se updatea y (optional) {new:true} para que el response sea la nota actualizada, no la nota antes de actualizar
  Contact.findByIdAndUpdate(req.params.id, entry, { new: true })
    .then((updatedEntry) => response.json(updatedEntry))
    .catch((error) => next(error))
})

module.exports = entriesRouter
