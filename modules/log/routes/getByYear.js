'use strict';
const Log = require('../model'),
      User = require('../../user/model'),
      sequelize = require('sequelize'),
      { throwError, to } = require('../../../helpers');

async function getByYear(ctx) {
    let err, logs;
    [err, logs] = await to(Log.findAll({
        where: sequelize.where(
            sequelize.literal('extract(YEAR FROM created_at)'),
            ctx.params.year
        ), 
        include: [{ model: User, as: 'user', attributes: ['_id','login','name']}] }));
    if(err || !logs) {
        throwError('Logs not found', true, 404);
    }
    ctx.body = logs;
}
module.exports = getByYear;