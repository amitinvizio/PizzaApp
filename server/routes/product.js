var express = require('express')
var cors = require('cors')
const productController = require('../controller/productController')
var middleware = require('./middleware/validators')

var router = express.Router()
router.use(cors())

router.post('/', [ middleware.isUserLogin ], productController.store)
router.patch('/:id', [ middleware.isUserLogin ], productController.updateProduct)
router.get('/', [ middleware.isUserLogin ], productController.getAllProductList)

module.exports = router