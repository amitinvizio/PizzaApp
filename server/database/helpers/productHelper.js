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
  },

  getAllProduct: async () => {
    try {
      let getProduct = await product.findAll();
      if (getProduct) {
        return getProduct
      } else {
        return null
      }
    } catch (exception) {
      log('productHelper:getAllProduct', exception)
      return false
    }
  },

  getProductListByID: async (query) => {
    try {
      let getProduct = await product.findOne({ where: { uniqueId: query } })
      if (getProduct) {
        return getProduct
      } else {
        return null
      }
    } catch (exception) {
      log('productHelper:getProductListByID', exception)
    }
  },

  deleteProductByID: async (query) => {
    try {
      let deleteProduct = await product.destroy({ where: { id: query } })
      if (deleteProduct) {
        return deleteProduct
      } else {
        return null
      }
    } catch (exception) {
      log('productHelper:deleteProductByID', exception)
    }
  }
}