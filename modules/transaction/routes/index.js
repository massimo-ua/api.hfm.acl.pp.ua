'use strict';
const router = require('../../../helpers/').initRouter({ prefix: '/v1/transactions'}),
    getById = require('./getById'),
    add = require('./add'),
    updateById = require('./updateById'),
    deleteById = require('./deleteById');

router.get('/:id', getById);
router.post('/', add);
router.put('/:id', updateById);
router.delete('/:id', deleteById);


module.exports = router;