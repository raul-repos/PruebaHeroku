const app = require("./app")
const http = require("http")
const { PORT } = require("./utils/config")
const { info, error } = require("./utils/logger")

const server = http.createServer(app)

server.listen(PORT, () => {
  info(`Server running on ${PORT}`)
})
