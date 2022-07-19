const mongoose = require("mongoose")

const args = process.argv

const noteSchema = new mongoose.Schema({
  name: String,
  number: String,
  //   id: Number,
})

const phoneEntry = mongoose.model("Entry", noteSchema)

let state = null

const password = args[2]

const url = `mongodb+srv://fullstack:${password}@cluster0.pldqf.mongodb.net/phonebook?retryWrites=true&w=majority`

if (args.length < 3) {
  console.log(
    "Please provide the password as an argument: node mongo.js <password> <?name> <?phonumber>"
  )
  process.exit(1)
} else if (args.length > 3 && args.length < 6) {
  console.log(args.length)
  mongoose
    .connect(url)
    .then(() => {
      const Entry = new phoneEntry({
        name: args[3],
        number: args[4],
      })
      return Entry.save()
    })
    .then(() => {
      console.log("New entry added")
      mongoose.connection.close()
    })
} else if ((args.length = 3)) {
  console.log("Showing all entries:")
  console.log(args.length)
  mongoose
    .connect(url)
    .then((result) =>
      phoneEntry.find({}).then((result) => {
        result.forEach((note) => {
          console.log(note)
        })
      })
    )
    .then(() => {
      console.log("All entries showed")
      mongoose.connection.close()
    })
} else {
  console.log(" Too many parameters")
  process.exit(1)
}
