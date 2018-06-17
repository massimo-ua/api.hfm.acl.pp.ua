'use strict';
const request = require('../../../app.common.spec').request;
const expect = require('../../../app.common.spec').expect;
const server = require('../../../app.common.spec').server;

describe('Account module: accounts endpoint', () => {
    let authToken;
    before(async () => {
        const { body } = await request(server)
            .post('/v1/auth/login')
            .body({
                'login': 'massimo',
                'password': '58edfe7252097e2333ccb3f733348ef6d920334452bf38033d46678d22d4b75d'
            })
            .json(true)
            .end();
        authToken = body.token;

    });
    it('All accounts: should response with Status 200 and list of accounts', async () => {
        const { body } = await request(server)
            .get('/v1/accounts')
            .headers({'Authorization': `Bearer ${authToken}`})
            .expect(200)
            .json(true)
            .end();
        expect(body).to.be.an('array');
    });
    it('All accounts Invalid token: should response with Status 401', async () => {
        const { body } = await request(server)
            .get('/v1/accounts')
            .headers({'Authorization': 'Bearer 123'})
            .expect(401)
            .json(true)
            .end();
        expect(body).to.eql('Authentication Error');
    });
    it('One account: should response with Status 200 and account object', async () => {
        const { body } = await request(server)
            .get('/v1/accounts/1')
            .headers({'Authorization': `Bearer ${authToken}`})
            .expect(200)
            .json(true)
            .end();
        expect(body).to.be.an('object');
    });
    it('Should response with Status 404 if account not exists', async () => {
        await request(server)
            .get('/v1/accounts/100000')
            .headers({'Authorization': `Bearer ${authToken}`})
            .expect(404)
            .json(true)
            .end();
    });
    it('Should response with Status 401 if not authorized', async () => {
        const { body } = await request(server)
            .get('/v1/accounts/1')
            .headers({'Authorization': 'Bearer 123'})
            .expect(401)
            .json(true)
            .end();
        expect(body).to.eql('Authentication Error');
    });

    /**
     * TBD:
     * 1. Create account (200, 409)
     * 2. Update account
     * 3. Get open accounts
     * 4. Get closed accounts
     * 5. Get empty accounts
     * 6. Get not empty accounts
     */
});