'use strict';
const router = require('../../../helpers/').initRouter({ prefix: '/v1/transactions'}),
      getById = require('./getById'),
      add = require('./add');

router.get('/:id', getById);
router.post('/', add);

module.exports = router;