'use strict';
const Currency = require('../models'),
    compose = require('koa-compose'),
    middleware = require('../../../middleware'),
    { findById: paramsSchema } = require('../validators'),
    { throwError, to } = require('../../../helpers');

async function getById(ctx) {
    let err, currency;
    [err, currency] = await to(Currency.scope('open').findOne({ where: { _id: ctx.params.id }}));
    if(err || !currency) {
        throwError("Currency not found", true, 404);
    }
    ctx.body = currency;
}

module.exports = compose([
    middleware.validator({
        params: paramsSchema,
    }),
    getById
]);