const user = require('../../database/models/user')
const userDBHelper = require('../../database/helpers/userHelper')
const commonDBHelper = require('../../database/helpers/commonHelper')
const jwt = require('jsonwebtoken')
const { check, validationResult } = require('express-validator')
const { query } = require('express')
const commonHelper = require('../../controller/helper/commonHelper')
module.exports = {
  registerModuleValidaiton: async (req, res, next) => {
    try {
      log('register:req Body', JSON.stringify(req.body))
      await check('email').not().isEmpty().withMessage('Email should not be blank').trim().escape().isEmail().withMessage('Enter valid email address.').run(req)
      await check('password')
        .not()
        .isEmpty()
        .withMessage('Password should not be blank')
        .trim()
        .escape()
        .isLength(3)
        .withMessage('Minimum password length should be 3 atleast')
        .custom((value) => !/\s/.test(value))
        .withMessage('No spaces are allowed in the password')
        .run(req)
      await check('role').not().isEmpty().withMessage('Role should not be blank').trim().escape().run(req)
      await check('firstName').optional({ checkFalsy: true }).not().isEmpty().withMessage('first name should not be empty').isAlpha().withMessage('Only alphabets allowed').run(req)
      await check('lastName').optional({ checkFalsy: true }).not().isEmpty().withMessage('last name should not be empty').isAlpha().withMessage('Only alphabets allowed').run(req)
      await check('username').optional({ checkFalsy: true }).not().isEmpty().withMessage('username should not be empty').isAlphanumeric().withMessage('Only alphabets and numbers allowed').run(req)

      var errors = validationResult(req)
      //("errors validation", errors);
      if (!errors.isEmpty()) {
        return res.status(400).send(responseHelper.error(400, errors.array()[0].param + ' : ' + errors.array()[0].msg))
      } else {
        next()
      }
    } catch (error) {
      return res.status(500).send(responseHelper.error(500, 'Server Error occured'))
    }
  },

  loginModuleValidaiton: async (req, res, next) => {
    try {
      log('login:req Body', JSON.stringify(req.body))
      await check('email').not().isEmpty().withMessage('Email should not be blank').trim().escape().isEmail().withMessage('Enter valid email address.').run(req)
      await check('password')
        .not()
        .isEmpty()
        .withMessage('Password should not be blank')
        .trim()
        .escape()
        .isLength(3)
        .withMessage('Minimum password length should be 3 atleast')
        .custom((value) => !/\s/.test(value))
        .withMessage('No spaces are allowed in the password')
        .run(req)
      var errors = validationResult(req)
      //("errors validation", errors);
      if (!errors.isEmpty()) {
        return res.status(400).send(responseHelper.error(400, errors.array()[0].param + ' : ' + errors.array()[0].msg))
      } else {
        next()
      }
    } catch (error) {
      return res.status(500).send(responseHelper.error(500, 'Server Error occured'))
    }
  },

  isUserLogin: (req, res, next) => {
    try {
      let token = req.headers.authorization || req.body.token
      console.log("Token :: ", token)
      jwt.verify(token, process.env.SECRET, async function (err, decoded) {
        if (err) {
          return res.status(401).send(responseHelper.error(401, 'please login again.'))
        } else {
          log(`JWT token Verified-${decoded.email}-${decoded.type}`, token)
          let query = { email: decoded.email }
          let userObject = await userDBHelper.getUser(query)
          if (userObject == false) {
            return res.status(422).send(responseHelper.error(422, 'Something went wrong while fetching Admin from given token'))
          } else if (userObject == null) {
            return res.status(422).send(responseHelper.error(422, 'You dont have access rights'))
          }
          req.role = userObject.type
          req.user = userObject
          next()
        }
      })
    } catch (exception) {
      log('validators:isUserLogin', exception)
      return res.status(500).send(responseHelper.error(500, 'Server Error occured'))
    }
  },

  // isProductValid: (req, res, next) => {
  //   try {
  //     console.log(req)
  //     next()
  //   } catch (exception) {
  //     log('validators:isProductValid', exception)
  //     return res.status(500).send(responseHelper.error(500, 'Server Error occured'))
  //   }
  // }
}
