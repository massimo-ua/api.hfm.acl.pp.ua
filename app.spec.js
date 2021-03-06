'use strict'
require('module-alias/register');
const {request, expect, server} = require('./app.common.spec');

function importTest(name, path) {
    describe(name, function () {
        require(path);
    });
}

describe('Api.hfm.acl.pp.ua test suite', function () {
    /*beforeEach(function () {
       console.log('running something before each test');
    });*/
    describe('GET /v1/hello', () => {
        it('should response with {status:Ok}', async () => {
            const { body } = await request(server)
                .get('/v1/hello')
                .expect(200)
                .json(true)
                .end();
            expect(body).to.have.property('status', 'Ok');
        });
    });
    importTest('Auth', './modules/user/tests/auth.spec.js');
    importTest('Category', './modules/category/tests/category.spec.js');
    importTest('Account', './modules/account/tests/account.spec.js');
    importTest('Currency', './modules/currency/tests/currency.spec.js');
    /*after(function () {
        console.log('after all tests');
    });*/
});


