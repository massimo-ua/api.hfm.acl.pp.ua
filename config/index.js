'use strict';
const joi = require('joi');
const envVarsSchema = joi.object({
    APP_PORT: joi.number().integer().min(2000).max(10000).required()
}).unknown().required();
const { error, value: envVars } = joi.validate(process.env, envVarsSchema)
if (error) {
  throw new Error(`Config validation error: ${error.message}`)
};
const config = {
    app: {
        port: envVars.APP_PORT
    }
};
module.exports = config;