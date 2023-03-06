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

  //Here are the variables
  let age = parseFloat(inputs.age)
	let height = parseFloat(inputs.height)
	let weight = parseFloat(inputs.weight)
  let blood = parseFloat(inputs.blood)
  let disease = parseFloat(inputs.disease)

  //Example of calucation; should be replaced with functions eventually
  let agePoints = calcAge(age)
  let bmiPoints = calcBmi(height, weight)
  let diseasePoints = calcDisease(disease)
  let bpPoints = calcBP(blood)
  let sum = (agePoints + bmiPoints + diseasePoints + bpPoints)
  let risk = calcRisk(sum)

  //We return our results as an object, namdes of value returned need to be comunicated
  let results = {"risk": risk,"age":  agePoints,"BMI":  bmiPoints,"blood":  bpPoints,"dis":  diseasePoints}
	response.type('text/plain')
	response.json(results)
})

function calcRisk(sum){
  if (!Number.isInteger(sum)){
    return "Error: Cannot Calculate Risk"
  } else if (sum <= 20) {
    return "low risk"
  } else if (sum <= 50) {
    return "moderate risk"
  } else if (sum <= 75) {
    return "high risk"
  } else if (sum > 0){
    return "uninsurable"
  } else {
    return "Error: Cannot Calculate Risk"
  }
}

function calcAge(age){
  if (!Number.isInteger(age)){
    return "Error: Invalid Age"
  } else if ((age < 30) && (age > 0)) {
    return 0
  } else if (age < 45) {
    return 10
  } else if (age < 60) {
    return 20
  } else if (age <= 120) {
    return 30
  } else {
    return "Error: Invalid Age"
  }
}

function calcDisease(disease) {
  if (((bpStage * 10) % 10) == 0){
    if (disease == 0) {
      return 0
    } else if (disease == 1) {
      return 10
    } else if (disease == 2) {
      return 20
    } else if (disease == 3) {
      return 30
    } else {
      return "Error: Invalid Family Disease Count"
    }
  } else {
    return "Error: Invalid Family Disease Count"
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
  if (((bpStage * 10) % 10) == 0){
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
    else {
      return "Error: Invalid Blood Pressure Stage"
    }
  } else {
    return "Error: Invalid Blood Pressure Stage"
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
