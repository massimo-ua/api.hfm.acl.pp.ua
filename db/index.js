'use strict';

const config = require('../config');
const Sequelize = require('sequelize');
const sequelize = new Sequelize(
    config.database.database,
    config.database.username,
    config.database.password,
    {
        host: config.database.host,
        port: config.database.port,
        dialect: config.database.dialect,
        pool: config.database.pool,
        operatorsAliases: false
    }
);
module.exports = sequelize;
