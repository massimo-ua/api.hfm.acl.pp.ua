'use strict';
const Currency = require('../models'),
    compose = require('koa-compose'),
    middleware = require('../../../middleware'),
    { findById: paramsSchema } = require('../validators'),
    { throwError, to } = require('../../../helpers');

async function close(ctx) {
    let err, currency;
    [err, currency] = await to(Currency.scope('open').findById(ctx.params.id));
    if(err || !currency) {
        throwError('Currency not found', true, 404);
    }
    currency.closed = new Date();
    [err, currency] = await currency.save();
    if(err || !currency) {
        throwError('Currency сlosing failed', true, 500);
    }
    ctx.status = 201;
    ctx.body = currency;
}

module.exports = compose([
    middleware.validator({
        params: paramsSchema,
    }),
    close
]);