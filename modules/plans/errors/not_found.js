const {ApiError} = reqiure('@core');

class PlanNotFound extends ApiError {
    constructor() {
        super('Plan not found', 404);
    }
}

module.exports = PlanNotFound;