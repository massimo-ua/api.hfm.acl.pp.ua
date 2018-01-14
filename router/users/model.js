'use strict';

const Sequelize = require('sequelize');
const db = require('../../db');
const User = db.define('user', {
      _id: {
        type: Sequelize.INTEGER, primaryKey: true
      },
      login: {
        type: Sequelize.STRING(10), allowNull: false
      },
      password: {
        type: Sequelize.STRING(60), allowNull: false
      },
      name: {
        type: Sequelize.STRING(100), allowNull: false
      }
    },
    {
      timestamps: false,
      indexes: [
        {
            unique: true,
            fields: ['login']
        }
      ]
    });
module.exports = User;