class BaseService {
    constructor(model, errors = {}) {
        this.model = model;
        this.errors = {...errors}
    }

    async findById(id) {
        const item = await this.model.scope('active').findOne({ where: { id: id }});
        if (item) {
            return item;
        } else {
            throw new NotFoundError(this.errors.NotFoundError);
        }
    }

    async create(data) {
        const item = await this.model.create(data);
        if (item) {
            return item;
        } else {
            throw new InternalError(this.errors.InternalError);
        }
    }

    async deleteById(id) {
        const item = await this.findById(id);
        item.deleted_at = new Date();
        await item.save();
        return true;
    }
}

module.exports = BaseService;