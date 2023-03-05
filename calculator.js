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

app.get('/ping', (req, res) => {
  console.log('Calling "/pint" on the Node.js server.')
  res.type('text/plain')
	res.json('pong')
})

app.get('/calculation', (request, response) => {
	console.log('Calling "/calculation" on the Node.js server.')
	var inputs = url.parse(request.url, true).query
  //Using this we can see the values that the site sent us, and their names
  console.log(inputs)

  //Here are the variables; if need to add more follow examples
  let age = parseInt(inputs.age)
	let height = parseInt(inputs.height)
	let weight = parseInt(inputs.weight)
  let blood = parseInt(inputs.blood)
  let disease = parseInt(inputs.disease)

  //Example of calucation; should be replaced with functions eventually
  let sum = height + weight
  let agePoints = calcAge(age)
  let bmiPoints = calcBmi(height, weight)
  let bpPoints = calcBP(blood)
  let diseasePoints = calcDisease(disease)

  //We return our results as an object, namdes of value returned need to be comunicated
  let results = {"sum": sum.toString(),"age":  agePoints,"BMI":  bmiPoints,"blood":  bpPoints,"dis":  diseasePoints}
	response.type('text/plain')
	response.json(results)
})

function calcAge(age){
  if (age < 30) {
    return 0
  } else if (age < 45) {
    return 10
  } else if (age < 60) {
    return 20
  } else {
    return 30
  }
}

function calcDisease(disease) {
  if (disease == 0) {
    return 0
  } else if (disease == 1) {
    return 10
  } else if (disease == 2) {
    return 20
  } else {
    return 30
  }
}

function calcBmi(height, weight){
  var bmi = (weight/(height^2))
  if ((height > 0) && (height < 3))
  {
    if ((weight > 0) && (weight < 315))
    {
      if (bmi < 18.5) {
        return "Error: Invalid BMI"
      } else if (bmi < 24.9) {
        return 0
      } else if (bmi < 29.9) {
        return 30
      } else if (bmi < 34.9) {
        return 75
      } else {
        return "Error: Invalid BMI"
      }
    } else {
      return "Error: Invalid Weight"
    }
  } else {
    return "Error: Invalid Height"
  }
}

function calcBP(bpStage) {
  if (bpStage == 1) {
    return 0
  }
  else if (bpStage == 2) {
    return 15
  }
  else if (bpStage == 3){
    return 30
  }
  else if (bpStage == 4){
    return 75
  }
  else if (bpStage == 5){
    return 100
  }
}

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

