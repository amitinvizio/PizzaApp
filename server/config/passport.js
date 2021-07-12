var LocalStrategy = require('passport-local').Strategy
const bcrypt = require('bcrypt')
const saltRounds = 10
const user = require('../database/models/user')
const userDBHelper = require('../database/helpers/userHelper')
const commonDBHelper = require('../database/helpers/commonHelper')
const { getClient } = require('../database/helpers/commonHelper')

module.exports = function (passport) {
  // used to serialize the user for the session
  passport.serializeUser(function (user, done) {
    done(null, user.email)
  })

  //password comparison logic helper method
  const comparePassword = async function (cryptPassword, normalPassword) {
    var res = await bcrypt.compare(cryptPassword, normalPassword)
    return res
  }

  //local strategy for user generation
  passport.use(
    'local-signup',
    new LocalStrategy(
      {
        // by default, local strategy uses username and password, we will override with email
        usernameField: 'email',
        passwordField: 'password',
        passReqToCallback: true // allows us to pass back the entire request to the callback
      },
      async function (req, email, password, done) {
        process.nextTick(async function () {
          // find a user whose email is the same as the forms email
          var userResponse = await userDBHelper.checkUser(email)

          if (userResponse === true) {
            // var hashPassword = generateHash(password);
            var hashPassword = await bcrypt.hash(password, saltRounds).catch(function (err) {
              return done(null, null, 'Error in exchange Password hash.')
            })

            let { firstName, lastName, username , role} = req.body
            var createUser = await userDBHelper.createUser(email, hashPassword, role, firstName, lastName, username)

            if (createUser == true) {
              var result = {
                status: 1,
                message: role + ' created Successfully',
                result: 'success'
              }
              return done(null, result, null)
            } else {
              return done(null, null, 'Something went wrong while creating user')
            }
          } else if (userResponse === false) {
            return done(null, false, 'Email id already exist')
          } else {
            return done(null, false, 'Something Went Wrong')
          }
        })
      }
    )
  )

  passport.use(
    'local-login',
    new LocalStrategy(
      {
        // by default, local strategy uses username and password, we will override with email
        usernameField: 'email',
        passwordField: 'password',
        passReqToCallback: true // allows us to pass back the entire request to the callback
      },
      async function (req, email, password, done) {
        process.nextTick(async function () {
          // find a user whose email is the same as the forms email
          var userResponse = await userDBHelper.getUserByEmail(email)
          if (userResponse === null) return done(null, false, 'Email id does not exist')
          if (userResponse === false) return done(null, false, 'Something went Wrong')

          if (userResponse.password == null || !await comparePassword(password, userResponse.password)) return done(null, false, 'Email Id or Password is Incorrect.') // create the loginMessage and save it to session as flashdata
          // all is well, return successful user
          return done(null, userResponse)
        })
      }
    )
  )
}
