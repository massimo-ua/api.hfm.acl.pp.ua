'use strict';
const joi = require('joi');
module.exports = joi.object({
    id: joi.number().integer().min(1).required(),
});