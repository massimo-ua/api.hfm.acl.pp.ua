'use strict';
const bcrypt = require('bcrypt');
const compose = require('koa-compose');
const logger = require('../../logger');
const User = require('./model');
const middleware = require('../../middleware');
const config = require('../../config');
const joi = require('joi');
const { createToken, throwError, to } = require('../../helpers');

const params = joi.object({
    login: joi.string().required(),
    password: joi.string().required()
}).required();

async function login(ctx) {
    let err, user, isPasswordValid, token;
    [err, user] = await to(User.findOne({where: {login: ctx.request.body.login}}));
    if(err || !user) {
        throwError('Authorization failed', true, 401);
    }
    [err, isPasswordValid] = await to(bcrypt.compare(ctx.request.body.password, user.password));
    if(err) {
        throwError(err.message, true);
    }
    if(isPasswordValid) {
        [err, token] = await to(createToken(user));
        if(err) {
            throwError(err.message, true);
        }
        ctx.body = {
            token: token
        };
    } else {
        throwError('Authorization failed', true, 401);
    }
}

module.exports = compose([
    middleware.validator({
      body: params
    }),
    login
  ]);

