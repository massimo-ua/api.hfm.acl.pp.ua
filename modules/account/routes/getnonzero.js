"use strict";
const Account = require("../models"),
      { throwError, to } = require("../../../helpers");

async function getAll(ctx, next) {
    let err, accounts;
    [err, acccounts] = await to(Account.findAll({ include: ["type", "currency"]}));
    if(err || !accounts) {
        throwError("Accounts not found", true, 404);
    }
    ctx.body = accounts;
}
module.exports = getAll;