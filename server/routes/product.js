var express = require('express')
var cors = require('cors')
const productController = require('../controller/productController')
var middleware = require('./middleware/validators')

var router = express.Router()
router.use(cors())

router.post('/', [ middleware.isUserLogin ], productController.store)
router.patch('/:id', [ middleware.isUserLogin ], productController.updateProduct)
router.get('/', productController.getAllProductList)
router.get('/:id', productController.getProductListByID)
router.delete('/:id', [ middleware.isUserLogin ], productController.deleteProductByID)

module.exports = router