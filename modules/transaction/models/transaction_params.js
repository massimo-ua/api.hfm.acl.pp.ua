'use strict';
const Sequelize = require('sequelize');
const db = require('../../db');
const Category = require('../../category/model');
const Transaction = require('./transaction');
const TransactionParams = db.define('transaction_param', {
      transaction_id: {
        type: Sequelize.DATE, allowNull: false
      },
      category_id: {
        type: Sequelize.INTEGER, allowNull: false
      },
      amount: {
          type: Sequelize.BIGINT, allowNull: false
      }
    });
    TransactionParams.belongsTo(Transaction, { as: 'transaction', foreignKey: 'transaction_id'});
    TransactionParams.belongsTo(Category, { as: 'category', foreignKey: 'category_id'});
module.exports = TransactionParams;