'use strict';
const { Account } = require('../models'),
    compose = require('koa-compose'),
    middleware = require('../../../middleware'),
    { update: bodySchema, findbyid: paramsSchema } = require('../validators'),
    { throwError, to } = require('../../../helpers');

async function update(ctx) {
    let err, account;
    [err, account] = await to(Account.scope('open').findOne({
        where: { id: ctx.params.id }
    }));
    if(err || !account) {
        throwError('Account not found', true, 404);
    }
    for (const property in ctx.request.body) {
        if (account.hasOwnProperty(property)) {
            account[property] = ctx.request.body[property];
        }
    }
    [err, account] = await to(account.save());
    if(err || !account) {
        throwError('The request could not be completed', true, 409);
    }
    ctx.body = account;
}

module.exports = compose([
    middleware.validator({
        body: bodySchema,
        params: paramsSchema,
    }),
    update
]);