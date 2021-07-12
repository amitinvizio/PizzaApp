const user = require('../models').User
const { query } = require('express-validator')
const { Op, Sequelize } = require('sequelize')
let sequelize = Sequelize
module.exports = {
  //check user by email id
  checkUser: async (email) => {
    try {
      let userDb = await user.findOne({
        where: {
          email: email
        }
      })
      if (userDb === null) {
        return true
      } else {
        return false
      }
    } catch (exception) {
      log('userHelper:checkUser', exception)
      return false
    }
  },

  //create user
  /**
     * @param {String} email 
     * @param {String} password 
     * @param {String} userCode 
     * @param {Object} role
     */

  createUser: async (email, password, role, firstName, lastName, username) => {
    try {
      const createUsers = await user.create({
        email: email,
        password: password,
        firstName,
        lastName,
        username,
        type: role
      })
      if (createUsers) {
        return true
      } else {
        return false
      }
    } catch (exception) {
      log('userHelper:createUser', exception)
      return false
    }
  },

  createBulkUser: async (userList) => {
    try {
      const createUsers = await user.bulkCreate(userList)
      if (createUsers) {
        return true
      } else {
        return false
      }
    } catch (exception) {
      log('userHelper:createBulkUser', exception)
      return false
    }
  },

  //  check usercode count
  checkUserCount: async (userCode) => {
    try {
      let userList = await user.findOne({
        where: {
          userCode: {
            [Op.like]: userCode + '%'
          }
        },
        order: [ [ sequelize.cast(sequelize.fn('substring', sequelize.col('userCode'), 4), 'INT'), 'DESC' ] ]
      })
      return userList
    } catch (exception) {
      log('userHelper:checkUserCount', exception)
      return false
    }
  },

  //get user by email
  getUserByEmail: async (email) => {
    try {
      let getUser = await user.findOne({
        where: {
          email: email
        }
      })
      if (getUser) {
        return getUser
      } else {
        return null
      }
    } catch (exception) {
      log('userHelper:getUserByEmail', exception)
      return false
    }
  },

  //get user by key and value
  getUser: async (query) => {
    try {
      let getUser = await user.findOne({
        where: query
      })
      if (getUser) {
        return getUser
      } else {
        return null
      }
    } catch (exception) {
      log('userHelper:getUser', exception)
      return false
    }
  },

  //update user by key and value
  updateUser: async (query, updateValue) => {
    try {
      let updatedUser = await user.update(updateValue, { where: query })
      return updatedUser
    } catch (exception) {
      log('userHelper:updateUser', exception)
      return false
    }
  },

  //get user by condition
  getUsersByQuery: async (query) => {
    try {
      let getUsers = await user.findAll({ where: query, include: [ { model: models.Client, as: 'client', attributes: [ 'name' ] } ] })
      return getUsers
    } catch (exception) {
      log('userHelper:getUserByQuery', exception)
      return false
    }
  },

  userSoftDelete: async (query) => {
    try {
      let softDelete = await user.update({ deletedAt: Sequelize.literal('CURRENT_TIMESTAMP') }, { where: query })
      return softDelete
    } catch (exception) {
      log('userHelper:userSoftDelete', exception)
      return false
    }
  },

  userDelete: async (query) => {
    try {
      let hardDelete = await user.destroy({ where: query })
      return hardDelete
    } catch (exception) {
      log('userHelper:userDelete', exception)
      return false
    }
  }
}
