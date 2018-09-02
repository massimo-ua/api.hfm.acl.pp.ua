const Sequelize = require('sequelize');
const Op = Sequelize.Op;
const db = require('@db');
const Plan = db.define('plan', {
      id: {
        type: Sequelize.INTEGER, primaryKey: true
      },
      name: {
        type: Sequelize.STRING, allowNull: false
      },
      start_date: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW
      },
      end_date: {
        type: Sequelize.DATE,
        allowNull: false
      },
      currency_id: {
        type: Sequelize.INTEGER
      },
      target: {
          type: Sequelize.BIGINT,
          allowNull: false,
          defaultValue: 0
      },
      deleted_at: {
        type: Sequelize.DATE
      }
    },
    {
      timestamps: false,
      scopes: {
        active: {
          where: {
            closed: {
              [Op.eq]: null
            }
          }
        },
      }
    });
module.exports = Plan;