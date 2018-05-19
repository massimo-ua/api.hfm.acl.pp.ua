"use strict"
const routerHelper = require("../../../helpers/"),
      login = require("./login.js"),
      signup = require("./signup"),
      confirm = require("./confirm");


const router = routerHelper.initRouter({ prefix: "/v1/auth" }, [
    /^\/v1\/auth\/login/,
    /^\/v1\/auth\/signup/,
    /^\/v1\/auth\/confirm/
]);
router.post("/login", login);
router.post("/signup", signup);

module.exports = router;