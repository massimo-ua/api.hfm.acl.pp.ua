'use strict';
const joi = require('joi');
module.exports = joi.object({
    name: joi.string().required(),
    visible: joi.boolean(),
    type: joi.number().integer().valid(1,2).required(),
    parent_id: joi.number().integer(),
});