const companies = require('../models').Company
const user = require('../models').User
const companyMapping = require('../models').CompanyMapping
const userRoleMapping = require('../models').UserRoleMapping
const rojmelDb = require('../models').Rojmel
const client = require('../models').Client
const ledger = require('../models').LedgerYearMaster
const { Op, Sequelize } = require('sequelize')
const { query } = require('express-validator')

module.exports = {
  getUser: async (userCode) => {
    try {
      let users = await user.findOne({
        where: {
          deletedAt: null,
          userCode: userCode
        }
      })
      return users
    } catch (exception) {
      log('commonDbHelper:getUser', exception)
      return false
    }
  },
}
