'use strict';
const compose = require('koa-compose'),
    middleware = require('../../../middleware'),
    { update: bodySchema, byId: paramsSchema  } = require('../validators'),
    Transaction = require('../models').transaction,
    { throwError, to } = require('../../../helpers');

async function update(ctx) {
    let err, transaction, saved;
    [err, transaction] = await to(Transaction.findOne({
        id: ctx.params.id
    }));
    if(err || !transaction) {
        throwError('Transaction not found', true, 404);
    }
    Object.assign(transaction, ctx.request.body);
    [err, saved] = await to(transaction.save());
    if (err || !saved) {
        throwError('Transaction was not updated', true, 500);
    }
    ctx.body = { success: true };
}

module.exports = compose([
    middleware.validator({
        body: bodySchema,
        params: paramsSchema,
    }),
    update
]);