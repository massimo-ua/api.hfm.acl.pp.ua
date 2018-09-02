const controller = require('../controlles');
const router = require('@helpers').initRouter({ prefix: '/v1/plans' });
     
// router.get('/', getall);
router.get('/:id', controller.getById);
router.post('/', controller.create);
router.put('/:id', controller.updateById);
router.delete('/:id', controller.deleteById);
      
module.exports = router;