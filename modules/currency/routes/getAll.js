'use strict';
const Currency = require("../models"),
      { throwError, to } = require("../../../helpers");

async function getAll(ctx) {
    let err, currencies;
    [err, currencies] = await to(Currency.findAll({ }));
    if(err || !currencies) {
        throwError("Currencies not found", true, 404);
    }
    ctx.body = currencies;
}
module.exports = getAll;
