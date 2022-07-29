const Contact = require("../models/contact")

const initialContacts = [
  {
    name: "Arto Hellas",
    number: 12345,
  },
  {
    name: "Stefan Burnea",
    number: 1234555,
  },
]

contactsInDb = async () => {
  const contact = await Contact.find({})
  return contact.map((entry) => entry.toJSON())
}

module.exports = { initialContacts, contactsInDb }
