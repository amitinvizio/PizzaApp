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
  },

  updateProduct: async (data, query) => {
    try {
      let updateProduct = await product.update(data, { where: query })
      if (updateProduct) {
        return updateProduct
      }
    } catch (exception) {
      log('productHelper: productStore', exception)
      return false
    }
  }
}