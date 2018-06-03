'use strict';
const joi = require('joi');
module.exports = joi.object({
    name: joi.string().required(),
    balance: joi.number().integer(),
    description: joi.string().empty(''),
    account_type_id: joi.number().integer().valid(1,2,3),
    currency_id: joi.number().integer().required(),
});