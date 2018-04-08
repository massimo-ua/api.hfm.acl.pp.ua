"use strict"
const router = require("../helpers").initRouter({ prefix: "/v1"}, [/^\/v1\/hello/]); 

router.get('/hello', (ctx) => {
    ctx.body = {
        status: "Ok"
    };
});

module.exports = router;