'use strict';

const jsonwebtoken = require('jsonwebtoken');
const compose = require('koa-compose');
const logger = require("../../../logger");
const User = require("../model");
const middleware = require("../../../middleware");
const config = require("../../../config");
const joi = require('joi');
const { createToken, throwError, to } = require("../../../helpers");

const params = joi.object({
    login: joi.string().required(),
    password: joi.string().required(),
    name: joi.string().required()
}).required();

async function signup(ctx) {
    let err, user, token;
    [err, user] = await to(User.create({ 
        login: ctx.request.body.login,
        password: ctx.request.body.password,
        name: ctx.request.body.name
     }));
     if(err) {
        throwError(err.message, true);
     }
    [err, token] = await to(createToken(user));
    if(err) {
        throwError(err.message, true);
    }
    ctx.body = {
        token: token
    };
}

module.exports = compose([
    middleware.validator({
      body: params
    }),
    signup
  ]);