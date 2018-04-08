"use strict";
const { account: Account } = require("../models"),
      { throwError, to } = require("../../../helpers");

async function getAll(ctx, next) {
    let err, accounts;
    [err, accounts] = await to(Account.findAll({ include: ["account_type", "currency"]}));
    if(err || !accounts) {
        throwError("Accounts not found", true, 404);
    }
    ctx.body = accounts;
}
module.exports = getAll;
