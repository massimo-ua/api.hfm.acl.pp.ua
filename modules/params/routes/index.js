'use strict';
const router = require('../../../helpers/').initRouter({ prefix: '/v1/params'}),
    deleteParam = require('./deleteParam');

// router.get('/:id', getById);
// router.put('/:id', updateById);
router.delete('/:id', deleteParam);

module.exports = router;