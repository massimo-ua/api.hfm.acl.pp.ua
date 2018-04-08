const compose = require("koa-compose"),
      // module routes
      root = require("./root"),
      caterories = require("../modules/category/routes"),
      users = require("../modules/user/routes"),
      accounts = require("../modules/account/routes");

const appRouter = compose([
    root.routes(), root.allowedMethods(),
    caterories.routes(), caterories.allowedMethods(),
    users.routes(), users.allowedMethods(),
    accounts.routes(), accounts.allowedMethods()
]);

module.exports = appRouter; 
