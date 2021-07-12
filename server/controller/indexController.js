const passport = require('passport')
const jwt = require('jsonwebtoken')
const commonHelper = require('./helper/commonHelper')
const { query } = require('express-validator')
const userHelper = require('../database/helpers/userHelper')
const { cli } = require('winston/lib/winston/config')
const { Op } = require('sequelize')
const bcrypt = require('bcrypt')
const responseHelper = require('./helper/responseHelper')
const moment = require('moment')
const saltRounds = 10

module.exports = {
  register: (req, res, next) => {
    passport.authenticate(
      'local-signup',
      {
        session: false,
        failureMessage: true,
        failureFlash: true
      },
      async (error, user, info) => {
        try {
          var successMessage = ''
          if (error || !user || info) {
            var message = error ? null : info
            return res.status(400).send(responseHelper.error(400, message))
          } else {
            successMessage = user.message
          }
          return res.status(200).send(responseHelper.successWithUpdateMessage(successMessage))
        } catch (exception) {
          log('indexController:register', exception)
          return res.status(500).send(responseHelper.error(500, exception))
        }
      }
    )(req, res, next)
  },

  //login along with jwt token generation
  login: (req, res, next) => {
    passport.authenticate(
      'local-login',
      {
        session: false,
        failureMessage: true,
        failureFlash: true
      },
      async (error, user, info) => {
        try {
          if (error || !user || info) {
            var message = error ? null : info
            return res.status(400).send(responseHelper.error(400, message))
          }
          //create jwt token for the logged in user/admin
          //jwt session generation
          let token = jwt.sign(
            {
              userId: user.userCode,
              email: user.email,
              type: user.type
            },
            process.env.SECRET,
            {
              expiresIn: process.env.tokenLife
            }
          )
          log(`Login JWT Token-${user.email}-${user.type} `, token)
          return res.status(200).send(responseHelper.successWithResult(200, 'Login Successful', token))
        } catch (exception) {
          log('indexController:login', exception)
          return res.status(500).send(responseHelper.error(500, exception))
        }
      }
    )(req, res, next)
  },

  test: (req, res) => {
    console.log(`GET with Test Method`)
    log(`Hello World`, req)
    res.send(`Hello World`)
  }
}
