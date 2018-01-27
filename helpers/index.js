'use strict';

const createToken = require('./jwt'),
      throwError = require('./throwError'),
      to = require('./to');

module.exports = {
    createToken,
    throwError,
    to
};