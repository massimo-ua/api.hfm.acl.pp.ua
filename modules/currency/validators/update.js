const joi = require('joi');
module.exports = joi.object({
    name: joi.string(),
    code: joi.string(),
    symbol: joi.string(),
    rate: joi.number().integer().min(1),
});