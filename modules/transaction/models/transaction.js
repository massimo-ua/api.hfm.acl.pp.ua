'use strict';
const Sequelize = require('sequelize');
const db = require('../../db');
const User = require('../user/model');
const Account = require('../account/models').account;
const Transaction = db.define('transaction', {
      _id: {
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
      created_at: {
        type: Sequelize.DATE, allowNull: false
      },
      user_id: {
        type: Sequelize.INTEGER, allowNull: false
      },
      deleted_at: {
        type: Sequelize.DATE
      }
    },
    {
      timestamps: false
    });
    Transaction.belongsTo(Account, { as: "account", foreignKey: "account_id"});
    Transaction.belongsTo(User, { as: "user", foreignKey: "user_id"});
module.exports = Transaction;