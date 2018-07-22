'use strict';
const router = require('../../../helpers/').initRouter({ prefix: '/v1/transactions'}),
    getById = require('./getById'),
    add = require('./add'),
    updateById = require('./updateById'),
<<<<<<< HEAD
    deleteById = require('./deleteById'),
    addParam = require('./addParam');
=======
    deleteById = require('./deleteById');
>>>>>>> categories

router.get('/:id', getById);
router.post('/', add);
router.put('/:id', updateById);
router.delete('/:id', deleteById);
<<<<<<< HEAD
router.post('/:id/params', addParam);
=======
>>>>>>> categories


module.exports = router;