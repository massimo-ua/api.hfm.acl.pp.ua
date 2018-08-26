'use strict';
const router = require('../../../helpers/').initRouter({ prefix: '/v1/currencies'}),
    getAll = require('./getAll'),
    getById = require('./getById'),
    add = require('./add'),
    close = require('./close'),
    updateById = require('./updateById');


router.get('/', getAll);
router.get('/:id', getById);
router.post('/', add);
router.delete('/:id', close);
router.put('/:id', updateById);

module.exports = router;