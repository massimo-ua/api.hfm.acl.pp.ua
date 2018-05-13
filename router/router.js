const compose = require("koa-compose"),
      // module routes
      root = require("./root"),
      caterories = require("../modules/category/routes"),
      users = require("../modules/user/routes"),
      accounts = require("../modules/account/routes"),
      logs = require('../modules/log/routes');

const appRouter = compose([
    root.routes(), root.allowedMethods(),
    caterories.routes(), caterories.allowedMethods(),
    users.routes(), users.allowedMethods(),
    accounts.routes(), accounts.allowedMethods(),
    logs.routes(), logs.allowedMethods()
]);

module.exports = appRouter; 
