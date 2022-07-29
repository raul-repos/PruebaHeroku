const mongoose = require("mongoose")
const supertest = require("supertest")
const { response } = require("../app")
const app = require("../app")
const Contact = require("../models/contact")
const helper = require("./test_helper")

const api = supertest(app)

test("Entries are returned as JSON", async () => {
  await api
    .get("/api/notes")
    .expect(200)
    .expect("Content-Type", /application\/json/)
})

test("All notes are returned", async () => {
  const response = await api.get("/api/notes")
  expect(response.body).toHaveLength(helper.initialContacts.length)
})

test("A contact is in the phonebook", async () => {
  const response = await api.get("/api/notes")

  const content = response.body.map((entry) => entry.name)
  expect(content).toContain("Arto Hellas")
})

// Test de post hecho con promises. Ocupa mas que con async/await
test("Add a contact", () => {
  const contact = { name: "Carmen Machi", number: 1234 }
  // Se hace post a la BBDD, sabemos que antes había 2 entradas gracias a beforeEach
  api.post("/api/notes").then(() => {
    contact
      .send()
      .expect(201)
      .expect("Content-Type", /application\/json/)
  })
  // Miramos cuantas entradas hay, deben ser las iniciales mas la que acabamos de enviar
  api.get("/api/notes", (response) => {
    const content = response.body.map((r) => r.name)
    expect(content).toContain("Carmen Machi")
    expect(response.body).toHaveLength(helper.initialContacts.length + 1)
  })
})

beforeEach(async () => {
  await Contact.deleteMany({})
  let contactObject = new Contact(helper.initialContacts[0])
  await contactObject.save()
  contactObject = new Contact(helper.initialContacts[1])
  await contactObject.save()
})

// Se cierra la conexión porque en los test pueden no cerrarse
// No es obligatorio para hacer el test, pero es una buena práctica
afterAll(() => {
  mongoose.connection.close()
})
