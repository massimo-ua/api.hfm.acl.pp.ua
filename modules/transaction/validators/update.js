'use strict';
const joi = require('joi');
module.exports = joi.object({
    type: joi.number().integer().valid(1,2,3),
    account_id: joi.number().integer(),
    transaction_date: joi.date()
});