const middleware = require('@middleware');
const helpers = require('@helpers');
class BaseController {
    constructor(services, validators, errors, middleware = middleware, helpers = helpers) {
        this.services = services;
        this.middleware = middleware;
        this.helpers = helpers;
        this.validators = validators;
        this.errors = errors;
        this.getById = this.getById.bind(this);
    }

    getById(ctx) {
        let err, item;
        [err, item] = await to(this.services.scope('open').findOne({ where: { _id: ctx.params.id }}));
        if(err || !item) {
            throwError(this.errors.NotFound, true);
        }
        ctx.body = item;
    }
}

module.exports = BaseController;