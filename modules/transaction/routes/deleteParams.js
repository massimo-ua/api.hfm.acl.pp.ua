'use strict';
const compose = require('koa-compose'),
    middleware = require('../../../middleware'),
    { byId: paramsSchema  } = require('../validators'),
    { transaction_param: TransactionParam } = require('../../params/models'),
    { throwError, to } = require('../../../helpers');

async function del(ctx) {
    let err, saved;
    [err, saved] = await to(TransactionParam.update(
        { deleted_at: new Date() },
        {
            where: {
                transaction_id: ctx.params.id
            }
        }));
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