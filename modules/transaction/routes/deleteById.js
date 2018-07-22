'use strict';
const compose = require('koa-compose'),
    middleware = require('../../../middleware'),
    { byId: paramsSchema  } = require('../validators'),
    Transaction = require('../models').transaction,
    { throwError, to } = require('../../../helpers');

async function del(ctx) {
    let err, transaction, saved;
    [err, transaction] = await to(Transaction.findById(ctx.params.id));
    if(err || !transaction) {
        throwError('Transaction not found', true, 404);
    }
    transaction.deleted_at = new Date();
    [err, saved] = await to(transaction.save());
    if(err || !saved) {
        throwError('Internal server error', true, 500);
    }
    ctx.body = { success: true };
}

module.exports = compose([
    middleware.validator({
        params: paramsSchema,
    }),
    del
]);