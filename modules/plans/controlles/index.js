const { BaseController } = require('@core');
const service = require('../services');

class PlansController extends BaseController {
    constructor(service) {
        super(service);
    }
}

module.exports = new PlansController(service);