'use strict';
const { Account } = require('../models'),
    { throwError, to } = require('../../../helpers'),
    compose = require('koa-compose'),
    middleware = require('../../../middleware'),
    { findbyid: schema } = require('../validators');

async function getById(ctx) {
    const [err, account] = await to(Account.findOne({ where: { id: ctx.params.id } }, { include: ['type', 'currency']}));
    if(err || !account) {
        throwError('Account not found', true, 404);
    }
    ctx.body = account;
}
module.exports = compose([
    middleware.validator({
        params: schema
    }),
    getById
]);
