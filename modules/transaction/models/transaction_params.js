'use strict';
const Sequelize = require('sequelize'),
    db = require('../../../db'),
    { throwError, to } = require('../../../helpers'),
    Category = require('../../category/model'),
    Currency = require('../../currency/model'),
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
// hook that hashes user password every time before save or update
TransactionParams.addHook('beforeSave', 'calculateEquivalent', calculateEquivalent);

async function calculateEquivalent(param) {
    let error, currency, transaction;
    [error, transaction] = await to(Transaction.findById(param.transaction_id, {
        include: ['account']
    }));
    if (!error && transaction) {
        const { account } = transaction;
        [error, currency] = await to(Currency.findById(account.currency_id));
        if (!error && currency) {
            param.equivalent = currency.home ? param.amount : convert(param.amount, currency.rate); 
        } else {
            param.equivalent = param.amount;
        }
    } else {
        throwError('Related transaction not found', true, 500);
    }
}
module.exports = TransactionParams;

function convert(amount, rate) {
    return Math.round(amount * rate / 100);
}