'use strict';
require('module-alias/register');
const Koa = require('koa');
// const bodyParser = require('koa-bodyparser');
const app = new Koa();
const router = require('./router');
const { errorsInterceptor, requestLogger } = require('./middleware');
const { serverErrorLogger, apiErrorLogger } = require('./helpers');

app.use(errorsInterceptor);
app.use(requestLogger());
app.use(router);

app.on('error', serverErrorLogger);
app.on('api-error', apiErrorLogger);

module.exports = app;