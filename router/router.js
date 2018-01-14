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
    .use(jwt({ secret: config.jwt.secret }).unless({ path: [
        /^\/v1\/auth\/login/,
        /^\/v1\/auth\/register/,
        /^\/v1\/auth\/confirm/
    ]}));

router.get('/hello', (ctx) => {
    ctx.body = 'Hello Node.js!';
});

router.get('/v1/categories', caterories.getAll);
router.post('/v1/auth/login', users.login);

module.exports = router;
