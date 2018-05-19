'use strict';
const Sequelize = require('sequelize');
const db = require('../../../db');
const User = require('../../user/model');
const Account = require('../../account/models').account;
const Params = require('./transaction_params');
const Transfer = require('./transfer');
const Transaction = db.define('transaction', {
      id: {
        type: Sequelize.INTEGER, primaryKey: true
      },
      type: {
        type: Sequelize.ENUM,
        values: [1,2],
        allowNull: false
      },
      account_id: {
        type: Sequelize.INTEGER, allowNull: false
      },
      transaction_date: {
        type: Sequelize.DATE, allowNull: false
      },
      user_id: {
        type: Sequelize.INTEGER, allowNull: false
      }
    },
    {
      timestamps: false
    });
    Transaction.belongsTo(Account, { as: "account", foreignKey: "account_id"});
    Transaction.belongsTo(User, { as: "user", foreignKey: "user_id"});
    Transaction.hasMany(Params, { as: "params", foreignKey: "transaction_id"});
    Transaction.hasOne(Transfer, { as: "source", foreignKey: "debit_id"});
    Transaction.hasOne(Transfer, { as: "target", foreignKey: "credit_id"});
module.exports = Transaction;