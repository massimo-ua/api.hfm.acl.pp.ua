'use strict';
const Category = require("../model"),
      { throwError, to } = require("../../../helpers");

async function getAll(ctx) {
    let err, categories;
    [err, categories] = await to(Category.findAll({ where: { parent_id: null }, include: [{ model: Category, as: "sub_categories", include: ["sub_categories"] }] }));
    if(err || !categories) {
        throwError("Categories not found", true, 404);
    }
    ctx.body = categories;
}
module.exports = getAll;
