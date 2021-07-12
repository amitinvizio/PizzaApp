const { check, validationResult } = require('express-validator')
const commonHelper = require('../../database/helpers/commonHelper')

module.exports = {
  commonMasterValidation: async (req, res, next) => {
    try {
      await check('name').not().isEmpty().withMessage('Name should not be blank').trim().isLength(2).withMessage('Minimum name length should be 3 atleast').run(req)
      await check('companyCode').not().isEmpty().withMessage('Company Code should not be blank').run(req)
      var errors = validationResult(req)
      //("errors validation", errors);
      if (!errors.isEmpty()) {
        return res.status(400).send(responseHelper.error(400, errors.array()[0].param + ' : ' + errors.array()[0].msg))
      } else {
        next()
      }
    } catch (error) {
      log('masterValidator:commonMasterValidation', error)
      return res.status(500).send(responseHelper.error(500, 'Server Error occured'))
    }
  },

  narrationMasterValidation: async (req, res, next) => {
    try {
      await check('name').not().isEmpty().withMessage('Name should not be blank').isLength({ min: 3, max: 200 }).withMessage('Minimum name length should be 3 atleast and maximum 200').run(req)
      await check('companyCode').not().isEmpty().withMessage('Company Code should not be blank').run(req)
      var errors = validationResult(req)
      //("errors validation", errors);
      if (!errors.isEmpty()) {
        return res.status(400).send(responseHelper.error(400, errors.array()[0].param + ' : ' + errors.array()[0].msg))
      } else {
        next()
      }
    } catch (error) {
      log('masterValidator:narrationMasterValidation', error)
      return res.status(500).send(responseHelper.error(500, 'Server Error occured'))
    }
  },

  groupMasterValidation: async (req, res, next) => {
    try {
      await check('cashSequence')
        .optional({ checkFalsy: true })
        .isAlphanumeric()
        .withMessage('Only AlphaNumeric are allowed.')
        .trim()
        .escape()
        .isLength(3)
        .withMessage('Minimum cashSequence length should be 3 atleast')
        .run(req)
      await check('type')
        .not()
        .isEmpty()
        .withMessage('Group type should not be blank')
        .isIn([ 'Trading Income', 'Liabilities', 'Assets', 'P&L Expenses', 'P&L Income', 'Trading Expenses', 'Trading Incomes' ])
        .withMessage('Given Group Type is not allowed')
        .run(req)
      await check('balanceSequence')
        .optional({ checkFalsy: true })
        .isAlphanumeric()
        .withMessage('Only AlphaNumeric are allowed.')
        .trim()
        .escape()
        .isLength(3)
        .withMessage('Minimum balSequence length should be 3 atleast')
        .run(req)
      var errors = validationResult(req)
      //("errors validation", errors);
      if (!errors.isEmpty()) {
        return res.status(400).send(responseHelper.error(400, errors.array()[0].param + ' : ' + errors.array()[0].msg))
      } else {
        next()
      }
    } catch (error) {
      log('masterValidator:groupMasterValidation', error)
      return res.status(500).send(responseHelper.error(500, 'Server Error occured'))
    }
  },

  salesmanMasterValidation: async (req, res, next) => {
    try {
      await check('address').optional({ checkFalsy: true }).isLength({ min: 5, max: 100 }).run(req)
      await check('telephoneNo').optional({ checkFalsy: true }).isNumeric().withMessage('Only number allowed').isLength({ min: 8, max: 15 }).run(req)

      var errors = validationResult(req)
      //("errors validation", errors);
      if (!errors.isEmpty()) {
        return res.status(400).send(responseHelper.error(400, errors.array()[0].param + ' : ' + errors.array()[0].msg))
      } else {
        next()
      }
    } catch (error) {
      log('masterValidator:salesman', error)
      return res.status(500).send(responseHelper.error(500, 'Server Error occured'))
    }
  },

  categoryMasterValidation: async (req, res, next) => {
    try {
      await check('avgMelting').not().isEmpty().withMessage('AverageMelting should not be blank').isFloat().withMessage('It should be a decimal value').run(req)
      var errors = validationResult(req)
      //("errors validation", errors);
      if (!errors.isEmpty()) {
        return res.status(400).send(responseHelper.error(400, errors.array()[0].param + ' : ' + errors.array()[0].msg))
      } else {
        next()
      }
    } catch (error) {
      log('masterValidator:categoryMaster', error)
      return res.status(500).send(responseHelper.error(500, 'Server Error occured'))
    }
  },

  itemMasterValidation: async (req, res, next) => {
    try {
      await check('categoryCode').not().isEmpty().withMessage('categoryCode should not be blank').isAlphanumeric().withMessage('only alphanumeric allowed').run(req)
      await check('avgMelting').optional({ checkFalsy: true }).isFloat().withMessage('It should be a decimal value').run(req)
      await check('meltingFrom').optional({ checkFalsy: true }).isFloat().withMessage('It should be a decimal value').run(req)
      await check('hTo').isFloat().optional({ checkFalsy: true }).withMessage('It should be a decimal value').run(req)

      var errors = validationResult(req)
      //("errors validation", errors);
      if (!errors.isEmpty()) {
        return res.status(400).send(responseHelper.error(400, errors.array()[0].param + ' : ' + errors.array()[0].msg))
      } else {
        next()
      }
    } catch (error) {
      log('masterValidator:itemMaster', error)
      return res.status(500).send(responseHelper.error(500, 'Server Error occured'))
    }
  },

  accountMasterValidation: async (req, res, next) => {
    try {
      await check('groupCode').not().isEmpty().withMessage('Group Code should not be blank').run(req)
      await check('contactPerson').optional({ checkFalsy: true }).run(req)
      await check('salesmanCode').optional({ checkFalsy: true }).matches(/^[a-zA-Z0-9-]+$/).withMessage('Invalid Salesman Code').run(req)
      await check('address').optional({ checkFalsy: true }).isLength({ min: 5, max: 100 }).run(req)
      await check('email').optional({ checkFalsy: true }).trim().escape().isEmail().withMessage('Enter valid email address.').run(req)
      await check('website').optional({ checkFalsy: true }).custom((value) => !/\s/.test(value)).withMessage('No spaces are allowed in the password').run(req)
      await check('pinCode').optional({ checkFalsy: true }).isNumeric().isLength({ min: 6, max: 6 }).withMessage('Invalid Pincode number').run(req)
      await check('smsMobileNumber').optional({ checkFalsy: true }).isNumeric().isLength({ min: 8, max: 15 }).withMessage('Invalid Mobile number').run(req)
      await check('telephoneNo').optional({ checkFalsy: true }).isNumeric().isLength({ min: 8, max: 15 }).withMessage('Invalid Telephone number').run(req)
      await check('collateralDays').optional({ checkFalsy: true }).isNumeric().isLength({ min: 1, max: 3 }).withMessage('Invalid collateral Days').run(req)
      await check('creditDays').optional({ checkFalsy: true }).isNumeric().isLength({ min: 1, max: 3 }).withMessage('Invalid credit Days').run(req)
      await check('interestRate').optional({ checkFalsy: true }).isFloat().withMessage('Invalid interest rate').run(req)
      await check('fineWgt').optional({ checkFalsy: true }).isFloat().withMessage('Invalid fine weight').run(req)
      await check('remarks').optional({ checkFalsy: true }).run(req)
      await check('serTax').optional({ checkFalsy: true }).isFloat().withMessage('Invalid Service tax').run(req)
      await check('panNo').optional({ checkFalsy: true }).matches(/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/).withMessage('Enter a valid pan number').run(req)
      await check('tdsNo').optional({ checkFalsy: true }).matches(/^[0-9A-Z]{10}$/).withMessage('Enter a valid TDS number').run(req)
      await check('gstNo').optional({ checkFalsy: true }).matches(/^[0-9A-Z]{15}$/).withMessage('Enter a valid GST number').run(req)
      await check('stateId').optional({ checkFalsy: true }).matches(/^[a-zA-Z0-9-]+$/).withMessage('Invalid State Id').run(req)
      await check('cityId').optional({ checkFalsy: true }).matches(/^[a-zA-Z0-9-]+$/).withMessage('Invalid City Id').run(req)
      await check('areaId').optional({ checkFalsy: true }).matches(/^[a-zA-Z0-9-]+$/).withMessage('Invalid Area Id').run(req)

      var errors = validationResult(req)
      //("errors validation", errors);
      if (!errors.isEmpty()) {
        return res.status(400).send(responseHelper.error(400, errors.array()[0].param + ' : ' + errors.array()[0].msg))
      } else {
        next()
      }
    } catch (error) {
      log('masterValidator:accountMaster', error)
      return res.status(500).send(responseHelper.error(500, 'Server Error occured'))
    }
  },

  smsMasterValidation: async (req, res, next) => {
    try {
      await check('companyCode').not().isEmpty().withMessage('Company Code should not be blank').run(req)
      await check('shortMessage').not().isEmpty().withMessage('short message should not be blank').isLength({ min: 5, max: 100 }).withMessage('invalid value for shortMessage').run(req)
      await check('tVariable').optional({ checkFalsy: true }).isLength({ min: 1, max: 20 }).withMessage('invalid value for tVariable').run(req)
      await check('type').optional({ checkFalsy: true }).isLength({ min: 1, max: 10 }).withMessage('invalid value for tVariable').run(req)
      await check('message').not().isEmpty().withMessage('message should not be blank').isLength({ min: 20, max: 100 }).withMessage('message value length is incorrect').run(req)

      var errors = validationResult(req)
      if (!errors.isEmpty()) {
        return res.status(400).send(responseHelper.error(400, errors.array()[0].param + ' : ' + errors.array()[0].msg))
      } else {
        next()
      }
    } catch (error) {
      log('masterValidator:smsMaster', error)
      return res.status(500).send(responseHelper.error(500, 'Server Error occured'))
    }
  },

  masterBookValidation: async (req, res, next) => {
    try {
      await check('pcs').optional({ checkFalsy: true }).isFloat().withMessage('Integer only allowed').run(req)
      await check('grWt').optional({ checkFalsy: true }).isFloat().withMessage('Integer only allowed').run(req)
      await check('netWt').optional({ checkFalsy: true }).isFloat().withMessage('Integer only allowed').run(req)
      await check('melting').optional({ checkFalsy: true }).isFloat().withMessage('Integer only allowed').run(req)
      await check('wastage').optional({ checkFalsy: true }).isFloat().withMessage('Integer only allowed').run(req)
      await check('fineWt').optional({ checkFalsy: true }).isFloat().withMessage('Integer only allowed').run(req)
      await check('amount').optional({ checkFalsy: true }).isFloat().withMessage('Integer only allowed').run(req)
      await check('stnWt').optional({ checkFalsy: true }).isFloat().withMessage('Integer only allowed').run(req)
      await check('stnRate').optional({ checkFalsy: true }).isFloat().withMessage('Integer only allowed').run(req)
      await check('pcsLabel').optional({ checkFalsy: true }).matches(/^[A-Za-z ]+$/).withMessage('Characters only allowed').run(req)
      await check('grWtLabel').optional({ checkFalsy: true }).matches(/^[A-Za-z ]+$/).withMessage('Characters only allowed').run(req)
      await check('netWtLabel').optional({ checkFalsy: true }).matches(/^[A-Za-z ]+$/).withMessage('Characters only allowed').run(req)
      await check('meltingLabel').optional({ checkFalsy: true }).matches(/^[A-Za-z ]+$/).withMessage('Characters only allowed').run(req)
      await check('wastageLabel').optional({ checkFalsy: true }).matches(/^[A-Za-z ]+$/).withMessage('Characters only allowed').run(req)
      await check('fineWtLabel').optional({ checkFalsy: true }).matches(/^[A-Za-z ]+$/).withMessage('Characters only allowed').run(req)
      await check('isFineWtLabelRequired').optional({ checkFalsy: true }).isIn([ 'Rojmel', 'Ledger', 'Both', 'No Total' ]).withMessage('only allowed type is Rojmel, Ledger, Both, No Total ').run(req)
      await check('amountLabel').optional({ checkFalsy: true }).matches(/^[A-Za-z ]+$/).withMessage('Characters only allowed').run(req)
      await check('stnWtLabel').optional({ checkFalsy: true }).matches(/^[A-Za-z ]+$/).withMessage('Characters only allowed').run(req)
      await check('stnRateLabel').optional({ checkFalsy: true }).matches(/^[A-Za-z ]+$/).withMessage('Characters only allowed').run(req)
      await check('isAmountTotalRequired').optional({ checkFalsy: true }).isIn([ 'Rojmel', 'Ledger', 'Both', 'No Total' ]).withMessage('only allowed type is Rojmel, Ledger, Both, No Total ').run(req)
      await check('isStnWtTotalRequired').optional({ checkFalsy: true }).isIn([ 'Rojmel', 'Ledger', 'Both', 'No Total' ]).withMessage('only allowed type is Rojmel, Ledger, Both, No Total ').run(req)
      await check('isGrWtTotalRequired').optional({ checkFalsy: true }).isIn([ 'Rojmel', 'Ledger', 'Both', 'No Total' ]).withMessage('only allowed type is Rojmel, Ledger, Both, No Total ').run(req)

      var errors = validationResult(req)
      if (!errors.isEmpty()) {
        return res.status(400).send(responseHelper.error(400, errors.array()[0].param + ' : ' + errors.array()[0].msg))
      } else {
        next()
      }
    } catch (error) {
      log('masterValidator:masterBook', error)
      return res.status(500).send(responseHelper.error(500, 'Server Error occured'))
    }
  },

  labelMasterValidation: async (req, res, next) => {
    try {
      await check('labelWidth').isFloat().withMessage('It should be a decimal value').run(req)
      await check('labelHeight').isFloat().withMessage('It should be a decimal value').run(req)
      await check('horizontalSpace').isFloat().withMessage('It should be a decimal value').run(req)
      await check('leftMargin').isFloat().withMessage('It should be a decimal value').run(req)
      await check('verticalSpace').isFloat().withMessage('It should be a decimal value').run(req)
      await check('topMargin').isFloat().withMessage('It should be a decimal value').run(req)
      await check('labelAcross').isFloat().withMessage('It should be a decimal value').run(req)
      await check('labelDown').isFloat().withMessage('It should be a decimal value').run(req)
      await check('printStyle').isIn([ 'WINDOWS', 'DOS' ]).withMessage('Given print style is not allowed').run(req)
      var errors = validationResult(req)
      if (!errors.isEmpty()) {
        return res.status(400).send(responseHelper.error(400, errors.array()[0].param + ' : ' + errors.array()[0].msg))
      } else {
        next()
      }
    } catch (error) {
      log('masterValidator:labelMaster', error)
      return res.status(500).send(responseHelper.error(500, 'Server Error occured'))
    }
  },

  // for modules validation
  isMasterModuleValidation: async (req, res, next) => {
    try {
      let { role, user } = req
      if (role !== 'SuperAdmin') {
        let userCode = user.uniqueId
        let query = { deletedAt: null, userId: userCode, allowedModules: 'Master' }
        let roleMapped = await commonHelper.getRoleMappings(query)
        if (roleMapped === null) {
          return res.status(401).send(responseHelper.error(401, 'No Master Access Rights'))
        } else if (roleMapped === false) {
          return res.status(500).send(responseHelper.error(500, 'Something went wrong while accesing allowed modules '))
        } else {
          let requestMethod = req.method
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
      //("err", error);
      log('validators:isMasterModuleValidation', exception)
      return res.status(500).send(responseHelper.error(500, 'Server Error occured'))
    }
  },

  isTransactionModuleValidation: async (req, res, next) => {
    try {
      let { role, user } = req
      if (role !== 'SuperAdmin') {
        let userCode = user.uniqueId
        let query = { deletedAt: null, userId: userCode, allowedModules: 'Transaction' }
        let roleMapped = await commonHelper.getRoleMappings(query)
        if (roleMapped === null) {
          return res.status(401).send(responseHelper.error(401, 'No Transaction Access Rights'))
        } else if (roleMapped === false) {
          return res.status(500).send(responseHelper.error(500, 'Something went wrong while accesing allowed modules '))
        } else {
          let requestMethod = req.method
          if (requestMethod === 'GET') {
            if (roleMapped.read === 0) {
              return res.status(401).send(responseHelper.error(401, 'No Read Access Rights'))
            }
          } else if (requestMethod === 'POST') {
            if (roleMapped.create === 0) {
              return res.status(401).send(responseHelper.error(401, 'No Create Access Rights'))
            }
          } else if (requestMethod === 'PATCH') {
            if (roleMapped.edit === 0) {
              return res.status(401).send(responseHelper.error(401, 'No Update Access Rights'))
            }
          } else {
            if (roleMapped.delete === 0) {
              return res.status(401).send(responseHelper.error(401, 'No Delete Access Rights'))
            }
          }
          next()
        }
      } else {
        next()
      }
    } catch (error) {
      //("err", error);
      log('validators:isTransactionModuleValidation', exception)
      return res.status(500).send(responseHelper.error(500, 'Server Error occured'))
    }
  }
}
