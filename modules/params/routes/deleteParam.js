'use strict';
const compose = require('koa-compose'),
    middleware = require('../../../middleware'),
    { byId: paramsSchema  } = require('../validators'),
    { transaction_param: TransactionParam } = require('../models'),
    { throwError, to } = require('../../../helpers');

async function del(ctx) {
    let err, param, saved;
    [err, param] = await to(TransactionParam.findById(ctx.params.id));
    if(err || !param) {
        throwError('Transaction parameter not found', true, 404);
    }
    param.deleted_at = new Date();
    [err, saved] = await to(param.save());
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