var createError = require('http-errors')
var express = require('express')
var path = require('path')
var cookieParser = require('cookie-parser')
var passport = require('passport')
var loggerObject = require('./config/logger')
var logger = require('morgan')
var indexRouter = require('./routes/index')
const responseHelper = require('./controller/helper/responseHelper')
const productRouter = require('./routes/product')
var dotenv = require('dotenv').config()
var app = express()

// view engine setup
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')

app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public')))

//  for displaying images on localhost via route http://localhost:PORT/uploads/filename.ext
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use('/', indexRouter)
app.use('/product', productRouter)

app.use(passport.initialize())
app.use(passport.session()) // persistent login sessions
require('./config/passport')(passport)

//logger export
global.log = loggerObject.createLogRecordForFile
global.responseHelper = require('./controller/helper/responseHelper')
global.models = require('./database/models/index')

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  return res.status(404).send(responseHelper.error(404, 'No such Route found'))
})

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message
  res.locals.error = req.app.get('env') === 'development' ? err : {}

  // render the error page
  res.status(err.status || 500)
  res.render('error')
})


if(process.env.NODE_ENV === 'production'){
  app.use(express.static('client/build'))
  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname,'client', 'build', 'index.html'))
  })
}

module.exports = app
