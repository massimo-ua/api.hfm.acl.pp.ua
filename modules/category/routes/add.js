'use strict';
const Category = require('../model'),
    compose = require('koa-compose'),
    middleware = require('../../../middleware'),
    bodySchema = require('../validators').add,
    { throwError, to } = require('../../../helpers');

async function add(ctx) {
    const {
        name,
        visible,
        type,
        parent_id,
    } = ctx.request.body;
    const [err, category] = await to(Category.create({
        name,
        visible,
        type,
        parent_id,
    }));
    if(err || !category) {
        throwError('The request could not be completed', true, 409);
    }
    ctx.body = category;
}

module.exports = compose([
    middleware.validator({
        body: bodySchema
    }),
    add
]);