const express = require('express')
const { getRiskApi } = require('./lib/handlers')
const handlers = require('./lib/handlers')

const app = express()

const port = process.env.PORT || 3000

app.get('/api/calculator', handlers.getRiskApi)

// custom 404 page
app.use((req, res) => {
  res.type('text/plain')
  res.status(404)
  res.send('404 - Not Found')
})

// custom 500 page
app.use((err, req, res, next) => {
  console.error(err.message)
  res.type('text/plain')
  res.status(500)
  res.send('500 - Server Error')
})

app.listen(port, () => console.log(
  `Express started on http://localhost:${port}; ` +
  `press Ctrl-C to terminate.`))

// Use Express to publish static HTML, CSS, and JavaScript files that run in the browser. 

/*
app.use(express.static(__dirname + '/static'))

const http = require('http')
const port = process.env.PORT || 3000

const server = http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/plain' })
  res.end('Hello world!')
})*/