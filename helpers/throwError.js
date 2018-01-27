'use strict';
const logger = require('../logger');
let error;

const throwError = (err, log, statusCode) => {
    if(log) {
        logger.error(err);
    }
    error = new Error(err);
    if(statusCode) {
        error.status = statusCode;
    }
    throw error;
};

module.exports = throwError;