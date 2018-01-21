'use strict';
const bcrypt = require('bcrypt');
const compose = require('koa-compose');
const logger = require('../../logger');
const User = require('./model');
const middleware = require('../../middleware');
const config = require('../../config');
const joi = require('joi');
const { to } = require('await-to-js');
const helper = require('../../helpers');

const params = joi.object({
    login: joi.string().required(),
    password: joi.string().required()
}).required();

async function login(ctx) {
    let err, user, isPasswordValid, token;
    [err, user] = await to(User.findOne({where: {login: ctx.request.body.login}}));
    if(!user || err) {
        ctx.status = 404;
        return;
    }
    [err, isPasswordValid] = await to(bcrypt.compare(ctx.request.body.password, user.password));
    if(isPasswordValid) {
        [err, token] = await to(helper.createToken(user));
        ctx.body = {
            token: token
        };
    } else {
        logger.error(`Password check failed for login ${ctx.request.body.login}`);
        // TBD: response helper
    }
}

module.exports = compose([
    middleware.validator({
      body: params
    }),
    login
  ]);

