const joi = require('joi');
module.exports = joi.object({
    name: joi.string().required(),
    code: joi.string().required(),
    symbol: joi.string(),
    rate: joi.number().integer().min(1),
});
