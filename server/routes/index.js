var express = require('express')
var cors = require('cors')
const axios = require('axios')
const dotenv = require('dotenv').config()

var router = express.Router()
router.use(cors())
var index = require('../controller/indexController')
var defaultV = require('../controller/defaultController')
var middleware = require('./middleware/validators')

router.get('/', (req, res) => {
  let jwtToken = process.env.TOKEN
  axios.get('http://localhost:3001/product')
  .then((response) => {
    res.render('index', {
      title: 'Pizza App Admin',
      products: response.data.data,
      token: jwtToken
    })
  })
  .catch(error => {
    res.send(error)
  })
})

router.get('/addProduct', (req, res) => {
  axios.post('http://localhost:3001/login', {
    headers: {
      contentType: 'application/json',
      authorization: localStorage.getItem('token')
    }
  })
  .then((response) => {
    res.render('newProduct', {
      title: 'Add New Product',
    })
  })
  .catch(error => { res.send(error) })
  
})

router.get('/login', (req, res) => {
  res.render('login', {
    title: 'Login Pizza Admin'
  })
})

router.post('/register', [ middleware.registerModuleValidaiton ], index.register)

// user login api
router.post('/login', [ middleware.loginModuleValidaiton ], index.login)


// router.post('/logout', [ middleware.isUserLogin ], index.logout)

module.exports = router
