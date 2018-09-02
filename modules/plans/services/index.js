
const {BaseService} = require('@core');
const { Plan } = require('../models');
const errors = require('../errors');

class PlanService extends BaseService {
    constructor(model, errors) {
        super(model, errors);
    }
}
module.exports = new PlanService(Plan, errors);