const user = require('../../database/models/user')
const userDBHelper = require('../../database/helpers/userHelper')
const commonDBHelper = require('../../database/helpers/commonHelper')
const jwt = require('jsonwebtoken')
const { check, validationResult } = require('express-validator')
const { query } = require('express')
const commonHelper = require('../../controller/helper/commonHelper')
module.exports = {
  //validation middleware starts here login register fields validation
  clientModuleValidation: async (req, res, next) => {
    try {
      log('client:req Body', JSON.stringify(req.body))
      await check('email').optional({ checkFalsy: true }).not().isEmpty().withMessage('Email should not be blank').trim().escape().isEmail().withMessage('Enter valid email address.').run(req)
      await check('name')
        .not()
        .isEmpty()
        .withMessage('Name should not be blank')
        .trim()
        .escape()
        .custom((value) => /^[a-zA-Z ]*$/.test(value))
        .withMessage('Only Characters are allowed.')
        .isLength(3)
        .withMessage('Minimum name length should be 3 atleast')
        .run(req)
      await check('licenseStartDate').optional({ checkFalsy: true }).trim().isDate().withMessage('Must be a valid Date YYYY-MM-DD').run(req)
      await check('phoneNo')
        .optional({ checkFalsy: true })
        .not()
        .isEmpty()
        .withMessage('Phone No should not be blank')
        .isNumeric()
        .isLength({ min: 8, max: 15 })
        .withMessage('Invalid Telephone number')
        .run(req)
      await check('licenseEndDate')
        .optional({ checkFalsy: true })
        .trim()
        .isDate()
        .withMessage('Must be a valid Date YYYY-MM-DD')
        .custom((value, { req }) => {
          // Fetch year, month and day of respective dates
          const [ sy, sm, sd ] = req.body.licenseStartDate.split('-')
          const [ ey, em, ed ] = value.split('-')

          // Constructing dates from given string date input
          const startDate = new Date(sy, sm, sd)
          const endDate = new Date(ey, em, ed)

          // Validate end date so that it must after start date
          if (endDate <= startDate) {
            throw new Error('End date of license must be after start date')
          }
          return true
        })
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

  //company module validation
  companyValidation: async (req, res, next) => {
    try {
      log('CompanyForm:req Body', JSON.stringify(req.body))
      await check('name').not().isEmpty().withMessage('Name should not be blank').run(req)
      // await check('address').optional({ checkFalsy: true }).not().isEmpty().withMessage('Address should not be blank').run(req)
      // await check('regNo').optional({ checkFalsy: true }).not().isEmpty().withMessage('Registration No should not be blank').run(req)
      await check('pan').optional({ checkFalsy: true }).custom((value) => /^([a-zA-Z]){5}([0-9]){4}([a-zA-Z]){1}?$/.test(value)).withMessage('Not a valid Pan No.').run(req)
      // await check('tds').optional({ checkFalsy: true }).not().isEmpty().withMessage('TDS should not be blank').run(req)
      // await check('localST').optional({ checkFalsy: true }).not().isEmpty().withMessage('LocalST should not be blank').run(req)
      // await check('centralST').optional({ checkFalsy: true }).not().isEmpty().withMessage('centralST should not be blank').run(req)
      await check('phone')
        .optional({ checkFalsy: true })
        .not()
        .isEmpty()
        .withMessage('Phone No should not be blank')
        .custom((value) => /^(?:(?:\+|0{0,2})91(\s*[\ -]\s*)?|[0]?)?[789]\d{9}|(\d[ -]?){10}\d$/.test(value))
        .withMessage('Not a valid phone no')
        .run(req)
      await check('serviceTax')
        .optional({ checkFalsy: true })
        .not()
        .isEmpty()
        .withMessage('Service Tax should not be blank')
        .custom((value) => /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/.test(value))
        .withMessage('Not a valid GST No')
        .run(req)
      await check('email').optional({ checkFalsy: true }).not().isEmpty().withMessage('Email should not be blank').trim().escape().isEmail().withMessage('Enter valid email address.').run(req)
      await check('webAddress')
        .optional({ checkFalsy: true })
        .not()
        .isEmpty()
        .withMessage('web address should not be blank')
        .custom((value) =>
          /https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,}/.test(
            value
          )
        )
        .withMessage('Should be a valid web address')
        .run(req)
      await check('shareAC').optional({ checkFalsy: true }).not().isEmpty().withMessage('Share AC should not be blank').run(req)
      await check('shareProduct').optional({ checkFalsy: true }).not().isEmpty().withMessage('Share Product should not be blank').run(req)
      var errors = validationResult(req)
      //("errors validation", errors);
      if (!errors.isEmpty()) {
        return res.status(400).send(responseHelper.error(400, errors.array()[0].param + ' : ' + errors.array()[0].msg))
      } else {
        next()
      }
    } catch (error) {
      log('validators:companyValidation', exception)
      return res.status(500).send(responseHelper.error(500, 'Server Error occured'))
    }
  },

  //for login validation
  isSuperAdminLogin: (req, res, next) => {
    try {
      let token = req.headers.authorization || req.body.token
      jwt.verify(token, process.env.SECRET, async function (err, decoded) {
        if (err) {
          return res.status(401).send(responseHelper.error(401, 'please login again.'))
        } else {
          //("user decoded", decoded);
          log(`JWT token Verified-${decoded.email}-${decoded.type}`, token)
          let role = decoded.type
          let userObject = ''
          let uniqueId = ''
          if (role === 'SuperAdmin') {
            let query = { userCode: decoded.userId }
            userObject = await userDBHelper.getUser(query)
            if (userObject == false) {
              return res.status(422).send(responseHelper.error(422, 'Something went wrong while fetching Admin from given token'))
            } else if (userObject) {
              let { licenseStartDate, licenseEndDate } = userObject.client
              let checkValidity = await commonHelper.checkLicenseValidity(licenseStartDate, licenseEndDate)
              if (checkValidity.status === false) {
                return res.status(400).send(responseHelper.error(400, checkValidity.message))
              }
            } else if (userObject == null) {
              return res.status(422).send(responseHelper.error(422, 'You dont have access rights'))
            }
          } else {
            return res.status(422).send(responseHelper.error(422, 'You dont have access rights'))
          }
          req.role = userObject.type
          req.user = userObject
          next()
        }
      })
      //  next();
    } catch (error) {
      //("err", error);
      log('validators:isSuperAdminLogin', exception)
      return res.status(500).send(responseHelper.error(500, 'Server Error occured'))
    }
  },

  isSuperSuperAdminLogin: (req, res, next) => {
    try {
      let token = req.headers.authorization || req.body.token
      jwt.verify(token, process.env.SECRET, async function (err, decoded) {
        if (err) {
          return res.status(401).send(responseHelper.error(401, 'please login again.'))
        } else {
          //("user decoded", decoded);
          log(`JWT token Verified-${decoded.email}-${decoded.type}`, token)
          let role = decoded.type
          let userObject = ''
          let uniqueId = ''
          if (role === 'SuperSuperAdmin') {
            let query = { userCode: decoded.userId }
            userObject = await userDBHelper.getUser(query)
            if (userObject === false) {
              return res.status(422).send(responseHelper.error(422, 'Something went wrong while fetching Admin from given token'))
            } else if (userObject === null) {
              return res.status(422).send(responseHelper.error(422, 'You dont have access rights'))
            }
          } else {
            return res.status(422).send(responseHelper.error(422, 'You dont have access rights'))
          }
          req.role = userObject.type
          req.user = userObject
          next()
        }
      })
      //  next();
    } catch (error) {
      //("err", error);
      log('validators:isSuperAdminLogin', exception)
      return res.status(500).send(responseHelper.error(500, 'Server Error occured'))
    }
  },

  isUserLogin: (req, res, next) => {
    try {
      let token = req.headers.authorization || req.body.token
      jwt.verify(token, process.env.SECRET, async function (err, decoded) {
        if (err) {
          return res.status(401).send(responseHelper.error(401, 'please login again.'))
        } else {
          //("user decoded", decoded);
          log(`JWT token Verified-${decoded.email}-${decoded.type}`, token)
          let query = { userCode: decoded.userId }
          let userObject = await userDBHelper.getUser(query)
          if (userObject == false) {
            return res.status(422).send(responseHelper.error(422, 'Something went wrong while fetching Admin from given token'))
          } else if (userObject && userObject.client) {
            let { licenseStartDate, licenseEndDate } = userObject.client
            let checkValidity = await commonHelper.checkLicenseValidity(licenseStartDate, licenseEndDate)
            if (checkValidity.status === false) {
              return res.status(400).send(responseHelper.error(400, checkValidity.message))
            }
          } else if (userObject == null) {
            return res.status(422).send(responseHelper.error(422, 'You dont have access rights'))
          }
          req.role = userObject.type
          req.user = userObject
          next()
        }
      })
      //  next();
    } catch (error) {
      //("err", error);
      log('validators:isUserLogin', exception)
      return res.status(500).send(responseHelper.error(500, 'Server Error occured'))
    }
  },

  isCompanyCode: async (req, res, next) => {
    try {
      let requestMethod = req.method

      let clientId = req.user.clientId

      let { companyCode } = requestMethod === 'GET' ? req.query : req.body
      if (!companyCode) {
        return res.status(500).send(responseHelper.error(500, 'Company Code is required'))
      }
      let company = await commonDBHelper.getCompanyDetails(companyCode)

      if (company === false) {
        return res.status(500).send(responseHelper.error(500, 'error in retrieving company code'))
      } else if (company.length === 0) {
        return res.status(500).send(responseHelper.error(500, 'No company found with given company code'))
      } else if (company[0].clientId !== clientId) {
        return res.status(500).send(responseHelper.error(500, 'You dont have access rights to  this Company'))
      } else {
        req.company = company[0]
        next()
      }
    } catch (error) {
      //("err", error);
      log('validators:isCompanyCode', exception)
      return res.status(500).send(responseHelper.error(500, 'Server Error occured'))
    }
  },

  isValidUser: async (req, res, next) => {
    try {
      let token = req.headers.authorization || req.body.token
      let role = req.body.role
      let validRole = ''
      if (role === 'A0001') {
        validRole = 'SuperAdmin'
      } else if (role === 'SA0001') {
        validRole = 'SuperSuperAdmin'
      } else {
        validRole = 'others'
      }
      jwt.verify(token, process.env.SECRET, async function (err, decoded) {
        if (err) {
          return res.status(401).send(responseHelper.error(401, 'please login again.'))
        } else {
          //("user decoded", decoded);
          log(`JWT token Verified-${decoded.email}-${decoded.type}`, token)
          let query = { userCode: decoded.userId }
          let userObject = await userDBHelper.getUser(query)
          if (userObject == false) {
            return res.status(422).send(responseHelper.error(422, 'Something went wrong while fetching User from given token'))
          } else if (userObject == null) {
            return res.status(422).send(responseHelper.error(422, 'You dont have access rights'))
          }
          req.role = userObject.type
          req.user = userObject

          if (validRole === 'others') {
            if (userObject.type === 'SuperSuperAdmin') {
              return res.status(422).send(responseHelper.error(422, 'You dont have access rights'))
            } else {
              next()
            }
          } else {
            if (userObject.type === validRole) {
              next()
            } else {
              return res.status(422).send(responseHelper.error(422, 'You dont have access rights'))
            }
          }
        }
      })
    } catch (error) {
      //("err", error);
      log('validators:isValidUser', exception)
      return res.status(500).send(responseHelper.error(500, 'Server Error occured'))
    }
  },

  isCompanyAllowed: async (req, res, next) => {
    try {
      let { role, user } = req
      let requestMethod = req.method
      let clientId = user.clientId
      let companyCode = requestMethod === 'GET' ? req.query.companyCode : req.body.companyCode

      if (role !== 'SuperAdmin') {
        let userCode = user.uniqueId
        let query = { deletedAt: null, userId: userCode, allowedModules: companyCode }
        let roleMapped = await commonDBHelper.getRoleMappings(query)
        if (roleMapped === null) {
          return res.status(401).send(responseHelper.error(401, 'No Access Rights for given company code'))
        } else if (roleMapped === 0) {
          return res.status(500).send(responseHelper.error(500, 'Something went wrong while accesing allowed modules '))
        } else {
          if (requestMethod === 'GET') {
            if (roleMapped.read === 0) {
              return res.status(401).send(responseHelper.error(401, 'No Read Access Rights'))
            }
            next()
          } else if (requestMethod === 'POST') {
            if (roleMapped.create === 0) {
              return res.status(401).send(responseHelper.error(401, 'No Create Access Rights'))
            }
            next()
          } else if (requestMethod === 'PATCH') {
            if (roleMapped.edit === 0) {
              return res.status(401).send(responseHelper.error(401, 'No Update Access Rights'))
            }
            next()
          } else {
            if (roleMapped.delete === 0) {
              return res.status(401).send(responseHelper.error(401, 'No Delete Access Rights'))
            }
            next()
          }
        }
      } else {
        let getCompany = await commonDBHelper.getCompanies({ companyCode })
        if (getCompany.clientId !== clientId) {
          return res.status(401).send(responseHelper.error(401, 'No Access for given company code'))
        }
        next()
      }
    } catch (error) {
      log('validators:isCompanyAllowed', error)
      return res.status(500).send(responseHelper.error(500, 'Server Error occured'))
    }
  },

  isCompanyCreationAllowed: async (req, res, next) => {
    try {
      let { role, user } = req
      if (role !== 'SuperAdmin') {
        let userCode = user.uniqueId
        let requestMethod = req.method
        let companyCode = 'company'

        let query = { deletedAt: null, userId: userCode, allowedModules: companyCode }
        let roleMapped = await commonDBHelper.getRoleMappings(query)
        if (roleMapped === null) {
          return res.status(401).send(responseHelper.error(401, 'No Access Rights for company creation '))
        } else if (roleMapped === false) {
          return res.status(500).send(responseHelper.error(500, 'Something went wrong while accesing allowed modules '))
        } else {
          if (requestMethod === 'GET') {
            if (roleMapped.read === 0) {
              return res.status(401).send(responseHelper.error(401, 'No Read Access Rights'))
            }
            next()
          } else if (requestMethod === 'POST') {
            if (roleMapped.create === 0) {
              return res.status(401).send(responseHelper.error(401, 'No Create Access Rights'))
            }
            next()
          } else if (requestMethod === 'PATCH') {
            if (roleMapped.edit === 0) {
              return res.status(401).send(responseHelper.error(401, 'No Update Access Rights'))
            }
            next()
          } else {
            if (roleMapped.delete === 0) {
              return res.status(401).send(responseHelper.error(401, 'No Delete Access Rights'))
            }
            next()
          }
        }
      } else {
        next()
      }
    } catch (error) {
      log('validators:isCompanyCreationAllowed', error)
      return res.status(500).send(responseHelper.error(500, 'Server Error occured'))
    }
  }
}
