'use strict';
const joi = require('joi');
module.exports = joi.object({
    category_id: joi.number().integer().required(),
    amount: joi.number().integer().min(1).required(),
    description: joi.string()
});
