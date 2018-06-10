'use strict';
const router = require('../../../helpers/').initRouter({ prefix: '/v1/categories'}),
    getAll = require('./getAll'),
    getById = require('./getById'),
    add = require('./add');

router.get('/', getAll);
router.get('/:id', getById);
router.post('/', add);

module.exports = router;