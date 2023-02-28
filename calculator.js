const express = require('express')
const cors = require('cors')
const url = require('url')

const app = express()
app.use(cors());

const port = process.env.PORT || 3000

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

