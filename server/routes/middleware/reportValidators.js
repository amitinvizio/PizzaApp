const { check, validationResult } = require('express-validator')
const commonHelper = require('../../database/helpers/commonHelper')
const moment = require('moment')
let isDate = async (date) => {
  let formattedDate = await moment(date).format('DD-MM-YYYY')

  return await moment(formattedDate).isValid()
}
module.exports = {
  stockSummaryValidation: async (req, res, next) => {
    try {
      await check('stockBy').not().isEmpty().withMessage('stockBy should not be blank').isIn([ 'Item with Melting', 'Item Name', 'Item Category' ]).withMessage('Given stockBy is not allowed').run(req)
      await check('companyCode').not().isEmpty().withMessage('Company Code should not be blank').run(req)

      var errors = validationResult(req)
      if (!errors.isEmpty()) {
        return res.status(400).send(responseHelper.error(400, errors.array()[0].param + ' : ' + errors.array()[0].msg))
      } else {
        next()
      }
    } catch (error) {
      log('reportValidator:stockSummaryValidation', error)
      return res.status(500).send(responseHelper.error(500, 'Server Error occured'))
    }
  },

  trialSummaryValidation: async (req, res, next) => {
    try {
      await check('groupCode').not().isEmpty().withMessage('Group code should not be blank').run(req)
      await check('companyCode').not().isEmpty().withMessage('Company Code should not be blank').run(req)
      await check('toDate')
        .not()
        .isEmpty()
        .withMessage('To date cannot be blank')
        .trim()
        .custom((value) => {
          return moment(value, 'DD-MM-YYYY', true).isValid()
        })
        .withMessage('Must be a valid Date with format: DD-MM-YYYY')
        .run(req)

      var errors = validationResult(req)
      if (!errors.isEmpty()) {
        return res.status(400).send(responseHelper.error(400, errors.array()[0].param + ' : ' + errors.array()[0].msg))
      } else {
        next()
      }
    } catch (error) {
      log('reportValidator:trialSummaryValidation', error)
      return res.status(500).send(responseHelper.error(500, 'Server Error occured'))
    }
  }
}
