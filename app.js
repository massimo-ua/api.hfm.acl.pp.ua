'use strict';
const Koa = require('koa');
const app = new Koa();
const logger = require('./logger');
const router = require('./router');

app.use(router.routes());

app.on('error', (err) => {
    logger.error('Server error', { error: err.message });
});

module.exports = app;