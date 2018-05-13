'use strict';
const Sequelize = require('sequelize');
const db = require('../../db');
const User = require('../user/model');
const Log = db.define('log', {
      id: {
        type: Sequelize.INTEGER, primaryKey: true
      },
      user_id: {
        type: Sequelize.INTEGER, allowNull: false
      },
      created_at: {
        type: Sequelize.DATE, allowNull: false
      },
      description: {
        type: Sequelize.STRING, allowNull: false
      },
      ip: {
        type: Sequelize.STRING, allowNull: false
      }
    },
    {
      timestamps: false
    });
Log.belongsTo(User, { as: "user", foreignKey: "user_id"});
module.exports = Log;