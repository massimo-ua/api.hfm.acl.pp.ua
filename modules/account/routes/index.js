'use strict';
const router = require('../../../helpers/').initRouter({ prefix: '/v1/accounts' }),
    getall = require('./getall'),
    getbyid = require('./getbyid'),
    getopen = require('./getopen'),
    getclosed = require('./getclosed'),
    getnonzero = require('./getnonzero'),
    add = require('./add'),
    update = require('./update'),
    close = require('./close');

     
router.get('/', getall);
router.get('/:id', getbyid);
router.get('/open', getopen);
router.get('/closed', getclosed);
router.get('/nonzero', getnonzero);
router.post('/', add);
router.put('/:id', update);
router.delete('/:id', close);
      
module.exports = router;
