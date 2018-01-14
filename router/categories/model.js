'use strict';
const Sequelize = require('sequelize');
const db = require('../../db');
const Category = db.define('category', {
      _id: {
        type: Sequelize.INTEGER, primaryKey: true
      },
      name: {
        type: Sequelize.STRING, allowNull: false
      },
      visible: {
        type: Sequelize.INTEGER
      },
      close_date: {
        type: Sequelize.DATE
      }
    },
    {
      timestamps: false
    });
    Category.hasMany(Category, { foreignKey: 'parent_id'});
    Category.belongsTo(Category, {foreignKey: 'parent_id'});
module.exports = Category;