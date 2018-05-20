'use strict';
const joi = require('joi');
module.exports = joi.object({
    type: joi.number().integer().valid(1,2,3).required(),
    account_id: joi.number().integer().required(),
    transaction_date: joi.date().required()
});
