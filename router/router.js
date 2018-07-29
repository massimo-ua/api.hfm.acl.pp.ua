const compose = require('koa-compose'),
    // module routes
    root = require('./root'),
    caterories = require('../modules/category/routes'),
    users = require('../modules/user/routes'),
    accounts = require('../modules/account/routes'),
    { router: logs } = require('../modules/log'),
    { router: transactions } = require('../modules/transaction'),
    { router: params } = require('../modules/params');

const appRouter = compose([
    root.routes(), root.allowedMethods(),
    caterories.routes(), caterories.allowedMethods(),
    users.routes(), users.allowedMethods(),
    accounts.routes(), accounts.allowedMethods(),
    logs.routes(), logs.allowedMethods(),
    transactions.routes(), transactions.allowedMethods(),
    params.routes(), params.allowedMethods(),
]);

module.exports = appRouter; 
