const compose = require('koa-compose')
const middleware = require('../../../middleware')
const { byId: paramsSchema, update: bodySchema } = require('../validators')
const { transaction_param: TransactionParam } = require('../models')
const { throwError, to } = require('../../../helpers')

async function update (ctx) {
    let err, param, saved;
    [err, param] = await to(TransactionParam.findById(ctx.params.id))
    if(err || !param) {
        throwError('Transaction parameter not found', true, 404)
    }
    param = {...param, ...ctx.body};
    [err, saved] = await to(param.save())
    if(err || !saved) {
        throwError('Internal server error', true, 500)
    }
    ctx.body = { success: true }
}

module.exports = compose([
    middleware.validator({
        params: paramsSchema,
        body: bodySchema
    }),
    update
])
