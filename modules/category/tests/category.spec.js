"use strict"
const request = require("../../../app.common.spec").request;
const expect = require("../../../app.common.spec").expect;
const server = require("../../../app.common.spec").server;

describe("Category module: categories endpoint", () => {
    let authToken;
    before(async () => {
        const { body } = await request(server)
            .post("/v1/auth/login")
            .body({
                "login": "massimo",
                "password": "58edfe7252097e2333ccb3f733348ef6d920334452bf38033d46678d22d4b75d"
            })
            .json(true)
            .end();
        authToken = body.token;

    });
    it("All categories: should response with Status 200 and list of categories", async () => {
        const { body } = await request(server)
            .get("/v1/categories")
            .headers({"Authorization": `Bearer ${authToken}`})
            .expect(200)
            .json(true)
            .end();
        expect(body).to.be.an("array");
    });
    it("All categories Invalid token: should response with Status 401", async () => {
        const { body } = await request(server)
            .get("/v1/categories")
            .headers({"Authorization": `Bearer 123`})
            .expect(401)
            .json(true)
            .end();
        expect(body).to.eql("Authentication Error");
    });
    it("One category: should response with Status 200 and category object", async () => {
        const { body } = await request(server)
            .get("/v1/categories/1")
            .headers({"Authorization": `Bearer ${authToken}`})
            .expect(200)
            .json(true)
            .end();
        expect(body).to.be.an("object");
    });
    it("One category not existent id: should response with Status 404", async () => {
        const { body } = await request(server)
            .get("/v1/categories/100000")
            .headers({"Authorization": `Bearer ${authToken}`})
            .expect(404)
            .json(true)
            .end();
    });
    it("One category Invalid token: should response with Status 401", async () => {
        const { body } = await request(server)
            .get("/v1/categories/1")
            .headers({"Authorization": `Bearer 123`})
            .expect(401)
            .json(true)
            .end();
        expect(body).to.eql("Authentication Error");
    });
});