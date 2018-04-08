"use strict"
const Sequelize = require("sequelize");
const db = require("../../../db");
const AccountType = db.define("account_type", {
      _id: {
        type: Sequelize.INTEGER, primaryKey: true
      },
      name: {
        type: Sequelize.STRING, allowNull: false
      },
      min: {
        type: Sequelize.BIGINT,
        defaultValue: 0
      },
      max: {
        type: Sequelize.BIGINT,
        defaultValue: 0
      },
      closed: {
        type: Sequelize.DATE
      }
    },
    {
      timestamps: false
    });
module.exports = AccountType;
