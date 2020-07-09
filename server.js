const express = require('express')
const cors = require('cors')
const jwt = require('jsonwebtoken')
const fs = require('fs')
const bodyParser = require('body-parser')
const port = 4000
const app = express()

app.use(cors())
app.use(bodyParser.json())

app.get('/', (req, res) => {
  res.json({
    message: 'Welcome to the API.'
  })
})

//REGISTER ENDPOINT
app.post('/register', (req, res) => {
  if (req.body) {
    var user = {
      name: req.body.name,
      email: req.body.email,
      password: req.body.password
    }
    var data = JSON.stringify(user)
    var dbUserEmail = require('./db/user.json').email

    if (dbUserEmail === req.body.email) {
      res.sendStatus(400)
    } else {
      fs.writeFile('./db/user.json', data, err => {
        if (err) {
          console.log('the error was : ', err)
        } else {
          const token = jwt.sign({ user }, 'the_secret_key')
          res.json({
            token,
            name: user.name,
            email: user.email
          })
        }
      })
    }
  } else {
    res.sendStatus(400)
  }
})

//LOGIN ENDPOINT
app.post('/login', (req, res) => {
  const userDB = fs.readFileSync('./db/user.json')
  //userInfo becomes a javascript object
  const userInfo = JSON.parse(userDB)
  if (
    req.body &&
    req.body.email === userInfo.email &&
    req.body.password === userInfo.password
  ) {
    const token = jwt.sign({ userInfo }, 'the_secret_key')
    res.json({
      token,
      name: userInfo.name,
      email: userInfo.email
    })
  } else {
    res.sendStatus(400)
  }
})

//MIDDLEWARE
// function verifyToken(req, res, next) {
//   const bearerHeader = req.headers['authorization']
//   if (typeof bearerHeader !== undefined) {
//     const bearer = bearerHeader.split(' ')
//     const bearerToken = bearer[1]
//     req.token = bearerToken
//     next()
//   } else {
//     res.sendStatus(401)
//   }
// }

app.listen(port, () => {
  console.log('Server started on port 4000')
})
