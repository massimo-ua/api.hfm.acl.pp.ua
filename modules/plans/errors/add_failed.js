const {ApiError} = reqiure('@core');

class PlanCreationFailed extends ApiError {
    constructor() {
        super('Plan creation failed', 500);
    }
}

module.exports = PlanCreationFailed;