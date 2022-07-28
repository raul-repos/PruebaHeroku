const entriesRouter = require("express").Router()

const { res } = require("express")
const Contact = require("../models/contact")

// Ruta para pillar todas las entradas

// La URL es RELATIVA a la url aportada donde se use el módulo
entriesRouter.get("/", (req, res) => {
  Contact.find({}).then((entries) => {
    res.json(entries)
  })
})

// Ruta para pillar entrada segun ID
entriesRouter.get("/:id", (req, res, next) => {
  Contact.findById(req.params.id)
    .then((entry) => {
      entry ? res.json(entry) : res.status(404).end()
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
      res.json(savedEntry)
    })
    .catch((error) => next(error))
})

// Delete de una entrada
entriesRouter.delete("/:id", (req, res, next) => {
  Contact.findByIdAndRemove(req.params.id)
    .then(() => res.status(204).end())
    .catch((error) => next(error))
})

//Actualizar una entrada
entriesRouter.put("/:id", (req, res, next) => {
  const body = req.body

  const entry = {
    name: body.name,
    number: body.number,
  }
  // Necesita el ID para hacer update, la info que se updatea y (optional) {new:true} para que el res sea la nota actualizada, no la nota antes de actualizar
  Contact.findByIdAndUpdate(req.params.id, entry, { new: true })
    .then((updatedEntry) => res.json(updatedEntry))
    .catch((error) => next(error))
})

module.exports = entriesRouter
