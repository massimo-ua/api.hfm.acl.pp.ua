'use strict';
const Sequelize = require('sequelize');
const Op = Sequelize.Op;
const db = require('../../../db');
const {model: Currency} = require('../../currency');
const AccountType = require('./account_type');
const Account = db.define('account', {
    id: {
        type: Sequelize.INTEGER, 
        primaryKey: true,
        autoIncrement: true,
    },
    name: {
        type: Sequelize.STRING, allowNull: false
    },
    balance: {
        type: Sequelize.BIGINT,
        defaultValue: 0
    },
    description: {
        type: Sequelize.STRING
    },
    closed: {
        type: Sequelize.DATE, allowNull: true
    },
    account_type_id: {
        type: Sequelize.INTEGER
    },
    currency_id: {
        type: Sequelize.INTEGER
    }
},
{
    timestamps: false,
    scopes: {
        closed: {
            where: {
                closed: {
                    [Op.ne]: null
                }
            }
        },
        not_empty: {
            where: {
                balance: {
                    [Op.ne]: 0
                }
            }
        },
        open: {
            where: {
                closed: {
                    [Op.eq]: null
                }
            }
        },
        empty: {
            where: {
                balance: {
                    [Op.eq]: 0
                }
            }
        }
    }
});
Account.belongsTo(AccountType, { as: 'account_type', foreignKey: 'account_type_id'});
Account.belongsTo(Currency, { as: 'currency', foreignKey: 'currency_id'});
module.exports = Account;