'use strict';
const router = require('../../../helpers/').initRouter({ prefix: '/v1/transactions'}),
    getById = require('./getById'),
    add = require('./add'),
    updateById = require('./updateById'),
    deleteById = require('./deleteById'),
    addParam = require('./addParam'),
    deleteParam = require('../../params/routes/deleteParam');

router.get('/:id', getById);
router.post('/', add);
router.put('/:id', updateById);
router.delete('/:id', deleteById);
router.post('/:id/params', addParam);
router.delete('/:id/params', deleteParam);


module.exports = router;