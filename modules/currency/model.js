'use strict';
const Sequelize = require('sequelize');
const db = require('../../db');
const Currency = db.define('currency', {
      _id: {
        type: Sequelize.INTEGER, primaryKey: true
      },
      name: {
        type: Sequelize.STRING, allowNull: false
      },
      code: {
        type: Sequelize.STRING, allowNull: false
      },
      symbol: {
        type: Sequelize.STRING
      },
      home: {
        type: Sequelize.BOOLEAN
      },
      rate: {
        type: Sequelize.INTEGER
      },
      closed: {
        type: Sequelize.DATE
      }
    },
    {
      timestamps: false
    });
module.exports = Currency;