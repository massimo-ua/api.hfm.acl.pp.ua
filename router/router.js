const config = require('../config');
const Router = require('koa-router');
const bodyParser = require('koa-bodyparser');
const jwt = require('koa-jwt');
const middleware = require('../middleware');
const caterories = require('./categories');
const users = require('./users');

const router = new Router();
router
    .use(bodyParser())
    .use(middleware.queryParser({ allowDots: true }))
    .use(jwt({ secret: config.jwt.secret }).unless({ path: [
        /^\/v1\/hello/,
        /^\/v1\/auth\/login/,
        /^\/v1\/auth\/signup/,
        /^\/v1\/auth\/confirm/
    ]}));

router.get('/v1/hello', (ctx) => {
    ctx.body = {
        status: "Ok"
    };
});

router.get('/v1/categories', caterories.getAll);
router.post('/v1/auth/login', users.login);
router.post('/v1/auth/signup', users.signup);

module.exports = router;
