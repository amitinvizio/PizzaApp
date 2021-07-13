const multer = require('multer')
const path = require('path')
const responseHelper = require('./helper/responseHelper')

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
        const name = req.file.filename
        const size = req.body.size
        const price = req.body.price
        const image = req.file.destination + req.file.filename
        let productObj = { name, size, price, image }

        console.log(productObj)

      });
    } catch (exception) {
      log('productController::store', exception)
    }
  }
}