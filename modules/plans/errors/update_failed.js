const {ApiError} = reqiure('@core');

class PlanUpdateFailed extends ApiError {
    constructor() {
        super('Plan update failed', 500);
    }
}

module.exports = PlanUpdateFailed;