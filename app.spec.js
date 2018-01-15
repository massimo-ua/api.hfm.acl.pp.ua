'use strict'
const request = require('super-request');
const { expect } = require('chai');
const app = require('./app');

describe('GET /v1/hello', () => {
    it('should response with {"status":"Ok"}', async () => {
        const { body } = await request(app.listen())
            .get('/v1/hello')
            .expect(200)
            .json(true)
            .end();
        expect(body).to.have.property('status', 'Ok');
    });
});