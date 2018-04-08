'use strict';
const Koa = require('koa');
const bodyParser = require('koa-bodyparser');
const app = new Koa();
const logger = require('./logger');
const router = require('./router');
const middleware = require('./middleware');


app.use(middleware.requestLogger());
app.use(router);

app.on('error', (err) => {
    logger.error('Server error', { error: err.message });
});

module.exports = app;