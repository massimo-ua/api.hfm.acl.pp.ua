'use strict'
const router = require('../../../helpers/').initRouter({ prefix: '/v1/accounts' }),
      getall = require('./getall'),
      getbyid = require('./getbyid'),
      getactive = require('./getactive'),
      getclosed = require('./getclosed'),
      getnonzero = require('./getnonzero'),
      add = require('./add');
     
router.get('/', getall);
router.get('/:id', getbyid);
router.get('/active', getactive);
router.get('/closed', getclosed);
router.get('/nonzero', getnonzero);
router.post('/', add);
      
module.exports = router;
