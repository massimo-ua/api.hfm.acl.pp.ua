'use strict';
const { Account } = require('../models'),
    { throwError, to } = require('../../../helpers');

async function getNonZero(ctx) {
    let err, accounts;
    [err, accounts] = await to(Account.scope('not_empty').findAll({ include: ['type', 'currency']}));
    if(err || !accounts) {
        throwError('Accounts not found', true, 404);
    }
    ctx.body = accounts;
}
module.exports = getNonZero;