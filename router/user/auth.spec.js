'use strict'
const request = require('super-request');
const { expect } = require('chai');
const app = require('../../app');

describe('Auth module: POST auth/login endpoint', () => {
    let server;
    before(() => {
        server = app.listen();
    });
    it('Valid login: should response with Status 200 and token', async () => {
        let user = {
            login: 'test',
            password: 'test'
        };
        const { body } = await request(server)
            .post('/v1/auth/login')
            .body(user)
            .expect(200)
            .json(true)
            .end();
        expect(body).to.have.property('token');
    });
    it('Invalid login: should response with Status 401', async () => {
        let user = {
            login: 'invalid',
            password: 'invalid'
        };
        const { body } = await request(server)
            .post('/v1/auth/login')
            .body(user)
            .expect(401)
            .json(true)
            .end();
        expect(body).to.eql('Unauthorized');
    });
    it('Empty body: should response with Status 400 and error description', async () => {
        const { body } = await request(server)
            .post('/v1/auth/login')
            .expect(400)
            .json(true)
            .end();
            expect(body).to.have.property('errors');
            expect(body.errors).to.have.property('login');
            expect(body.errors.login).length.to.be.gte(0);
    });
});