'use strict';
const router = require('../../../helpers/').initRouter({ prefix: '/v1/transactions'}),
    getById = require('./getById'),
    add = require('./add'),
    updateById = require('./updateById'),
    deleteById = require('./deleteById'),
    addParam = require('./addParam');

router.get('/:id', getById);
router.post('/', add);
router.put('/:id', updateById);
router.delete('/:id', deleteById);
router.post('/:id/params', addParam);


module.exports = router;