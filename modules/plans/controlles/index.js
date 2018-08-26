const {BaseController} = require('@core');
const errors = require('../errors');
const services = require('../services');
const validators = require('../validators');

class PlansController extends BaseController {
    constructor(services, validators, errors) {
        super(services, validators, errors);
    }
}