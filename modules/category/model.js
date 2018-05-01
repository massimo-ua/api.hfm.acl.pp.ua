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
        type: Sequelize.BOOLEAN,
        default: true
      },
      closed: {
        type: Sequelize.DATE
      },
      type: {
        type: Sequelize.INTEGER,
        validate: {
          isIn: [[1, 2]],
        }
      },
      parent_id: {
        type: Sequelize.INTEGER, allowNull: true
      }
    },
    {
      timestamps: false
    });
    Category.hasMany(Category, { as: "sub_categories", foreignKey: "parent_id"});
    Category.belongsTo(Category, { as: "parent_category", foreignKey: "parent_id"});
module.exports = Category;