'use strict';
const Category = require("../model"),
      { throwError, to } = require("../../../helpers");

async function getById(ctx, next) {
    let err, category;
    [err, category] = await to(Category.findOne({ where: { _id: ctx.params.id }, include: ["parent_category", { model: Category, as: "sub_categories", include: ["sub_categories"] }] }));
    if(err || !category) {
        throwError("Category not found", true, 404);
    }
    ctx.body = category;
}

module.exports = getById;
