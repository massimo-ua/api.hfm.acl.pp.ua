'use strict';
const Sequelize = require('sequelize');
const db = require('../../../db');
const Currency = require('../../currency/model');
const AccountType = require('./account_type');
const Account = db.define('account', {
    id: {
        type: Sequelize.INTEGER, 
        primaryKey: true,
        autoIncrement: true,
    },
    name: {
        type: Sequelize.STRING, allowNull: false
    },
    balance: {
        type: Sequelize.BIGINT,
        defaultValue: 0
    },
    description: {
        type: Sequelize.STRING
    },
    closed: {
        type: Sequelize.DATE, allowNull: true
    },
    account_type_id: {
        type: Sequelize.INTEGER
    },
    currency_id: {
        type: Sequelize.INTEGER
    }
},
{
    timestamps: false
});
Account.belongsTo(AccountType, { as: 'account_type', foreignKey: 'account_type_id'});
Account.belongsTo(Currency, { as: 'currency', foreignKey: 'currency_id'});
module.exports = Account;