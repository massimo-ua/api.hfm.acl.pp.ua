'use strict';
const compose = require('koa-compose'),
    middleware = require('../../../middleware'),
    { addParam: bodySchema, byId: paramsSchema } = require('../validators'),
    { transaction: Transaction } = require('../models'),
    { transaction_param: TransactionParam } = require('../../params/models'),
    { throwError, to } = require('../../../helpers');

async function addTransactionParam(ctx) {
    let err, transaction, param;
    const { category_id, amount, description } = ctx.request.body;
    const transaction_id = ctx.params.id;
    [err, transaction] = await to(Transaction.findById(transaction_id));
    if (transaction) {
        [err, param] = await to(TransactionParam.create({
            category_id,
            amount,
            description,
            transaction_id: transaction.id
        }));
        if (param) {
            ctx.body = param;
        } else {
            throwError(`The request could not be completed: ${err.message}`, true, 409);
        }
    } else {
        throwError('Parent transaction not found', true, 404);
    }
}

module.exports = compose([
    middleware.validator({
        body: bodySchema,
        params: paramsSchema
    }),
    addTransactionParam
]);