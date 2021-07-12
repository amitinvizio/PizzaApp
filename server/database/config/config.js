require('dotenv').config()

// function getBool () {
//   return !!JSON.parse(String(process.env.DBLOGGING).toLowerCase())
// }

module.exports = {
  development: {
    username: 'root',
    password: '12345',
    database: 'pizzaapp',
    host: 'localhost',
    dialect: 'mysql',
    //logging: getBool()
  },
  test: {
    username: 'root',
    password: null,
    database: 'database_test',
    host: '127.0.0.1',
    dialect: 'mysql'
  },
  production: {
    username: 'root',
    password: 12345,
    database: 'pizzaapp',
    host: '127.0.0.1',
    dialect: 'mysql'
  }
}
