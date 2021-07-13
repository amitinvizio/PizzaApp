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
      handleMultipartData(req, res, (err) => {
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

        let productStored = productHelper.productStore(productObj)

        if(productStored){
          return res.status(200).send(responseHelper.successWithResult(200, null,'Product Inserted Successfully'))
        }else{
          return res.status(400).send(responseHelper.error(400, 'Something went wrong while creating product'))
        }

      });
    } catch (exception) {
      log('productController::store', exception)
    }
  }
}