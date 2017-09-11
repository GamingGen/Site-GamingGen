'use strict';

const path = require('path');
const winston = require('winston');
winston.emitErrs = true;

const fs = require('fs');

const dirname = 'Logs';
const logPath = path.join(__dirname, '..', dirname, 'all-logs.log');
const logErrorPath = path.join(__dirname, '..', dirname, 'all-errors-logs.log');

fs.access(path.dirname(logPath), fs.R_OK | fs.W_OK, (err) => {
  if (err) {
    console.log('no access !');
    fs.mkdir(dirname, (err) => {
      if (err) {
        console.error(err);
      }
      else {
        console.log('Log Folder Created');
      }
    });
  }
});


var logger = new winston.Logger({
  transports: [
    new winston.transports.File({
      name: 'info-file',
      level: 'info',
      filename: logPath,
      handleExceptions: false,
      json: true,
      maxsize: 5242880, //5MB
      maxFiles: 5,
      colorize: false
    }),
    new winston.transports.File({
      name: 'error-file',
      level: 'error',
      filename: logErrorPath,
      handleExceptions: true,
      json: true,
      maxsize: 5242880, //5MB
      maxFiles: 5,
      colorize: false
    }),
    new winston.transports.Console({
      level: 'error',
      handleExceptions: true,
      json: false,
      colorize: true
    })
  ],
  exitOnError: false
});

module.exports = logger;
module.exports.stream = {
  write: function(message, encoding){
    logger.info(message);
  }
};