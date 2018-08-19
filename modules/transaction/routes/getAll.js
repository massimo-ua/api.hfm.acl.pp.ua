'use strict';
const compose = require('koa-compose'),
    middleware = require('../../../middleware'),
    { allQuery: querySchema } = require('../validators'),
    {transaction: Transaction} = require('../models'),
    sequelize = require('sequelize'),
    User = require('../../user/model'),
    { throwError, to } = require('../../../helpers');

async function getAll(ctx) {
    let err, transactions;
    const { year } = ctx.query;
    [err, transactions] = await to(Transaction.findAll({ 
        where: sequelize.where(
            sequelize.literal('extract(YEAR FROM transaction_date)'),
            year
        ), 
        include: [
            'account',
            { model: User, as: 'user', attributes: ['_id','login','name']},
            'params',
            'source',
            'target'
        ] }));
    if(err || !transactions) {
        throwError('No transactions found', true, 404);
    }
    ctx.body = transactions;
}

module.exports = compose([
    middleware.validator({
        query: querySchema
    }),
    getAll
]);