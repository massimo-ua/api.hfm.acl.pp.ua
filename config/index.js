'use strict';
const joi = require('joi');
const envVarsSchema = joi.object({
    APP_PORT: joi.number().integer().min(2000).max(10000).required(),
    DB_NAME: joi.string().default('hfmt'),
    DB_USER: joi.string().default('hfmt'),
    DB_PASSWORD: joi.string().default('hfmt'),
    DB_HOST: joi.string().default('192.168.34.44'),
    DB_DIALECT: joi.string().default('postgres')
}).unknown().required();
const { error, value: envVars } = joi.validate(process.env, envVarsSchema)
if (error) {
  throw new Error(`Config validation error: ${error.message}`)
};
const config = {
    app: {
        port: envVars.APP_PORT
    },
    database: {
        database: envVars.DB_NAME,
        username: envVars.DB_USER,
        password: envVars.DB_PASSWORD,
        host: envVars.DB_HOST,
        dialect: envVars.DB_DIALECT,
        pool: {
            max: 5,
            min: 0,
            acquire: 30000,
            idle: 10000
        }
    }
};
module.exports = config;