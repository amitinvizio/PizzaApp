let commonHelper = require('./commonHelper')
module.exports = {
  createDefaultValue: async () => {
    try {
      //creating group master
      let groupMasterList = await commonHelper.createGroupMasterList(companyCode)
      let groupMaster = await groupMasterHelper.createBulkGroupMaster(groupMasterList)

      let categoryMasterList = await commonHelper.createCategoryMasterList(companyCode)
      let categoryMaster = await categoryMasterHelper.createBulkCategoryMaster(categoryMasterList)

      // let itemMasterList = await commonHelper.create
    } catch (exception) {}
  },

  checkValueExist: async (array, value) => {
    try {
      return array.some(function (el) {
        return el.accountCode === value
      })
    } catch (error) {
      log('defaultValueHelper:checkValueExist ', error)
    }
  }
}
