var express = require('express')
var cors = require('cors')
const productController = require('../controller/productController')
var middleware = require('./middleware/validators')

var router = express.Router()
router.use(cors())

router.post('/', [ middleware.isUserLogin , middleware.isProductValid ], productController.store)

module.exports = router