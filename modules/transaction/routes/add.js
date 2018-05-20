'use strict';
const compose = require('koa-compose'),
      middleware = require('../../../middleware'),
      bodySchema = require('../validators').add,
      Transaction = require('../models').transaction,
      User = require('../../user/model'),
      { throwError, to } = require('../../../helpers');

async function add(ctx, next) {
    console.log(ctx);
    const { type, account_id, transaction_date } = ctx.request.body;
    const user_id = ctx.state.user._id;
    const [err, transaction] = await to(Transaction.create({
        type,
        account_id,
        transaction_date,
        user_id
    }));
    if(err || !transaction) {
        throwError('The request could not be completed', true, 409);
    }
    ctx.body = transaction;
}

module.exports = compose([
    middleware.validator({
      body: bodySchema
    }),
    add
]);