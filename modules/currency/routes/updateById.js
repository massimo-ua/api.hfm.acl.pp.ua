'use strict';
const Currency = require('../models'),
    compose = require('koa-compose'),
    middleware = require('../../../middleware'),
    { findById: paramsSchema, update: bodySchema } = require('../validators'),
    { throwError, to } = require('../../../helpers');

async function updateById(ctx) {
    let err, currency, saved;
    [err, currency] = await to(Currency.scope('open').findOne({ where: { _id: ctx.params.id }}));
    if(err || !currency) {
        throwError("Currency not found", true, 404);
    } else {
        Object.assign(currency, ctx.body);
        [err, saved] = await to(currency.save());
        if (err || !saved) {
            throwError('Currency update failed', true, 500);
        }
        ctx.body = saved;
    }
}

module.exports = compose([
    middleware.validator({
        params: paramsSchema,
        body: bodySchema,
    }),
    updateById
]);