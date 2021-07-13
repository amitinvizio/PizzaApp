const product = require('../models').Product

module.exports = {
  productStore: async (query) => {
    try {
      let createdProduct = await product.create(query)
      if (createdProduct) {
        return createdProduct
      } else {
        return false
      }
    } catch (exception) {
      log('productHelper: productStore', exception)
      return false
    }
  }
}