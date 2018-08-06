'use strict';
const joi = require('joi');
module.exports = joi.object({
    category_id: joi.number().integer(),
    amount: joi.number().integer().min(1),
    description: joi.string()
});