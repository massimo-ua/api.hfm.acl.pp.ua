'use strict';
const Sequelize = require('sequelize');
const db = require('../../../db');
const Category = require('../../category/model');
const Transaction = require('./transaction');
const TransactionParams = db.define('transaction_param', {
      id: {
        type: Sequelize.INTEGER, primaryKey: true
      },    
      transaction_id: {
        type: Sequelize.INTEGER, allowNull: false
      },
      category_id: {
        type: Sequelize.INTEGER, allowNull: false
      },
      amount: {
        type: Sequelize.BIGINT, allowNull: false
      },
      equivalent: {
        type: Sequelize.BIGINT, allowNull: false
      },
      description: {
        type: Sequelize.STRING, allowNull: true
      }
    },
    {
      timestamps: false
    });
    TransactionParams.belongsTo(Category, { as: 'category', foreignKey: 'category_id'});
module.exports = TransactionParams;