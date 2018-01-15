'use strict';
const bcrypt = require('bcrypt');
const jsonwebtoken = require('jsonwebtoken');
const compose = require('koa-compose');
const logger = require('../../logger');
const User = require('./model');
const middleware = require('../../middleware');
const config = require('../../config');
const joi = require('joi');

const params = joi.object({
    login: joi.string().required(),
    password: joi.string().required()
}).required();

async function login(ctx) {
    const user = await User.findOne({where: {login: ctx.request.body.login}});
    if(!user) {
        ctx.status = 404;
        return;
    }
    const isPasswordValid = await bcrypt.compare(ctx.request.body.password, user.password);
    if(isPasswordValid) {
        let data = {
            _id: user._id,
            login: user.login,
            name: user.name
        };
        let token;
        try {
            token = await jsonwebtoken.sign(
                data,
                config.jwt.secret,
                {expiresIn: "1d"}
            );
        } catch(err) {
            ctx.status = 500;
            ctx.body = err;
        }
        ctx.body = {
            token: token
        };
    } else {
        logger.error(`Password check failed for login ${ctx.request.body.login}`);
    }
}

module.exports = compose([
    middleware.validator({
      body: params
    }),
    login
  ]);

