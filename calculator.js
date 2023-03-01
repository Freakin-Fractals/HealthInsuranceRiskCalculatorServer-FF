const express = require('express')
const fs = require('fs')
const cors = require('cors')
const url = require('url')

const app = express()
app.use(cors());

function serveStaticFile(res, path, contentType, responseCode = 200) {
  fs.readFile(__dirname + path, (err, data) => {
    if(err) {
      res.writeHead(500, { 'Content-Type': 'text/plain' })
      return res.end('500 - Internal Error')
    }
    res.writeHead(responseCode, { 'Content-Type': contentType })
    res.end(data)
  })
}

const port = process.env.PORT || 3000

app.get('/', (req, res) => {
  console.log('Calling "/home" on the Node.js server.')
  serveStaticFile(res, '/index.html', 'text/html')

})

app.get('/calculation', (request, response) => {
	console.log('Calling "/add-two-integers" on the Node.js server.')
	var inputs = url.parse(request.url, true).query
  //Using this we can see the values that the site sent us, and their names
  console.log(inputs)

  //Here are the variables; if need to add more follow examples
  let age = parseInt(inputs.age)
	let height = parseInt(inputs.height)
	let weight = parseInt(inputs.weight)
  let blood = inputs.blood
  let disease = parseInt(inputs.disease)

  //Example of calucation; should be replaced with functions eventually
  let sum = height + weight

  //We return our results as an object, namdes of value returned need to be comunicated
  let results = {"sum": sum.toString(),"age":  age,"blood":  blood,"dis":  disease}
	response.type('text/plain')
	response.json(results)
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

