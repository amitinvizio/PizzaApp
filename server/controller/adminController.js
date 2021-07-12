const passport = require('passport')
const jwt = require('jsonwebtoken')
const roleHelper = require('../database/helpers/roleHelper')
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
          return res.status(500).send(responseHelper.error(500, exception))
        }
      }
    )(req, res, next)
  }
}
