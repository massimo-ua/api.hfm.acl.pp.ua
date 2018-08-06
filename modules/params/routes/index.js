'use strict';
const router = require('../../../helpers/').initRouter({ prefix: '/v1/params'}),
    deleteParam = require('./deleteParam'),
    updateParam = require('./updateParam');

// router.get('/:id', getById);
router.delete('/:id', deleteParam);
router.put('/:id', updateParam);

module.exports = router;