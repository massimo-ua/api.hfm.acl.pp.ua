'use strict';
const bcrypt = require('bcrypt');
const jsonwebtoken = require('jsonwebtoken');
const compose = require('koa-compose');
const User = require('./model');
const middleware = require('../../middleware');
const joi = require('joi');

const params = joi.object({
    login: joi.string().required(),
    password: joi.string().required()
}).required();

async function login(ctx) {
    const user = await User.findOne({where: {login: ctx.params.login}});
    if(!user) {
        ctx.status = 404;
        return;
    }
    /*
        tbd:
        1. check password
        2. if password is ok generate jwt
        3. return reponse as expected by satellizer: { token: JWT }
    */ 
}


