var winston = require('winston');
  require('winston-daily-rotate-file');
 
  var transport = new (winston.transports.DailyRotateFile)({
    filename: 'logs/PizzaBook-%DATE%.log',
    datePattern: 'YYYY-MM-DD',
    zippedArchive: true,
    maxSize: '20m',
    maxFiles: '14d',
    format: winston.format.combine(
      winston.format.timestamp(),
      winston.format.json()
  )
  });
 
  transport.on('rotate', function(oldFilename, newFilename) {
    // do something fun
  });
 
  var logger = winston.createLogger({
    transports: [
      transport
    ]
  });
  /**
     * @param {String} file
     * @param {String} message
     * @param {String} level 
     */
  const createLogRecordForFile = (file,message,level) => {
    if(level === 'info'){
      logger.info('fileName: '+file+', message: '+message);
    }else if(level ==='error'){
      logger.error('fileName: '+file+', message: '+message);
    }else{
      logger.warn('fileName: '+file+', message: '+message);
    }
  }
  exports.createLogRecordForFile = createLogRecordForFile;
