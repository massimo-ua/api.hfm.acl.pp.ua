'use strict';
const Sequelize = require('sequelize'),
    db = require('../../../db'),
    User = require('../../user/model'),
    { Account } = require('../../account/models'),
    Params = require('../../params/models/transaction_params'),
    Transfer = require('./transfer'),
    Op = Sequelize.Op;
const Transaction = db.define('transaction', {
    id: {
        type: Sequelize.INTEGER, 
        primaryKey: true,
        autoIncrement: true,
    },
    type: {
        type: Sequelize.ENUM,
        values: [1,2],
        allowNull: false
    },
    account_id: {
        type: Sequelize.INTEGER, allowNull: false
    },
    transaction_date: {
        type: Sequelize.DATE, allowNull: false
    },
    user_id: {
        type: Sequelize.INTEGER, allowNull: false
    },
    created_at: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP(3)')
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
                [Op.eq]: null
            }
        }
    }
});
Transaction.belongsTo(Account, { as: 'account', foreignKey: 'account_id'});
Transaction.belongsTo(User, { as: 'user', foreignKey: 'user_id'});
Transaction.hasMany(Params, { as: 'params', foreignKey: 'transaction_id'});
Transaction.hasOne(Transfer, { as: 'source', foreignKey: 'debit_id'});
Transaction.hasOne(Transfer, { as: 'target', foreignKey: 'credit_id'});
module.exports = Transaction;