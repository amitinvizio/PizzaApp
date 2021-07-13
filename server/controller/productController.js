const multer = require('multer')
const path = require('path')
const responseHelper = require('./helper/responseHelper')
const productHelper = require('../database/helpers/productHelper')

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads/'),
  filename: (req, file, cb) => {
    const uniqueName = `${Date.now()}-${Math.round(Math.random() * 1E9)}${path.extname(file.originalname)}`
    cb(null, uniqueName)
  }
})

const handleMultipartData = multer({ storage, limit: { fileSize: 1000000 * 5 } }).single('image')

module.exports = {
  store: async (req, res) => {
    try {
      handleMultipartData(req, res, async (err) => {
        if (err) {
          return res.status(500).send(responseHelper.error(500, err.message))
        }
        const filePath = req.file.path
        const name = req.body.name
        const size = req.body.size
        const price = req.body.price
        const image = req.file.destination + req.file.filename
        let productObj = { name, size, price, image }

        //console.log(productObj)

        let productStored = await productHelper.productStore(productObj)

        if (productStored) {
          return res.status(200).send(responseHelper.successWithResult(200, null, 'Product Inserted Successfully'))
        } else {
          return res.status(400).send(responseHelper.error(400, 'Something went wrong while creating product'))
        }

      });
    } catch (exception) {
      log('productController::store', exception)
    }
  },

  updateProduct: async (req, res) => {
    try {
      handleMultipartData(req, res, async (err) => {
        if (err) {
          return res.status(500).send(responseHelper.error(500, err.message))
        }

        const name = req.body.name
        const size = req.body.size
        const price = req.body.price
        let data = { name, size, price }
        
        if (req.file) {
          const filePath = req.file.path
          const image = req.file.destination + req.file.filename
          data = { ...data, image }
        }
        
        let id = req.params
        let updatedProduct = await productHelper.updateProduct(data, id)

        if (updatedProduct) {
          return res.status(200).send(responseHelper.successWithUpdateMessage(updatedProduct))
        } else {
          return res.status(400).send(responseHelper.error(400, 'Something went wrong while updating product'))
        }
      });
    } catch (exception) {
      log('productController::updateProduct', exception)
    }
  },
  
  getAllProductList: async (req, res) => {
    try {
      let getProduct = await productHelper.getAllProduct()
      if(getProduct){
        return res.status(200).send(responseHelper.successWithResult(200, 'Product List', getProduct))
      }else{
        return res.status(400).send(responseHelper.error(400, 'Something went wrong while fetching data from database'))
      }
    } catch (exception) {
      log('productController::getAllProductList', exception)
    }
  }

}