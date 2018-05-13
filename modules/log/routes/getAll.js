'use strict';
const Log = require('../model'),
      User = require('../../user/model'),
      { throwError, to } = require('../../../helpers');

async function getAll(ctx, next) {
    let err, logs;
    [err, logs] = await to(Log.findAll({ include: [{ model: User, as: 'user', attributes: ['_id','login','name']}] }));
    if(err || !logs) {
        throwError('Logs not found', true, 404);
    }
    ctx.body = logs;
}
module.exports = getAll;
