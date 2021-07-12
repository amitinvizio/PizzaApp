var express = require('express')
var cors = require('cors')

var router = express.Router()
router.use(cors())
var index = require('../controller/indexController')
var defaultV = require('../controller/defaultController')
var middleware = require('./middleware/validators')

router.post('/register', [ middleware.registerModuleValidaiton ], index.register)

// user login api
router.post('/login', [ middleware.loginModuleValidaiton ], index.login)

router.get('/test', index.test)

module.exports = router
