'use strict';
const Sequelize = require('sequelize'),
      db = require('../../../db'),
      Category = require('../../category/model'),
      Transaction = require('./transaction');
const TransactionParams = db.define('transaction_param', {
      id: {
        type: Sequelize.INTEGER, 
        primaryKey: true,
        autoIncrement: true,
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
      },
      deleted_at: {
        type: Sequelize.DATE, allowNull: true
      }
    },
    {
      timestamps: false,
      defaultScope: {
        where: {
          deleted_at: {
            [Sequelize.Op.eq]: null
          }
        }
      }
    });
    TransactionParams.belongsTo(Category, { as: 'category', foreignKey: 'category_id'});
module.exports = TransactionParams;