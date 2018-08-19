'use strict';
const Currency = require('../model'),
    compose = require('koa-compose'),
    middleware = require('../../../middleware'),
    { add: bodySchema } = require('../validators'),
    { throwError, to } = require('../../../helpers');

async function add(ctx) {
    const {
        name,
        code,
        symbol,
        rate,
    } = ctx.request.body;
    const [err, currency] = await to(Currency.create({
        name,
        code,
        symbol,
        rate,
    }));
    if(err || !currency) {
        throwError('The request could not be completed', true, 409);
    }
    ctx.body = currency;
}

module.exports = compose([
    middleware.validator({
        body: bodySchema
    }),
    add
]);