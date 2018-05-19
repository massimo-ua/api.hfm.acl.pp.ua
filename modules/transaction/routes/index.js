'use strict';
const router = require('../../../helpers/').initRouter({ prefix: '/v1/transactions'}),
      getById = require('./getById');

router.get('/:id', getById);

module.exports = router;