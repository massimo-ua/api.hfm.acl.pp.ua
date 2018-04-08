"use strict"
const router = require("../../../helpers/").initRouter({ prefix: "/v1/categories"}),
      getAll = require("./getAll"),
      getById = require("./getById");

router.get("/", getAll);
router.get("/:id", getById);

module.exports = router;