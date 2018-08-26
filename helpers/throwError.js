'use strict';
const logger = require('../logger');

const throwError = (err, log = false, statusCode = 500) => {
    if(log) {
        logger.error(err);
    }
    typeof err === 'object' ? throwConstructedError(err) : throwSimpleError(err, statusCode);
};

function throwSimpleError(err, statusCode = 500) {
    const error = new Error(err);
    if (statusCode) {
        error.status = statusCode;
    }
    throw error;
}

function throwConstructedError(err) {
    throw new err();
}

module.exports = throwError;