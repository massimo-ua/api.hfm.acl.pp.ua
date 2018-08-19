'use strict';
const joi = require('joi');
module.exports = joi.object({
    year: joi.number().integer().min(2000)
});