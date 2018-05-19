'use strict';
const Transaction = require('../models').transaction,
      User = require('../../user/model'),
      { throwError, to } = require('../../../helpers');

async function getById(ctx, next) {
    let err, transaction;
    [err, transaction] = await to(Transaction.findOne({ 
        where: { id: ctx.params.id },
        include: [
            'account',
            { model: User, as: 'user', attributes: ['_id','login','name']},
            'params',
            'source',
            'target'
        ] }));
    if(err || !transaction) {
        throwError('Transaction not found', true, 404);
    }
    ctx.body = transaction;
}

module.exports = getById;