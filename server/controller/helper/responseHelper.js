module.exports = {
  //for all standard errors
  /**
     * @param {Number} code //error code such as 401,422,500 etc
     * @param {String} message  //error message 
     */

  error: function (code, message) {
    return {
      status: code,
      message: message
    }
  },

  //for database save error
  /**
     * 
     * @param {Number} error 
     */
  databaseError: function (error) {
    if (error.code == 11000) {
      return {
        error: {
          code: 500,
          message: 'Fields Value should be Unique'
        }
      }
    } else {
      return {
        error: {
          code: 500,
          message: 'Server Error'
        }
      }
    }
  },

  /**
     * 
     * @param {String} message 
     */
  successWithUpdateMessage: function (message) {
    if (message == null) {
      message = 'Success'
    }
    return {
      status: 200,
      message: message
    }
  },

  /**
     * 
     * @param {Number} status //status such as 200
     * @param {message} message // success string 
     * @param {result} result  // data result
     */
  successWithResult: function (status, message, result) {
    if (message == null) {
      message = 'Success'
    }
    return {
      status: status,
      message: message,
      data: result
    }
  },

  /**
     * 
     * @param {String} message
     * @param {Object} result
     * @param {Object} pagination 
     */
  successWithPaginationData: function (message, result, pagination) {
    return {
      status: 200,
      message: message,
      result: result,
      pagination: pagination
    }
  },

  /**
     * 
     * @param {String} message
     * @param {Object} data
     */
  successWithRequestData: function (message, data) {
    return {
      status: 200,
      message: message || 'Success',
      result: data
    }
  },

  /**
     * 
     * @param {String} message
     * @param {String} code 
     */
  errorWithMessage: function (message, code) {
    return {
      status: code || 0,
      message: message || 'Error occured',
      result: {}
    }
  }
}
