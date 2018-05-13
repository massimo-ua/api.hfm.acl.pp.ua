'use strict'
const router = require('../../../helpers/').initRouter({ prefix: '/v1/logs'}),
      getAll = require('./getAll'),
      getByYear = require('./getByYear');

router.get('/', getAll);
router.get('/:year', getByYear);

module.exports = router;