'use strict';
const { Account } = require('../models'),
    compose = require('koa-compose'),
    middleware = require('../../../middleware'),
    { findbyid: paramsSchema } = require('../validators'),
    { throwError, to } = require('../../../helpers');

async function close(ctx) {
    let err, account;
    [err, account] = await to(Account.scope('open').findById(ctx.params.id));
    if(err || !account) {
        throwError('Account not found', true, 404);
    }
    account.closed = new Date();
    [err, account] = await account.save();
    if(err || !account) {
        throwError('Account сlosing failed', true, 500);
    }
    ctx.status = 201;
    ctx.body = account;
}

module.exports = compose([
    middleware.validator({
        params: paramsSchema,
    }),
    close
]);