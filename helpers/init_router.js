"use strict"
const Router = require("koa-router"),
      bodyParser = require("koa-bodyparser"),
      { queryParser } = require("../middleware"),
      { secret } = require("../config").jwt,
      jwt = require("koa-jwt");

function initKoaJwt(unprotected) {
    const koaJwt = jwt({ secret: secret });
    return (Array.isArray(unprotected) && unprotected.length > 0) ? koaJwt.unless({
        path: unprotected
    }) : koaJwt;
}

module.exports = (config = {}, unprotected = []) => { 
    const router = new Router(config);
    return router
            .use(bodyParser())
            .use(queryParser({ allowDots: true }))
            .use(initKoaJwt(unprotected));
}
