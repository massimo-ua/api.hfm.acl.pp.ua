'use strict'
const request = require('super-request');
const { expect } = require('chai');
const app = require('./app');

describe('GET /hello', () => {
    it('should response with Hello node.js!', async () => {
        const { body } = await request(app.listen())
            .get('/hello')
            .expect(200)
            .end();
        expect(body).to.eql('Hello Node.js!');
    });
});