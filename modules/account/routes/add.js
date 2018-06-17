'use strict';
const { Account } = require('../models'),
    compose = require('koa-compose'),
    middleware = require('../../../middleware'),
    { add: bodySchema } = require('../validators'),
    { throwError, to } = require('../../../helpers');

async function add(ctx) {
    const {
        name,
        balance,
        description,
        account_type_id,
        currency_id
    } = ctx.request.body;
    const [err, account] = await to(Account.create({
        name,
        balance,
        description,
        account_type_id,
        currency_id
    }));
    if(err || !account) {
        throwError('The request could not be completed', true, 409);
    }
    ctx.body = account;
}

module.exports = compose([
    middleware.validator({
        body: bodySchema
    }),
    add
]);