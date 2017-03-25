'use strict';

const path = require('path');
const winston = require('winston');
winston.emitErrs = true;

const fs = require('fs');

const logPath = path.join(__dirname, '..', 'Logs', 'all-logs.log');

console.log(`logPath: ${logPath}`);

fs.access(logPath, fs.R_OK | fs.W_OK, (err) => {
  console.log(err ? 'no access!' : 'can read/write');
  if (err) {
    fs.mkdir('Logs', (err) => {
      if (err) {
        console.log(err);
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
      level: 'info',
      filename: logPath,
      handleExceptions: true,
      json: true,
      maxsize: 5242880, //5MB
      maxFiles: 5,
      colorize: false
    }),
    new winston.transports.Console({
      level: 'debug',
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