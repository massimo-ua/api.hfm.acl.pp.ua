'use strict';
const Sequelize = require('sequelize');
const db = require('../../../db');
const Transaction = require('./transaction');
const Transfer = db.define('transfer', {
      id: {
        type: Sequelize.INTEGER, primaryKey: true
      },    
      debit_id: {
        type: Sequelize.INTEGER, allowNull: false
      },
      credit_id: {
        type: Sequelize.INTEGER, allowNull: false
      }
    },
    {
      timestamps: false
    });
module.exports = Transfer;