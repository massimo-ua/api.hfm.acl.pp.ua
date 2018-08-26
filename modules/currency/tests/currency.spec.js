'use strict';
const {request, expect, server} = require('../../../app.common.spec');

describe('Currency module: currencies endpoint', () => {
    let authToken;
    before(async () => {
        const { body } = await request(server)
            .post('/v1/auth/login')
            .body({
                'login': 'test',
                'password': '58edfe7252097e2333ccb3f733348ef6d920334452bf38033d46678d22d4b75d'
            })
            .json(true)
            .end();
        authToken = body.token;

    });
    it('All currencies: should response with Status 200 and list of currencies', async () => {
        const { body } = await request(server)
            .get('/v1/currencies')
            .headers({'Authorization': `Bearer ${authToken}`})
            .expect(200)
            .json(true)
            .end();
        expect(body).to.be.an('array');
    });
    it('All currencies Invalid token: should response with Status 401', async () => {
        const { body } = await request(server)
            .get('/v1/currencies')
            .headers({'Authorization': `Bearer 123`})
            .expect(401)
            .json(true)
            .end();
        expect(body).to.eql('Authentication Error');
    });
    it('One currency: should response with Status 200 and currency object', async () => {
        const { body } = await request(server)
            .get('/v1/currencies/1')
            .headers({'Authorization': `Bearer ${authToken}`})
            .expect(200)
            .json(true)
            .end();
        expect(body).to.be.an('object');
    });
    it('One currency not existent id: should response with Status 404', async () => {
        await request(server)
            .get('/v1/currencies/100000')
            .headers({'Authorization': `Bearer ${authToken}`})
            .expect(404)
            .json(true)
            .end();
    });
    it('One currency Invalid token: should response with Status 401', async () => {
        const { body } = await request(server)
            .get('/v1/currencies/1')
            .headers({'Authorization': `Bearer 123`})
            .expect(401)
            .json(true)
            .end();
        expect(body).to.eql('Authentication Error');
    });
});