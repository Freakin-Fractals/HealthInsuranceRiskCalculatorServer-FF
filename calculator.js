const express = require('express')
const cors = require('cors')
const url = require('url')

const app = express()
app.use(cors());

const port = process.env.PORT || 3000

app.get('/calculation', (request, response) => {
	console.log('Calling "/add-two-integers" on the Node.js server.')
	var inputs = url.parse(request.url, true).query
  console.log(inputs)
  let age = parseInt(inputs.age)
	let height = parseInt(inputs.height)
	let weight = parseInt(inputs.weight)
  let blood = inputs.blood
  let disease = parseInt(inputs.disease)
  let sum = height + weight
	response.type('text/plain')
	response.json(sum.toString())
})

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

